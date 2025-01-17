import {Routes, Route, Navigate} from 'react-router-dom'
// import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Menu from './pages/Menu/Menu'
import Deliveries from './pages/Deliveries/Deliveries'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-cotent"> 
        <Sidebar/>
        <Routes>
          {/* <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> */}
          {/* implement route guards in other routes also */}
          <Route path="/login" element={<Login url={url}/>} />
          <Route path="/menu" element={<Menu url={url}/>} />
          <Route path="/deliveries" element={<Deliveries url={url}/>} />
          <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
      </div>
    </div>
  )
}

export default App
