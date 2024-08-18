import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Exhibitions() {
 // Store our exhibitions and artists data
  const [exhibitions, setExhibitions] = useState([]);
  const [artists, setArtists] = useState([]);
//get both the exhibitions and the artists data 
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/exhibitions'),
      axios.get('http://localhost:3001/artists')
    ]).then(([exhibitionsRes, artistsRes]) => {
      setExhibitions(exhibitionsRes.data);
      setArtists(artistsRes.data);
    }).catch(error => console.error('Error fetching data:', error));
  }, []);
 // function to get artwork details including artist name
  const getArtworkDetails = (artworkId) => {
    // Flatten the portfolios into a single array and find the artwork
    const foundArtwork = artists
      .flatMap(artist => artist.portfolio || [])
      .find(artwork => artwork.id === artworkId);
    
    // Return the artwork details with the artist's name if found
    return foundArtwork ? {
      ...foundArtwork,
      artistName: artists.find(artist => artist.portfolio.includes(foundArtwork)).name
    } : null;
  };
  
// Render the exhibitions list
  return (
    <div className="exhibitions">
      <h1>Virtual Exhibitions</h1>
      {exhibitions.map(exhibition => (
        <div key={exhibition.id} className="exhibition">
          <h2><Link to={`/exhibitions/${exhibition.id}`}>{exhibition.title}</Link></h2>
          <p>{exhibition.description}</p>
          <p>Dates: {exhibition.startDate} to {exhibition.endDate}</p>
          <h3>Artworks in this exhibition:</h3>
          <div className="exhibition-artworks">
            {exhibition.artworkIds && exhibition.artworkIds.length > 0 ? (
              exhibition.artworkIds.map(artworkId => {
                const artwork = getArtworkDetails(artworkId);
                return artwork ? (
                  <div key={artworkId} className="artwork-preview">
                    <img src={artwork.imageUrl} alt={artwork.title} style={{width: '200px', height: 'auto'}} />
                    <h4>{artwork.title}</h4>
                    <p>By: {artwork.artistName}</p>
                    <p>{artwork.description}</p>
                    <p>Price: ${artwork.price}</p>
                  </div>
                ) : null;
              })
            ) : (
              <p>No artworks in this exhibition</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Exhibitions;