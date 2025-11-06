import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import States from './States.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <States />
  </StrictMode>,
)
