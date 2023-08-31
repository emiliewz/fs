import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateImportance = async (id) => {
  const objectToUpdate = await axios.get(`${baseUrl}/${id}`).then(response => response.data)
  const updatedObject = { ...objectToUpdate, important: !objectToUpdate.important }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

export default { getAll, createNew, updateImportance }