import { useState } from 'react'
import HomePage from './components/lobby'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import FindDonors from './components/fdonor'
import { DonateBlood } from './components/donateblood'
import RequestBlood from './components/reqblood'
import Register from './components/register'
import { SignUp } from './components/login'
import { Login } from './components/login'
import Sample from './components/sample'
import Demo from './components/demo'
import DonorSignUp from './components/trial'
import AuthPage from './components/home'
import MHomePage from './components/hmain'
import AdminDashboard from './components/admin/admindb.jsx'
import UserRequest from './components/user_request.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
       <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/finddonor" element={<FindDonors />} />
        <Route path="/donate-blood" element={<DonateBlood />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/donor-signup" element={<DonorSignUp />} />
        <Route path="/donor-login" element={<AuthPage />} />
        <Route path="/mhome" element={<MHomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/UserRequest/:id" element={<UserRequest />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App