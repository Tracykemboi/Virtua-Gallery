import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Resources() {
  // Store our list of resources
  const [resources, setResources] = useState([]);

  // Fetch the resources when the component loads
  useEffect(() => {
    axios.get('http://localhost:3001/resources')
      .then(response => setResources(response.data))
      .catch(error => console.error('Error fetching resources:', error));
  }, []);

  // Render our list of resources
  return (
    <div className="resources">
      <h1>Educational Resources</h1>
      {/* Map over each resource and display its details */}
      {resources.map(resource => (
        <div key={resource.id} className="resource">
          <h2>{resource.title}</h2>
          <p>Type: {resource.type}</p>
          <p>{resource.description}</p>
          {/* Link to view the resource, opening in a new tab */}
          <a href={resource.contentUrl} target="_blank" rel="noopener noreferrer">View Resource</a>
        </div>
      ))}
    </div>
  );
}

export default Resources;