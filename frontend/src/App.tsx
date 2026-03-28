import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <div className='bg-[url("./assets/images/background.png")] bg-cover bg-center bg-no-repeat'>
      <Routes>
        <Route path="/" element={<LoginPage />} />  
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App
