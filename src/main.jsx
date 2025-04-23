import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Main function that is the start of everything.
// So do not touch this if you don't know what you are doing
createRoot(document.getElementById('root')).render(
  // Strict mode has a quirk of duplicating console.log logs
  // This forces the use of newer js technologies
  <StrictMode>
    <App />
  </StrictMode>,
)
