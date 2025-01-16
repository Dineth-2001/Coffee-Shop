import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Menu from './pages/Menu/Menu'
import Deliveries from './pages/Deliveries/Deliveries'
import Login from './pages/Login/Login'

function App() {
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="app-cotent">
        <Sidebar/>
        <Routes>
          {/* <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> */}
          {/* implement route guards in other routes also */}
          {/* <Route path="/" element={<Login/>} /> */}
          <Route path="/menu" element={<Menu/>} />
          <Route path="/deliveries" element={<Deliveries />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
