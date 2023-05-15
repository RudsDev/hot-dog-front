import axios from 'axios'
const url = '/v1/ingredientes'
const ingredientes = {}
ingredientes.findById = id => axios.get(`${url}/${id}`)
ingredientes.getAll = () => axios.get(url)
ingredientes.create = data => axios.post(url, data)
ingredientes.update = (id, data) => axios.put(url, data)
ingredientes.delete = id => axios.delete(`${url}/${id}`)
export { ingredientes }
