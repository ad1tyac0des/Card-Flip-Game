import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GameContextProvider from './context/GameContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <GameContextProvider>
    <App />
  </GameContextProvider>
)
