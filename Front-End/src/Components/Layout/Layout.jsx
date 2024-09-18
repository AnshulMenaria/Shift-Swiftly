import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../Modules/Header.jsx';
import Footer from '../Modules/Footer.jsx';
import '../Modules/Footer.jsx';

const Layout = () => {
  return (
    <>
        <div>
          <div className="app-container">
            <Header />
              <div className="main-content">
                <Outlet/>
              </div>
              <Footer />
          </div>
        </div>
    </>
  )
}

export default Layout