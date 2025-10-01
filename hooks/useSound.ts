
import { useState, useEffect } from 'react';

const useSound = (url: string, play: boolean) => {
  const [audio] = useState(() => {
    if (typeof Audio !== 'undefined') {
      const audioInstance = new Audio(url);
      audioInstance.loop = true;
      audioInstance.volume = 0.1;
      return audioInstance;
    }
    return null;
  });

  useEffect(() => {
    if (!audio) return;

    if (play) {
      audio.play().catch(error => {
        // Autoplay was prevented.
        console.warn("Audio autoplay was prevented:", error);
      });
    } else {
      audio.pause();
    }
  }, [play, audio]);

  useEffect(() => {
    return () => {
      if(audio) {
        audio.pause();
      }
    };
  }, [audio]);
};

export default useSound;
