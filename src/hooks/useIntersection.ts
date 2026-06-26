import { useEffect, useRef, useState } from 'react';

export function useIntersection({ threshold = 0.1, selector, onVisible, onHidden }: { threshold?: number; selector?: string; onVisible?: () => void; onHidden?: () => void } = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const target = ref.current ?? (selector ? document.querySelector(selector) : null);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible) onVisible?.();
        else onHidden?.();
      },
      { threshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [selector, threshold, onVisible, onHidden]);

  return { ref: ref as React.MutableRefObject<HTMLElement | null>, isVisible };
}
