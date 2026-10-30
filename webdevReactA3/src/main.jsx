import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MovieBox from './MovieBox.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MovieBox />
  </StrictMode>,
)
