import React from 'react'
import { HiHome } from "react-icons/hi2";
import { SiYoutubeshorts } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdPodcasts } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { HiSignal } from "react-icons/hi2";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { SiYoutubegaming } from "react-icons/si";
import { IoMusicalNotes } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { ImNewspaper } from "react-icons/im";
import { FaFire } from "react-icons/fa6";
import { useSelector } from 'react-redux';
function Sidebar() {
  const {isMenuOpen} = useSelector(state=>state.app)
  console.log(isMenuOpen)
  if(!isMenuOpen) return null;
  return   (
    <div className='p-5  shadow-md w-60  '>
     <ul className='text-xl '>
      <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><HiHome/> </span><p>Home</p></li>
      <li className=' hover:bg-zinc-300 p-2 rounded-md  mt-2 flex items-center gap-1'><span><SiYoutubeshorts/> </span><p>Shorts</p></li>
      <li className=' hover:bg-zinc-300 p-2 rounded-md  mt-2 flex items-center gap-1'><span><MdSubscriptions/> </span><p>Subscriptions</p></li>
     </ul>
     <hr className='my-2'/>
     <ul className='text-xl'>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><FaHistory/> </span><p>History</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><RiPlayListAddFill/> </span><p>PlayList</p></li>
     {/* </ul>
     <ul> */}
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><BiSolidVideos/> </span><p>Your Videos</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><MdOutlineWatchLater/> </span><p>Watch Later</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><AiOutlineLike/> </span><p>Liked Videos</p></li>
     </ul>
     <hr className='my-2' />
     <ul className='text-xl'>
      <h1 className='my-2 text-xl font-semibold'>Explore</h1>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><FaFire/> </span><p>Trending</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><RiShoppingBag4Fill/> </span><p>Shoping</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><IoMusicalNotes/> </span><p>Music</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><SiYoutubegaming/> </span><p>Gaming</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><HiSignal/> </span><p>Live</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><ImNewspaper/> </span><p>News</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><GoTrophy/> </span><p>Sports</p></li>
     <li className=' hover:bg-zinc-300 p-2 duration-300 rounded-md  flex items-center gap-1'><span><MdPodcasts/> </span><p>Podcast</p></li>
     </ul>
    </div>
  )
}

export default Sidebar
