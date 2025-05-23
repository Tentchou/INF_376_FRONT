// src/components/ChartCard.jsx
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function ChartCard({ title, unit, dataPoints }) {
  // On garde les 10 derniers points
  const recent = dataPoints.slice(-10)
  const labels = recent.map(pt => new Date(pt.recorded_at))
  const values = recent.map(pt => pt.value)

  // Tendance
  let trendColor = 'gray'
  if (values.length >= 2) {
    const delta = values[values.length - 1] - values[values.length - 2]
    trendColor = delta >= 0 ? 'rgb(25,135,84)' : 'rgb(220,53,69)'
  }

  // **Ici on construit l'objet data** directement
  const data = {
    labels,
    datasets: [
      {
        label: `${title} (${unit})`,
        data: values,
        borderColor: trendColor,
        backgroundColor: trendColor.replace('rgb', 'rgba').replace(')', ',0.2)'),
        borderWidth: 3,
        pointRadius: 4,
        fill: true,
        tension: 0.3
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: { tooltipFormat: 'HH:mm', unit: 'minute', displayFormats: { minute: 'HH:mm' } },
        title: { display: true, text: 'Heure', font: { size: 14 } },
        grid: { display: true }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: unit, font: { size: 14 } },
        grid: { display: true }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.y} ${unit}`
        }
      }
    },
  }

  const currentValue = values.length ? values[values.length - 1] : '–'

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <h2 className="mt-2" style={{ color: trendColor, fontSize: '2.5rem' }}>
          {currentValue} <small className="text-muted">{unit}</small>
        </h2>
        <div className="mt-3" style={{ height: '350px' }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  )
}
