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

    const typeTimer = setInterval(() => {
      if (index < baseText.length) {
        setDisplayText(baseText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeTimer);
        setTypingComplete(true);

        const typeDots = () => {
          if (dotCount < 2) {
            setDots('.'.repeat(dotCount + 1));
            dotCount++;
            setTimeout(typeDots, 200); // Delay between dots
          } else if (dotCount === 2) {
            // Add the third dot and start blinking
            setDots('..'); // Show only two dots initially
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
        typeDots();
      }
    }, 45); // Typing speed

    return () => {
      if (dotInterval) clearInterval(dotInterval);
    };
  }, [start, text]);

  return { 
    displayText,
    dots,
    showBlinkingDot,
    typingComplete
  };
}
