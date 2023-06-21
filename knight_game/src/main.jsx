import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App'
import { App } from './components/App'//imported child file
import './styles/index.css'
//archivo padre
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />{/* the son added on stage */}
  </React.StrictMode>,
)
