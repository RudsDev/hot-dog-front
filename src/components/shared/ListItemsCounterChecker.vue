<template>
	<div id="list-items-counter-checker" class="panel-content">
		<a v-for="(item, index) in items" :key="index" class="panel-block">
			<counter
				v-if="counter"
				:nome="item.nome"
				:qtd="item.qtd"
				@qtd-update="data => setQtd(index, data)"
			/>
			<item-checker
				v-else
				:id="item.id"
				:texts="mappedTexts(index)"
				:qtd="item.qtd"
				@qtd-update="data => setQtd(index, data)"
			/>
		</a>
	</div>
</template>

<script>
import store from '@/store/store'
import Counter from '@/components/shared/Counter.vue'
import ItemChecker from './panelList/ItemChecker.vue'
import { currencyFormatBr } from '@/helpers/moeda'

export default {
	name: 'ListItemsCounterChecker',
	components: { Counter, ItemChecker },
	mixins: [],
	props: {
		items: {
			type: Array,
			required: true
		},
		updateActionName: {
			type: String,
			required: true
		},
		headerText: {
			type: String,
			default: undefined
		},
		counter: {
			type: Boolean,
			default: false
		},
		keyMap: {
			type: Array,
			required: true
		}
	},
	data() {
		return {}
	},
	computed: {},
	methods: {
		setQtd(index, value) {
			const action = this.updateActionName
			const payload = { index, value }
			const options = { root: true }
			action ? store.dispatch(action, payload, options) : () => {}
		},
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
#list-items-counter-checker {
	background-color: transparent;
	height: 100%;
	display: flex;
	flex-direction: column;
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
