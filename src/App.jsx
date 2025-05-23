import { useState } from 'react'
// import Dashboard from './components/Dashboard'
import Dashboard from './Pages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">CAPTEUR SENSOR APP</a>
        </div>
      </nav>
      <Dashboard />
    </>
  )
}

export default App
