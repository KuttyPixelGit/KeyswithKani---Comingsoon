import React, { memo, useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import EffectsBackground from './components/EffectsBackground';
import GlobalStyles from './components/GlobalStyles';
import VisitorInfo from './components/VisitorInfo';
import { Analytics } from '@vercel/analytics/react';
import VideoPlayer from './components/VideoPlayer';

// Memoize components for better performance
const MemoizedHeader = memo(Header);
const MemoizedMainContent = memo(MainContent);
const MemoizedFooter = memo(Footer);
const MemoizedEffectsBackground = memo(EffectsBackground);
const MemoizedGlobalStyles = memo(GlobalStyles);
const MemoizedVisitorInfo = memo(VisitorInfo);

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const isDarkMode = true; // Always use dark mode

  const handleVideoEnd = () => {
    console.log('Video ended, showing main content');
    setShowContent(true);
  };

  // Memoize the main content to prevent unnecessary re-renders
  const mainContent = useMemo(() => (
    <>
      <MemoizedHeader isDarkMode={isDarkMode} />
      <main>
        <MemoizedMainContent isDarkMode={isDarkMode} showContent={showContent} />
        <MemoizedFooter isDarkMode={isDarkMode} />
      </main>
      <MemoizedVisitorInfo isDarkMode={isDarkMode} />
    </>
  ), [isDarkMode, showContent]);

  return (
    <>
      <MemoizedGlobalStyles isDarkMode={isDarkMode} />
      <Analytics />
      <MemoizedEffectsBackground isDarkMode={isDarkMode} />
      
      {!showContent ? (
        <VideoPlayer onVideoEnd={handleVideoEnd} />
      ) : (
        <div className="opacity-100">
          {mainContent}
        </div>
      )}
    </>
  );
};

export default App;