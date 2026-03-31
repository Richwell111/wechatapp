import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ChatPage from './pages/ChatPage'
import { Toaster } from 'react-hot-toast'
import { authClient } from './lib/auth-client'
import ProtectedRoutes from './components/layout/ProtectedRoutes'

function App() {
  const {data:session}=authClient.useSession()
  return (
    <div className='bg-[url("./assets/images/background.png")] bg-cover bg-center bg-no-repeat'>
      <Toaster />
      <Routes>
        <Route path="/" element={session? <Navigate to="/chat" /> : <LoginPage />} />  
        <Route path="/register" element={session? <Navigate to="/chat" /> : <RegisterPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoutes>
              <ChatPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  )
}

export default App
