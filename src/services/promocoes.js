import axios from 'axios'
const url = '/v1/promocoes'
const promocoes = {}
promocoes.findById = id => axios.get(`${url}/${id}`)
promocoes.getAll = () => axios.get(url)
promocoes.create = data => axios.post(url, data)
promocoes.update = (id, data) => axios.put(url, data)
promocoes.delete = id => axios.delete(`${url}/${id}`)
export { promocoes }
