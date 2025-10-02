import React, { memo, useMemo } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/NewFooter';
import EffectsBackground from './components/EffectsBackground';
import LoadingScreen from './components/LoadingScreen';
import GlobalStyles from './components/GlobalStyles';
import { useComingSoon } from './hooks/useComingSoon';
import VisitorInfo from './components/VisitorInfo';
import { Analytics } from '@vercel/analytics/react';

// Memoize components for better performance
const MemoizedHeader = memo(Header);
const MemoizedMainContent = memo(MainContent);
const MemoizedFooter = memo(Footer);
const MemoizedEffectsBackground = memo(EffectsBackground);
const MemoizedGlobalStyles = memo(GlobalStyles);
const MemoizedVisitorInfo = memo(VisitorInfo);
const MemoizedLoadingScreen = memo(LoadingScreen);

const App: React.FC = () => {
  const {
    isLoading,
    showContent,
  } = useComingSoon();

  // Always use dark mode
  const isDarkMode = true;

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
      
      {isLoading && <MemoizedLoadingScreen />}

      <div className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {mainContent}
      </div>
    </>
  );
};

export default App;