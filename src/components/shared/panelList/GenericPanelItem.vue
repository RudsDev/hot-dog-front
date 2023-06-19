<template>
	<div class="generic-panel-item-component">
		<div class="component-content">
			<div class="row">
				<p v-for="(text, i) in texts" :key="i" class="item-text" :title="text">
					<span class="elipsis">{{ text }}</span>
				</p>
				<div class="actions-container">
					<button
						class="button is-small is-info"
						@click.stop.prevent="editFunction"
					>
						<span class="icon is-small">
							<i class="fas fa-pen"></i>
						</span>
					</button>

					<button
						class="button is-small is-danger"
						@click.stop.prevent="removeFunction"
					>
						<span class="icon is-small">
							<i class="fas fa-trash-alt"></i>
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GenericPanelItem',
	props: {
		texts: {
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
	watch: {},
	methods: {}
}
</script>

<style lang="scss" scoped>
.generic-panel-item-component {
	flex-grow: 1;
	.component-content {
		.row {
			margin: 0;
			padding: 12px 5px;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item-text {
				display: flex;
				align-items: center;
				margin: 0;
				max-width: 25%;
				&:first-of-type {
					min-width: 100px;
					flex-grow: 2;
					max-width: 45%;
					.elipsis {
						max-width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						display: inline-block;
					}
				}
				&:last-of-type {
					text-align: center;
				}
			}
			.actions-container {
				min-width: 70px;
				display: flex;
				align-items: center;
				column-gap: 10px;
			}
		}
	}
}
</style>
