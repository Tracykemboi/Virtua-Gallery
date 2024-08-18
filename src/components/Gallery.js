import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery() {
  // Store our artists and the selected genre
  const [artists, setArtists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
// Fetch the artists data when the component loads
  useEffect(() => {
    axios.get('http://localhost:3001/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);
// Here we are creating a new array of artworks in each artists portfolio that has more key/properties from the artist object. 
   // This makes it easier to display and filter artworks later
const allArtworks = artists.flatMap(artist => 
    artist.portfolio.map(artwork => ({
      ...artwork,
      artistName: artist.name,
      genre: artist.genre,
      artistId: artist.id
    }))
  );
// The map function iterates over each element in the artists array and returns a new array that contains only the genre property of each artist object
  const genres = [...new Set(artists.map(artist => artist.genre))];

  const filteredArtworks = selectedGenre
    ? allArtworks.filter(artwork => artwork.genre === selectedGenre)
    : allArtworks;
  // Handle the purchase/unpurchase of an artwork
  const handlePurchaseToggle = (artwork) => {
    // Find the artist whose portfolio contains the artwork
    const artist = artists.find(a => a.id === artwork.artistId);
// update the artist portfoli with the toggle purchase status
    const updatedPortfolio = artist.portfolio.map(a => 
      a.id === artwork.id ? { ...a, purchased: !a.purchased } : a
    );
    // an updated potfolio with the purchse key updated
    const updatedArtist = {
      ...artist,
      portfolio: updatedPortfolio
    };
// axios updates the new field for the artist data /resource and the state variable artists is updated with the new list
    axios.put(`http://localhost:3001/artists/${artist.id}`, updatedArtist)
      .then(response => {
        setArtists(artists.map(a => a.id === artist.id ? response.data : a));
      })
      .catch(error => console.error('Error updating artwork:', error));
  };
// render the gallery
  return (
    <div className="gallery">
      <h1>Art Gallery</h1>
       {/* Genre selection dropdown */}
      <select className='genreSelect' value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
      </select>
           {/* Display our artworks in a grid */}
      <div className="artwork-grid">
        {filteredArtworks.map(artwork => (
          <div key={artwork.id} className="artwork-tile">
            <img src={artwork.imageUrl} alt={artwork.title} style={{width: '300px', height: '300px'}} />
            <h3>{artwork.title}</h3>
            <p>Artist: {artwork.artistName}</p>
            <p>Genre: {artwork.genre}</p>
            <p>Price: ${artwork.price}</p>
            <button 
              onClick={() => handlePurchaseToggle(artwork)} 
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

export default Gallery;