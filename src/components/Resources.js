import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/resources')
      .then(response => setResources(response.data))
      .catch(error => console.error('Error fetching resources:', error));
  }, []);

  return (
    <div className="resources">
      <h1>Educational Resources</h1>
      {resources.map(resource => (
        <div key={resource.id} className="resource">
          <h2>{resource.title}</h2>
          <p>Type: {resource.type}</p>
          <p>{resource.description}</p>
          <a href={resource.contentUrl} target="_blank" rel="noopener noreferrer">View Resource</a>
        </div>
      ))}
    </div>
  );
}

export default Resources;