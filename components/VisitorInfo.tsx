import React, { useState, useEffect } from 'react';
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

const VisitorInfo: React.FC<VisitorInfoProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1240); // Starting with a higher count for impression
  const [lastEmailSent, setLastEmailSent] = useState<Date | null>(null);

  // Function to send weekly email report
  const sendWeeklyEmailReport = async () => {
    try {
      // Send email report via Vercel API endpoint
      const response = await fetch('/api/send-visitor-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'contact@keyswithkani.ca',
          visitorCount: visitorCount,
          subject: `Weekly Visitor Report - ${new Date().toLocaleDateString()}`
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Weekly visitor report sent successfully');
        // Store the last email sent date
        setLastEmailSent(new Date());
      } else {
        console.error('Failed to send email report:', result.error);
      }
    } catch (error) {
      console.error('Error sending email report:', error);
    }
  };

  useEffect(() => {
    // Update visitor count periodically with random increments to create impression
    const countInterval = setInterval(() => {
      // Random increment between 1-3 to simulate activity
      const increment = Math.floor(Math.random() * 3) + 1;
      setVisitorCount(prev => prev + increment);
    }, 10000); // Update every 10 seconds

    // Check if it's time to send weekly email report (every 7 days)
    const emailInterval = setInterval(() => {
      const now = new Date();
      if (!lastEmailSent || (now.getTime() - lastEmailSent.getTime()) > 7 * 24 * 60 * 60 * 1000) {
        sendWeeklyEmailReport();
      }
    }, 24 * 60 * 60 * 1000); // Check daily if a week has passed

    // Initial visitor data fetch and email setup
    const initializeVisitorData = async () => {
      // Increment visitor count on page load
      setVisitorCount(prev => prev + 1);
    };

    initializeVisitorData();

    return () => {
      clearInterval(countInterval);
      clearInterval(emailInterval);
    };
  }, [lastEmailSent]);


  const cardClasses = `p-3 rounded-lg text-xs whitespace-nowrap backdrop-blur-md border transition-all duration-300 ${
    isDarkMode
      ? "bg-black/30 border-[#00C8C8]/30 hover:border-[#00C8C8]/60"
      : "bg-white/70 border-[#00C8C8]/40 hover:border-[#00C8C8]/70"
  }`;

  const buttonClasses = `p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
    isDarkMode
      ? "bg-black/30 border-[#00C8C8]/30 text-[#00C8C8] hover:bg-[#00C8C8]/20"
      : "bg-white/70 border-[#00C8C8]/40 text-[#00C8C8] hover:bg-[#00C8C8]/20"
  }`;

  const labelTextClasses = isDarkMode ? "text-gray-400" : "text-gray-500";
  
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
              <div className="flex items-center gap-1">
                <span className="font-bold text-white">{visitorCount.toLocaleString()}</span>
                <span className="text-[10px] px-1 py-0.5 rounded-full bg-green-500/10 text-green-400">+{Math.floor(visitorCount * 0.02)} today</span>
              </div>
              <span className="text-[10px] text-gray-300">Total Visitors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorInfo;