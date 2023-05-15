<template>
	<div class="addeds-component-content box_">
		<div class="component-content">
			<div class="">
				<div class="control columns is-half form-group_">
					<p class="item-nome">{{ nome }}</p>
					<div class="counter-container">
						<button
							class="button is-small is-link is-light"
							@click.stop.prevent="decrease()"
						>
							<span class="icon is-small">
								<i class="fas fa-minus"></i>
							</span>
						</button>
						<div class="number-square">{{ qtd_ }}</div>
						<button
							class="button is-small is-primary is-light"
							@click.stop.prevent="increase()"
						>
							<span class="icon is-small">
								<i class="fas fa-plus"></i>
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
	props: {
		nome: {
			type: String,
			required: true
		},
		qtd: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			qtd_: this.qtd
		}
	},
	watch: {
		qtd(_new) {
			this.qtd_ = _new
		}
	},
	methods: {
		increase() {
			this.qtd_ = this.qtd_ + 1
			this.$emit('qtd-update', this.qtd_)
		},
		decrease() {
			if (this.qtd_ > 0) this.qtd_ = this.qtd_ - 1
			this.$emit('qtd-update', this.qtd_)
		}
	}
}
</script>

<style lang="scss" scoped>
.addeds-component-content {
	&.box_ {
		background-color: transparent;
	}
	.component-content {
		.form-group_ {
			margin: 0;
			padding: 12px 25px;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item-nome {
				width: 250px;
				position: relative;
				margin: 0;
			}
			.counter-container {
				display: flex;
				align-items: center;
				.number-square {
					width: 40px;
					height: 40px;
					display: inline-flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
}
</style>
