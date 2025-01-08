import { useState, useEffect } from 'react';

const API_BASE_URL = '/api/videos_api.php';
const ACCESS_CODE = 'c448a9332b03fe22';

export const useVideo = (videoId) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}?page=1&accessCode=${ACCESS_CODE}`
        );

        if (!response.ok) {
          throw new Error('Erro ao carregar vídeo');
        }

        const data = await response.json();
        const foundVideo = data.find(v => v.id === videoId);

        if (!foundVideo) {
          throw new Error('Vídeo não encontrado');
        }

        setVideo(foundVideo);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar vídeo:', err);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  return { video, loading, error };
}; 