import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allData, detailsContext } from "../../App";
import Item from "../../components/Item/Item";


export default function ItemPreview() {
  const { details } = useContext(detailsContext);
  const { appData } = useContext(allData);
  let data = JSON.parse(window.localStorage.getItem("cart")) || []
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? [])
  const [inCart, setInCart] = useState(cart.find(e => e.id == data.id) ? true : false)

  let navigate = useNavigate();
  useEffect(() => {
    if (!details) {
      navigate("/")
    }
  }, [])
  

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
    setCart(currentCart)
  }

  return (
    details ?
      <figure className='w-full  py-5 xs:p-2 sm:p-5 relative flex flex-col max-w-[400px] m-auto mt-[10vh]'>

        <img className='w-full max-w-40 m-auto cursor-pointer' src={details.img} alt="" />
        <span className='text-center font-bold text-sm text-yDark '>{details.brand}</span>
        <figcaption className='flex flex-col gap-5 flex-1'>
          <div className='flex flex-col gap-5 flex-1'>
            <div>
              <h3 className='text-center text-lg sm:text-2xl text-yCyan'>{details.name}</h3>
              <p className='text-center text-yDark'><span className='text-xs'>$</span>{details.price}</p>
            </div>
            <ul className='text-xs font-semibold sm:font-normal sm:text-sm lg:text-base flex flex-col gap-2 text-yDark'>
              {
                details.info.map((e, i) => <li key={`home-item-${details.id}-${i}`} className='flex gap-1.5'>&bull;<span>{e}</span></li>)
              }
            </ul>
          </div>
          {
            appData.user &&
            <button onClick={HandleClick} className={` text-white px-4 mt-2 self-end w-fit py-1 uppercase rounded m-auto ${inCart ? "bg-red-500" : "bg-yCyan"}`}>{inCart ? "Remove" : "Add to Cart"}</button>
          }
        </figcaption>
      </figure>
      : <figure className="m-auto w-fit">loading...</figure>
  );
}
