import React, { useEffect, useRef, useState, memo } from 'react';

interface VideoPlayerProps {
  onVideoEnd: () => void;
}

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
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#100C08] via-gray-950 to-[#100C08]" />
      
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-36 -left-36 w-80 h-80 rounded-full blur-2xl opacity-10" 
          style={{ backgroundColor: "#FFD700", transform: translate(6) }} />
        <div className="absolute -bottom-40 -right-32 w-64 h-64 rounded-full blur-2xl opacity-6" 
          style={{ backgroundColor: "#00C8C8", transform: translate(-5) }} />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full blur-xl opacity-5" 
          style={{ backgroundColor: "#00C8C8", transform: translate(4) }} />
      </div>
      
      {/* Particles */}
      <Particles color="#00C8C8" count={50} intensity={0.8} />
      
      {/* Radial gradient overlay */}
      <div className="fixed inset-0" style={{ 
        background: "radial-gradient(600px circle at 20% 20%, rgba(255,215,0,0.06), transparent 40%), " +
                   "radial-gradient(800px circle at 80% 80%, rgba(0,200,200,0.04), transparent 50%)" 
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
