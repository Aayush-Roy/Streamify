import React from 'react'
import Button from './Button'

function ButtonList() {
  const list = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "News",
    "Sports",
    "Learning",
    "Movies",
    "Fashion & Beauty",
    "Science & Technology",
    "Comedy",
    
    
  ];
  
  return (
    <div className='flex gap-3 px-5 justify-center'>
      {list.map((l,i)=>(
        <Button key={i} name={l}/>

      ))}
    </div>
  )
}

export default ButtonList
