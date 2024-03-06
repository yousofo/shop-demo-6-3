import React, { useContext, useEffect, useState } from 'react'
import { allData } from '../../App'
import Item from '../../components/Item/Item'


const Favourites = () => {
  const { appData } = useContext(allData)
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || [])

  if(!appData.user){
    return <main className='container px-2 m-auto text-center'>log in first</main>
  }
  return (
    <main className='container px-2 flex flex-wrap m-auto'>
      {
        favourites.length > 0 ?
          favourites.map((e, i) => <Item key={`favs-item-${i}`} data={e} />)
          :
          <p className='text-center'>No favourites added yet.</p>
      }
    </main>
  )
}

export default Favourites