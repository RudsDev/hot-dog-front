<template>
	<div id="erros-messages-component-content" class="component-root">
		<div class="content">
			<div class="error-messages">
				<div v-if="hasError">
					<div v-for="(item, index) in items" :key="index">
						<p v-if="!item.validation" class="help is-danger">
							{{ item.msg }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ErrorsMesages',
	components: {},
	mixins: [],
	props: {
		items: {
			type: Array,
			required: true
		},
		hasError: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			filters: {
				name: undefined
			}
		}
	},
	computed: {},
	methods: {}
}
</script>

<style lang="scss" scoped>
#erros-messages-component-content {
	background-color: transparent;
	.content {
		.error-messages {
			margin-top: 3px;
			padding-bottom: 0;
			min-height: 15px;
			.help {
				margin: 0;
				font-weight: 400;
			}
		}
	}
}
</style>
