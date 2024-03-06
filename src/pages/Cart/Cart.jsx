import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { allData } from '../../App'

const Cart = () => {
  const navigate = useNavigate()
  let alertRef = useRef(null)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [])
  const { appData, setAppData } = useContext(allData)

  useEffect(() => {
    const total = cart?.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    console.log(total)
    setTotal(total)
  }, [cart])
  useEffect(() => {
    setCart(JSON.parse(window.localStorage.getItem("cart")))
  }, [])

  const handleInc = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setAppData({ ...appData, cart: updatedCart })
    setCart(updatedCart)
  }
  const removeProduct = (id) => {
    let updatedCart = cart.filter(item => item.id != id)
    window.localStorage.setItem('cart', JSON.stringify(updatedCart))
    setAppData({ ...appData, cart: updatedCart })
    setCart(updatedCart)
  }
  const handleDec = (id) => {
    let deleteItem = false;
    let updatedCart = cart.map(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        } else {
          deleteItem = true
        }
      }
      return item
    })
    if (deleteItem) {
      removeProduct(id)
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      setAppData({ ...appData, cart: updatedCart })
      setCart(updatedCart)
    }
  }
  function Buy() {
    // alertRef.current.style.opacity="0"
    // alertRef.current.style.transition="opacity 14s 0"
    localStorage.removeItem('cart')
    alertRef.current.style.translate = "0 170px"
    setAppData({ ...appData, cart: [] })
  }
  if (!appData.user) {
    return <main className='container px-2 m-auto text-center'>log in first</main>
  }
  if (cart?.length === 0 || cart === null) {
    return <main className=' h-[55vh] flex justify-center items-center text-4xl '>Cart is Empty</main>
  }

  return (
    <div className="container mx-auto mt-10">
      <div ref={alertRef} className='fixed left-0 -top-16 w-full transition-all'>
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          Payment completed successfully.
        </div>
      </div>
      <div className="flex flex-col md:flex-row shadow-md my-10">
        <div className="bg-white flex-1 p-4 sm:p-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cart?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5 sm:w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs hidden sm:block uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {
            cart?.map((e, i) => {
              return (
                <div key={i} className="flex items-center hover:bg-gray-100 py-4">
                  <div className="flex w-3/5 sm:w-2/5 justify-between gap-2">
                    <div className="w-20 h-24">
                      <img className="w-full h-full object-cover" src={e?.img} alt={e?.title} />
                    </div>
                    <div className="flex flex-col w-min justify-center gap-4 flex-grow">
                      <span className="font-bold text-xs text-yDark">{e?.name}</span>
                      <div className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer" onClick={() => removeProduct(e?.id)}>Remove</div>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={() => handleDec(e?.id)}><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <span className="mx-2 border text-center w-8" type="text">{e?.quantity}</span>

                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(e?.id)} viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold hidden sm:block text-sm">${e?.price}</span>
                  <span className="text-center w-1/5 font-semibold text-sm">${e?.price * e?.quantity}</span>
                </div>
              )
            })
          }

          <Link to={'/'} className="flex font-semibold text-yCyan text-sm mt-10">

            <svg className="fill-current mr-2 text-yCyan w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase"><span className='text-xs'>Items</span>: {cart?.length}</span>
            <span className="font-semibold text-sm">{total?.toFixed(2)}$</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
              <option>Premium shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${(total + 10).toFixed(2)}</span>
            </div>
            <button onClick={Buy} className="bg-yCyan font-semibold  py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart