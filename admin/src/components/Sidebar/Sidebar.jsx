import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='./menu' className="sidebar-option">
          <p>Menu</p>
        </NavLink>
        <NavLink to='./deliveries' className="sidebar-option">
          <p>Deliveries</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
