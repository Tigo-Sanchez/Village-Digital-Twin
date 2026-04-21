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
      window.location.href = `mailto:global@ggm.earth?subject=\${subject}&body=\${body}`;
    }, 1500);
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#06b6d4] focus:bg-white/10 transition-all font-light text-sm md:text-base";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-12 animate-in zoom-in-95 fade-in duration-300 overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Richiesta Inviata
            </h2>
            <p className="text-white/60 font-light text-lg mb-8 max-w-md">
              Abbiamo aperto il tuo client di posta predefinito per ultimare l'invio. Il nostro team prenderà in carico la tua richiesta il prima possibile.
            </p>
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors"
            >
              Torna al sito
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <span className="text-[#06b6d4] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">Executive Contact Form</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Connessione Strategica
              </h2>
              <p className="text-white/60 font-light text-sm md:text-base">
                Inviaci i dettagli della tua richiesta per programmare un incontro operativo con il board di GGM.EARTH.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                  className={`${inputClasses} min-h-[120px] md:min-h-[150px] resize-none`} 
                  placeholder="Descrivi brevemente la tua visione o la necessità d'intervento..."
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] md:text-xs text-white/30 font-mono text-center md:text-left leading-relaxed max-w-xs">
                  Inviando aderisci alle norme internazionali NDA applicate da GGM.EARTH. Destinazione: <span className="text-white/60">global@ggm.earth</span>
                </p>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black font-bold tracking-widest uppercase text-xs md:text-sm px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Elaborazione...' : 'Invia Richiesta'}
                  {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
