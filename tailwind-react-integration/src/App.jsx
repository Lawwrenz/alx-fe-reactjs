import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
  <h1 class="text-3xl font-semibold text-white mb-4">Hello Lawrence</h1>
  <p class="text-lg text-white/90">Welcome to your first lesson on TailwindCSS</p>
</div>
  )
}

export default App
