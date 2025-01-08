import { useRef, useEffect, useState } from 'react';
import './SortOptions.css';

const SortOptions = ({ value, onChange }) => {
  const scrollRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScrollable = () => {
    const el = scrollRef.current;
    if (el) {
      setIsScrollable(el.scrollWidth > el.clientWidth);
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const options = [
    { id: 'recent', icon: 'clock', label: 'Mais Recentes' },
    { id: 'trending', icon: 'chart-line', label: 'Em Alta' },
    { id: 'views', icon: 'fire', label: 'Mais Vistos' },
    { id: 'rating', icon: 'star', label: 'Melhor Avaliados' },
    { id: 'duration', icon: 'clock', label: 'Mais Longos' }
  ];

  return (
    <div className={`sort-options ${isScrollable ? 'scrollable' : ''}`} ref={scrollRef}>
      {options.map(option => (
        <button
          key={option.id}
          className={value === option.id ? 'active' : ''}
          onClick={() => onChange(option.id)}
        >
          <i className={`fas fa-${option.icon}`}></i>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SortOptions; 