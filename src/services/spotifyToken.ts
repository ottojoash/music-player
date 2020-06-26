import base64 from 'base-64';
import { CLIENT_ID, CLIENT_SECRET, SPOTIFY_API_URL } from 'react-native-dotenv';

const base64credentials = base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

const spotifyToken = async (): Promise<string> => {
  console.log('Refreshing token');

  try {
    const res = await fetch(`${SPOTIFY_API_URL}/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64credentials}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const json = await res.json();
    const newToken = json.access_token;

    return newToken;
  } catch (error) {
    console.log('error', error);

    return '';
  }
};

export default spotifyToken;
