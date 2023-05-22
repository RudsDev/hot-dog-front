<template>
	<div id="create-lanche-component-content" class="component-view-root">
		<div class="form-container">
			<form>
				<div class="container-internal-components">
					<div class="left">
						<generic-panel-adder
							:headerText="'Ingredientes'"
							:updateActionName="'ingredientes/updateQtdIngredientes'"
							:items="ingredientes"
						/>
					</div>

					<div class="center">
						<div class="card">
							<div class="card-content">
								<div class="media">
									<div class="media-content">
										<p class="title is-4">Detalhes do lanche</p>
										<p class="subtitle is-8">
											<span>Total: R$ {{ total }}</span>
										</p>
									</div>
								</div>

								<div class="content">
									<div class="columns field is-grouped form-group">
										<div class="control is-expanded column is-12">
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
										</div>
									</div>

									<div class="mini-list">
										<generic-list
											v-if="ingredientesAdicionados.length"
											:key="ingredientesAdicionados.length"
											:items="ingredientesAdicionados"
											:dataMap="dataMapIng"
											:editFunction="'editContact'"
											:removeFunction="'removeContact'"
											:showActions="false"
										/>
										<p v-else>Sem ingredientes adicionados</p>
									</div>

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
							</div>
						</div>
					</div>

					<div class="right">
						<generic-panel-list
							:key="lanches.length"
							:items="lanches"
							:headerText="'Lanches'"
							:removeFunction="remove"
							:editFunction="edit"
							:keyMap="dataMap"
						/>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import GenericPanelList from '@/components/shared/panelList/GenericPanelList.vue'
import GenericList from '@/components/shared/GenericList.vue'
import ErrorsMessages from '@/components/shared/ErrorsMessages.vue'
import validation from '@/mixins/validations/lanche.js'
import notification from '@/mixins/notificationsMixin.js'
import GenericPanelAdder from '@/components/shared/GenericPanelAdder.vue'
import { calculaTotal } from '@/helpers/calculo'
import { currencyFormat } from '@/helpers/moeda'

export default {
	nome: 'CreateLanche',
	components: {
		GenericList,
		GenericPanelList,
		ErrorsMessages,
		GenericPanelAdder
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
				{ header: 'Nome', keys: ['nome'] },
				{ header: 'Preço R$', keys: ['precoTotal'] }
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
// #create-lanche-component-content {}
</style>

<style lang="scss" scoped></style>
