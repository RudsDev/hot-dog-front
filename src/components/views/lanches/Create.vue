<template>
	<div id="create-lanche-component-content" class="component-view-root">
		<div class="container is-fluid is-variable is-4 m-0 p-2 columns">
			<div class="column">
				<article class="panel is-info">
					<p class="panel-heading">
						Detalhes do lanche
					</p>

					<div class="panel-sub-heading">
						<div class="panel-tabs">
							<p class="subtitle is-8 p-4">
								<span>Total: R$ {{ total }}</span>
							</p>
						</div>

						<div class="panel-block pt-4">
							<p class="control">
								<input
									id="nome"
									v-model="nome"
									type="text"
									class="input"
									:class="{ 'is-danger': $v.nome.$error }"
									placeholder="Nome do lanche"
									@blur="$v.nome.$touch()"
								/>
								<errors-messages
									:hasError="!!$vNome.hasError"
									:items="$vNome.items"
								/>
							</p>
						</div>
					</div>

					<div class="panel-content-container mt-5">
						<generic-panel-content-checker
							:key="ingredientes.length"
							:headerText="'Ingredientes'"
							:updateActionName="'ingredientes/updateQtdIngredientes'"
							:items="ingredientes"
							:keyMap="dataMapIng"
						/>
					</div>

					<div class="panel-block panel-footer">
						<div class="control column button-container column is-12">
							<button
								type="submit"
								class="button is-secondary"
								:disabled="disableSave"
								@click.stop.prevent="save()"
							>
								Cadastrar
							</button>

							<button
								class="button is-primary"
								:disabled="!ingredientesAdicionados.length"
								@click.stop.prevent="vender"
							>
								Vender
							</button>
						</div>
					</div>
				</article>
			</div>

			<div class="column">
				<article class="panel is-info">
					<p class="panel-heading">
						Lanches
					</p>

					<list-items
						:key="lanches.length"
						:items="lanches"
						:removeFunction="remove"
						:editFunction="edit"
						:keyMap="dataMap"
					/>
				</article>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import ListItems from '@/components/shared/panelList/ListItems.vue'
import ErrorsMessages from '@/components/shared/ErrorsMessages.vue'
import validation from '@/mixins/validations/lanche.js'
import notification from '@/mixins/notificationsMixin.js'
import GenericPanelContentChecker from '@/components/shared/GenericPanelContentChecker.vue'
import { calculaTotal } from '@/helpers/calculo'
import { currencyFormat } from '@/helpers/moeda'

export default {
	nome: 'CreateLanche',
	components: {
		ListItems,
		ErrorsMessages,
		GenericPanelContentChecker
	},
	mixins: [validation, notification],
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.path = from.path
		})
	},
	data() {
		return {
			validate: false,
			showContact: false,
			submitted: true,
			loadingSubmit: true,
			dataMap: [
				{ value: 'nome', money: false },
				{ value: 'preco', money: true }
			],
			dataMapIng: [
				{ value: 'nome', money: false },
				{ value: 'preco', money: true }
			],
			errors: null
		}
	},
	computed: {
		...mapState({
			ingredientes: state => state.ingredientes.ingredientes,
			lanches: state => state.lanches.lanches
		}),
		...mapFields('lanches', ['lanche.id', 'lanche.nome']),
		...mapGetters([]),
		ingredientesAdicionados: {
			get() {
				return this.ingredientes
					.filter(i => i.qtd > 0)
					.map(i => ({
						id: i.id,
						nome: i.nome,
						qtd: i.qtd,
						precoUnitario: currencyFormat(i.preco),
						precoTotal: currencyFormat(i.preco * i.qtd)
					}))
			}
		},
		total: {
			get() {
				const total = calculaTotal(this.ingredientes)
				return currencyFormat(total)
			}
		},
		disableSave: {
			get() {
				return !!this.$v.$error
			}
		},
		$vNome: {
			get() {
				return {
					items: [
						{
							validation: this.$v.nome.required,
							msg: 'Campo obrigatório para cadastro'
						},
						{
							validation: this.$v.nome.minLength,
							msg: `Deve ter no minimo ${this.$v.nome.$params.minLength.min} caracteres`
						}
					],
					hasError: this.$v.nome.$error
				}
			}
		}
	},
	async mounted() {
		await this.getIngredientes()
		await this.getLanches()
	},
	destroyed() {},
	methods: {
		...mapActions('lanches', [
			'createLanche',
			'setLancheField',
			'resetLancheFields',
			'editLanche',
			'getLanches',
			'resetLancheEdit',
			'removeLanche',
			'updateLanche'
		]),
		...mapActions('ingredientes', ['getIngredientes']),
		async save() {
			this.$v.$touch()
			if (!this.disableSave) {
				const resp = !this.id
					? await this.createLanche(this.payload())
					: await this.updateLanche(this.payload())

				console.log('resp', resp)

				this.apiResponseNotification(200, resp)
				this.resetLancheFields()
			}
		},
		vender() {
			alert('Vendeu')
		},
		payload() {
			const { id, nome } = this
			const ingredientes = this.ingredientesAdicionados.map(i => i.id)
			const payload = { id, nome, preco: this.total, ingredientes }
			id && console.log(payload)
			return payload
		},
		async remove(item) {
			const resp = await this.removeLanche(item.id)
			this.apiResponseNotification(resp)
		},
		async edit(item) {
			await this.editLanche(item)
		},
		cancelEdit() {
			this.resetLancheEdit()
		}
	}
}
</script>

<style lang="scss" scoped>
#create-lanche-component-content {
	.columns {
		height: 100%;
		flex-wrap: wrap;
	}
	.panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		.panel-tabs {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
		.panel-sub-heading {
			height: 120px;
		}
		.panel-content-container {
			flex-grow: 1;
		}
		.panel-footer {
			position: relative;
			height: 60px;
		}
	}
}
</style>
