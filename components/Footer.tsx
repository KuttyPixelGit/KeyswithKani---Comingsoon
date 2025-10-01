import React, { useState } from 'react';
import InstagramIcon from './icons/InstagramIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import FacebookIcon from './icons/FacebookIcon';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';
import LocationIcon from './icons/LocationIcon';
import SendIcon from './icons/SendIcon';

// --- Contact Form Component ---
const ContactForm = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStatus('submitting');
    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@keyswithkani.ca", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          _subject: `New Contact Form - ${formData.name}`,
          _autoresponse: "Thank you for contacting Keyswithkani! We've received your message and will get back to you as soon as possible."
        })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) {
        setStatus('submitted');
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const inputClasses = `w-full px-6 py-4 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 focus:outline-none focus:scale-105 ${isDarkMode ? "bg-black/20 border-[#00C8C8]/30 text-white placeholder-gray-400 focus:border-[#00C8C8] focus:bg-black/40" : "bg-white/60 border-[#00C8C8]/40 text-black placeholder-gray-500 focus:border-[#00C8C8] focus:bg-white/80"}`;
  const boxShadowStyle = { boxShadow: isDarkMode ? "0 0 20px rgba(0, 200, 200, 0.1)" : "0 0 20px rgba(0, 200, 200, 0.2)" };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4 tracking-tight" style={{ 
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: isDarkMode ? '#fff' : '#111827',
            position: 'relative',
            display: 'inline-block'
          }}>
            <span style={{
              background: 'linear-gradient(90deg, #00C8C8 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              zIndex: 1
            }}>
              Get In Touch
            </span>
            <span style={{
              content: '""',
              position: 'absolute',
              bottom: '-4px',
              left: 0,
              width: '100%',
              height: '3px',
              background: 'linear-gradient(90deg, #00C8C8 0%, #FFD700 100%)',
              borderRadius: '2px',
              transform: 'scaleX(0.8)'
            }} />
          </h2>
          <p className={`text-base md:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} style={{ 
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 400,
            letterSpacing: '0.01em',
            marginTop: '0.75rem',
            maxWidth: '28rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Ready to create something amazing together?
          </p>
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          `}</style>
        </div>
        {status === 'submitted' ? (
          <div className={`text-center p-6 rounded-2xl backdrop-blur-md border-2 ${isDarkMode ? "bg-green-900/20 border-green-400/30 text-green-300" : "bg-green-50/80 border-green-500/40 text-green-700"}`} style={{ animation: "successPulse 2s ease-in-out infinite" }}>
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-base">Thank you for reaching out. We'll get back to you soon!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid grid-cols-1 gap-4">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className={`${inputClasses} font-serif`} 
                style={{...boxShadowStyle, fontFamily: '"Playfair Display", serif'}} 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className={`${inputClasses} font-serif`} 
                style={{...boxShadowStyle, fontFamily: '"Playfair Display", serif'}} 
              />
            </div>
            <textarea 
              name="message" 
              placeholder="Your Message (Optional)" 
              value={formData.message} 
              onChange={handleChange} 
              rows={3} 
              className={`${inputClasses} resize-none font-serif`} 
              style={{...boxShadowStyle, fontFamily: '"Playfair Display", serif'}} 
            />
            <div className="text-center">
              <button type="submit" disabled={status === 'submitting'} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto ${isDarkMode ? "bg-gradient-to-r from-[#FFD700] to-[#00C8C8] text-black hover:from-[#00C8C8] hover:to-[#FFD700]" : "bg-gradient-to-r from-[#FFD700] to-[#00C8C8] text-black hover:from-[#00C8C8] hover:to-[#FFD700]"}`} style={{ boxShadow: `0 8px 20px ${isDarkMode ? "rgba(0, 200, 200, 0.4)" : "rgba(0, 200, 200, 0.5)"}`, animation: status === 'submitting' ? "spin 1s linear infinite" : "pulseGlowGoldTeal 2s infinite" }}>
                {status === 'submitting' ? "Sending..." : <><SendIcon /> Send Message</>}
              </button>
            </div>
            {status === 'error' && <p className="mt-3 text-red-500 text-sm">Submission failed. Please try again.</p>}
          </form>
        )}
      </div>
    </section>
  );
};

// --- Contact Info Components ---
// Fix: Define props for ContactCard to correctly type the icon component.
interface ContactCardProps {
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  isDarkMode: boolean;
  children?: React.ReactNode;
}
const ContactCard: React.FC<ContactCardProps> = ({ href, icon: Icon, title, content, isDarkMode, children }) => {
  const baseClasses = `group flex flex-col items-center p-8 rounded-3xl backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative z-0`;
  const darkModeClasses = "bg-black/30 border-[#FFD700]/20 hover:border-[#FFD700]/60 text-white";
  const lightModeClasses = "bg-white/70 border-[#FFD700]/30 hover:border-[#FFD700]/70 text-black";
  const iconDarkMode = "text-[#FFD700] group-hover:text-[#FFDF00]";
  const iconLightMode = "text-[#FFD700] group-hover:text-[#FFDF00]";
  
  const cardContent = (
    <>
      {Icon && <Icon className={`w-12 h-12 mb-4 transition-all duration-300 ${isDarkMode ? iconDarkMode : iconLightMode}`} />}
      {children}
      <span className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>{title}</span>
      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{content}</span>
    </>
  );

  const glowEffect = isDarkMode 
    ? "after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:animate-[pulseGlowGoldTeal_4s_ease-in-out_infinite_alternate] after:hover:animate-[pulseGlowGoldTeal_3s_ease-in-out_infinite_alternate] after:pointer-events-none after:-z-10"
    : "after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:animate-[pulseGlowGoldTeal_4s_ease-in-out_infinite_alternate] after:hover:animate-[pulseGlowGoldTeal_3s_ease-in-out_infinite_alternate] after:pointer-events-none after:-z-10";

  const cardClasses = `relative ${baseClasses} ${isDarkMode ? darkModeClasses : lightModeClasses} ${glowEffect} transition-all duration-500`;
  
  if (href) {
    return <a href={href} className={cardClasses}>{cardContent}</a>;
  }
  return <div className={cardClasses}>{cardContent}</div>;
};

// Fix: Update icon prop type to accept a className.
const SocialLink = ({ href, icon: Icon, isDarkMode }: { href:string, icon: React.ComponentType<{ className?: string }>, isDarkMode: boolean}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode ? "hover:bg-[#FFD700]/20" : "hover:bg-[#FFD700]/20"}`}>
    <Icon className={`w-6 h-6 ${isDarkMode ? "text-[#FFD700] hover:text-[#FFDF00]" : "text-[#FFD700] hover:text-[#FFDF00]"}`} />
  </a>
);

const ContactInfo = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ContactCard href="mailto:contact@keyswithkani.ca" icon={MailIcon} title="Email" content="contact@keyswithkani.ca" isDarkMode={isDarkMode} />
        <ContactCard href="tel:+15196190070" icon={PhoneIcon} title="Phone" content="+1 519 619 0070" isDarkMode={isDarkMode} />
        <ContactCard 
          href="https://maps.google.com/?q=70+wayside+lane,+st+thomas+Ontario+Canada+N5P+0G5" 
          icon={LocationIcon} 
          title="Location" 
          content="Canada" 
          isDarkMode={isDarkMode} 
        />
        <ContactCard title="Social" content="Follow Us" isDarkMode={isDarkMode}>
          <div className="flex gap-4 mb-4">
            <SocialLink href="https://instagram.com/keyswithkani" icon={InstagramIcon} isDarkMode={isDarkMode} />
            <SocialLink href="https://www.linkedin.com/company/keyswithkani" icon={LinkedinIcon} isDarkMode={isDarkMode} />
            <SocialLink href="http://facebook.com/keyswithkani" icon={FacebookIcon} isDarkMode={isDarkMode} />
          </div>
        </ContactCard>
      </div>
    </div>
  </section>
);

// --- Kani Spotlight Section ---
const KaniSpotlightSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section id="meet-kani-section" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Kani Image with full opacity and no blending */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Kani Image - normal display without blending for better visibility */}
              <img 
                src="/Kani.png" 
                alt="Kani" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
          
          {/* About Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-[#FFD700] to-[#00C8C8] bg-clip-text text-transparent" style={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              lineHeight: '1.2',
              textShadow: isDarkMode ? "0 2px 3px rgba(0,0,0,0.3), 0 0 12px rgba(255,215,0,0.3)" : "0 1px 2px rgba(0,0,0,0.2), 0 0 8px rgba(0,200,200,0.2)",
              wordSpacing: '0.1em',
              textTransform: 'none'
            }}>
              Meet Kani
            </h2>
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
            `}</style>
            <p className={`text-lg md:text-xl mb-8 leading-relaxed ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
             ✨ I'm Kanimozhi Sundaram, a Realtor in Ontario who turns real estate into more than just a transaction - it's about dreams, trust, and new beginnings. My goal is simple: to make your buying or selling journey smooth, successful, and unforgettable. Let's find the place where your story truly begins. ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Copyright Footer ---
const CopyrightFooter = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className="py-12 text-center">
    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} style={{ textShadow: isDarkMode ? "0 1px 2px rgba(0,0,0,0.5)" : "0 1px 2px rgba(255,255,255,0.8)" }}>
      © 2025 Keyswithkani. All rights reserved.
    </p>
  </footer>
);

// --- Main Footer Wrapper ---
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