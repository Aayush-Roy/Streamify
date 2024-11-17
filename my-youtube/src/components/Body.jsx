import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom';
function Body() {
  return (
    <div className='flex '>
      <Sidebar/>
      {/* <MainContainer/> */}
      <Outlet/>
    </div>
  )
}

export default Body
