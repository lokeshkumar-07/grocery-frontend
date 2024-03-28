import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {googleClientId, striprApiKey} from '../config.js'
import { ToastContainer } from 'react-toastify'

const stripePromise = loadStripe(striprApiKey)

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App />
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              bodyClassName="toastBody"
            />
          </Elements>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  </GoogleOAuthProvider>
  
)
