import { useState, useEffect } from "react";

export function useComingSoon() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const isDarkMode = true; // Always use dark mode

  useEffect(() => {
    // Force dark mode on initial load
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    // Preload critical assets
    const preloadAssets = () => {
      const assets = [
        '/keyswithKani.gif',
        '/Kani.png',
        '/Icon.png'
      ];
      
      // Preload images
      assets.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadAssets();

    // Reduce loading time for better performance
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100); // Faster fade-in
    }, 1500); // Reduced from 2800ms to 1500ms

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return {
    isDarkMode,
    isLoading,
    showContent,
  };
}