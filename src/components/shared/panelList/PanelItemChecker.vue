<template>
	<div class="panel-item-checker is-flex is-flex-grow-1">
		<div class="component-content is-flex-grow-1">
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
						<input type="checkbox" :checked="qtd" @change="change" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PanelItemChecker',
	props: {
		texts: {
			type: Array,
			required: true
		},
		qtd: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			qtd_: 0
		}
	},
	watch: {
		qtd(_new) {
			this.qtd_ = _new
		}
	},
	methods: {
		change() {
			this.qtd > 0 ? this.decrease() : this.increase()
		},
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
.panel-item-checker {
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
