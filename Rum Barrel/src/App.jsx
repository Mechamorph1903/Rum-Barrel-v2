import { useState } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
        <div id='landingPage'>
          <div className='sideMenu'>
            <h1>Rum Barrel🍻</h1>
            <ul>
              <li className='navBlist'>
                <Link className='navButton' to="/home">Home🏡</Link>
              </li>
              <li className='navBlist'>
                <Link className='navButton' to="/search">Search 🔍</Link>
              </li>
              <li className='navBlist'>
                <Link className='navButton' to="/about">About ℹ️</Link>
              </li>
            </ul>
          </div>

          <Outlet />

        </div>
    </>
  )
}

export default App
