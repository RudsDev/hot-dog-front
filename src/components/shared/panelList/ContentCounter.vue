<template>
	<div id="content-counter-component">
		<div class="panel-content">
			<a
				v-for="(item, index) in items"
				:key="index"
				class="panel-block is-active"
			>
				<item
					:texts="mappedTexts(index)"
					:removeFunction="() => removeFunction(item)"
					:editFunction="() => editFunction(item)"
				/>
			</a>
		</div>
	</div>
</template>

<script>
import Item from './Item.vue'
import { currencyFormatBr } from '@/helpers/moeda'
export default {
	name: 'ContentCounter',
	components: { Item },
	mixins: [],
	props: {
		items: {
			type: Array,
			required: true
		},
		keyMap: {
			type: Array,
			required: true
		},
		removeFunction: {
			type: Function,
			default: () => {}
		},
		editFunction: {
			type: Function,
			default: () => {}
		}
	},
	data() {
		return {}
	},
	computed: {},
	methods: {
		mappedTexts(index) {
			return this.keyMap.map(key => {
				return key.money
					? currencyFormatBr(this.items[index][key.value])
					: this.items[index][key.value]
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$heading-height: 55px;
#content-counter-component {
	height: 100%;
	&.panel-content {
		max-height: 547px;
		overflow-x: auto;
		.panel-block {
			height: 45px;
			&:hover {
				text-decoration: none;
			}
		}
	}
}
</style>
