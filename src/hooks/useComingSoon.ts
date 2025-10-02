import { useState, useEffect } from "react";

export function useComingSoon() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isDarkMode = true; // Always use dark mode

  useEffect(() => {
    try {
      // Force dark mode on initial load
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#1a1a1a';
      localStorage.setItem('theme', 'dark');

      // Preload critical assets
      const preloadAssets = () => {
        try {
          const assets = [
            '/keyswithKani.gif',
            '/Kani.png',
            '/Icon.png'
          ];
          
          // Preload images
          assets.forEach(src => {
            const img = new Image();
            img.src = src;
            // Handle image loading errors
            img.onerror = () => console.warn(`Failed to load image: ${src}`);
          });
        } catch (err) {
          console.error('Error in preloadAssets:', err);
          setError(err instanceof Error ? err : new Error('Failed to preload assets'));
        }
      };
      
      preloadAssets();

      // Set a minimum loading time to prevent flash of loading state
      const minLoadingTime = 1000; // 1 second minimum loading time
      const startTime = Date.now();
      
      // Check if all critical assets are loaded
      const checkAssetsLoaded = () => {
        const assets = document.images;
        let loaded = 0;
        
        for (let i = 0; i < assets.length; i++) {
          if (assets[i].complete) {
            loaded++;
          }
        }
        
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsed);
        
        if (remainingTime > 0) {
          setTimeout(() => {
            setIsLoading(false);
            setShowContent(true);
          }, remainingTime);
        } else {
          setIsLoading(false);
          setShowContent(true);
        }
      };
      
      // Check if assets are already loaded
      if (document.readyState === 'complete') {
        checkAssetsLoaded();
      } else {
        window.addEventListener('load', checkAssetsLoaded);
      }
      
      // Fallback in case the load event doesn't fire
      const fallbackTimer = setTimeout(() => {
        console.warn('Load event timeout, proceeding anyway');
        setIsLoading(false);
        setShowContent(true);
      }, 3000); // 3 second timeout

      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('load', checkAssetsLoaded);
      };
    } catch (err) {
      console.error('Error in useComingSoon:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setIsLoading(false);
      setShowContent(true); // Still try to show content even if there's an error
    }
  }, []);

  return {
    isDarkMode,
    isLoading: error ? false : isLoading, // Don't show loading state if there's an error
    showContent: error ? true : showContent, // Always show content if there's an error
    error
  };
}