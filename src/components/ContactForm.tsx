import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';

interface ContactFormProps {
  isDarkMode: boolean;
}

type FormState = 
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'submitted' }
  | { status: 'error'; error: string };

const ContactForm: React.FC<ContactFormProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name?.trim() || !formData.email?.trim()) {
      setFormState({ status: 'error', error: 'Name and email are required' });
      return;
    }
    
    setFormState({ status: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message?.trim() || 'No message provided',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send message');
      }

      // Success - reset form and show success message
      setFormData({ name: '', email: '', message: '' });
      setFormState({ status: 'submitted' });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    }
    
    // Auto-reset to idle state after 5 seconds
    setTimeout(() => {
      setFormState({ status: 'idle' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Define styles
  const inputClasses = `w-full px-6 py-4 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 focus:outline-none focus:scale-105 ${
    isDarkMode 
      ? "bg-black/20 border-[#00C8C8]/30 text-white placeholder-gray-400 focus:border-[#00C8C8] focus:bg-black/40" 
      : "bg-white/60 border-[#00C8C8]/40 text-black placeholder-gray-500 focus:border-[#00C8C8] focus:bg-white/80"
  }`;

  const boxShadowStyle = { 
    boxShadow: isDarkMode 
      ? "0 0 20px rgba(0, 200, 200, 0.1)" 
      : "0 0 20px rgba(0, 200, 200, 0.2)" 
  };

  return (
    <div className="w-full max-w-lg">
      {formState.status === 'submitted' ? (
        <div 
          className="p-6 rounded-2xl backdrop-blur-md border-2 mb-6 text-center"
          style={{
            ...boxShadowStyle,
            borderColor: isDarkMode ? 'rgba(0, 200, 200, 0.3)' : 'rgba(0, 200, 200, 0.4)',
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.6)',
            color: isDarkMode ? '#fff' : '#111827'
          }}
        >
          <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
          <p>Thank you for contacting us. We'll get back to you soon.</p>
        </div>
      ) : formState.status === 'error' ? (
        <div 
          className="p-6 rounded-2xl backdrop-blur-md border-2 mb-6"
          style={{
            borderColor: isDarkMode ? 'rgba(248, 113, 113, 0.3)' : 'rgba(239, 68, 68, 0.4)',
            backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.2)' : 'rgba(254, 226, 226, 0.6)',
            color: isDarkMode ? '#fecaca' : '#b91c1c'
          }}
        >
          <h3 className="text-xl font-bold mb-2">Error Sending Message</h3>
          <p>{formState.error}</p>
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
              className={inputClasses}
              disabled={formState.status === 'submitting'}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              disabled={formState.status === 'submitting'}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={inputClasses}
              disabled={formState.status === 'submitting'}
            />
          </div>
          <button
            type="submit"
            disabled={formState.status === 'submitting'}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
              formState.status === 'submitting'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#00C8C8] hover:bg-[#00b3b3] text-white hover:scale-105'
            }`}
            style={boxShadowStyle}
          >
            {formState.status === 'submitting' ? (
              'Sending...'
            ) : (
              <>
                <span>Send Message</span>
                <SendIcon className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
