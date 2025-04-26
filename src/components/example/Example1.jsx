import React, { useState } from 'react';
import axios from 'axios';

const Example1 = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
              key: 'ca64140136e24d29b40a68933e5f83ab', // replace this with your real API key
              q: `${latitude}+${longitude}`,
              pretty: 1
            }
          });

          const address = response.data.results[0].formatted;
          setLocation(address);
        } catch (err) {
          setError('Failed to fetch address');
        }
      },
      () => {
        setError('Unable to retrieve your location');
      }
    );
  };

  return (
    <div className="p-4">
      <button onClick={getLocation} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get My Location
      </button>

      {location && (
        <div className="mt-4 text-green-600">
          <strong>Address:</strong> {location}
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Example1;
