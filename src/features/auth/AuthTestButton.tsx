import React, { useState } from 'react';
import { app, authentication } from '@microsoft/teams-js';


const AuthTestButton = () => {
  const [data, setData] = useState(null);

  const handleButtonClick = async () => {
    try {
      await app.initialize();
      const accessToken = await authentication.getAuthToken();
      console.log('Access token!!!!!!!!!!!!!!!!!:', accessToken);

      const fetchResponse = await fetch('http://127.0.0.1:7000/auth_test/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const result = await fetchResponse.json();
      console.log('Data fetched:', result);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Authentication Test</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default AuthTestButton;