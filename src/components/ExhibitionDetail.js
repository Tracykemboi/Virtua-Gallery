import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ExhibitionDetail() {
  // Store the exhibition and artwork data
  const [exhibition, setExhibition] = useState(null);
  const [artworks, setArtworks] = useState([]);
  // Get the exhibition id from the URL
  const { id } = useParams();

  // Fetch the exhibition and artwork data when the component loads
  useEffect(() => {
    // We're using Promise.all to fetch both sets of data at once - neat trick!
    Promise.all([
      axios.get(`http://localhost:3001/exhibitions/${id}`),
      axios.get('http://localhost:3001/artworks')
    ]).then(([exhibitionRes, artworksRes]) => {
      setExhibition(exhibitionRes.data);
      // Filter the artworks to only include those in this exhibition
      setArtworks(artworksRes.data.filter(artwork => 
        exhibitionRes.data.artworkIds.includes(artwork.id)
      ));
    }).catch(error => console.error('Error fetching exhibition details:', error));
  }, [id]);

  // Show a loading message while we're fetching the data
  if (!exhibition) return <div>Loading...</div>;

  // Render the exhibition details and featured artworks
  return (
    <div className="exhibition-detail">
      <h1>{exhibition.title}</h1>
      <p>{exhibition.description}</p>
      <p>Dates: {exhibition.startDate} to {exhibition.endDate}</p>
      <h2>Featured Artworks</h2>
      <div className="exhibition-artworks">
        {artworks.map(artwork => (
          <div key={artwork.id} className="artwork">
            <img src={artwork.imageUrl} alt={artwork.title} />
            <h3>{artwork.title}</h3>
            <p>{artwork.description}</p>
            <p>Price: ${artwork.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExhibitionDetail;