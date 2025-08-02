import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components/SearchBar'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='app'>
    <h1>Github User Search</h1>
    <SearchBar />
   </div>
  )
}

export default App
