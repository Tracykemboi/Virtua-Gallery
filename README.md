# Virtua-Gallery
# Virtual Art Gallery

## Introduction

Welcome to the Virtual Art Gallery, a React-based web application designed to showcase and manage a diverse collection of artworks from various artists. This project aims to bridge the gap between artists and art enthusiasts by providing a digital platform for exhibiting, exploring, and potentially purchasing artwork.

### Problem Statement

In the wake of global changes that have limited physical art exhibitions, there's a growing need for digital platforms that can replicate the experience of visiting an art gallery. The Virtual Art Gallery addresses this need by offering a space where artists can showcase their work to a global audience, and art lovers can explore and engage with art from the comfort of their homes.

## Key Features

1. **Gallery View**: Browse all artworks with filtering options by genre.
2. **Artist Profiles**: Detailed pages for each artist, showcasing their portfolio and bio.
3. **Exhibition Showcase**: Virtual exhibitions featuring selected artworks.
4. **Purchase Functionality**: Option to mark artworks as sold or available for purchase.
5. **Admin Dashboard**: Manage artists, artworks, and exhibitions.
6. **Educational Resources**: Access to art-related educational materials.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Fork the repository on GitHub.
2. Clone your forked repository:
   ```
   git clone https://github.com/your-username/virtual-art-gallery.git
   ```
3. Navigate to the project directory:
   ```
   cd virtual-art-gallery
   ```
4. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the development server:
   ```
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Frontend Setup
The frontend has been hosted in vercel.



### Backend Setup

The application uses a JSON server for the backend. You have two options:

1. **Local JSON Server** (Recommended for development):
   - Install JSON Server globally:
     ```
     npm install -g json-server
     ```
   - Start the JSON server:
     ```
     json-server --watch db.json --port 3001
     ```

2. **Hosted Backend** (Alternative, may be slower):
   - Update all axios requests in the components to use the following base URL:
     ```
     https://virtua-gallery-backend.onrender.com
     ```
   Note: The hosted backend is deployed from [this GitHub repository](https://github.com/Tracykemboi/Virtua-Gallery-Backend).

### Admin Access

To access the admin dashboard, use the following credentials:
- Username: admin
- Password: password

## Component Overview

### App.js
The main component that sets up routing and the overall structure of the application.

### Gallery.js
Displays all artworks with genre filtering. Uses React hooks for state management and axios for data fetching.

### Artists.js
Shows a list of all artists. Demonstrates the use of React Router for navigation.

### ArtistDetail.js
Displays detailed information about a specific artist and their portfolio. Uses URL parameters to fetch specific artist data.

### Exhibitions.js
Showcases virtual exhibitions. Implements more complex data fetching and state management.

### ExhibitionDetail.js
Provides detailed view of a specific exhibition. Demonstrates handling of nested data structures.

### Resources.js
Displays educational resources. A simpler component showing basic data fetching and rendering.

### AdminDashboard.js
Allows management of artists, artworks, and exhibitions. Implements forms for data creation and updates.

### Login.js
Handles admin authentication. Demonstrates basic form handling and state management.

## Technical Considerations

- **State Management**: The application primarily uses React's useState and useEffect hooks for state management. For larger scale applications, consider implementing Redux or Context API.
- **Data Fetching**: Axios is used for making HTTP requests. Ensure proper error handling and loading states in production.
- **Routing**: React Router is used for navigation. Familiarize yourself with its concepts for effective use.
- **Component Structure**: The application follows a modular component structure. Each component is responsible for its own data fetching and state management.
- **Styling**: CSS is used for styling. Consider implementing a CSS-in-JS solution or a UI library for more complex applications.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Art Inspiration sourced from Banana art Gallery Nairobi Kenya