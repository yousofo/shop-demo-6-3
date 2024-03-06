import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, json, useLocation, useNavigate } from 'react-router-dom'
import "./Authentication.css"
import { allData } from '../../App';

const Authentication = () => {
  const noErrors = { name: "", nameError: "", mail: "", mailError: "", password: "", passwordError: "" }
  const [errorStatus, setErrorStatus] = useState(noErrors);
  const [users, setUsers] = useState(JSON.parse(window.localStorage.getItem("users")) ?? [])
  const { appData, setAppData } = useContext(allData)
  let navigate = useNavigate()
  const loc = useLocation()

  useEffect(() => {
    if (appData.user) {
      alert("you are already signed in! sign out first haha")
      navigate("/")
    }
  })
  console.log(appData.user)


  let nameRef = useRef(null)
  let mailRef = useRef(null)
  let passwordRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault();
    setErrorStatus(noErrors)

    if (loc.pathname == "/register") {
      if (nameRef.current.value.length < 3 || /\d/.test(nameRef.current.value)) {
        setErrorStatus(e => ({ ...e, nameError: "Name must be atleast 3 letters long and without numbers." }))
        return;
      } else if (users.find(e => e.mail == mailRef.current.value)) {
        setErrorStatus(e => ({ ...e, mailError: "Email address already in use." }))
        return;
      } else {
        let user = {
          name: nameRef.current.value,
          mail: mailRef.current.value,
          password: passwordRef.current.value,
        }
        window.localStorage.setItem("users", JSON.stringify([...users, user]))
        navigate("/login")
      }
    } else {
      let user = users.find(e => e.mail == mailRef.current.value)
      if (user) {
        if (user.password == passwordRef.current.value) {
          window.localStorage.setItem("currentUser", JSON.stringify(user))
          setAppData({...appData, user:user})
          navigate("/")
        } else {
          setErrorStatus(e => ({ ...e, passwordError: "Incorrect password, try gain." }))
        }
      } else {
        setErrorStatus(e => ({ ...e, mailError: "Mail address not found." }))
      }
    }
  }

  return (
    <div className='auth h-max text-yDark w-full max-w-[350px] m-auto text-center flex flex-col py-20 px-3 gap-6'>
      <h2 className='text-5xl font-semibold'>Hello</h2>
      <nav className='w-full '>
        <ul className='flex text-lg font-bold w-full'>
          <li className='w-1/2'><NavLink className="py-3 block border border-black border-opacity-30" to="/login">LOG IN</NavLink></li>
          <li className='w-1/2'><NavLink className="py-3 block border border-black border-opacity-30" to="/register">REGISTER</NavLink></li>
        </ul>
      </nav>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {
          loc.pathname == "/register" ?
            <div className="input-con email-input relative border-b-black border-opacity-40 border-b   transition-all">
              <input required ref={nameRef} type="text" className='w-full focus:outline-none py-3' placeholder="" />
              <span className="email-placeholder opacity-80 absolute left-0 top-1/2 -translate-y-1/2 transition-all pointer-events-none">Name</span>
              <p className='text-xs text-red-600 text-start' name="nameError">{errorStatus.nameError}</p>
            </div>
            : ""
        }

        <div className="input-con email-input relative border-b-black border-opacity-30 border-b  transition-all">
          <input required ref={mailRef} type="email" className='w-full focus:outline-none  py-3' placeholder="" />
          <span className="email-placeholder opacity-80 absolute left-0 top-1/2 -translate-y-1/2 transition-all pointer-events-none">Email address</span>
          <p className='text-xs text-red-600 text-start' name="nameError">{errorStatus.mailError}</p>
        </div>

        <div className="input-con email-input relative border-b-black border-opacity-30 border-b   transition-all">
          <input required ref={passwordRef} type="password" className='w-full focus:outline-none py-3' placeholder="" />
          <span className="email-placeholder opacity-80 absolute left-0 top-1/2 -translate-y-1/2 transition-all pointer-events-none">Password</span>
          <p className='text-xs text-red-600 text-start' name="nameError">{errorStatus.passwordError}</p>
        </div>

        <button type='submit' className='w-full bg-yDark text-white text-2xl py-3'>{loc.pathname == "/register" ? "Register" : "Login"}</button>
      </form>
    </div>
  )
}

export default Authentication