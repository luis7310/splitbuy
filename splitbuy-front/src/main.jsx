import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Log from './assets/rutas/login.jsx'
import RegistrarUsers from './assets/rutas/registroUsers.jsx'
import ProtectedRoute from './assets/rutas/ProtectedRoute.jsx'
import NotFound from './assets/rutas/NotFound.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
    {
    path: '/login',
    element: <Log />,
   },
     {
    path: '/singin',
    element: <RegistrarUsers />,
   },
 {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Navigate to="/home" />
      },
      {
        path: 'home',
        element: <App />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
