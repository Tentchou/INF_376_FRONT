import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 5000
})

export async function fetchSensors() {
  const { data } = await client.get('/sensors')
  return data
}

export async function fetchMeasurements() {
  const { data } = await client.get('/measurements')
  return data
}
