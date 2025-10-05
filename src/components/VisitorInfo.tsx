import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { FC } from 'react';

interface EyeIconProps {
  className?: string;
}

const EyeIcon: FC<EyeIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

interface VisitorInfoProps {
  isDarkMode: boolean;
}

interface VisitorCount {
  totalCount: number;
  todaysVisitors: number;
  lastUpdated: Date;
}

const VisitorInfo: React.FC<VisitorInfoProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(4038);
  const [lastEmailSent, setLastEmailSent] = useState<Date | null>(null);
  const [lastUpdateDate, setLastUpdateDate] = useState<string>('');

  // Calculate daily visitor count with natural variation
  const calculateDailyCount = useCallback((): VisitorCount => {
    const today = new Date();
    const todayString = today.toDateString();
    
    // Base starting count - reset to today's date
    const baseCount = 4038; // Starting from 4,038
    
    // Always treat today as the first day
    const daysSinceStart = 0;
    
    // Generate a daily seed based on the date for consistent daily values
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Generate a random but consistent daily visitor count between 30-56 (average ~43)
    const dailyVariation = Math.floor(random(dateSeed) * 27) - 13; // -13 to +13
    const dailyIncrement = 43 + dailyVariation;
    
    // Calculate total count - just the base count plus today's visitors
    const totalCount = baseCount + dailyIncrement;
    
    return {
      totalCount,
      todaysVisitors: dailyIncrement,
      lastUpdated: today
    };
  }, []);

  // Function to animate the counter
  const animateCounter = (target: number) => {
    const duration = 2000; // 2 seconds for the animation
    const start = displayCount;
    const difference = target - start;
    if (difference === 0) return () => {};
    
    const stepTime = Math.max(10, Math.min(50, Math.floor(duration / Math.abs(difference))));
    const increment = difference > 0 ? 1 : -1;

    const timer = setInterval(() => {
      setDisplayCount(prev => {
        const newCount = prev + increment;
        if ((increment > 0 && newCount >= target) || (increment < 0 && newCount <= target)) {
          clearInterval(timer);
          return target;
        }
        return newCount;
      });
    }, stepTime);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    // Set initial count
    const { totalCount } = calculateDailyCount();
    setDisplayCount(totalCount);
    
    // Update once per day at midnight
    const updateAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Next midnight
      
      const timeUntilMidnight = midnight.getTime() - now.getTime();
      
      return setTimeout(() => {
        const newCounts = calculateDailyCount();
        setDisplayCount(newCounts.totalCount);
        setLastUpdateDate(now.toDateString());
        
        // Schedule next update for the following day
        updateAtMidnight();
      }, timeUntilMidnight);
    };
    
    // Start the daily update cycle
    const timeoutId = updateAtMidnight();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [calculateDailyCount]);

  const cardClasses = `p-3 rounded-lg text-xs whitespace-nowrap backdrop-blur-md border transition-all duration-300 ${
    isDarkMode
      ? "bg-black/30 border-[#00C8C8]/30 text-[#00C8C8] hover:bg-[#00C8C8]/20"
      : "bg-white/70 border-[#00C8C8]/40 text-[#00C8C8] hover:bg-[#00C8C8]/20"
  }`;

  const labelTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-300 ease-in-out">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? 'bg-black/30 border-[#00C8C8]/30 text-[#00C8C8] hover:bg-[#00C8C8]/20'
            : 'bg-white/70 border-[#00C8C8]/40 text-[#00C8C8] hover:bg-[#00C8C8]/20'
        } ${isOpen ? 'rotate-180' : ''}`}
      >
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <EyeIcon className="w-5 h-5" />
        </div>
      </button>

      {/* Dropdown Content - Simplified to show only visitor count */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col items-end gap-2 mt-2">
          {/* Visitor Count Only */}
          <div className={`${cardClasses} flex items-center gap-2`}>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                    {displayCount.toLocaleString()}
                  </span>
                  <span className="absolute -right-1 -top-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                  +{calculateDailyCount().todaysVisitors} today
                </span>
              </div>
              <span className={`text-[10px] ${labelTextClasses}`}>Total Visitors</span>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default VisitorInfo;