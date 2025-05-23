// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import ChartCard from './ChartCard'
// notez le dossier en minuscules
import { fetchSensors, fetchMeasurements } from '../Services/api'

export default function Dashboard() {
  const [measurements, setMeasurements] = useState([])
  const [sensors, setSensors]           = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const [sList, mList] = await Promise.all([
        fetchSensors(),
        fetchMeasurements()
      ])
      if (!mounted) return
      setSensors(sList)
      setMeasurements(mList)
    }
    load()
    const id = setInterval(load, 5000)
    return () => { mounted = false; clearInterval(id) }
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Tableau de bord des capteurs</h1>
      <div className="row g-4">
        {sensors.map(sensor => {
          const dataPoints = measurements.filter(m => m.sensor.id === sensor.id)
          return (
            <div key={sensor.id} className="col-12 col-md-6">
              <ChartCard
                title={`${sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)} (${sensor.location || sensor.id})`}
                unit={
                  sensor.type === 'temperature' ? '°C' :
                  sensor.type === 'sound'       ? 'dB'  :
                  sensor.type === 'ultrason'    ? 'cm'  : ''
                }
                dataPoints={dataPoints}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
