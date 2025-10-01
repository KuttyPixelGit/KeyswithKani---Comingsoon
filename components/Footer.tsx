import React, { useState } from 'react';
import InstagramIcon from './icons/InstagramIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import FacebookIcon from './icons/FacebookIcon';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';
import LocationIcon from './icons/LocationIcon';
import SendIcon from './icons/SendIcon';

// Extend the ImportMeta interface to include Vite's env properties
interface ImportMetaEnv {
  VITE_API_BASE_URL?: string;
}

// --- Contact Form Component ---
const ContactForm = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  // Define the form state type
  type FormState = 
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'submitted' }
    | { status: 'error'; error?: string };
    
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });
  
  // Helper function to update form state
  const updateFormState = (newState: FormState) => {
    setFormState(newState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name?.trim() || !formData.email?.trim()) {
      updateFormState({ status: 'error', error: 'Name and email are required' });
      return;
    }
    
    updateFormState({ status: 'submitting' });

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || '/api'}/send-email`;
      const requestBody = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message?.trim() || 'No message provided',
      };
      
      console.log('Sending request to:', apiUrl, 'with data:', requestBody);

      console.log('Sending request to:', apiUrl);
      console.log('Request body:', requestBody);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include', // Include cookies if needed
      });

      console.log('Response status:', response.status, response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      let data;
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        const errorMessage = data?.message || `Server responded with status ${response.status}`;
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          error: errorMessage,
          response: data
        });
        throw new Error(errorMessage);
      }
      
      console.log('Email sent successfully:', data);
      
      console.log('Email sent successfully:', data);
      if (data.previewUrl) {
        console.log('Preview URL:', data.previewUrl);
      }
      
      // Clear form and show success message
      setFormData({ name: '', email: '', message: '' });
      updateFormState({ status: 'submitted' });
      
      // Reset to idle state after 5 seconds
      setTimeout(() => {
        updateFormState({ status: 'idle' });
      }, 5000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      updateFormState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
      
      // Auto-reset to idle state after 5 seconds
      setTimeout(() => {
        updateFormState({ status: 'idle' });
      }, 5000);
    }
  };

  const inputClasses = `w-full px-6 py-4 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 focus:outline-none focus:scale-105 ${isDarkMode ? "bg-black/20 border-[#00C8C8]/30 text-white placeholder-gray-400 focus:border-[#00C8C8] focus:bg-black/40" : "bg-white/60 border-[#00C8C8]/40 text-black placeholder-gray-500 focus:border-[#00C8C8] focus:bg-white/80"}`;
  const boxShadowStyle = { boxShadow: isDarkMode ? "0 0 20px rgba(0, 200, 200, 0.1)" : "0 0 20px rgba(0, 200, 200, 0.2)" };

  // Determine if the form is in a loading state
  const isLoading = formState.status === 'submitting';
  const isSubmitted = formState.status === 'submitted';
  const isError = formState.status === 'error';
  const isIdle = formState.status === 'idle';

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
          <style dangerouslySetInnerHTML={{
            __html: `
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
              
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
              }
              
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              
              @keyframes pulseGlowGoldTeal {
                0%, 100% { 
                  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4), 0 0 30px rgba(0, 200, 200, 0.2);
                }
                50% { 
                  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6), 0 0 40px rgba(0, 200, 200, 0.4);
                }
              }
            `
          }} />
        </div>
        
        {isSubmitted ? (
          <div 
            className={`p-6 rounded-2xl backdrop-blur-md border-2 ${
              isDarkMode 
                ? "bg-green-900/30 border-green-400/40 text-green-200" 
                : "bg-green-50/90 border-green-500/50 text-green-800"
            }`}
            style={{
              animation: "fadeIn 0.3s ease-out",
              boxShadow: isDarkMode 
                ? "0 4px 20px rgba(0, 200, 200, 0.2)" 
                : "0 4px 20px rgba(0, 200, 200, 0.1)"
            }}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <svg 
                  className="w-8 h-8 text-green-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
              <p className="text-center max-w-md">
                Thank you for reaching out. We've received your message and will get back to you as soon as possible.
              </p>
            </div>
          </div>
        ) : isError ? (
          <div 
            className={`p-6 rounded-2xl backdrop-blur-md border-2 ${
              isDarkMode 
                ? "bg-red-900/20 border-red-400/30 text-red-200" 
                : "bg-red-50/90 border-red-500/50 text-red-800"
            }`}
            style={{
              animation: "shake 0.5s ease-in-out",
              boxShadow: isDarkMode 
                ? "0 4px 20px rgba(255, 0, 0, 0.1)" 
                : "0 4px 20px rgba(255, 0, 0, 0.05)"
            }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <svg 
                  className="w-6 h-6 text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">
                  {formState.error || 'Oops! Something went wrong'}
                </h3>
                <p className="text-sm">
                  We couldn't send your message. Please try again in a few moments or contact us directly at 
                  <a 
                    href="mailto:contact@keyswithkani.com" 
                    className="underline hover:opacity-80 transition-opacity"
                  >
                    contact@keyswithkani.com
                  </a>.
                </p>
              </div>
            </div>
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
              <button 
                type="submit" 
                disabled={isLoading || isSubmitted} 
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-[#FFD700] to-[#00C8C8] text-black hover:from-[#00C8C8] hover:to-[#FFD700] disabled:opacity-80" 
                    : "bg-gradient-to-r from-[#FFD700] to-[#00C8C8] text-black hover:from-[#00C8C8] hover:to-[#FFD700] disabled:opacity-80"
                }`} 
                style={{ 
                  minWidth: '180px',
                  boxShadow: isDarkMode 
                    ? "0 8px 20px rgba(0, 200, 200, 0.4)" 
                    : "0 8px 20px rgba(0, 200, 200, 0.5)",
                  animation: isLoading 
                    ? "spin 1s linear infinite" 
                    : isSubmitted 
                      ? 'none' 
                      : "pulseGlowGoldTeal 2s infinite"
                }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <SendIcon />
                    Send Message
                  </>
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="mt-3 text-red-500 text-sm">
                Submission failed. Please try again.
              </p>
            )}
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
            <style dangerouslySetInnerHTML={{
              __html: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');`
            }} />
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