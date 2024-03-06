import React, { useContext, useState } from 'react'
import { allData, detailsContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const Item = ({ data }) => {
  const { appData, setAppData } = useContext(allData)
  const { setDetails } = useContext(detailsContext)
  let navigate = useNavigate()
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? [])
  const [inCart, setInCart] = useState(cart.find(e => e.id == data.id) ? true : false)

  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) ?? [])
  const [inFavourites, setInFavourites] = useState(favourites.find(e => e.id == data.id) ? true : false)

  function HandleClick(ev) {
    let currentCart = JSON.parse(localStorage.getItem("cart")) ?? []
    if (currentCart.find(e => e.id == data.id)) {
      currentCart = currentCart.filter((e => e.id != data.id))
      setInCart(false)
    } else {
      currentCart.push(data)
      setInCart(true)
    }

    localStorage.setItem("cart", JSON.stringify(currentCart))
    setAppData({...appData, cart: currentCart})
    setCart(currentCart)
  }
  function HandleFavourite(ev) {
    let currentFavourites = JSON.parse(localStorage.getItem("favourites")) ?? []
    if (currentFavourites.find(e => e.id == data.id)) {
      currentFavourites = currentFavourites.filter((e => e.id != data.id))
      setInFavourites(false)
    } else {
      currentFavourites.push(data)
      setInFavourites(true)
    }

    localStorage.setItem("favourites", JSON.stringify(currentFavourites))
    setFavourites(currentFavourites)
  }

  function showDetails() {
    setDetails(data)
    navigate("details")
  }
  return (
    <figure className='w-full xs:w-1/2 border-b py-5 lg:w-1/3 xl:w-1/4 xs:border xs:p-2 sm:p-5 relative flex flex-col max-h-[550px]'>

      <img onClick={showDetails} className='w-full max-w-40 m-auto cursor-pointer' src={data.img} alt="" />
      <span className='absolute -top-2 right-0 origin-bottom-right -rotate-90 font-bold text-sm text-yDark '>{data.brand}</span>
      <figcaption className='flex flex-col gap-5 flex-1'>
        <div className='flex flex-col gap-5 flex-1'>
          <div>
            <h3 className='text-center text-lg sm:text-2xl text-yCyan'>{data.name}</h3>
            <div className='text-center  gap-1'>
              <p className=' text-yDark'><span className='text-xs'>$</span>{data.price}</p>

              {
                appData.user &&
                <button onClick={HandleFavourite} className={`rounded-full p-1.5 bg-slate-200 border-0 inline-flex items-center justify-center transition-all  hover:text-red-500 ${inFavourites ? "text-red-500" : "text-gray-500"} `}>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="pointer-events-none w-4 h-4" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              }
            </div>
          </div>
          <ul className='text-xs font-semibold sm:font-normal sm:text-sm lg:text-base flex flex-col gap-2 text-yDark'>
            {
              data.info.map((e, i) => <li key={`home-item-${data.id}-${i}`} className='flex gap-1.5'>&bull;<span>{e}</span></li>)
            }
          </ul>
        </div>
        {
          appData.user &&
          <button onClick={HandleClick} className={` text-white px-4 mt-2 self-end w-fit py-1 uppercase rounded m-auto ${inCart ? "bg-red-500" : "bg-yCyan"}`}>{inCart ? "Remove" : "Add to Cart"}</button>
        }
      </figcaption>
    </figure>
  )
}

export default Item