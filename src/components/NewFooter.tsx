import * as React from 'react';
import InstagramIcon from './icons/InstagramIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import FacebookIcon from './icons/FacebookIcon';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';
import LocationIcon from './icons/LocationIcon';
import ContactForm from './ContactForm';

// --- Contact Info Components ---
interface ContactCardProps {
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  title: string;
  content: string;
  isDarkMode: boolean;
  children?: React.ReactNode;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  href, 
  icon: Icon, 
  title, 
  content, 
  isDarkMode, 
  children 
}) => {
  const contentElement = (
    <div className={`p-6 rounded-2xl backdrop-blur-md border-2 transition-all duration-300 ${isDarkMode ? "bg-black/20 border-[#00C8C8]/30 hover:border-[#00C8C8] text-white" : "bg-white/60 border-[#00C8C8]/40 hover:border-[#00C8C8] text-gray-800"}`}>
      {Icon && (
        <div className={`mb-4 p-3 inline-flex items-center justify-center rounded-full ${isDarkMode ? "bg-[#00C8C8]/10 text-[#00C8C8]" : "bg-[#00C8C8]/10 text-[#00C8C8]"}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{title}</h3>
      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {content}
      </p>
      {children}
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {contentElement}
    </a>
  ) : (
    <div className="h-full">
      {contentElement}
    </div>
  );
};

const SocialLink: React.FC<{ 
  href: string; 
  icon: React.ComponentType<{ className?: string }>; 
  isDarkMode: boolean 
}> = ({ href, icon: Icon, isDarkMode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode ? "text-gray-400 hover:text-[#00C8C8]" : "text-gray-600 hover:text-[#00C8C8]"}`}
    aria-label={href.includes('instagram') ? 'Instagram' : href.includes('linkedin') ? 'LinkedIn' : 'Facebook'}
  >
    <Icon className="w-5 h-5" />
  </a>
);

const ContactInfo: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ContactCard 
          icon={MailIcon}
          title="Email Us"
          content="Have questions? We're here to help."
          isDarkMode={isDarkMode}
        >
          <a 
            href="mailto:contact@keyswithkani.ca" 
            className={`mt-3 inline-block text-sm font-medium ${isDarkMode ? "text-[#00C8C8] hover:text-[#00b3b3]" : "text-[#00C8C8] hover:text-[#008080]"}`}
          >
            contact@keyswithkani.ca
          </a>
        </ContactCard>
        
        <ContactCard 
          icon={PhoneIcon}
          title="Call Us"
          content="Mon - Fri, 9:00 AM - 5:00 PM"
          isDarkMode={isDarkMode}
        >
          <a 
            href="tel:+1234567890" 
            className={`mt-3 inline-block text-sm font-medium ${isDarkMode ? "text-[#00C8C8] hover:text-[#00b3b3]" : "text-[#00C8C8] hover:text-[#008080]"}`}
          >
            +1 (234) 567-890
          </a>
        </ContactCard>
        
        <ContactCard 
          icon={LocationIcon}
          title="Visit Us"
          content="123 Music Street, Toronto, ON, Canada"
          isDarkMode={isDarkMode}
        >
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`mt-3 inline-block text-sm font-medium ${isDarkMode ? "text-[#00C8C8] hover:text-[#00b3b3]" : "text-[#00C8C8] hover:text-[#008080]"}`}
          >
            View on Map
          </a>
        </ContactCard>
      </div>
      
      <div className="mt-12 flex justify-center space-x-6">
        <SocialLink 
          href="https://instagram.com" 
          icon={InstagramIcon} 
          isDarkMode={isDarkMode} 
        />
        <SocialLink 
          href="https://linkedin.com" 
          icon={LinkedinIcon} 
          isDarkMode={isDarkMode} 
        />
        <SocialLink 
          href="https://facebook.com" 
          icon={FacebookIcon} 
          isDarkMode={isDarkMode} 
        />
      </div>
    </div>
  </div>
);

const KaniSpotlightSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className={`py-20 ${isDarkMode ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-gray-50 to-white"}`}>
    <div className="container mx-auto px-4 text-center">
      <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        Meet Kani
      </h2>
      <div className="max-w-3xl mx-auto">
        <p className={`text-lg md:text-xl mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Our AI-powered piano learning assistant is here to guide you on your musical journey. 
          With personalized lessons and real-time feedback, you'll be playing your favorite songs in no time.
        </p>
      </div>
      <div className="mt-10">
        <div className="relative inline-block group">
          <div className={`absolute -inset-1 rounded-full blur opacity-75 ${isDarkMode ? "bg-gradient-to-r from-[#00C8C8] to-[#00A2FF]" : "bg-gradient-to-r from-[#00C8C8] to-[#00A2FF]"} group-hover:opacity-100 transition duration-200`}></div>
          <button 
            className={`relative px-8 py-4 rounded-full font-medium text-white ${isDarkMode ? "bg-black" : "bg-gray-900"} transition-all duration-300 transform group-hover:scale-105`}
          >
            Learn More About Kani
          </button>
        </div>
      </div>
    </div>
  </div>
);

const CopyrightFooter: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <footer className="py-12 text-center">
    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} style={{ textShadow: isDarkMode ? "0 1px 2px rgba(0,0,0,0.5)" : "0 1px 2px rgba(255,255,255,0.8)" }}>
      © 2025 Keyswithkani. All rights reserved.
    </p>
  </footer>
);

const Footer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <>
      <KaniSpotlightSection isDarkMode={isDarkMode} />
      <ContactForm isDarkMode={isDarkMode} />
      <ContactInfo isDarkMode={isDarkMode} />
      <CopyrightFooter isDarkMode={isDarkMode} />
    </>
  );
};

export default Footer;
