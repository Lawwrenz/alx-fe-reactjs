import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost' // Add this import
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/profile/*" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} /> {/* Add this route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App