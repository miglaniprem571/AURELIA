import { useEffect, useState } from 'react';

export function useResize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });

    const target = document.documentElement;
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return size;
}
