export const formatViews = (views) => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  }
  return views;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
  if (months > 0) return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
  if (days > 0) return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  if (hours > 0) return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
  return 'Agora mesmo';
};

export const generateSlug = (text) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
}; 