import React from 'react';

export const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold,
  rootMargin,
  enabled,
}: {
  root?: React.RefObject<HTMLElement>;
  target: React.MutableRefObject<HTMLButtonElement | null>;
  onIntersect: () => void;
  threshold?: number | undefined;
  rootMargin?: string | undefined;
  enabled?: boolean | undefined;
}) => {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root?.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, root, rootMargin, threshold, target, onIntersect]);
};
