import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

/**
 * Root component that syncs Docusaurus theme with design system.
 *
 * Problem: design-system.css uses `.dark` class selector
 * Docusaurus uses `[data-theme='dark']` attribute
 *
 * Solution: This component observes the data-theme attribute changes
 * and adds/removes `.dark` class on <html> accordingly.
 *
 * Uses both MutationObserver (for theme toggle) and useLocation
 * (for route changes) to ensure sync works during SPA navigation.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const syncDarkClass = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Sync on mount and route changes
    syncDarkClass();

    // Also sync after a small delay to handle race conditions
    const timeoutId = setTimeout(syncDarkClass, 50);

    // Observe attribute changes on <html> for theme toggle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          syncDarkClass();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [location.pathname]); // Re-run on route changes

  return <>{children}</>;
}
