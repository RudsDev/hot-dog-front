<template>
	<div id="create-promocao-component-content" class="component-view-root">
		<div class="form-container">
			<form>
				<div class="container-internal-components">
					<div class="left">
						<generic-panel-adder
							:headerText="'Lanches'"
							:updateActionName="'lanches/updateQtdLanches'"
							:items="lanchesToadd"
							:counter="true"
						/>
					</div>

					<div class="center">
						<div class="card">
							<div class="card-content">
								<div class="media">
									<div class="media-content">
										<p class="title is-4">Detalhes da promoção</p>
										<p class="subtitle is-8">
											<span>Total: R$ {{ total }}</span>
										</p>
									</div>
								</div>

								<div class="content">
									<div class="columns field is-grouped form-group">
										<div class="control is-expanded column is-8">
											<label class="label">Promoção</label>
											<input
												id="nome"
												v-model="nome"
												type="text"
												class="input"
												:class="{ 'is-danger': $v.nome.$error }"
												placeholder="Nome da promoção"
												@blur="$v.nome.$touch()"
											/>
											<errors-messages
												:hasError="!!$vNome.hasError"
												:items="$vNome.items"
											/>
										</div>

										<div class="control is-expanded column is-two-quarters">
											<label class="label">Cálculo aplicado</label>
											<div class="select">
												<select @change="changeSelect">
													<option
														v-for="(tipo, i) in tiposCalculo"
														:key="i"
														:value="tipo.id"
													>
														{{ tipo.nome }}
													</option>
												</select>
											</div>
										</div>

										<div class="control is-expanded column is-one-quarter">
											<label class="label">Base</label>
											<input
												id="baseCalculo"
												v-model="baseCalculo"
												type="number"
												class="input"
												:class="{ 'is-danger': $v.baseCalculo.$error }"
												placeholder="Base Cálculo"
												@blur="$v.baseCalculo.$touch()"
											/>
											<errors-messages
												:hasError="!!$vValor.hasError"
												:items="$vValor.items"
											/>
										</div>
									</div>

									<div class="mini-list">
										<generic-compact-list
											v-if="lanchesAdded.length"
											:items="lanchesAdded"
											:dataMap="dataMapLan_"
										/>
										<p v-else>Sem lanches adicionados</p>
									</div>
								</div>

								<div class="button-container">
									<button
										class="button"
										:class="{ 'is-primary': !id, 'is-info': id }"
										:disabled="disableSave"
										@click.stop.prevent="save()"
									>
										{{ buttonTex }}
									</button>
									<button
										v-if="id"
										class="button is-light"
										@click.stop.prevent="cancelEdit()"
									>
										Cancelar
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class="right">
						<generic-panel-list
							:key="promocoes.length"
							:items="promocoes"
							:headerText="'Promoções'"
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
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import GenericPanelList from '@/components/shared/panelList/GenericPanelList.vue'
import GenericCompactList from '@/components/shared/GenericCompactList.vue'
import validation from '@/mixins/validations/promocao.js'
import notification from '@/mixins/notificationsMixin.js'
import ErrorsMessages from '@/components/shared/ErrorsMessages.vue'
import GenericPanelAdder from '@/components/shared/GenericPanelAdder.vue'
import { calculaTotal } from '@/helpers/calculo'
import { currencyFormat } from '@/helpers/moeda'

export default {
	nome: 'CreatePromocao',
	components: {
		ErrorsMessages,
		GenericPanelList,
		GenericCompactList,
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
			valor: 0,
			dataMap: [
				{ value: 'nome', money: false },
				{ value: 'preco', money: true }
			],
			dataMapLan_: [
				{ header: 'Nome', key: 'nome', money: false },
				{ header: 'Qtd', key: 'qtd', money: false },
				{ header: 'Total R$', key: 'precoTotal', money: true }
			],
			dataMapLan: [
				{ header: 'Nome', keys: ['nome'] },
				{ header: 'Qtd', keys: ['qtd'] },
				{ header: 'Total R$', keys: ['precoTotal'] }
			],
			errors: null
		}
	},
	computed: {
		...mapState({
			tiposCalculo: state => state.promocoes.tiposCalculo,
			promocoes: state => state.promocoes.promocoes,
			lanches: state => state.lanches.lanches
		}),
		...mapFields('promocoes', [
			'promocao.id',
			'promocao.nome',
			'promocao.tipoCalculo',
			'promocao.baseCalculo',
			'promocao.itens'
		]),
		buttonTex: {
			get() {
				return this.id ? 'Atualizar' : 'Cadastrar'
			}
		},
		disableSave: {
			get() {
				return !!this.$v.$error
			}
		},
		lanchesToadd: {
			get() {
				return this.lanches.map(i => ({
					id: i.id,
					nome: i.nome,
					qtd: i.qtd
				}))
			}
		},
		lanchesAdded: {
			get() {
				return this.lanches
					.filter(i => i.qtd > 0)
					.map(i => ({
						id: i.id,
						nome: i.nome,
						precoTotal: i.qtd * i.preco,
						qtd: i.qtd
					}))
			}
		},
		total: {
			get() {
				const total = calculaTotal(this.lanches)
				return currencyFormat(total)
			}
		},
		$vNome: {
			get() {
				return {
					items: [
						{ validation: this.$v.nome.required, msg: 'Campo obrigatório' },
						{
							validation: this.$v.nome.minLength,
							msg: `Deve ter no minimo ${this.$v.nome.$params.minLength.min} caracteres`
						}
					],
					hasError: this.$v.nome.$error
				}
			}
		},
		$vValor: {
			get() {
				return {
					items: [
						{
							validation: this.$v.baseCalculo.required,
							msg: 'Campo obrigatório'
						},
						{
							validation: this.$v.baseCalculo.numeric,
							msg: 'Somente números'
						}
					],
					hasError: this.$v.baseCalculo.$error
				}
			}
		}
	},
	async mounted() {
		await this.getPromocoes()
		await this.getLanches()
	},
	destroyed() {},
	methods: {
		...mapActions('promocoes', [
			'getPromocoes',
			'getLanches',
			'createPromocao',
			'removePromocao',
			'editPromocao',
			'updatePromocao',
			'resetPromocaoEdit'
		]),
		...mapActions('lanches', ['getLanches']),
		async save() {
			this.$v.$touch()
			!this.id
				? await this.createPromocao(this.payload())
				: this.updatePromocao(this.payload())
		},
		changeSelect({ target }) {
			this.tipoCalculo = target.value
		},
		payload() {
			const { id, nome, tipoCalculo, baseCalculo } = this
			const itens = this.lanches
				.filter(l => l.qtd > 0)
				.map(l => ({ lanche: l.id, quantidade: l.qtd }))
			return { id, nome, tipoCalculo, baseCalculo, itens }
		},
		async remove(item) {
			const resp = await this.removePromocao(item.id)
			this.apiResponseNotification(resp)
		},
		async edit(item) {
			await this.editPromocao(item)
		},
		cancelEdit() {
			this.resetPromocaoEdit()
		}
	}
}
</script>

<style lang="scss" scoped>
#create-promocao-component-content {
	.panel {
		width: 430px;
		height: 616px;
		.panel-heading {
			margin: 0;
		}
		.panel-block {
			&.preco {
				height: 45px;
				display: flex;
				align-items: center;
				background-color: #dad6d6;
				.control {
					display: flex;
					justify-content: flex-start;
				}
			}
		}
		.panel-content {
			height: 467px;
			overflow-x: auto;
			a {
				&:hover {
					text-decoration: none;
				}
			}
		}
	}
}
</style>
