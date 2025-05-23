import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function fetchSensors() {
  const { data } = await client.get('/sensors')
  return data
}

export async function fetchMeasurements() {
  const { data } = await client.get('/measurements')
  return data
}

export default client;
