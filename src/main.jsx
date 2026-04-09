import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import App from './App'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/eating-for-energy">
      <GameProvider>
        <App />
      </GameProvider>
    </BrowserRouter>
  </StrictMode>
)
