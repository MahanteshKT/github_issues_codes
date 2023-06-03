import React from 'react'
import "./Header.css"
import logo from "../logo.png"
function Header() {
  return (
    <div className='navbar'>
        
        <div className='navbar-container'>
            <div className='logo'> 
                  <img src={logo} alt="git"/>
                  <span>GitHub</span>
            </div>

            <div className='nav-list'> 
              <ul>
                <li><a href="#">Pull request</a></li>
                <li><a href="#">Issues</a></li>
                <li><a href="#">Codespaces</a></li>
                <li><a href="#">MarketPlace</a></li>
              </ul>      
            </div>
        </div>
        
    </div>
  )
}

export default Header
