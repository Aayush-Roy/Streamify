import React from 'react'

function Button({name}) {
  return (
    <div className=''>
      <button className='px-5 py-[3px] bg-gray-200 rounded cursor-pointer'>{name}</button>
    </div>
  )
}

export default Button
