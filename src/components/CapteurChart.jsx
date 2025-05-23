import React from 'react'
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function CapteurChart({ data, label }) {
  const chartData = {
    datasets: [
      {
        label,
        data: data.map((pt) => ({ x: pt.time, y: pt.value })),
        borderColor: '#0d6efd',              // ligne en bleu Bootstrap
        backgroundColor: 'rgba(13,110,253,0.2)', // fond semi-transparent
        borderWidth: 2,
        tension: 0.4,                         // lissage de la courbe
        pointRadius: 3,                       // petits points
        pointHoverRadius: 6,
        fill: true                            // active le remplissage
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'HH:mm:ss'
        },
        title: {
          display: true,
          text: 'Heure'
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: label
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  }

  return <Line data={chartData} options={options} />
}
