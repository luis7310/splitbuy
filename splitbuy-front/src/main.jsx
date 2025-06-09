import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Log from './assets/rutas/login.jsx'
import RegistrarUsers from './assets/rutas/registroUsers.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
   {
    path: '/',
    element: <App />,
   },
    {
    path: '/login',
    element: <Log />,
   },
     {
    path: '/singin',
    element: <RegistrarUsers />,
   },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
