import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Login component
// This component handles user authentication for the admin dashboard
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple authentication (// I know this isn't secure, but it's just for demonstration. We'd use proper authentication in a real app.)
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };
  // login form just username and password fields with a submit button.
  return (
    <div className="login-form">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Main AdminDashboard component
function AdminDashboard() {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [artists, setArtists] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: '', bio: '', genre: '', statement: '', processVideoUrl: '',
    portfolio: []
  });
  const [newArtwork, setNewArtwork] = useState({
    title: '', imageUrl: '', description: '', price: ''
  });
  const [selectedArtist, setSelectedArtist] = useState('');
  const [newExhibition, setNewExhibition] = useState({
    title: '', description: '', startDate: '', endDate: '', artworkIds: []
  });

  // Effect hook to check login status and fetch data when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      fetchData();
    }
  }, []);

  // Function to fetch artists and exhibitions data
  const fetchData = () => {
    Promise.all([
      axios.get('http://localhost:3001/artists'),
      axios.get('http://localhost:3001/exhibitions')
    ]).then(([artistsRes, exhibitionsRes]) => {
      setArtists(artistsRes.data);
      setExhibitions(exhibitionsRes.data);
    }).catch(error => console.error('Error fetching data:', error));
  };

  // Login handler
  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchData();
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // Event handlers for form inputs
  const handleArtistChange = (e) => {
    setNewArtist({ ...newArtist, [e.target.name]: e.target.value });
  };

  const handleArtworkChange = (e) => {
    setNewArtwork({ ...newArtwork, [e.target.name]: e.target.value });
  };

  const handleExhibitionChange = (e) => {
    setNewExhibition({ ...newExhibition, [e.target.name]: e.target.value });
  };

  // Function to add a new artist
  const handleAddArtist = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/artists', newArtist)
      .then(response => {
        setArtists([...artists, response.data]);
        setNewArtist({ name: '', bio: '', genre: '', statement: '', processVideoUrl: '', portfolio: [] });
      })
      .catch(error => console.error('Error adding artist:', error));
  };

  // Function to add a new artwork to an artist's portfolio
  const handleAddArtwork = (e) => {
    e.preventDefault();
    const artist = artists.find(a => a.id === parseInt(selectedArtist));
    if (artist) {
      const updatedArtist = {
        ...artist,
        portfolio: [...artist.portfolio, { ...newArtwork, id: Date.now().toString(), purchased: false }]
      };
      axios.put(`http://localhost:3001/artists/${artist.id}`, updatedArtist)
        .then(response => {
          setArtists(artists.map(a => a.id === artist.id ? response.data : a));
          setNewArtwork({ title: '', imageUrl: '', description: '', price: '' });
          setSelectedArtist('');
        })
        .catch(error => console.error('Error adding artwork:', error));
    }
  };

  // Function to add a new exhibition
  const handleAddExhibition = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/exhibitions', newExhibition)
      .then(response => {
        setExhibitions([...exhibitions, response.data]);
        setNewExhibition({ title: '', description: '', startDate: '', endDate: '', artworkIds: [] });
      })
      .catch(error => console.error('Error adding exhibition:', error));
  };

  // Function to remove an exhibition
  const handleRemoveExhibition = (id) => {
    axios.delete(`http://localhost:3001/exhibitions/${id}`)
      .then(() => {
        setExhibitions(exhibitions.filter(exhibition => exhibition.id !== id));
      })
      .catch(error => console.error('Error removing exhibition:', error));
  };

  // Function to handle artwork selection for exhibitions
  const handleArtworkSelection = (artworkId) => {
    setNewExhibition(prev => ({
      ...prev,
      artworkIds: prev.artworkIds.includes(artworkId)
        ? prev.artworkIds.filter(id => id !== artworkId)
        : [...prev.artworkIds, artworkId]
    }));
  };

  // Render login form if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Main render of the AdminDashboard
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      
      {/* Form to add a new artist */}
      <form onSubmit={handleAddArtist}>
        <h2>Add New Artist</h2>
        <input name="name" value={newArtist.name} onChange={handleArtistChange} placeholder="Name" required />
        <input name="bio" value={newArtist.bio} onChange={handleArtistChange} placeholder="Bio" required />
        <input name="genre" value={newArtist.genre} onChange={handleArtistChange} placeholder="Genre" required />
        <textarea name="statement" value={newArtist.statement} onChange={handleArtistChange} placeholder="Artist Statement" required />
        <button type="submit">Add Artist</button>
      </form>

      {/* Form to add a new artwork */}
      <form onSubmit={handleAddArtwork}>
        <h2>Add New Artwork</h2>
        <select value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)} required>
          <option value="">Select an artist</option>
          {artists.map(artist => (
            <option key={artist.id} value={artist.id}>{artist.name}</option>
          ))}
        </select>
        <input name="title" value={newArtwork.title} onChange={handleArtworkChange} placeholder="Title" required />
        <input name="imageUrl" value={newArtwork.imageUrl} onChange={handleArtworkChange} placeholder="Image URL" required />
        <textarea name="description" value={newArtwork.description} onChange={handleArtworkChange} placeholder="Description" required />
        <input name="price" type="number" value={newArtwork.price} onChange={handleArtworkChange} placeholder="Price" required />
        <button type="submit">Add Artwork</button>
      </form>

      {/* Form to create a new exhibition */}
      <h2>Create New Exhibition</h2>
      <form onSubmit={handleAddExhibition}>
        <input name="title" value={newExhibition.title} onChange={handleExhibitionChange} placeholder="Exhibition Title" required />
        <textarea name="description" value={newExhibition.description} onChange={handleExhibitionChange} placeholder="Description" required />
        <input name="startDate" type="date" value={newExhibition.startDate} onChange={handleExhibitionChange} required />
        <input name="endDate" type="date" value={newExhibition.endDate} onChange={handleExhibitionChange} required />
        
        <h3>Select Artworks for Exhibition</h3>
        {/* mapping to display all artworks grouped by artist */}
        {artists.map(artist => (
          <div key={artist.id}>
            <h4>{artist.name}</h4>
            {artist.portfolio.map(artwork => (
              <div key={artwork.id}>
                <input
                  type="checkbox"
                  id={`artwork-${artwork.id}`}
                  checked={newExhibition.artworkIds.includes(artwork.id)}
                  onChange={() => handleArtworkSelection(artwork.id)}
                />
                <label htmlFor={`artwork-${artwork.id}`}>{artwork.title}</label>
              </div>
            ))}
          </div>
        ))}
        
        <button type="submit">Create Exhibition</button>
      </form>

      {/* Display current exhibitions */}
      <h2>Current Exhibitions</h2>
      {exhibitions.map(exhibition => (
        <div key={exhibition.id}>
          <h3>{exhibition.title}</h3>
          <p>{exhibition.description}</p>
          <p>From: {exhibition.startDate} To: {exhibition.endDate}</p>
          <p>Artworks: {exhibition.artworkIds.join(', ')}</p>
          <button onClick={() => handleRemoveExhibition(exhibition.id)}>Remove Exhibition</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;