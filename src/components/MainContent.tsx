import React, { useState, useEffect } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import "../styles/global.css";

interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroSectionProps {
  showContent: boolean;
  isDarkMode: boolean;
}

const MainContent: React.FC<HeroSectionProps> = ({ isDarkMode, showContent }) => {
  const fullHeadline = "Get Ready to Open the Door";
  const { displayText, dots, showBlinkingDot, typingComplete } = useTypewriter(
    fullHeadline,
    showContent
  );
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dx * 10, y: dy * 10 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date('2026-01-01T00:00:00').getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  // Inline styles for the component
  const styles = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    heading: {
      fontFamily: '"Playlist Script", cursive',
      transform: `perspective(900px) rotateX(${tilt.y * -1}deg) rotateY(${tilt.x * 2}deg)`,
      lineHeight: '1.2',
      letterSpacing: '0.05em',
      textShadow: isDarkMode ? '0 0 15px rgba(0, 200, 200, 0.3)' : '0 0 5px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <section
      style={styles.section}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative z-10 text-center px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -right-10 -top-8 w-1 h-1 rounded-full" style={{ 
              background: 'radial-gradient(circle, #ffffff 0%, #FFD700 30%, #00C8C8 60%, rgba(0,200,200,0) 70%)', 
              boxShadow: '0 0 12px rgba(255,215,0,0.95), 0 0 20px rgba(0,200,200,0.55)',
              animation: showContent ? 'starTravelHero .5s ease-out .3s forwards, sparklePulse .6s ease-in-out .3s infinite alternate' : 'none',
              filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.85))',
              pointerEvents: 'none'
            }}></div>
            <div className="relative w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 mx-auto">
              <img 
                src="/keyswithKani.gif" 
                alt="Keyswithkani" 
                className="w-full h-full object-contain rounded-2xl"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(0, 200, 200, 0.7))',
                  animation: showContent ? 
                    'logoFlip 6s ease-in-out infinite, logoGlowPulseGoldTeal 3s ease-in-out infinite alternate' : 'none',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, filter',
                  transition: 'all 0.3s ease-out'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Main headline with blinking dot */}
        <h1
          style={{
            ...styles.heading,
            fontSize: '3rem',
            marginTop: '1.5rem',
            background: 'linear-gradient(90deg, #FFC000 0%, #FFD700 50%, #00C8C8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.3',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            fontWeight: 400,
            textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {displayText}
          <span className="relative" style={{ 
            background: 'linear-gradient(90deg, #FFC000 0%, #FFD700 50%, #00C8C8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginLeft: '0.1em',
            letterSpacing: '0.2em',
            marginRight: '-0.15em',
            position: 'relative',
            display: 'inline-block'
          }}>
            {dots}
            {typingComplete && (
              <span className="absolute right-0 top-0" style={{
                opacity: showBlinkingDot ? 1 : 0.4,
                transition: 'opacity 0.5s ease-in-out',
                transform: 'translateX(100%)',
                marginLeft: '0.05em'
              }}>.</span>
            )}
          </span>
        </h1>
        
        {/* Subheading */}
        <div 
          className={`text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed mt-8 ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
          style={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 400,
            textShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.6)" : "none",
            animation: "textFloat 4s ease-in-out infinite"
          }}
        >
          <p>
            <span>Step into your next chapter with </span>
            <span style={{ color: isDarkMode ? "#FFC000" : "#00AAAA" }}>confidence</span>
            <span>, </span>
            <span style={{ color: isDarkMode ? "#00C8C8" : "#00AAAA" }}>clarity</span>
            <span>, and </span>
            <span style={{ color: isDarkMode ? "#FFC000" : "#00AAAA" }}>care</span>
            <span>.</span>
          </p>
          <div 
            className="mt-2" 
            style={{
              color: isDarkMode ? "#FFC000" : "#00AAAA",
              letterSpacing: '0.05em',
              fontWeight: 'bold'
            }}
          >
            WITH ME
          </div>
        </div>
        
        {/* Compact Countdown */}
        <div className="relative mt-10 mb-12 w-full max-w-md mx-auto px-4">
          <div className="relative z-10 text-center">
            <h2 className="text-xl md:text-2xl font-medium mb-1 bg-gradient-to-r from-yellow-300 to-teal-400 bg-clip-text text-transparent">
              We're Launching In
            </h2>
            <p className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              January 1, 2026
            </p>
            
            {/* Compact countdown box */}
            <div className={`relative rounded-xl overflow-hidden transition-all duration-300 mx-auto
              ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/95'}
              border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              shadow-lg hover:shadow-xl animate-glow p-3 max-w-xs`}
              style={{
                animation: 'countdownGlow 3s ease-in-out infinite',
                position: 'relative',
                zIndex: 1
              }}>
              
              {/* Dual-tone inner glow */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-yellow-400/15 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-teal-400/15 to-transparent"></div>
              </div>
              
              {/* Countdown grid */}
              <div className="relative z-10">
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Mins' },
                    { value: timeLeft.seconds, label: 'Secs' },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-teal-400 bg-clip-text text-transparent">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className={`text-[9px] uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-yellow-400/70 via-teal-400 to-yellow-400/70 rounded-full mt-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="mt-10">
          <p 
            className={`text-lg md:text-xl lg:text-xl font-normal ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`} 
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            <span>Contact us at</span>:{' '}
            <a 
              href="mailto:contact@keyswithkani.ca" 
              className={`font-bold ${
                isDarkMode 
                  ? "text-[#FFC000] hover:text-[#00C8C8]" 
                  : "text-[#00AAAA] hover:text-[#00C8C8]"
              }`}
            >
              contact@keyswithkani.ca
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
