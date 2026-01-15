import React, { useEffect, useMemo, useState, memo } from "react";
import { keyframes } from '@emotion/react';

// Keyframes for animations
const sparkle = keyframes`
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(0); }
`;

const snowfall = keyframes`
  0% { transform: translateY(-10px) translateX(0) rotate(0deg); }
  100% { transform: translateY(100vh) translateX(20px) rotate(360deg); }
`;

// Add global styles for animations
const globalStyles = `
  @keyframes sparkle {
    0% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1.5); }
    100% { opacity: 0; transform: scale(0); }
  }
  
  @keyframes snowfall {
    0% { transform: translateY(-10px) translateX(0) rotate(0deg); }
    100% { transform: translateY(100vh) translateX(20px) rotate(360deg); }
  }
`;

// Inject global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = globalStyles;
  document.head.appendChild(style);
}

// Sparkles Component
const Sparkles = memo(({ count = 30 }: { count: number }) => {
  const sparkles = useMemo(() => Array.from({ length: count }), [count]);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((_, i) => {
        const size = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        const duration = Math.random() * 2 + 1.5;
        const opacity = Math.random() * 0.5 + 0.1;
        
        return (
          <div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: '#00C8C8',
              opacity: 0,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${size * 2}px ${size * 0.5}px rgba(0, 200, 200, ${opacity})`,
              animation: `sparkle ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
});

// Snowflakes Component
const Snowflakes = memo(({ count = 50 }: { count: number }) => {
  const snowflakes = useMemo(() => Array.from({ length: count }), [count]);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.3 + 0.1;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 5;
        
        return (
          <div
            key={`snowflake-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: '#00C8C8',
              opacity: opacity,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${size * 2}px ${size * 0.5}px rgba(0, 200, 200, ${opacity})`,
              animation: `snowfall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
            }}
          />
        );
      })}
    </div>
  );
});

// Particles Component (updated)
const Particles = memo(({ color = "#00C8C8", count = 30, intensity = 0.8 }: { color: string; count: number; intensity: number }) => {
  const dots = useMemo(() => Array.from({ length: count }), [count]);
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

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor: color,
            opacity: Math.max(0.05, (Math.random() * 0.4 + 0.1) * intensity),
            animation: `particleFloat ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            transform: `translate(${mouse.x * 3}px, ${mouse.y * 3}px)`,
          }}
        />
      ))}
    </div>
  );
});

interface EffectsBackgroundProps {
  isDarkMode: boolean;
}

const EffectsBackground = ({ isDarkMode }: EffectsBackgroundProps) => {
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

  return (
    <div className="fixed inset-0 -z-10">
      {/* Winter Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#F2F2F0] via-[#E8E8E5] to-[#E0E0DD]" />
      
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-teal-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
        <Sparkles count={isDarkMode ? 40 : 20} />
        <Snowflakes count={isDarkMode ? 50 : 25} />
        
        {/* Additional teal glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-teal-500/5 blur-[100px]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-teal-500/5 blur-[100px]" />
          <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-teal-500/5 blur-[80px]" />
        </div>
      </div>
      
      {/* Winter Effects */}
      <Sparkles count={15} />
      <Snowflakes count={30} />
      <Particles color="rgba(35, 35, 35, 0.15)" count={20} intensity={0.4} />
      
      {/* Frosted Glass Effect */}
      <div className="fixed inset-0" style={{ 
        background: 'radial-gradient(600px circle at 20% 30%, rgba(255,215,0,0.02), transparent 50%), ' +
                   'radial-gradient(800px circle at 80% 70%, rgba(0,200,200,0.02), transparent 60%)',
        backdropFilter: 'blur(1px)'
      }} />
      
      {/* Subtle Snowfall Overlay */}
      <div className="fixed inset-0" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        opacity: 0.5
      }} />
    </div>
  );
};

export default memo(EffectsBackground);