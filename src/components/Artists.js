import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Artists() {
  // Store the list of artists
  const [artists, setArtists] = useState([]);

  // Fetch the artists data when the component loads
  useEffect(() => {
    axios.get('http://localhost:3001/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  // Create a flat array of all artwork images
  // Note: This might not work as intended if you want to display a specific image per artist
  const artImages = artists.flatMap(artist => 
    artist.portfolio.map(artwork => artwork.imageUrl)
  );
  
  return (
    <div className="artists">
      <h1>Featured Artists</h1>
      <div className="artist-grid">
        {artists.map(artist => (
          <div key={artist.id} className="artist-tile">
            {/* This will display all art images for each artist, which might not be what you want */}
            <img src={artImages} alt={artist.name} />
            <h3><Link to={`/artists/${artist.id}`}>{artist.name}</Link></h3>
            <p>{artist.genre}</p>
            {/* Display a truncated version of the artist's bio */}
            <p>{artist.bio.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artists;