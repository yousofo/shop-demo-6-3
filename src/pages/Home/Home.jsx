import React, { useEffect, useRef, useState } from 'react'
import Item from '../../components/Item/Item'
// import laps from "../../data.json"
// console.log(laps)

const Home = () => {
  const [products, setProducts] = useState([])
  // console.log(products)
  useEffect(() => {
    fetch("/data.json").then(e => e.json()).then(e=>setProducts(e))
  }, [])

  return (
    <main>
      <div className="intro lg:h-[calc(100vh-240px)] flex flex-col lg:flex-row lg:relative">
        <div className="video hidden xs:block lg:w-1/2 relative">
          <video controls={false} loop autoPlay muted className='h-full w-full object-cover lg:absolute left-0 top-0'>
            <source src="/videos/laptops.mp4" type="video/mp4" />
          </video>
          <div className='absolute w-max max-w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white'>
            <div>
              <h2 className='text-2xl md:text-4xl font-normal leading-[1.5]'>Smarter Technology for All</h2>
              <p className='text-lg md:text-xl'>See how technology transforms the world.</p>
            </div>
            <div>

            </div>
          </div>
        </div>
        <div className="text relative z-10 flex-1 py-10 bg-yPaige text-yDark flex justify-center items-center">
          <div className='max-w-[80%] text-center flex flex-col gap-10 items-center justify-center'>
            <h2 className='text-2xl sm:text-3xl lg:text-5xl font-normal leading-[1.1]'>LAPTOP AS IT<br />SHOULD BE</h2>
            <p className='text-lg'>The perfect business laptop with consistent responsiveness, instant wake, all-day battery life, fast charging and more.</p>
            <a className='bg-yDark py-4 px-7 text-white w-fit font-semibold' href="#productsSection">SHOP NOW</a>
          </div>
        </div>
      </div>
      <div id="productsSection" className="container m-auto px-2 text-center text-yDark pt-20 pb-10 border-b xs:border-none">
        <h2 className='text-2xl md:text-4xl font-semibold mb-6'>On Sale Now</h2>
        <p className='text-xl max-w-[635px] m-auto  leading-normal'>Select products up to 30% off. LEGION and YOGA Laptops will not be restocked until spring 2024. Get yours before they're gone!</p>
      </div>
      <div  className="container px-2 flex flex-wrap m-auto">
        {
          products.map((e, i) => <Item data={e} key={`home-item-${i}`}/>)
        }
      </div>
    </main>
  )
}

export default Home