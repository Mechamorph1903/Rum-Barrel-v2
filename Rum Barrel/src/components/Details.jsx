import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        const data = await response.json();
        setBrewery(data);
      } catch (error) {
        console.error('Error fetching brewery details', error);
      }
    };

    fetchBrewery();
  }, [id]);

  if (!brewery) return <div>Loading...</div>;

  return (
    <div className='details'>
      <h4><strong>{brewery.name}</strong></h4>
      <h5><strong>Located At:</strong> {brewery.street}, {brewery.city}, {brewery.state}. {brewery.postal_code}</h5>
      <h5><strong>Type:</strong> {brewery.brewery_type}</h5>
      <h5><strong>Phone:</strong> {brewery.phone}</h5>
      <h5><strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noreferrer">{brewery.name}</a></h5>
        <Link to="/home" className="navButton">Back to Home</Link>
    </div>
  );
};

export default Details;