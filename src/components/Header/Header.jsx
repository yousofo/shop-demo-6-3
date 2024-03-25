import React, { useContext } from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { allData } from '../../App';
const Header = () => {
  const { appData, setAppData } = useContext(allData);
  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("currentUser")
    setAppData({ ...appData, user: null })
    navigate("/")
  }
  return (
    <header className='sticky z-20 top-0 bg-white shadow'>
      <p className="w-full top-offer bg-yDark text-white text-center py-2 text-xs">
        Free shipping globally with high insurance!
      </p>
      <nav className='container flex justify-between m-auto py-3.5 items-center font-bold text-yDark '>
        <Link to="/" className="icon flex items-center justify-center gap-0.5 px-2">
          <span className='w-5 xs:w-6'>
            <svg className='logo' xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="25" viewBox="0 0 256 256" xmlSpace="preserve">
              {/* <defs> */}
              {/* </defs> */}
              <g style={{ stroke: "none", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                <path d="M 81.63 60.863 H 8.37 c -1.433 0 -2.595 -1.162 -2.595 -2.595 V 12.745 c 0 -1.615 1.309 -2.924 2.924 -2.924 h 72.601 c 1.615 0 2.924 1.309 2.924 2.924 v 45.523 C 84.225 59.701 83.063 60.863 81.63 60.863 z M 10.654 55.983 h 68.691 V 14.7 H 10.654 V 55.983 z" style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "var(--yDark)", fillRule: "nonzero", opacity: "1" }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                <path d="M 89.762 75.346 L 85.1 63.152 c -0.527 -1.379 -1.85 -2.29 -3.327 -2.29 H 8.226 c -1.476 0 -2.8 0.911 -3.327 2.29 L 0.238 75.346 c -0.891 2.332 0.83 4.833 3.327 4.833 h 82.87 C 88.931 80.179 90.653 77.678 89.762 75.346 z M 35.016 74.774 l 1.62 -3.81 c 0.156 -0.368 0.517 -0.607 0.917 -0.607 h 14.893 c 0.4 0 0.761 0.239 0.917 0.607 l 1.62 3.81 c 0.279 0.657 -0.203 1.387 -0.917 1.387 H 35.934 C 35.219 76.161 34.737 75.432 35.016 74.774 z" style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "var(--yDark)", fillRule: "nonzero", opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
              </g>
            </svg>
          </span>
          <h3 className='italic text-lg xs:text-2xl'>
            TopLap
          </h3>
        </Link>
        <ul className={`flex xs:gap-4 text-sm ${appData.user && "hidden"}`}>
          <li>
            <Link to="/login" className='nav-link p-2'><span>LOGIN</span></Link>
          </li>
          <li>
            <Link to="/register" className='nav-link p-2'><span>REGISTER</span></Link>
          </li>
        </ul>
        <ul className={`flex sm:gap-4 items-center text-[11px] xs:text-sm ${!appData.user && "hidden"}`}>
          <li>
            <button className='nav-link p-1 xs:p-2 uppercase cursor-auto'><span>{appData.user?.name}</span></button>
          </li>
          <li>
            <Link to="/cart" className='nav-link p-1 xs:p-2 block cart-icon relative'>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="25" viewBox="0 0 19 25">
                <path fill="#24272a" d="M16.77 22.11H2.01V7.94h14.76zM6.58 5.19a2.61 2.61 0 0 1 2.61-2.61h.4a2.61 2.61 0 0 1 2.61 2.61v1.26H6.58zm10.94 1.26h-3.83V5.19a4.11 4.11 0 0 0-4.1-4.1h-.4a4.11 4.11 0 0 0-4.1 4.1v1.26H1.3a.75.75 0 0 0-.74.75v15.67a.74.74 0 0 0 .74.74h16.26a.74.74 0 0 0 .74-.74V7.2a.75.75 0 0 0-.78-.75z"></path>
                <path fill="none" stroke="#fff" strokeMiterlimit="20" strokeWidth=".15" d="M16.77 22.11H2.01V7.94h14.76zM6.58 5.19a2.61 2.61 0 0 1 2.61-2.61h.4a2.61 2.61 0 0 1 2.61 2.61v1.26H6.58zm10.94 1.26h-3.83V5.19a4.11 4.11 0 0 0-4.1-4.1h-.4a4.11 4.11 0 0 0-4.1 4.1v1.26H1.3a.75.75 0 0 0-.74.75v15.67a.74.74 0 0 0 .74.74h16.26a.74.74 0 0 0 .74-.74V7.2a.75.75 0 0 0-.78-.75z"></path>
              </svg>
              <span className='absolute h-fit pt-2 text-green-600 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                {appData.cart.length}
              </span>
            </Link>
          </li>
          <li>
            <Link to="favourites" className='nav-link p-1 xs:p-2 text-yDark uppercase inline-block h-fit'><span>Favorites</span></Link>
          </li>
          <li className='relative'>
            <span className='absolute left-0 top-0 bg-yDark h-full w-[1px]'></span>
            <button onClick={logOut} className='nav-link p-1 xs:p-2 sm:ps-4 text-red-500 text-[11px]'><span>LOG OUT</span></button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header