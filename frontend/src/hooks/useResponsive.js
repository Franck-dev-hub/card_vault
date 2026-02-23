import { useState, useEffect } from 'react';

/**
 * Tracks whether the viewport is narrower than Tailwind's `md` breakpoint.
 *
 * Centralising this logic in a hook prevents duplicated event-listener setup
 * across components and ensures every consumer reacts to the same threshold,
 * keeping mobile/desktop behaviour consistent.
 *
 * @returns {boolean} `true` when the viewport width is below 768 px (mobile).
 */
export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  // The empty dependency array means this effect runs once after mount to
  // attach the resize listener, and the cleanup function removes it before
  // the component unmounts to prevent memory leaks and stale state updates.
  useEffect(() => {
    const handleResize = () => {
      // 768 px matches Tailwind's `md` breakpoint so layout decisions in this
      // hook stay in sync with utility classes used in the templates.
      setIsMobile(window.innerWidth < 768);
    };

    // Call immediately so the initial state reflects the current viewport
    // rather than always starting as `false` (desktop) on narrow screens.
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};
