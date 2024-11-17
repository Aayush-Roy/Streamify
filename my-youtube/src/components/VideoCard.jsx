import React from 'react'

function VideoCard({info}) {
    
    if (!info) {
        // Return null or a placeholder if `info` is undefined
        return null;
      }
    const {snippet, statistics, channelTitle} = info;
  const {thumbnails,title} = snippet ;
  const formatViewCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count;
  };



  return (
    <div className='w-72 p-2 m-2 cursor-pointer'>
      <img className='rounded-lg overflow-hidden w-full' src={thumbnails.medium.url} alt="" />
      <div>
    <img  alt="" />
      <p className='font-semibold'>{title && title.length>30 ? title.slice(0,60) : title}</p>
      <p className='text-sm font-semibold text-zinc-500'>{snippet.channelTitle && snippet.channelTitle}</p>
      </div>
      
      <p>{formatViewCount(statistics && statistics.viewCount)} views</p>
    </div>
  )
}

// export const AdVideo = ({info})=>{
//   return <div className='p-2 border-2 border-red-900'><VideoCard info={info}/></div>;
// }

export default VideoCard
