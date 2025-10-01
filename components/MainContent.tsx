import React, { useRef, useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

interface HeroSectionProps {
  isDarkMode: boolean;
  showContent: boolean;
}

const MainContent: React.FC<HeroSectionProps> = ({ isDarkMode, showContent }) => {
  const fullHeadline = "SOMETHING AMAZING IS COMING";
  const { typewriterText, dots, showBlinkingDot, showDots, typingComplete } = useTypewriter(fullHeadline, showContent);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 3;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dx, y: dy });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  // Inline styles for the component
  const styles = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem 1.5rem',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    heading: {
      fontFamily: '"Cabinet Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transform: `perspective(900px) rotateX(${tilt.y * -1}deg) rotateY(${tilt.x * 2}deg)`,
      lineHeight: '1.2',
      letterSpacing: '0.02em'
    },
    // Add other styles as needed
  };

  return (
    <section 
      style={styles.section}
      onMouseMove={handleMove} 
      onMouseLeave={handleLeave}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://api.fontshare.com/v2/css?f[]=general-sans@600,500,400&display=swap');
          
          @keyframes subtlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.95; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          
          .modern-text {
            animation: subtlePulse 3s ease-in-out infinite;
          }
        `
      }} />
      <div className="mb-16" style={{ animation: showContent ? "zoomFlip .7s cubic-bezier(.2,.7,.2,1) both" : "", transformStyle: 'preserve-3d' }}>
        <div className="relative inline-block">
          <div className="absolute" style={{ right: '-80px', top: '-50px', width: 5, height: 5, borderRadius: '9999px', background: 'radial-gradient(circle, #ffffff 0%, #FFD700 30%, #00C8C8 60%, rgba(0,200,200,0) 70%)', boxShadow: '0 0 12px rgba(255,215,0,0.95), 0 0 20px rgba(0,200,200,0.55)', transform: 'translate(0,0)', animation: showContent ? 'starTravelHero .5s ease-out .3s forwards, sparklePulse .6s ease-in-out .3s infinite alternate' : 'none', filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.85))', pointerEvents: 'none' }} />
          <img src="/keyswithKani.gif" alt="Keyswithkani" className="h-24 md:h-36 lg:h-48 w-auto mx-auto" style={{ filter: 'none', borderRadius: 16, transform: `perspective(900px) rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 8}deg) translateZ(6px)`, animation: `${showContent ? 'heroGlowOn .35s ease-out .65s forwards, logoGlowPulseGoldTeal 4s ease-in-out 1.05s infinite alternate' : 'none'}` }} />
        </div>
      </div>
      
      <div className="text-center mb-10 w-full max-w-6xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight text-center whitespace-nowrap overflow-hidden" style={{ 
          fontFamily: '"Cabinet Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 500,
          color: '#ffffff',
          transform: `perspective(900px) rotateX(${tilt.y * -1}deg) rotateY(${tilt.x * 2}deg)`, 
          lineHeight: '1.2',
          letterSpacing: '0.02em'
        }}>
          <div className="relative inline-flex items-center">
            <span style={{
              position: 'relative',
              background: 'linear-gradient(90deg, #00E6E6 0%, #FFEA00 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: 'nowrap',
              fontWeight: 600,
              fontStyle: 'italic',
              transform: 'skewX(-5deg)',
              letterSpacing: '0.02em',
              fontSize: '1em',
              textShadow: isDarkMode ? '0 0 30px rgba(0, 230, 230, 0.4), 0 0 40px rgba(255, 234, 0, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
              {typewriterText}
            </span>
            {showDots && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: '"Cabinet Grotesk", sans-serif',
                fontSize: '0.9em',
                fontWeight: '600',
                fontStyle: 'italic',
                transform: 'skewX(-5deg)',
                background: 'linear-gradient(90deg, #00E6E6 0%, #FFEA00 50%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: isDarkMode ? '0 0 15px rgba(0, 230, 230, 0.3)' : '0 0 5px rgba(0, 0, 0, 0.1)',
                marginLeft: '0.2em',
                position: 'relative',
                zIndex: 1
              }}>
                {dots.split('').map((dot, index) => (
                  <span 
                    key={index}
                    style={{
                      display: 'inline-block',
                      minWidth: '0.5em',
                      textAlign: 'center',
                      color: (index === 2 && showBlinkingDot) ? 
                        (isDarkMode ? "#00C8C8" : "#00AAAA") : 
                        (index < 2 ? (isDarkMode ? "#FFD700" : "#00AAAA") : 'transparent'),
                      transition: 'color 0.3s ease-in-out',
                      opacity: (index === 2 && !showBlinkingDot) ? 0 : 1
                    }}
                  >
                    {dot}
                  </span>
                ))}
              </span>
            )}
          </div>
        </h1>
        <p className={`text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed mt-8 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} style={{ 
          fontFamily: '"Balgin Display", sans-serif',
          fontWeight: 500,
          textShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.6)" : "none",
          animation: "textFloat 4s ease-in-out infinite"
        }}>
          <span>Where </span>
          <span style={{ 
            color: isDarkMode ? "#FFD700" : "#00AAAA",
            fontWeight: 600
          }}>Creativity meets Innovation</span>.<br />
          <span>Where </span>
          <span style={{ 
            color: isDarkMode ? "#00C8C8" : "#00AAAA",
            fontWeight: 600
          }}>Artistry gets elevated</span>.
        </p>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Balgin Display';
              src: url('/Fonts Style/BalginDisplay medium.otf') format('opentype');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            
            @keyframes textFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            
            @keyframes zoomFlip {
              0% { opacity: 0; transform: scale(0.5) rotateY(90deg); }
              100% { opacity: 1; transform: scale(1) rotateY(0); }
            }
            
            @keyframes starTravelHero {
              from { transform: translate(0, 0) scale(0.5); opacity: 0; }
              to { transform: translate(50px, -30px) scale(1.5); opacity: 0.8; }
            }
            
            @keyframes sparklePulse {
              0%, 100% { opacity: 0.6; filter: brightness(1); }
              50% { opacity: 1; filter: brightness(1.5); }
            }
            
            @keyframes heroGlowOn {
              from { filter: drop-shadow(0 0 0px rgba(0, 200, 200, 0)); }
              to { filter: drop-shadow(0 0 20px rgba(0, 200, 200, 0.4)); }
            }
            
            @keyframes logoGlowPulseGoldTeal {
              0%, 100% { filter: drop-shadow(0 0 15px rgba(0, 200, 200, 0.4)) drop-shadow(0 0 30px rgba(0, 200, 200, 0.2)); }
              50% { filter: drop-shadow(0 0 25px rgba(0, 200, 200, 0.6)) drop-shadow(0 0 50px rgba(0, 200, 200, 0.3)); }
            }
          `
        }} />
        
        <div className="mt-10">
          <p className={`text-lg md:text-xl lg:text-2xl font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            <span>Contact us at</span>:{' '}
            <a 
              href="mailto:contact@keyswithkani.ca" 
              className={`font-bold ${isDarkMode ? "text-[#FFD700] hover:text-[#00C8C8]" : "text-[#00AAAA] hover:text-[#00C8C8]"}`}
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