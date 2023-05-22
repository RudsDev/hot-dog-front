<template>
	<div class="generic-panel-item-component">
		<div class="component-content">
			<div class="">
				<div class="row">
					<p
						v-for="(text, i) in texts"
						:key="i"
						class="item-text"
						:title="text"
					>
						{{ text }}
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
	.component-content {
		.row {
			margin: 0;
			padding: 12px 25px;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item-text {
				width: 150px;
				position: relative;
				margin: 0;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				&:last-of-type {
					text-align: center;
				}
			}
			.actions-container {
				display: flex;
				align-items: center;
				column-gap: 15px;
			}
		}
	}
}
</style>
