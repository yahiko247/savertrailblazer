import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PostProvider } from './contextprovider/PostContext.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './contextprovider/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <PostProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </PostProvider>
  </AuthProvider>
 
)
