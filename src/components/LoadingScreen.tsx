import React, { useEffect, useState, memo } from 'react';
import '../styles/fonts.css';

const LoadingScreen: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const translate = (factor: number) => `translate(${mouse.x * factor}px, ${mouse.y * factor}px)`;

  // Reduce particle count for better performance
  const particles = Array.from({ length: 30 }).map((_, i) => (
    <div
      key={i}
      className="absolute rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        backgroundColor: '#00C8C8',
        opacity: Math.random() * 0.5 + 0.1,
        animation: `particleFloat ${Math.random() * 4 + 2}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`,
        transform: `translate(${mouse.x * 3}px, ${mouse.y * 3}px)`, // Reduce mouse effect
      }}
    />
  ));

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black pointer-events-none" style={{ animation: "fadeOutContainer .4s ease-out 1.4s forwards" }}>
      {/* Background effects to match main page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-36 -left-36 w-80 h-80 rounded-full blur-2xl opacity-10" style={{ backgroundColor: "#FFD700", transform: translate(6) }} />
        <div className="absolute -bottom-40 -right-32 w-64 h-64 rounded-full blur-2xl opacity-6" style={{ backgroundColor: "#00C8C8", transform: translate(-5) }} />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full blur-xl opacity-5" style={{ backgroundColor: "#00C8C8", transform: translate(4) }} />
      </div>
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-0" style={{ animation: "vignette 0.5s ease-out forwards" }} />
        <div className="relative flex flex-col items-center justify-center">
          {/* Container for content with large glowing dot behind */}
          <div style={{ 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Large glowing dot centered behind GIF and text - ripple from center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-10" style={{ 
              width: 400, 
              height: 400, 
              background: 'radial-gradient(circle, rgba(0,200,200,0.6) 0%, rgba(0,200,200,0.3) 40%, rgba(0,200,200,0) 70%)',
              filter: 'drop-shadow(0 0 40px rgba(0,200,200,0.5))',
              animation: "ripple 1.8s ease-out infinite both, pulseGlowTeal 2.5s infinite" 
            }} />
            
            <div style={{ width: "min(90vw, 900px)", perspective: "1000px", transformStyle: "preserve-3d", position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ transformOrigin: "50% 50%", backfaceVisibility: "hidden", willChange: "transform, opacity", animation: "zoomFlip .7s cubic-bezier(.2,.7,.2,1) .1s both", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Logo with same animation as main page */}
                <div className="relative inline-block">
                  {/* Sparkle effect */}
                  <div className="absolute -right-10 -top-8 w-1 h-1 rounded-full" style={{ 
                    background: 'radial-gradient(circle, #ffffff 0%, #FFD700 30%, #00C8C8 60%, rgba(0,200,200,0) 70%)', 
                    boxShadow: '0 0 12px rgba(255,215,0,0.95), 0 0 20px rgba(0,200,200,0.55)',
                    animation: 'starTravelHero .5s ease-out .3s forwards, sparklePulse .6s ease-in-out .3s infinite alternate',
                    filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.85))',
                    pointerEvents: 'none'
                  }}></div>
                  
                  {/* Logo with glow */}
                  <img 
                    src="/keyswithKani.gif" 
                    alt="Keyswithkani" 
                    className="h-24 md:h-36 lg:h-48 w-auto mx-auto" 
                    style={{ 
                      filter: 'none', 
                      borderRadius: 16,
                      animation: 'logoGlowPulseGoldTeal 4s ease-in-out 1.05s infinite alternate'
                    }} 
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10" style={{
                    background: 'radial-gradient(circle at center, rgba(0,200,200,0.4) 0%, rgba(0,200,200,0) 60%)',
                    filter: 'blur(15px)',
                    opacity: 0.7,
                    animation: 'pulseGlow 3s ease-in-out infinite'
                  }}></div>
                </div>
              </div>
              {/* Elegant loading text */}
              <div className="mt-8 relative z-10 text-center">
                <h2 className="text-5xl md:text-7xl" style={{
                  fontFamily: 'PARTMEDIA, sans-serif',
                  letterSpacing: '0.1em',
                  fontWeight: 400,
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  <span style={{
                    background: 'linear-gradient(90deg, #FFD700 0%, #00C8C8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Keyswithkani
                  </span>
                </h2>
                <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#FFD700] to-[#00C8C8] mx-auto rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoadingScreen);