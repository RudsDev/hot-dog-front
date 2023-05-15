<template>
	<div id="generic-adder-component-content">
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
						<counter
							v-if="counter"
							:nome="item.nome"
							:qtd="item.qtd"
							@qtd-update="data => setQtd(index, data)"
						/>
						<checker
							v-else
							:id="item.id"
							:qtd="item.qtd"
							:nome="item.nome"
							@qtd-update="data => setQtd(index, data)"
						/>
					</a>
				</div>
			</article>
		</div>
	</div>
</template>

<script>
import store from '@/store/store'
import Counter from '@/components/shared/Counter.vue'
import Checker from './Checker.vue'

export default {
	name: 'GenericPanelAdder',
	components: { Counter, Checker },
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
		}
	}
}
</script>

<style lang="scss" scoped>
$heading-height: 55px;
#generic-adder-component-content {
	background-color: transparent;
	height: 100%;
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
