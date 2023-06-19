<template>
	<div id="generic-list-component-content">
		<div class="content">
			<article class="panel is-link">
				<div class="panel-heading">
					<p>{{ headerText }}</p>
				</div>
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
			</article>
		</div>
	</div>
</template>

<script>
import Item from './Item.vue'
import { currencyFormatBr } from '@/helpers/moeda'
export default {
	name: 'List',
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
		headerText: {
			type: String,
			default: undefined
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
#generic-list-component-content {
	height: 100%;
	width: inherit;
	.content {
		height: 100%;
		.panel {
			display: flex;
			flex-direction: column;
			height: 100%;
			.panel-heading {
				margin: 0;
				height: $heading-height;
			}
			.panel-content {
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
	}
}
</style>
