import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArtistDetail() {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/artists/${id}`)
      .then(response => setArtist(response.data))
      .catch(error => console.error('Error fetching artist:', error));
  }, [id]);

  const handlePurchaseToggle = (artworkId) => {
    const updatedArtist = {
      ...artist,
      portfolio: artist.portfolio.map(artwork =>
        artwork.id === artworkId ? { ...artwork, purchased: !artwork.purchased } : artwork
      )
    };

    axios.put(`http://localhost:3001/artists/${id}`, updatedArtist)
      .then(response => setArtist(response.data))
      .catch(error => console.error('Error updating artwork:', error));
  };

  if (!artist) return <div>Loading...</div>;

  return (
    <div className="artist-detail">
      <h1>{artist.name}</h1>
      <p>{artist.bio}</p>
      <h2>Genre: {artist.genre}</h2>
      <h2>Artist Statement</h2>
      <p>{artist.statement}</p>
      <h2>Portfolio</h2>
      <div className="portfolio">
        {artist.portfolio.map(artwork => (
          <div key={artwork.id} className="artwork">
            <img src={artwork.imageUrl} alt={artwork.title} style={{width: '250px', height: '300px'}} />
            <h3>{artwork.title}</h3>
            <p>{artwork.description}</p>
            <p>Price: ${artwork.price}</p>
            <button 
              onClick={() => handlePurchaseToggle(artwork.id)} 
              className={artwork.purchased ? 'sold' : 'for-sale'}
            >
              {artwork.purchased ? 'Sold' : 'Purchase'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistDetail;