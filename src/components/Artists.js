import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Artists() {
  const [artists, setArtists] = useState([]);
// use the axios useeffect hook to get data 
  useEffect(() => {
    axios.get('http://localhost:3001/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);
  const artImages = artists.flatMap(artist => 
    artist.portfolio.map(artwork => artwork.imageUrl)
  );
  
  return (
    <div className="artists">
      <h1>Featured Artists</h1>
      <div className="artist-grid">
        {artists.map(artist => (
          <div key={artist.id} className="artist-tile">
            <img src={artImages} alt={artist.name} />
            <h3><Link to={`/artists/${artist.id}`}>{artist.name}</Link></h3>
            <p>{artist.genre}</p>
            <p>{artist.bio.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artists;