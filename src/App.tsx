import { Navigate, Route, Routes } from 'react-router-dom'
import './styles/globals.css'
import Home from './components/pages/Home'
import NavBar from './components/nav-bar/NavBar'
import BackgroundImage from './assets/Background.png';
import RafflePage from './components/pages/Raffle';
import AdminPage from './components/pages/Admin';
import NFTs from './components/pages/NFTs';


function App() {

  return (
        <main className='min-h-screen bg-cover bg-no-repeat overflow-hidden' style={{ backgroundImage: `url(${BackgroundImage})` }}>
          <NavBar/>
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/home" element={<Home />} />
          <Route path="/raffle" element={<RafflePage />} />
          <Route path="/raffle-admin" element={<AdminPage />} />
          <Route path="/nfts" element={<NFTs />} />



        </Routes>
        </main>
  )
}

export default App
