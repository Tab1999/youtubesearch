

import React, { useState } from "react";
import axios from "axios";
import "./Youtube.css"; 

const YoutubeSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          keyword
        )}&type=video&key=AIzaSyC_EdaaPvkvUZFpGxxhqnigDhDdt59KJrw`
      );
      
      setSearchResults(response.data.items);
      console.log(searchResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="youtube-search-container">
      <h2>YouTube Search</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="Enter keyword"
        />
        <button type="submit">Search</button>
      </form>
      <ul className="video-list">
        {searchResults.map((item) => (
          <li key={item.id.videoId}>
            <a
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.snippet.thumbnails.medium.url}
                alt={item.snippet.title}
              />
              <div className="video-info">
                {/* <h6>{item.thumbnails.channelTitle}</h6> */}
                <p> <button className="play"> Play </button>  {item.snippet.title}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YoutubeSearch;
