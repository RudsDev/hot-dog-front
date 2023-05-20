<template>
	<div id="generic-list-component-content">
		<div class="content">
			<div class="list-row">
				<generic-table-small
					:headers="headers_"
					:load-data="() => {}"
					:query="$route.query"
					:total-itens="10"
					:visible="!!items.length"
					:pagination="false"
				>
					<template #rows>
						<tr v-for="(item, iI) in items" :key="iI">
							<td v-for="(keys, iP) in listKeys" :key="iP">
								<span>{{ renderValue(getPropValue(item, keys)) }}</span>
							</td>
							<td v-if="showActions" class="generic-list-actions">
								<div class="actions-container">
									<item-edit
										:active="!editing"
										:on-click="() => edit(item)"
										:router-name="''"
										:params="{ id: item.id }"
									/>
									<item-remove
										:active="!editing"
										:on-click="() => remove(item.id)"
									/>
								</div>
							</td>
						</tr>
					</template>
				</generic-table-small>
			</div>
		</div>
	</div>
</template>

<script>
import store from '@/store/store'
import GenericTableSmall from '@/components/shared/GenericTableSmall.vue'
import ItemEdit from '@/components/shared/ItemEdit.vue'
import ItemRemove from '@/components/shared/ItemRemove.vue'
import { currencyFormat } from '@/helpers/moeda'

export default {
	name: 'GenericList',
	components: { GenericTableSmall, ItemEdit, ItemRemove },
	mixins: [],
	props: {
		items: {
			type: Array,
			required: true
		},
		dataMap: {
			type: Array,
			required: true
		},
		editing: {
			type: Boolean,
			default: false
		},
		editFunction: {
			type: String,
			default: undefined
		},
		removeFunction: {
			type: String,
			default: undefined
		},
		showActions: {
			type: Boolean,
			default: true
		},
		monetary: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			filters: {
				name: undefined
			}
		}
	},
	computed: {
		headers_() {
			return this.dataMap.map(h => h.header)
		},
		listKeys() {
			return this.dataMap.map(h => h.keys).filter(h => h.length)
		}
	},
	methods: {
		async search(params) {
			console.log(params)
		},
		getPropValue(item, keys = []) {
			let value = item
			keys.forEach(key => (value = value[key]))
			return value
		},
		edit(item) {
			if (!this.editing) {
				this.editFunction ? store.dispatch(this.editFunction, item) : () => {}
			}
		},
		remove(param) {
			this.removeFunction
				? store.dispatch(this.removeFunction, param)
				: () => {}
		},
		renderValue(value) {
			const isArray = Array.isArray(value)
			const join = values => values.join(' - ')
			const value_ = this.monetary ? currencyFormat(value) : value
			return isArray ? join(value_) : value_
		}
	}
}
</script>

<style lang="scss" scoped>
#generic-list-component-content {
	background-color: transparent;
	.content {
		.list-row {
			&::v-deep tr {
				text-align: center;
				td {
					height: inherit;
					color: $font-color;
					font-weight: 100;
					border-radius: 0px;
					border: none;
					border-bottom: 1px solid $font-color;
					&:first-of-type {
						text-align: left;
					}
					&.generic-list-actions {
						margin: 0;
						width: 100%;
						display: flex;
						justify-content: center;
						.actions-container {
							width: 100%;
							display: flex;
							justify-content: center;
							column-gap: 10px;
						}
					}
				}
			}
		}
	}
}
</style>
