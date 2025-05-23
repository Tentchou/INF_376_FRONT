import React from 'react'

export default function CapteurCard({ label, value, unit }) {
  return (
    <div className="card m-2 text-center" style={{ flex: '1 1 200px' }}>
      <div className="card-body">
        <h5 className="card-title">{label}</h5>
        <p className="card-text" style={{ fontSize: '2rem' }}>
          {value !== undefined ? `${value} ${unit}` : '—'}
        </p>
      </div>
    </div>
  )
}
