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

  // Track visitor counts with state
  const [todaysCount, setTodaysCount] = useState(Math.floor(Math.random() * 27) + 12); // Start with 12-38 visitors
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  // Calculate visitor count with gradual daily increase
  const calculateDailyCount = useCallback((): VisitorCount => {
    const now = new Date();
    const todayString = now.toDateString();
    
    // Base starting count
    const baseCount = 4038; // Starting from 4,038
    
    // Get time progress through the day (0 to 1)
    const minutesInDay = 24 * 60;
    const currentMinute = now.getHours() * 60 + now.getMinutes();
    const minuteProgress = currentMinute / minutesInDay;
    
    // Generate a daily seed based on the date for consistent daily values
    const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Generate a random but consistent daily visitor count between 30-56 (average ~43)
    const dailyVariation = Math.floor(random(dateSeed) * 27) - 13; // -13 to +13
    const dailyIncrement = 43 + dailyVariation;
    
    // Calculate today's target visitors so far
    const targetTodaysVisitors = Math.floor(dailyIncrement * Math.min(1, minuteProgress));
    
    // Calculate total count
    const totalCount = baseCount + targetTodaysVisitors;
    
    return {
      totalCount: baseCount + todaysCount,
      todaysVisitors: todaysCount,
      lastUpdated: now
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
    // Update every 30-90 seconds for smooth progression
    const getNextUpdateTime = () => (30 + Math.random() * 60) * 1000; // 30-90 seconds
    
    // Function to update the counter
    const updateCounter = () => {
      const now = new Date();
      const hours = now.getHours();
      
      // More visitors during peak hours (10 AM - 10 PM)
      const isPeakHours = hours >= 10 && hours < 22;
      const baseIncrement = isPeakHours ? 2 : 1;
      const randomIncrement = Math.floor(Math.random() * (isPeakHours ? 3 : 2)); // 0-2 or 0-1
      const increment = baseIncrement + randomIncrement;
      
      setTodaysCount(prev => {
        const newCount = prev + increment;
        // Calculate daily target based on time of day (30-56 per day)
        const dailyTarget = 43 + (Math.sin(now.getDate()) * 13); // 30-56
        const maxForToday = Math.min(
          dailyTarget,
          dailyTarget * (now.getHours() / 24) * 1.5 // Cap at 1.x the expected for current hour
        );
        return Math.min(newCount, Math.floor(maxForToday));
      });
      
      // Schedule next update
      const nextUpdate = getNextUpdateTime();
      const timeoutId = setTimeout(updateCounter, nextUpdate);
      
      return () => clearTimeout(timeoutId);
      
    };
    
    // Initial update
    const timeoutId = setTimeout(updateCounter, getNextUpdateTime());
    
    // Reset at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - now.getTime();
    
    const midnightTimeout = setTimeout(() => {
      setTodaysCount(Math.floor(Math.random() * 10) + 5); // Start new day with 5-14 visitors
    }, timeUntilMidnight);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(midnightTimeout);
    };
  }, []);
  
  // Update display count whenever today's count changes
  useEffect(() => {
    if (todaysCount > 0) { // Only update if we have visitors
      setDisplayCount(4038 + todaysCount);
      setLastUpdateDate(new Date().toLocaleTimeString());
      
      // Force a re-render to ensure the counter updates
      const timer = setTimeout(() => {
        setTodaysCount(prev => Math.max(prev, todaysCount));
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [todaysCount]);

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