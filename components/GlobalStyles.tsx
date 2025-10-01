import React from 'react';

const GlobalStyles: React.FC<{ isDarkMode: boolean }> = () => {
  // The isDarkMode prop is not directly used here because theme-specific styles
  // are handled via the `html.dark` class selector, which is toggled in `useComingSoon.ts`.
  // This approach aligns with Tailwind CSS's dark mode strategy.
  return (
    <style>{`
      body {
        /* Smooth scrolling for anchor links */
        scroll-behavior: smooth;
      }
      
      @keyframes zoomFlip {
        0% { transform: scale(0.8) rotateY(90deg); opacity: 0; }
        100% { transform: scale(1) rotateY(0deg); opacity: 1; }
      }
      @keyframes starTravelHero {
        0% { transform: translate(0, 0) scale(0); opacity: 0; }
        100% { transform: translate(-20px, 20px) scale(1); opacity: 1; }
      }
      @keyframes sparklePulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
      }
      @keyframes heroGlowOn {
        from { filter: drop-shadow(0 0 0px rgba(255,215,0,0)); }
        to { filter: drop-shadow(0 0 16px rgba(255,215,0,0.45)); }
      }
      @keyframes logoGlowPulse {
        0%, 100% { 
          box-shadow: 0 0 10px 2px rgba(255,215,0,0.6), 
                      0 0 20px 5px rgba(255,215,0,0.4); 
        }
        50% { 
          box-shadow: 0 0 15px 4px rgba(255,215,0,0.8), 
                      0 0 30px 10px rgba(255,215,0,0.5);
        }
      }
      @keyframes logoGlowPulseTeal {
        0%, 100% { 
          box-shadow: 0 0 10px 2px rgba(0,200,200,0.6), 
                      0 0 20px 5px rgba(0,200,200,0.4); 
        }
        50% { 
          box-shadow: 0 0 15px 4px rgba(0,200,200,0.8), 
                      0 0 30px 10px rgba(0,200,200,0.5);
        }
      }
      @keyframes logoGlowPulseGoldTeal {
        0%, 100% { 
          box-shadow: 0 0 10px 2px rgba(255,215,0,0.6), 
                      0 0 20px 5px rgba(0,200,200,0.4); 
        }
        50% { 
          box-shadow: 0 0 15px 4px rgba(255,215,0,0.8), 
                      0 0 30px 10px rgba(0,200,200,0.5);
        }
      }
      @keyframes dotsBlink {
        50% {
          opacity: 0;
        }
      }
      @keyframes textFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes fadeOutContainer {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      @keyframes vignette {
        from { opacity: 0; }
        to { opacity: 0.7; }
      }
      @keyframes ripple {
        from { transform: scale(0); opacity: 1; }
        to { transform: scale(4); opacity: 0; }
      }
      @keyframes textStroke {
        to { stroke-dashoffset: 0; }
      }
      @keyframes textFill {
        to { fill: url(#goldGradient); stroke-width: 0; }
      }
      @keyframes glowOn {
        to { filter: drop-shadow(0 0 8px rgba(255,215,0,0.7)); }
      }
      @keyframes starTravel {
        0% { transform: translate(260px, -180px) scale(0); opacity: 0; }
        100% { transform: translate(380px, -120px) scale(1); opacity: 1; }
      }
      @keyframes successPulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4);
        }
        50% {
          transform: scale(1.02);
          box-shadow: 0 0 0 15px rgba(74, 222, 128, 0);
        }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
        }
        50% {
          box-shadow: 0 10px 35px rgba(255, 215, 0, 0.6);
        }
      }
      @keyframes pulseGlowTeal {
        0%, 100% {
          box-shadow: 0 10px 25px rgba(0, 200, 200, 0.4);
        }
        50% {
          box-shadow: 0 10px 35px rgba(0, 200, 200, 0.6);
        }
      }
      @keyframes pulseGlowGoldTeal {
        0%, 100% {
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4),
                      0 10px 25px rgba(0, 200, 200, 0.4);
        }
        50% {
          box-shadow: 0 10px 35px rgba(255, 215, 0, 0.6),
                      0 10px 35px rgba(0, 200, 200, 0.6);
        }
      }
      @keyframes particleFloat {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }

      /* Custom scrollbar for dark mode */
      html.dark ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      html.dark ::-webkit-scrollbar-track {
        background: #111;
      }
      html.dark ::-webkit-scrollbar-thumb {
        background-color: #FFD700; /* Bright gold */
        border-radius: 10px;
        border: 3px solid #111;
        background-image: linear-gradient(45deg, #FFD700 0%, #00C8C8 100%);
      }
      html.dark ::-webkit-scrollbar-thumb:hover {
        background-color: #00C8C8; /* Teal */
        background-image: linear-gradient(45deg, #00C8C8 0%, #FFD700 100%);
      }

      /* Custom scrollbar for light mode */
      html:not(.dark) ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      html:not(.dark) ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      html:not(.dark) ::-webkit-scrollbar-thumb {
        background-color: #FFD700; /* Bright gold */
        border-radius: 10px;
        border: 3px solid #f1f1f1;
        background-image: linear-gradient(45deg, #FFD700 0%, #00C8C8 100%);
      }
      html:not(.dark) ::-webkit-scrollbar-thumb:hover {
        background-color: #00C8C8; /* Teal */
        background-image: linear-gradient(45deg, #00C8C8 0%, #FFD700 100%);
      }
    `}</style>
  );
};

export default GlobalStyles;