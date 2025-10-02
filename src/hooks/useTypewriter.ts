import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, start: boolean) {
  const [displayText, setDisplayText] = useState("");
  const [showBlinkingDot, setShowBlinkingDot] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Use refs to store interval IDs
  const dotIntervalRef = useRef<number | undefined>(undefined);
  const typeTimerRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    if (!start) return;

    // Clear any existing state
    setDisplayText("");
    setShowBlinkingDot(false);
    setTypingComplete(false);

    const baseText = text.endsWith('...') ? text.slice(0, -3) : text;
    let index = 0;

    // Clear any existing intervals
    if (dotIntervalRef.current) window.clearInterval(dotIntervalRef.current);
    if (typeTimerRef.current) window.clearInterval(typeTimerRef.current);

    typeTimerRef.current = window.setInterval(() => {
      if (index < baseText.length) {
        setDisplayText(baseText.slice(0, index + 1));
        index++;
      } else {
        if (typeTimerRef.current) {
          window.clearInterval(typeTimerRef.current);
        }
        
        setTypingComplete(true);
        
        // Start blinking the dot
        let show = true;
        setShowBlinkingDot(show);
        
        if (dotIntervalRef.current) {
          window.clearInterval(dotIntervalRef.current);
        }
        
        dotIntervalRef.current = window.setInterval(() => {
          show = !show;
          setShowBlinkingDot(show);
        }, 500);
      }
    }, 45);

    return () => {
      if (dotIntervalRef.current) window.clearInterval(dotIntervalRef.current);
      if (typeTimerRef.current) window.clearInterval(typeTimerRef.current);
    };
  }, [start, text]);

  return { 
    displayText,
    showBlinkingDot,
    typingComplete
  };
}
