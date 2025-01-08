import { useState, useEffect, useCallback } from 'react';

// Volta para a URL relativa já que estamos usando o proxy da Vercel
const API_BASE_URL = '/api/videos_api.php';
const ACCESS_CODE = 'c448a9332b03fe22';
const VIDEOS_PER_PAGE = 20;

// Palavras a serem filtradas
const FILTERED_KEYWORDS = ['desi', 'indian', '-18', 'cp'];

export const useVideos = ({ sort = 'trending', page = 1 } = {}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);

  const filterVideos = (videos) => {
    return videos.filter(video => {
      const titleLower = video.title.toLowerCase();
      const keywordsLower = video.keywords ? video.keywords.toLowerCase() : '';
      
      return !FILTERED_KEYWORDS.some(keyword => 
        titleLower.includes(keyword.toLowerCase()) || 
        keywordsLower.includes(keyword.toLowerCase())
      );
    });
  };

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}?accessCode=${ACCESS_CODE}&page=${page}&limit=${VIDEOS_PER_PAGE}`,
        {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar vídeos');
      }

      let data = await response.json();

      // Aplica o filtro antes de qualquer ordenação
      data = filterVideos(data);

      // Define um total estimado de páginas
      const estimatedTotal = 40000;
      const calculatedTotalPages = Math.ceil(estimatedTotal / VIDEOS_PER_PAGE);
      
      setTotalVideos(estimatedTotal);
      setTotalPages(calculatedTotalPages);
      
      // Função para calcular a pontuação de trending
      const getTrendingScore = (video) => {
        const daysSinceUpload = (Date.now() - new Date(video.date)) / (1000 * 60 * 60 * 24);
        return (video.views * video.rating) / (daysSinceUpload + 1);
      };

      // Ordenação dos vídeos baseada no sort
      switch (sort) {
        case 'newest':
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'most-viewed':
          data.sort((a, b) => b.views - a.views);
          break;
        case 'top-rated':
          data.sort((a, b) => b.rating - a.rating);
          break;
        case 'trending':
        default:
          data.sort((a, b) => getTrendingScore(b) - getTrendingScore(a));
          break;
      }

      // Garante que apenas 20 vídeos sejam retornados
      const limitedData = data.slice(0, VIDEOS_PER_PAGE);
      setVideos(limitedData);

    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar vídeos:', err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [sort, page]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    totalPages,
    totalVideos,
    currentPage: page
  };
}; 