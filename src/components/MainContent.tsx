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
  const fullHeadline = "GET READY TO OPEN THE DOOR";
  const { displayText, showBlinkingDot, typingComplete } = useTypewriter(
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
      const difference = new Date('2026-08-01T00:00:00').getTime() - new Date().getTime();
      
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

  // Handle touch events for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    // Only apply tilt effect if it's a single touch
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (touch.clientX - cx) / rect.width;
      const dy = (touch.clientY - cy) / rect.height;
      setTilt({ x: dx * 5, y: dy * 5 });
    }
    // Allow default touch behavior (scrolling)
    return true;
  };

  const handleTouchEnd = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Responsive styles with proper TypeScript types
  const styles = {
    section: {
      minHeight: '100dvh' as const,
      display: 'flex' as const,
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      padding: '1rem',
      paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))' as any,
      paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' as any,
      paddingLeft: 'max(1rem, env(safe-area-inset-left, 1rem))' as any,
      paddingRight: 'max(1rem, env(safe-area-inset-right, 1rem))' as any,
      position: 'relative' as const,
      overflow: 'visible' as const,
      WebkitOverflowScrolling: 'touch' as const,
      WebkitTouchCallout: 'none' as const,
      WebkitUserSelect: 'none' as const,
      userSelect: 'none' as const,
      touchAction: 'pan-y' as const,
    },
    heading: {
      fontFamily: '"Playlist Script", cursive',
      transform: `perspective(900px) rotateX(${tilt.y * -1}deg) rotateY(${tilt.x * 2}deg)`,
      lineHeight: '1.2',
      letterSpacing: '0.05em',
      textShadow: isDarkMode ? '0 0 15px rgba(0, 200, 200, 0.3)' : '0 0 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.1s ease-out',
      willChange: 'transform' as const,
      backfaceVisibility: 'hidden' as const,
    },
  };

  return (
    <section
      style={styles.section}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative z-10 text-center px-4 w-full"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
          <div className="relative">
            <div 
              className="absolute -right-8 sm:-right-10 -top-6 sm:-top-8 w-1 h-1 rounded-full" 
              style={{ 
                background: 'radial-gradient(circle, #ffffff 0%, #FFD700 30%, #00C8C8 60%, rgba(0,200,200,0) 70%)', 
                boxShadow: '0 0 12px rgba(255,215,0,0.95), 0 0 20px rgba(0,200,200,0.55)',
                animation: showContent ? 'starTravelHero .5s ease-out .3s forwards, sparklePulse .6s ease-in-out .3s infinite alternate' : 'none',
                filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.85))',
                pointerEvents: 'none',
                // Optimize for performance
                willChange: 'transform, opacity' as const,
                transform: 'translateZ(0)' as const,
                backfaceVisibility: 'hidden' as const,
                perspective: '1000px' as const
            }}></div>
            <div className="relative w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 mx-auto" style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 1.5s ease-in-out',
                transformStyle: 'preserve-3d',
                animation: showContent ? 'logoFlip 12s ease-in-out infinite' : 'none'
              }}>
                {/* Front side - Century 21 Logo */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  boxShadow: 'none'
                }}>
                  <img 
                    src="/Century 21.gif" 
                    alt="Century 21" 
                    className="w-full h-full object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 200, 0, 0.7))',
                      transform: 'rotateY(0deg)',
                      borderRadius: '12px',
                      animation: 'logoGlowPulseGold 3s ease-in-out infinite alternate'
                    }}
                  />
                </div>
                
                {/* Back side - KeyswithKani Logo */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  boxShadow: 'none'
                }}>
                  <img 
                    src="/keyswithKani.gif" 
                    alt="KeyswithKani" 
                    className="w-full h-full object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(0, 200, 200, 0.7))',
                      animation: 'logoGlowPulseGoldTeal 3s ease-in-out infinite alternate',
                      borderRadius: '12px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main headline with blinking dot */}
        <h1
          style={{
            ...styles.heading,
            fontFamily: '"ARTHA", sans-serif',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.3rem)',
            marginTop: '1.5rem',
            background: 'linear-gradient(90deg, #FFC000 0%, #FFD700 50%, #00C8C8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {displayText}
          {typingComplete && (
            <span className="relative" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: '0.1em',
              letterSpacing: '0',
              fontFamily: 'inherit'
            }}>
              <span style={{
                background: 'linear-gradient(90deg, #FFC000 0%, #FFD700 50%, #00C8C8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontFamily: 'inherit',
                letterSpacing: '0.2em',
                marginLeft: '0.1em',
                position: 'relative',
                paddingRight: '0.3em'
              }}>
                ..
                <span style={{
                  position: 'absolute',
                  right: '-0.1em',
                  top: '0',
                  opacity: showBlinkingDot ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                  background: 'inherit',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  .
                </span>
              </span>
            </span>
          )}
        </h1>
        {/* Subheading */}
        <div 
          className={`text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed mt-8 ${
            isDarkMode ? "text-[#2A2A2A]" : "text-[#2A2A2A]"
          } ${showBlinkingDot ? 'animate-float' : ''}`}
          style={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 400,
            textShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.6)" : "none",
            animation: showBlinkingDot ? 'blink 1s step-end infinite' : 'none'
          }}
        >
          <p>
            <span>Step into your next chapter with </span>
            <span style={{ color: "#B8860B" }}>confidence</span>
            <span>, </span>
            <span style={{ color: "#008B8B" }}>clarity</span>
            <span>, and </span>
            <span style={{ color: "#B8860B" }}>care</span>
            <span>.</span>
          </p>
          <div 
            className="mt-2" 
            style={{
              background: 'linear-gradient(90deg, #FFC000 0%, #FFD700 50%, #00C8C8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em',
              fontWeight: 'bold',
              display: 'inline-block',
              textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            WITH ME - Realtor Kanimozhi
          </div>
        </div>
        
        {/* Compact Countdown */}
        <div className="relative mt-10 mb-12 w-full max-w-md mx-auto px-4">
          <div className="relative z-10 text-center">
            <div className="mb-10">
              <h2 className="text-lg md:text-xl font-medium mb-3 text-[#2A2A2A] leading-tight">
              We are active now to guide your next home<br />
                <span className="text-sm md:text-base font-extrabold tracking-wide">WE'RE LAUNCHING IN PRODUCTION SOON</span>
              </h2>
              <p className="text-xs text-[#5A5A5A]">
                August 1, 2026
              </p>
            </div>
            
            {/* Compact countdown box */}
            <div className="relative rounded-xl overflow-hidden transition-all duration-300 mx-auto
              bg-[#F2F2F0] border-2 border-black p-3 max-w-xs"
              style={{
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
              
              {/* Subtle inner border */}
              <div className="absolute inset-0 border border-gray-200 rounded-xl pointer-events-none"></div>
              
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
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#00C8C8] bg-clip-text text-transparent">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-600">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Bottom border accent */}
                <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gray-200 rounded-full mt-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="mt-10">
          <p 
            className={`text-lg md:text-xl lg:text-xl font-normal ${
              isDarkMode ? "text-[#2A2A2A]" : "text-[#2A2A2A]"
            }`} 
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            <span>Contact us at</span>:{' '}
            <a 
              href="mailto:contact@keyswithkani.ca" 
              className={`font-bold ${
                isDarkMode 
                  ? "text-[#B8860B] hover:text-[#008B8B]" 
                  : "text-[#B8860B] hover:text-[#008B8B]"
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
