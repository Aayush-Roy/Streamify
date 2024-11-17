import React, { useEffect, useState } from 'react'
import { API_URL } from '../utils/Constraints';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

function VideoContainer() {
  const[videos,setvideos] = useState()
  useEffect(()=>{
    getvideos();
  },[])

  const getvideos = async() =>
  {
    const data = await fetch(API_URL);
    const json = await data.json();
    console.log(json);
    setvideos(json.items)
  }

  

  console.log(videos && videos);
  return (
    <div className='flex flex-wrap ml-12'>
      {/* <AdVideo info={videos && videos[0]}/> */}
      {videos && videos.map((video)=>(
      <Link key={video.id} to={`/watch?q=${video.id}`}> <VideoCard key={video.id} info={video}/></Link>
      ))}
    </div>
  )
}

export default VideoContainer
