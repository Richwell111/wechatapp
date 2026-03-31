import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ChatPage from './pages/ChatPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='bg-[url("./assets/images/background.png")] bg-cover bg-center bg-no-repeat'>
      <Toaster />
      <Routes>
        <Route path="/" element={<LoginPage />} />  
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App
