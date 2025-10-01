import { useState, useEffect } from "react";

export function useTypewriter(text: string, start: boolean) {
  const [displayText, setDisplayText] = useState("");
  const [dots, setDots] = useState("");
  const [showBlinkingDot, setShowBlinkingDot] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (!start) return;

    // Clear any existing state
    setDisplayText("");
    setDots("");
    setShowBlinkingDot(false);
    setTypingComplete(false);

    const baseText = text.endsWith('...') ? text.slice(0, -3) : text;
    let index = 0;
    let dotCount = 0;
    let dotInterval: NodeJS.Timeout;

    const typeDots = () => {
      if (dotCount < 2) {
        setDots('.'.repeat(dotCount + 1));
        dotCount++;
        setTimeout(typeDots, 200); // Delay between dots
      } else if (dotCount === 2) {
        // Add the third dot and start blinking
        setDots('...');
        setTypingComplete(true);
        // Start blinking the third dot after a short delay
        setTimeout(() => {
          let show = true;
          setShowBlinkingDot(show);
          dotInterval = setInterval(() => {
            show = !show;
            setShowBlinkingDot(show);
          }, 500);
        }, 200);
        dotCount++;
      }
    };

    // Type the main text first
    const typeTimer = setInterval(() => {
      if (index < baseText.length) {
        setDisplayText(baseText.slice(0, index + 1));
        index++;
      } else if (dots.length < 3) {
        clearInterval(typeTimer);
        // Start typing dots after main text is complete
        typeDots();
      }
    }, 45); // Typing speed

    return () => {
      clearInterval(typeTimer);
      if (dotInterval) clearInterval(dotInterval);
    };
  }, [start, text]);

  return { 
    typewriterText: displayText,
    dots,
    showBlinkingDot,
    showDots: displayText.length > 0,
    typingComplete
  };
}
