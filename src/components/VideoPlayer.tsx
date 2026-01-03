import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
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

interface VideoPlayerProps {
  onVideoEnd: () => void;
}

const Sparkles = memo(({ count = 20 }: { count: number }) => {
  const sparkles = useMemo(() => Array.from({ length: count }), [count]);
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {sparkles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: ['#FFD700', '#00C8C8', '#232323'][Math.floor(Math.random() * 3)],
            opacity: 0,
            animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
            boxShadow: `0 0 ${Math.random() * 6 + 4}px ${['#FFD700', '#00C8C8', '#232323'][Math.floor(Math.random() * 3)]}`
          }}
        />
      ))}
    </div>
  );
});

const Snowflakes = memo(({ count = 30 }: { count: number }) => {
  const snowflakes = useMemo(() => Array.from({ length: count }), [count]);
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {snowflakes.map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: '#FFFFFF',
            opacity: Math.random() * 0.6 + 0.2,
            borderRadius: '50%',
            animation: `snowfall ${10 + Math.random() * 20}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
});

const Particles = memo(({ color = "#00C8C8", count = 50, intensity = 0.8 }: { color: string; count: number; intensity: number }) => {
  const dots = Array.from({ length: count });
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
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
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

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onVideoEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const isDarkMode = true;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video source and handle loading
    video.src = '/2026.mp4';
    video.load();

    const handleCanPlay = async () => {
      try {
        // Try to enter fullscreen
        if (document.documentElement.requestFullscreen) {
          try {
            await document.documentElement.requestFullscreen();
          } catch (err) {
            console.warn('Fullscreen error:', err);
          }
        }

        // Start playback
        await video.play();
        console.log('Video playback started');
      } catch (err) {
        console.error('Error playing video:', err);
        // If auto-play fails, show controls
        video.controls = true;
      }
    };

    const handleEnded = () => {
      console.log('Video playback ended');
      onVideoEnd();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onVideoEnd]);

  const translate = (factor: number) => `translate(${mouse.x * factor}px, ${mouse.y * factor}px)`;

  return (
    <div className="fixed inset-0 -z-10">
      {/* Winter Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#100C08] via-[#1A1A1A] to-[#0A0A0A]" />
      
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-36 -left-36 w-80 h-80 rounded-full blur-2xl opacity-15" 
          style={{ 
            background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)',
            transform: translate(6) 
          }} />
        <div className="absolute -bottom-40 -right-32 w-64 h-64 rounded-full blur-2xl opacity-10" 
          style={{ 
            background: 'radial-gradient(circle, rgba(0,200,200,0.15) 0%, rgba(0,200,200,0) 70%)',
            transform: translate(-5) 
          }} />
      </div>
      
      {/* Winter Effects */}
      <Sparkles count={25} />
      <Snowflakes count={40} />
      <Particles color="#00C8C8" count={30} intensity={0.6} />
      
      {/* Frosted Glass Effect */}
      <div className="fixed inset-0" style={{ 
        background: 'radial-gradient(600px circle at 20% 30%, rgba(255,215,0,0.03), transparent 50%), ' +
                   'radial-gradient(800px circle at 80% 70%, rgba(0,200,200,0.03), transparent 60%)',
        backdropFilter: 'blur(1px)'
      }} />
      
      {/* Subtle Snowfall Overlay */}
      <div className="fixed inset-0" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        opacity: 0.6
      }} />
      
      {/* Video container */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)' // Slightly transparent to show background
      }}>
        <video
          ref={videoRef}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            boxShadow: '0 0 100px rgba(0, 0, 0, 0.8)'
          }}
          playsInline
          muted
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default memo(VideoPlayer);
