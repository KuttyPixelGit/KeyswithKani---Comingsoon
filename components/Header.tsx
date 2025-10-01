import React, { useEffect, useState } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode }) => {
  const [showFloatingKani, setShowFloatingKani] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show the floating Kani image after scrolling past 1000px (adjust as needed)
      if (window.scrollY > 1000) {
        setShowFloatingKani(true);
      } else {
        setShowFloatingKani(false);
      }
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMeetKani = () => {
    const meetKaniSection = document.getElementById('meet-kani-section');
    if (meetKaniSection) {
      meetKaniSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-6 right-6 z-50 h-12">
      {/* Floating Kani Image with scroll progress indicator */}
      {showFloatingKani && (
        <div className="fixed bottom-20 left-10 z-10 transition-all duration-500 ease-in-out transform hover:scale-110 cursor-pointer" onClick={scrollToMeetKani}>
          <div className="relative">
            {/* Progress ring outside the image */}
            <div className="absolute inset-0 rounded-full animate-pulse" style={{
              background: `conic-gradient(from 0deg, #FFD700 0deg, #00C8C8 ${3.6 * scrollProgress}deg, transparent ${3.6 * scrollProgress}deg 360deg)`,
              mask: 'radial-gradient(black 50px, transparent 52px)',
              WebkitMask: 'radial-gradient(black 50px, transparent 52px)'
            }}></div>
            
            {/* Circular Kani Image - increased size */}
            <img 
              src="/Kani.png" 
              alt="Kani" 
              className="w-24 h-24 rounded-full object-cover border-2 border-[#FFD700] relative z-10"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;