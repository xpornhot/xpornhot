import { useState, useEffect } from 'react';

const API_BASE_URL = '/api/videos_api.php';
const ACCESS_CODE = 'c448a9332b03fe22';
const RELATED_VIDEOS_COUNT = 10;

export const useRelatedVideos = (currentVideoId) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}?page=1&accessCode=${ACCESS_CODE}`
        );

        if (!response.ok) {
          throw new Error('Erro ao carregar vídeos relacionados');
        }

        const data = await response.json();
        
        // Filtra o vídeo atual e pega apenas 10 vídeos aleatórios
        const filteredVideos = data
          .filter(video => video.id !== currentVideoId)
          .sort(() => Math.random() - 0.5)
          .slice(0, RELATED_VIDEOS_COUNT);

        setVideos(filteredVideos);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar vídeos relacionados:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedVideos();
  }, [currentVideoId]);

  return { videos, loading, error };
}; 