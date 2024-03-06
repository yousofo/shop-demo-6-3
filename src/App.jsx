import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { createContext, useState } from "react"
import Cart from "./pages/Cart/Cart"
import ItemPreview from "./pages/ItemPreview/ItemPreview"
import Footer from "./components/Footer/Footer"
import Favourites from "./pages/Favourites/Favourites"

export const allData = createContext(null);
export const detailsContext = createContext(null);

const initial = {
  user: JSON.parse(localStorage.getItem("currentUser")),
  cart: (JSON.parse(localStorage.getItem("cart")) || []),
  favourites: (JSON.parse(localStorage.getItem("favourites")) || []),
}

function App() {
  const [appData, setAppData] = useState(initial);
  const [details, setDetails] = useState(null);
  return (
    <BrowserRouter>
      <allData.Provider value={{ appData, setAppData }}>
        <detailsContext.Provider value={{ details, setDetails }}>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/details" element={<ItemPreview />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="*" element={<main className="p-10 text-center">page not found</main>} />
          </Routes>
          <Footer />
        </detailsContext.Provider>
      </allData.Provider>
    </BrowserRouter>
  )
}

export default App
