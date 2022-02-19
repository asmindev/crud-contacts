import React, { useEffect } from 'react'
import Router from './router/'
function App() {
  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.add('bg-white')
  }, [])
  return (
    <div className="antialiased text-gray-800">
      <div className="container mx-auto">
        <Router />
      </div>
    </div>
  )
}

export default App
