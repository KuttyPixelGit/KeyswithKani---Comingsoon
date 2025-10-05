import React, { useState, useEffect } from 'react';
import EyeIcon from './icons/EyeIcon';

interface VisitorInfoProps {
  isDarkMode: boolean;
}

const VisitorInfo: React.FC<VisitorInfoProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Initialize or update counts from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lastUpdated');
    let storedTodayCount = parseInt(localStorage.getItem('todayCount') || '0');
    let storedWeeklyCount = 2039; // Set initial weekly count to 2039
    
    // Base daily increase between 50-60
    const getDailyIncrease = () => 50 + Math.floor(Math.random() * 11);
    // Weekly multiplier between 7-10x
    const getWeeklyMultiplier = () => 7 + Math.floor(Math.random() * 4);

    // Check if it's a new day
    if (storedDate !== today) {
      const isNewWeek = storedDate && (new Date(storedDate).getDay() === 0);
      const dailyIncrease = getDailyIncrease();
      
      // Calculate new counts
      const newTodayCount = storedDate ? dailyIncrease : getDailyIncrease();
      
      // Calculate weekly count to be 7-10x today's count
      const multiplier = getWeeklyMultiplier();
      let newWeeklyCount = newTodayCount * multiplier;
      
      // If not a new week, make sure weekly count is at least 7x today's count
      if (!isNewWeek && storedWeeklyCount > 0) {
        newWeeklyCount = Math.max(storedWeeklyCount, newTodayCount * 7);
      }
      
      // Update state and storage
      setTodayCount(newTodayCount);
      setWeeklyCount(newWeeklyCount);
      localStorage.setItem('todayCount', newTodayCount.toString());
      localStorage.setItem('weeklyCount', newWeeklyCount.toString());
      localStorage.setItem('lastUpdated', today);
    } else {
      // Same day, ensure weekly is at least 7x today's count
      const minWeeklyCount = Math.max(storedWeeklyCount, storedTodayCount * 7);
      setTodayCount(storedTodayCount);
      setWeeklyCount(minWeeklyCount);
      if (minWeeklyCount > storedWeeklyCount) {
        localStorage.setItem('weeklyCount', minWeeklyCount.toString());
      }
    }
    
    setLastUpdated(new Date());

    // Simulate visitor growth over time
    const updateInterval = setInterval(() => {
      setTodayCount(prevToday => {
        const increment = Math.floor(Math.random() * 3) + 1; // 1-3
        const newTodayCount = prevToday + increment;
        localStorage.setItem('todayCount', newTodayCount.toString());
        
        // Update weekly count to be at least 7x today's count
        setWeeklyCount(prevWeekly => {
          const minWeeklyCount = Math.max(prevWeekly, newTodayCount * 7);
          const weeklyIncrement = Math.floor(Math.random() * 3) + 1; // 1-3
          const newWeeklyCount = Math.max(minWeeklyCount, prevWeekly + weeklyIncrement);
          localStorage.setItem('weeklyCount', newWeeklyCount.toString());
          return newWeeklyCount;
        });
        
        return newTodayCount;
      });
      
      // Update the last updated time
      setLastUpdated(new Date());
    }, 15000); // Update every 15 seconds for smoother animation

    // Cleanup interval on component unmount
    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  const cardClasses = `p-4 rounded-lg backdrop-blur-md border-2 transition-all duration-300 text-white relative overflow-hidden group ${
    isDarkMode
      ? "bg-gradient-to-br from-black/60 to-gray-900/80 border-[#D4AF37]/50 hover:border-[#D4AF37]/80 shadow-lg"
      : "bg-gradient-to-br from-white/90 to-gray-100/80 border-teal-300/50 hover:border-teal-400/80 shadow-lg"
  } 
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#D4AF37]/10 before:to-[#00C4CC]/10 
    before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
    after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
    after:from-[#D4AF37]/5 after:via-transparent after:to-transparent after:opacity-0 
    group-hover:after:opacity-100 after:transition-opacity after:duration-500 after:delay-100`;

  const buttonClasses = `p-3 rounded-full backdrop-blur-md border-2 transition-all duration-300 hover:scale-110 relative overflow-hidden group ${
    isDarkMode
      ? "bg-gradient-to-br from-black/60 to-gray-900/80 border-[#D4AF37]/50 hover:border-[#D4AF37]/80 text-[#D4AF37] hover:text-white shadow-lg"
      : "bg-gradient-to-br from-white/90 to-gray-100/80 border-teal-300/50 hover:border-teal-400/80 text-teal-600 hover:text-teal-800 shadow-lg"
  }
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#D4AF37]/20 before:to-[#00C4CC]/20 
    before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
    after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
    after:from-[#D4AF37]/10 after:via-transparent after:to-transparent after:opacity-0 
    group-hover:after:opacity-100 after:transition-opacity after:duration-500 after:delay-100`;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 transition-all duration-300 ease-in-out">
      <style>{`
        .glow-effect {
          position: relative;
        }
        .glow-effect::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          padding: 2px;
          background: linear-gradient(45deg, #D4AF37, #00C4CC, #D4AF37);
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        .glow-effect:hover::before {
          opacity: 1;
          animation: border-glow 2s ease-in-out infinite alternate;
        }
        @keyframes border-glow {
          from {
            box-shadow: 0 0 5px #D4AF37, 0 0 10px #D4AF37, 0 0 15px #D4AF37;
          }
          to {
            box-shadow: 0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 30px #D4AF37;
          }
        }
      `}</style>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClasses} ${isOpen ? 'rotate-180' : ''}`}
        aria-label={isOpen ? 'Hide visitor info' : 'Show visitor info'}
      >
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
          <EyeIcon className="w-5 h-5" />
        </div>
      </button>

      {/* Dropdown Content */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col items-end gap-3 mt-3">
          {/* Today's Visitors */}
          <div className={`${cardClasses} w-48 glow-effect`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">{todayCount.toLocaleString()}</span>
                <span className="text-xs text-white/80">Visitors Today</span>
              </div>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#D4AF37] to-[#00C4CC] h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_2px_rgba(212,175,55,0.4)]"
                style={{ width: `${Math.min(100, (todayCount % 1000) / 10 + 20)}%` }}
                aria-hidden="true"
              ></div>
            </div>
          </div>

          {/* Weekly Visitors */}
          <div className={`${cardClasses} w-48 glow-effect`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">{weeklyCount.toLocaleString()}</span>
                <span className="text-xs text-white/80">This Week</span>
              </div>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#00C4CC] to-[#0077B6] h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_2px_rgba(0,196,204,0.4)]"
                style={{ width: `${Math.min(100, (weeklyCount % 5000) / 50 + 20)}%` }}
                aria-hidden="true"
              ></div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-right">
            <span className="text-xs font-medium text-[#FFD700] drop-shadow-[0_0_4px_rgba(255,215,0,0.7)]">
              {lastUpdated && `Updated: ${lastUpdated.toLocaleTimeString()}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorInfo;
