import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToAnchor() {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    const scrollToHash = () => {
      const id = lastHash.current;
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      } else {
        // si no existe aún, reintenta después de un breve delay
        setTimeout(scrollToHash, 100);
      }
    };

    if (lastHash.current) {
      setTimeout(scrollToHash, 100);
    }
  }, [location]);

  return null;
}

export default ScrollToAnchor;
