import React, { useEffect, useState } from 'react';

function LiveChat({ videoId }) {
    const API_KEY = "AIzaSyBz1IaysMIW4MHPGAx1cgh71MhlzutHV08";
    const [liveChatId, setLiveChatId] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLiveChatId = async () => {
            try {
                const url = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                const id = data.items[0]?.liveStreamingDetails?.liveChatId;

                if (id) {
                    setLiveChatId(id);
                } else {
                    setError('Live chat not available.');
                }
            } catch (err) {
                setError('Error fetching live chat ID.');
                console.error(err);
            }
        };

        fetchLiveChatId();
    }, [videoId, API_KEY]);

    useEffect(() => {
        if (liveChatId) {
            const interval = setInterval(async () => {
                try {
                    const url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${API_KEY}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setMessages(data.items);
                } catch (err) {
                    setError('Error fetching live chat messages.');
                    console.error(err);
                }
            }, 5000); // Fetch new messages every 5 seconds

            return () => clearInterval(interval); // Clean up the interval on component unmount
        }
    }, [liveChatId, API_KEY]);

    return (
        <div className="live-chat">
            <h3>Live Chat</h3>
            {error && <p className="error">{error}</p>}
            <div className="chat-box">
                {messages && messages.map((msg, index) => (
                    <div key={index} className="message">
                        <img
                            className="rounded-full"
                            src={msg.authorDetails.profileImageUrl || "https://tse3.mm.bing.net/th?id=OIP.yQQfPxRKgHhquAWlnbYciQHaHx&pid=Api&P=0&h=180"}
                            alt={msg.authorDetails.displayName}
                            width="48"
                            height="48"
                        />
                        <strong>{msg.authorDetails.displayName}:</strong>
                        <p>{msg.snippet.displayMessage}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LiveChat;
