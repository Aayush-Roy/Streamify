
import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../store/reducers/appreducer';
import { API_KEY, YOUTUBE_SEARCH_API } from '../utils/Constraints';

function Head() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const[searchSuggestion, setSearchSuggestion] = useState(false)
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getYouTubeSearchResults = async (query) => {
    try {
      const response = await fetch(
        `${YOUTUBE_SEARCH_API}?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        // Extract all titles as suggestions
        const titles = data.items.map(item => item.snippet.title);
        setSuggestions(titles);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        getYouTubeSearchResults(searchQuery);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <>
      <div className='grid grid-flow-col p-3 m-2 sticky'>
        <div className='flex col-span-1 gap-4 items-center'>
          <span
            onClick={toggleMenuHandler}
            className='text-2xl cursor-pointer'><RxHamburgerMenu /></span>
          <img className='h-5' src='https://tse4.mm.bing.net/th?id=OIP.xxNZm92rz6ZHHChoF2zZSAHaBp&pid=Api&P=0&h=180' alt="" />
        </div>
        <div className='flex w-1/2 mx-auto items-center col-span-10'>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-l-full border border-zinc-400 outline-none px-3 py-1'
            type="text"
            onFocus={()=>setSearchSuggestion(true)}
            onBlur={()=>setSearchSuggestion(false)}
          />
          <button className='text-2xl rounded-r-full border px-3 py-[4.5px] bg-zinc-200'><CiSearch /></button>
        </div>
        <div className='text-3xl col-span-1'>
          <FaUserCircle />
        </div>
      </div>
      {searchSuggestion && searchQuery && suggestions.length > 0 ? (
        <div className='absolute h-[50vh] overflow-hidden overflow-y-auto shadow-lg bg-white rounded-lg border-zinc-200 top-[8%] py-2 ml-[35%] w-[32rem]'>
          <div>
            { suggestions.map((title, index) => (
              <div key={index} className='flex items-center px-5 cursor-pointer py-2 hover:bg-zinc-100 gap-3'>
                <CiSearch /> <p>{title && title.length > 40 ? title.slice(0, 40) + '...' : title}</p>

              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Head;
