const SUCESS_STATUS = [200, 201]
const REQUEST_PROBLEM_STATUS = [400, 401, 404, 405]

export default {
	data() {
		return {
			duration: 5000
		}
	},
	methods: {
		apiResponseNotification(resp, infos = {}) {
			const status = resp.status
			const title = resp.data.erro || infos.title || null
			const text = resp.data.msg || resp.msg || infos.msg
			if (SUCESS_STATUS.includes(parseInt(status))) {
				this.successNotification(title, text)
			} else if (REQUEST_PROBLEM_STATUS.includes(status)) {
				this.warningNotification(title, text)
			} else {
				this.errorNotification(title, text)
			}
		},
		defaultNotification(title, text) {
			const conf_ = {
				group: 'response',
				type: 'info',
				title: title || 'Atenção',
				text: text || 'Nenhum texto de resposta foi informado.',
				duration: this.duration
			}
			this.$notify(conf_)
		},
		errorNotification(title, text) {
			const conf_ = {
				group: 'response',
				type: 'error',
				title: title || 'Erro de sistema!.',
				text: text || '',
				duration: this.duration
			}
			this.$notify(conf_)
		},
		warningNotification(title, text) {
			const conf_ = {
				group: 'response',
				type: 'warn',
				title: title || 'Não foi possível concluir a operação.',
				text: text || '',
				duration: this.duration
			}
			this.$notify(conf_)
		},
		successNotification(title, text) {
			const conf_ = {
				group: 'response',
				type: 'success',
				title: title || 'Operação realizada com sucesso!',
				text: text || '',
				duration: this.duration
			}
			this.$notify(conf_)
		}
	}
}
