import axios from 'axios';
import { SPOTIFY_API_URL } from 'react-native-dotenv';

import { Playback } from '../pages/Main/model/Playback';

interface SearchParams {
  limit: number;
  query: string;
  spotify_token: string;
}

interface Image {
  url: string;
}

interface Artist {
  name: string;
}

interface SpotifyData {
  id: number;
  name: string;
  artist: Artist[];
  album: {
    name: string;
    images: Image[];
  };
  preview_url: string;
  image_uri: string;
}

interface SpotifyResponse {
  items: SpotifyData[];
}

const spotifySearch = async ({
  limit,
  query,
  spotify_token,
}: SearchParams): Promise<Playback[]> => {
  const uri = `${SPOTIFY_API_URL}/search?type=album,artist,track,playlist&limit=${limit}&q=${encodeURIComponent(
    query,
  )}*`;

  console.log('Fetching songs on Spotify API');

  try {
    const response = await axios.get<SpotifyResponse>(uri, {
      headers: {
        Authorization: `Bearer ${spotify_token}`,
      },
    });

    // console.log('--- retorno spotify', response);

    const { items } = response.data;

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      author: item.artist ? item.artist[0].name : undefined,
      image_source: item.album.images ? item.album.images[0].url : undefined,
      uri: item.preview_url,
    }));
  } catch (error) {
    console.log('Error while fetching songs', error);

    return [];
  }
};

export default spotifySearch;
