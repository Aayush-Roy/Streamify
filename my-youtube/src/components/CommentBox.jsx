import { AiOutlineLike } from "react-icons/ai";
import React, { useEffect, useState } from 'react';

function CommentBox({ videoId }) {
    const API_KEY = "AIzaSyBz1IaysMIW4MHPGAx1cgh71MhlzutHV08";
    const [details, setDetails] = useState([]);
    const [comments, setComments] = useState([]); // State to hold extracted comments
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=70`;

    useEffect(() => {
        getComments();
    }, [videoId]); // Add videoId to the dependency array

    const getComments = async () => {
        try {
            let response = await fetch(url);
            let data = await response.json();
            console.log(data);
            setDetails(data.items);
            extractComments(data.items); // Extract comments after setting details
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // Function to extract comments
    const extractComments = (items) => {
        const extractedComments = items.map((item) => {
            const commentSnippet = item.snippet.topLevelComment.snippet;
            return {
                author: commentSnippet.authorDisplayName,
                text: commentSnippet.textDisplay,
                likes: commentSnippet.likeCount,
                publishedAt: commentSnippet.publishedAt,
                authorProfileImage: commentSnippet.authorProfileImageUrl,
            };
        });
        setComments(extractedComments); // Set extracted comments to state
    };

    // Log extracted comments
    console.log(comments);

    return (
        <div>
          <h1 className="text-2xl font-bold">{comments && comments.length} comments</h1>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div  key={index} className="mt-4 comment">
                        <div className='flex items-center gap-4'>
                        <img 
    className='rounded-full' 
    src={comment.authorProfileImage ? comment.authorProfileImage : "https://tse3.mm.bing.net/th?id=OIP.yQQfPxRKgHhquAWlnbYciQHaHx&pid=Api&P=0&h=180"} 
    alt={comment.author} 
    width="48" 
    height="48" 
/>
                        <div>
                            <strong>{comment.author}</strong>
                            <p>{comment.text}</p>
                            <p className="flex items-center gap-2"><AiOutlineLike/> {comment.likes} | Published: {new Date(comment.publishedAt).toLocaleString()}</p>
                        </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    );
}

export default CommentBox;
