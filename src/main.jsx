import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import ExerciseContextProvider from './components/ExerciseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExerciseContextProvider>
    <Router>
    <App />
    </Router>
    </ExerciseContextProvider>
  </React.StrictMode>,
)
