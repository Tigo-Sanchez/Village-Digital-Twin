import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    message: ''
  });

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state after closing
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setFormData({ name: '', role: '', email: '', message: '' });
      }, 500);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and construct mailto link as fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const subject = encodeURIComponent(`Contatto Strategico da: \${formData.name} (\${formData.role})`);
      const body = encodeURIComponent(
        `Nome: \${formData.name}\nRuolo/Ente: \${formData.role}\nEmail: \${formData.email}\n\nMessaggio:\n\${formData.message}`
      );
      
      // Auto-trigger mailto client
      window.location.href = `mailto:global@ggm.earth,tigo.sanchez@ggmsrl.it?subject=\${subject}&body=\${body}`;
    }, 1500);
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#06b6d4] focus:bg-white/10 transition-all font-light text-sm md:text-base";

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] animate-in fade-in zoom-in-95 duration-300 overflow-y-auto w-full h-full" aria-modal="true">
      
      {/* Header Mimic */}
      <div className="sticky top-0 left-0 w-full px-6 pt-6 pb-4 z-10 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-md">
        {/* Minimal Logo */}
        <div className="flex items-center cursor-pointer">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/62963b756bf2c45d308b1e5a/633b892b-f434-41d6-8a93-80f669f4421e/GGM+EARTH+LOGO+CLAIM+-+ALPHA.png?format=500w" 
            alt="GGM.EARTH" 
            className="h-[84px] brightness-0 invert object-contain opacity-70" 
          />
        </div>

        {/* Close Button styling like Burger */}
        <button 
          onClick={onClose}
          className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] flex-shrink-0 text-white/80 hover:text-white"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Modal Content container - Respiro Bottom */}
      <div className="w-full max-w-3xl mx-auto p-6 md:p-12 mb-24 mt-8 md:mt-12 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Richiesta Inviata
            </h2>
            <p className="text-white/60 font-light text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
              Abbiamo aperto il tuo client di posta predefinito per ultimare l'invio. Il nostro team prenderà in carico la tua richiesta il prima possibile.
            </p>
            <button 
              onClick={onClose}
              className="px-10 py-5 bg-white text-black font-semibold rounded-full uppercase tracking-widest text-sm hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              Torna al sito
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10 md:mb-14 text-center md:text-left">
              <span className="text-[#06b6d4] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">Executive Contact Form</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Connessione Strategica
              </h2>
              <p className="text-white/60 font-light text-sm md:text-base max-w-2xl">
                Inviaci i dettagli della tua richiesta per programmare un incontro operativo con il board di GGM.EARTH.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label htmlFor="name" className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Nome e Cognome *</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={inputClasses} 
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Ente / Ruolo *</label>
                  <input 
                    type="text" 
                    id="role" 
                    required 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className={inputClasses} 
                    placeholder="Comune di / CEO"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Indirizzo Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={inputClasses} 
                  placeholder="mario.rossi@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Messaggio / Obiettivo *</label>
                <textarea 
                  id="message" 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`${inputClasses} min-h-[160px] md:min-h-[200px] resize-none`} 
                  placeholder="Descrivi brevemente la tua visione o la necessità d'intervento..."
                ></textarea>
              </div>

              <div className="pt-8 flex flex-col items-center gap-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold tracking-widest uppercase text-sm md:text-base px-10 py-5 md:py-6 rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  {isSubmitting ? 'Elaborazione...' : 'Invia Richiesta'}
                  {!isSubmitting && <Send className="w-5 h-5 ml-1" />}
                </button>
                <p className="text-[10px] md:text-xs text-white/30 font-mono text-center leading-relaxed max-w-sm">
                  Inviando aderisci alle norme internazionali NDA applicate da GGM.EARTH.<br/>Destinazione: <span className="text-white/60">global@ggm.earth</span>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
