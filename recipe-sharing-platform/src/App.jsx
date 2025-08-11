import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-xs mx-auto mt-10 p-4 bg-grey rounded-lg">
      <h2 className="text-lg font-semibold">Lawrence Ezealor</h2>
      <p className="text-sm text-gray-600">Frontend Engineer</p>
      <p className="text-xs text-gray-500">Works at Inspo tech USA</p>
    </div>
  )
}

export default App
