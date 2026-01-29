import React from 'react';

const GlobalStyles: React.FC<{ isDarkMode: boolean }> = () => {
  return (
    <style>{`
      /* Base responsive styles */
      :root {
        --safe-area-inset-top: env(safe-area-inset-top, 0px);
        --safe-area-inset-right: env(safe-area-inset-right, 0px);
        --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
        --safe-area-inset-left: env(safe-area-inset-left, 0px);
      }

      /* Reset and base styles */
      *, *::before, *::after {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      html {
        height: 100%;
        overflow-x: hidden;
        touch-action: manipulation;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        scroll-behavior: smooth;
      }

      body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
        min-height: 100dvh;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0;
        margin: 0;
        width: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        overscroll-behavior-y: auto;
        scroll-snap-type: y proximity;
      }
      
      /* Optimize for smooth scrolling on iOS */
      @supports (-webkit-touch-callout: none) {
        body {
          position: fixed;
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
        }
      }

      /* Responsive typography */
      html {
        font-size: 16px;
      }

      @media (max-width: 768px) {
        html {
          font-size: 15px;
        }
      }

      @media (max-width: 480px) {
        html {
          font-size: 14px;
        }
      }

      /* Prevent horizontal scroll */
      img, svg, video, canvas, iframe {
        max-width: 100%;
        height: auto;
      }

      /* Better touch targets */
      button, [role="button"], input[type="submit"], input[type="button"] {
        min-height: 44px;
        min-width: 44px;
      }

      /* Smooth scrolling for iOS */
      @supports (-webkit-touch-callout: none) {
        body {
          height: -webkit-fill-available;
        }
      }

      /* Animation performance */
      .animate-optimize {
        will-change: transform, opacity;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
        /* Improve animation performance */
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        -webkit-backface-visibility: hidden;
      }
      
      /* Optimize fixed/absolute positioned elements */
      .fixed, .absolute {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      
      /* Blinking cursor animation */
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      
      @keyframes textFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
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