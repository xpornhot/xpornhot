import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = '/api/videos_api.php';
const ACCESS_CODE = 'c448a9332b03fe22';
const VIDEOS_PER_PAGE = 20;

export const useSearch = (searchQuery = '') => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchVideos = useCallback(async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}?page=1&accessCode=${ACCESS_CODE}`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar vídeos');
      }

      const data = await response.json();
      
      // Normaliza a busca (remove acentos e converte para minúsculo)
      const normalizeText = (text) => {
        return text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      };

      const searchTerms = normalizeText(searchQuery).split(' ').filter(term => term.length > 2);

      // Filtra os vídeos baseado nos termos de busca
      const filteredVideos = data.filter(video => {
        const normalizedTitle = normalizeText(video.title);
        const normalizedKeywords = normalizeText(video.keywords);
        
        // Verifica se todos os termos de busca estão presentes
        return searchTerms.every(term => 
          normalizedTitle.includes(term) || normalizedKeywords.includes(term)
        );
      });

      // Ordena por relevância
      const sortedVideos = filteredVideos.sort((a, b) => {
        const titleA = normalizeText(a.title);
        const titleB = normalizeText(b.title);
        const keywordsA = normalizeText(a.keywords);
        const keywordsB = normalizeText(b.keywords);

        // Pontuação baseada em onde os termos foram encontrados
        const scoreA = searchTerms.reduce((score, term) => {
          if (titleA.includes(term)) score += 2;
          if (keywordsA.includes(term)) score += 1;
          return score;
        }, 0);

        const scoreB = searchTerms.reduce((score, term) => {
          if (titleB.includes(term)) score += 2;
          if (keywordsB.includes(term)) score += 1;
          return score;
        }, 0);

        return scoreB - scoreA;
      });

      setVideos(sortedVideos.slice(0, VIDEOS_PER_PAGE));
      setTotalResults(sortedVideos.length);

    } catch (err) {
      setError(err.message);
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchVideos();
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [searchQuery, searchVideos]);

  return {
    videos,
    loading,
    error,
    totalResults
  };
}; 