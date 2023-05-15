import axios from 'axios'
const url = '/v1/lanches'
const lanches = {}
lanches.findById = id => axios.get(`${url}/${id}`)
lanches.getAll = () => axios.get(url)
lanches.create = data => axios.post(url, data)
lanches.update = (id, data) => axios.put(url, data)
lanches.delete = id => axios.delete(`${url}/${id}`)
export { lanches }
