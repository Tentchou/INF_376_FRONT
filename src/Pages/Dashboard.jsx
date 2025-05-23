import React, { useEffect, useState, useRef } from 'react'
import CapteurCard from '../components/CapteurCard.jsx'
import CapteurChart from '../components/CapteurChart.jsx'
import api from '../api.js'

export default function Dashboard() {
  const [readings, setReadings] = useState([])
  const poller = useRef(null)

  const fetchData = () => {
    api
      .get('/capteurs')
      .then((res) => {
        const pts = res.data.map((c) => ({
          time: new Date(c.created_at),
          temperature: c.temperature,
          humidity: c.humidity,
          distance: c.distance,
          sound: c.sound,
          presence: c.presence
        }))
        setReadings(pts)
      })
      .catch((err) => console.error('Erreur API:', err))
  }

  useEffect(() => {
    fetchData()
    poller.current = setInterval(fetchData, 5000)
    return () => clearInterval(poller.current)
  }, [])

  const latest = readings[0] || {}

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Dashboard Capteur</h2>

      {/* Cartes de valeurs */}
      <div className="d-flex flex-wrap">
        <CapteurCard label="Température" value={latest.temperature} unit="°C" />
        <CapteurCard label="Humidité"    value={latest.humidity}    unit="%"  />
        <CapteurCard label="Distance"    value={latest.distance}    unit="cm" />
        <CapteurCard label="Son"         value={latest.sound}       unit="ADC" />
        <CapteurCard label="Présence"    value={latest.presence ? '✔️' : '❌'} unit="" />
      </div>

      {/* Courbes évolutives */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <CapteurChart
            data={readings.map((r) => ({ time: r.time, value: r.temperature }))}
            label="Température (°C)"
          />
        </div>
        <div className="col-md-6 mb-4">
          <CapteurChart
            data={readings.map((r) => ({ time: r.time, value: r.humidity }))}
            label="Humidité (%)"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <CapteurChart
            data={readings.map((r) => ({ time: r.time, value: r.distance }))}
            label="Distance (cm)"
          />
        </div>
        <div className="col-md-6 mb-4">
          <CapteurChart
            data={readings.map((r) => ({ time: r.time, value: r.sound }))}
            label="Son (ADC)"
          />
        </div>
      </div>
    </div>
  )
}
