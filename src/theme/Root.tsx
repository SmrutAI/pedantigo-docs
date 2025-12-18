import { useEffect } from 'react';

/**
 * Root component that syncs Docusaurus theme with design system.
 *
 * Problem: design-system.css uses `.dark` class selector
 * Docusaurus uses `[data-theme='dark']` attribute
 *
 * Solution: This component observes the data-theme attribute changes
 * and adds/removes `.dark` class on <html> accordingly.
 *
 * Note: We use MutationObserver instead of useColorMode because Root
 * is rendered before ColorModeProvider is available.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const syncDarkClass = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Initial sync
    syncDarkClass();

    // Observe attribute changes on <html>
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

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
