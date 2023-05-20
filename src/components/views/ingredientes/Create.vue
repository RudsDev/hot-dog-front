<template>
	<div id="create-ingrediente-component-content" class="component-view-root">
		<div class="form-container">
			<form class="box">
				<div class="columns field is-grouped form-group">
					<div class="control is-expanded column is-three-quarters">
						<label class="label">Ingredientes</label>
						<input
							id="nome"
							v-model="nome"
							type="text"
							class="input"
							:class="{ 'is-danger': $v.nome.$error }"
							placeholder="Nome do ingrediente"
							@blur="$v.nome.$touch()"
						/>
						<errors-messages
							:hasError="!!$vNome.hasError"
							:items="$vNome.items"
						/>
					</div>
					<div class="control is-expanded column is-one-quarter">
						<label class="label">R$ Preço</label>
						<input
							id="preco"
							v-model="preco"
							type="number"
							class="input"
							:class="{ 'is-danger': $v.preco.$error }"
							placeholder="R$ Preço"
							@blur="$v.preco.$touch()"
						/>
						<errors-messages
							:hasError="!!$vPreco.hasError"
							:items="$vPreco.items"
						/>
					</div>
					<div class="control column button-container">
						<button
							type="submit"
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
			</form>

			<generic-panel-list
				:key="ingredientes.length"
				:items="ingredientes"
				:headerText="'Ingredientes'"
				:removeFunction="remove"
				:editFunction="edit"
				:keyMap="dataMap"
			/>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import GenericPanelList from '@/components/shared/panelList/GenericPanelList.vue'
import ErrorsMessages from '@/components/shared/ErrorsMessages.vue'
import validation from '@/mixins/validations/ingrediente.js'
import notification from '@/mixins/notificationsMixin.js'

export default {
	nome: 'CreateIngrediente',
	components: {
		GenericPanelList,
		ErrorsMessages
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
			errors: null
		}
	},
	computed: {
		...mapState({
			ingredientes: state => state.ingredientes.ingredientes
		}),
		...mapFields('ingredientes', [
			'ingrediente.id',
			'ingrediente.nome',
			'ingrediente.preco'
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
		$vPreco: {
			get() {
				return {
					items: [
						{ validation: this.$v.preco.required, msg: 'Campo obrigatório' },
						{
							validation: this.$v.preco.numeric,
							msg: 'Somente números'
						}
					],
					hasError: this.$v.preco.$error
				}
			}
		}
	},
	async mounted() {
		await this.getIngredientes()
	},
	destroyed() {},
	methods: {
		...mapActions('ingredientes', [
			'createIngrediente',
			'removeIngrediente',
			'getIngredientes',
			'setIngredienteField',
			'setIngrediente',
			'resetIngredienteFields',
			'removeIngrediente',
			'updateIngrediente'
		]),
		async save() {
			this.$v.$touch()
			if (!this.disableSave) {
				const resp = !this.id
					? await this.createIngrediente(this.payload())
					: await this.updateIngrediente(this.payload())

				console.log('resp', resp)
				this.apiResponseNotification(resp)
				this.resetIngredienteFields()
				this.$v.$reset()
			}
		},
		payload() {
			const { id, preco, nome } = this
			const payload = { id, preco, nome }
			return payload
		},
		async remove(item) {
			const resp = await this.removeIngrediente(item.id)
			this.apiResponseNotification(resp)
		},
		async edit(item) {
			await this.setIngrediente(item)
		},
		cancelEdit() {
			this.resetIngredienteFields()
		}
	}
}
</script>

<style lang="scss" scoped>
#create-ingrediente-component-content {
	display: block;
	form {
		.control {
			&.button-container {
				button {
					height: 38px;
					position: relative;
					top: 35px;
				}
			}
		}
	}
}
</style>

<style lang="scss" scoped></style>
