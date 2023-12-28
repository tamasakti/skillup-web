import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './route/App.tsx'
import "./styling/index.css"
import { Provider } from 'react-redux'
import store from "./utils/redux/store.js"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  
)
