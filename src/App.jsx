import { useState } from 'react'
import HomePage from './components/lobby'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import FindDonors from './components/fdonor'
import { DonateBlood } from './components/donateblood'
import RequestBlood from './components/reqblood'
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
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

