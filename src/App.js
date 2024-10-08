import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Gallery from './components/Gallery';
import Artists from './components/Artists';
import ArtistDetail from './components/ArtistDetail';
import Exhibitions from './components/Exhibitions';
import ExhibitionDetail from './components/ExhibitionDetail';
import Resources from './components/Resources';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// Navigation items array. Makes it easy to add or remove pages later.
const navItems = [
  { path: '/', name: 'Gallery' },
  { path: '/artists', name: 'Artists' },
  { path: '/exhibitions', name: 'Exhibitions' },
  { path: '/resources', name: 'Resources' },
  { path: '/admin', name: 'Admin Dashboard' },
];

// Routes array. Gives us a clear overview of our app structure.
const routes = [
  { path: '/', Component: Gallery },
  { path: '/artists', Component: Artists },
  { path: '/artists/:id', Component: ArtistDetail },
  { path: '/exhibitions', Component: Exhibitions },
  { path: '/exhibitions/:id', Component: ExhibitionDetail },
  { path: '/resources', Component: Resources },
  { path: '/admin', Component: AdminDashboard },
];

// Main App component. Sets up the overall structure and routing.
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation bar */}
        <nav>
          <ul>
            {navItems.map(({ path, name }) => (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* This is where the different pages will be rendered */}
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;