import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../store/reducers/Appreducer';
import { useSearchParams } from 'react-router-dom';
import CommentBox from './CommentBox';
import LiveChat from './LiveChat';

function WatchPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const API_KEY = "AIzaSyBz1IaysMIW4MHPGAx1cgh71MhlzutHV08";
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('q');

  const [videoDetails, setVideoDetails] = useState({
    title: '',
    description: '',
    channelTitle: '',
    views: '',
    likes: '',
    publishedAt: '',
    tags: []
  });
  const publishedAt = videoDetails.publishedAt ? new Date(videoDetails.publishedAt) : null;

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const { title, description, channelTitle, publishedAt, tags } = data.items[0].snippet;
          const { viewCount: views, likeCount: likes } = data.items[0].statistics;

          setVideoDetails({ title, description, channelTitle, views, likes, publishedAt, tags });
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays >= 365) {
      return `${Math.floor(diffInDays / 365)} years ago`;
    } else if (diffInDays >= 30) {
      return `${Math.floor(diffInDays / 30)} months ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    } else {
      return 'Today';
    }
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count;
  };

  return (
    <div className="px-12 py-8">
      <div className='w-[900px] '>
        <iframe className='rounded-[16px]'
          width="900"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h3 className='text-2xl font-bold'>{videoDetails.title}</h3>
        <p>{videoDetails.channelTitle}</p>
      
        <div className="des p-5 rounded-lg bg-zinc-200 my-5">
          <div className='font-bold flex gap-10'>
            <p>{formatViewCount(videoDetails.views)} views</p>
            <p>{publishedAt ? getTimeAgo(publishedAt) : 'N/A'}</p>
          </div>
          
          <p>Likes: {videoDetails.likes}</p>
          <p>
            {isExpanded 
              ? (
                <>
                  {videoDetails.description}
                  <span onClick={toggleDescription} className="font-bold cursor-pointer text-blue-500"> ...less</span>
                </>
              ) 
              : (
                <>
                  {videoDetails.description.slice(0, 300)}
                  {videoDetails.description.length > 300 && (
                    <span onClick={toggleDescription} className="font-bold cursor-pointer text-black"> ...more</span>
                  )}
                </>
              )}
          </p>
          <p className='text-semibold text-blue-900'>Tags: {videoDetails.tags.join(', ')}</p>
        </div>
        <CommentBox videoId={videoId}/>
      </div>
      <LiveChat/>
    </div>
  );
}

export default WatchPage;
