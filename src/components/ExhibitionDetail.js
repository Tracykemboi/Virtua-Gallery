import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ExhibitionDetail() {
  const [exhibition, setExhibition] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/exhibitions/${id}`),
      axios.get('http://localhost:3001/artworks')
    ]).then(([exhibitionRes, artworksRes]) => {
      setExhibition(exhibitionRes.data);
      setArtworks(artworksRes.data.filter(artwork => 
        exhibitionRes.data.artworkIds.includes(artwork.id)
      ));
    }).catch(error => console.error('Error fetching exhibition details:', error));
  }, [id]);

  if (!exhibition) return <div>Loading...</div>;

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