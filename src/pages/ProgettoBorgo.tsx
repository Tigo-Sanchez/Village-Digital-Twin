import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { ContactModal } from '../components/ContactModal';

gsap.registerPlugin(ScrollTrigger);

const BASE_URL = "https://res.cloudinary.com/tigosanchez/image/upload/q_auto,f_auto/v1776696563";

const storyData = [
  // SEZIONE 1
  {
    id: "step-1-1",
    bg: `${BASE_URL}/GGM_ACADEMY_-16.jpg`,
    superTitle: "OLTRE IL DIGITAL TWIN.",
    text: "L'acquisizione di un Gemello Digitale rappresenta l'ingresso nell'era della gestione predittiva. Ma la tecnologia è inerte se non viene costantemente alimentata da nuovi dati e menti brillanti. Oggi proponiamo a Città Sant'Angelo un'evoluzione strategica senza precedenti."
  },
  {
    id: "step-1-2",
    bg: "https://res.cloudinary.com/tigosanchez/image/upload/v1776528906/GGM_ACADEMY_-3.jpg",
    title: "CITTÀ SANT'ANGELO: LA RESIDENZA GEOSCIENTIFICA.",
    text: "Non vi chiediamo di essere solo \"clienti\" di una tecnologia. Vi proponiamo di diventarne il Centro Nevralgico Europeo. Trasformiamo Città Sant'Angelo nella prima Residenza Geoscientifica: un'aula a cielo aperto che ospita i migliori talenti internazionali per radiografare la vostra storia e progettare il vostro futuro."
  },
  // SEZIONE 2
  {
    id: "step-2-1",
    bg: `${BASE_URL}/GGM_ACADEMY_-15.jpg`,
    title: "HOSPITALITY E RESIDENCY DIFFUSA.",
    text: "Chiediamo al Comune di co-investire nella logistica primaria per cicli variabili da 1 a 6 mesi (prorogabili). Questo si traduce in ospitalità residenziale (Residency) per gruppi ristretti (da 2 a 8 partecipanti nazionali e internazionali) e nel supporto per convenzioni Hospitality a km zero con l'economia locale: bistrot, locande e botteghe cittadine."
  },
  {
    id: "step-2-2",
    bg: `${BASE_URL}/GGM_ACADEMY_-5.jpg`,
    title: "SPAZI PRIVATI E ISTITUZIONALI.",
    text: "Un'Academy richiede infrastrutture fisiche. Richiediamo spazi privati dedicati al team per workshop ed elaborazione quotidiana dei dati. Parallelamente, pianificheremo l'utilizzo di spazi pubblici e istituzionali (sale comunali, chiostri, piazze e chiese) per gli incontri programmati e l'interazione con la cittadinanza."
  },
  {
    id: "step-2-3",
    bg: `${BASE_URL}/GGM_ACADEMY_-10.jpg`,
    title: "IL COMUNE COME \"PONTE RICHIEDENTE\".",
    text: "L'alleanza deve essere strutturale. Chiediamo supporto burocratico e documentale per far sì che Città Sant'Angelo diventi, insieme a GGM, Ente Richiedente Ufficiale per le internship internazionali. Un ruolo attivo e certificato, supportato da tutta la nostra policy e documentazione."
  },
  {
    id: "step-2-4",
    bg: `${BASE_URL}/GGM_ACADEMY_-14.jpg`,
    title: "MICRO-BUDGET PER MAXI-NETWORK.",
    text: "Per massimizzare il ROI della partnership, suggeriamo la creazione di un micro-budget comunale di rappresentanza dedicato all'ospitalità di brevi delegazioni istituzionali e accademiche (2-3 giorni). Un piccolo investimento per tessere relazioni di altissimo livello e connettere il borgo a istituzioni globali."
  },
  // SEZIONE 3
  {
    id: "step-3-1",
    bg: `${BASE_URL}/GGM_ACADEMY_-6.jpg`,
    title: "DIAGNOSTICA NON INVASIVA.",
    text: "Utilizzeremo droni LiDAR, Georadar e Laser Scanner 3D per mappare le vostre infrastrutture. Radiograferemo il sottosuolo alla ricerca di antiche cripte e anomalie strutturali, operando nel pieno rispetto della vita cittadina e valorizzando il patrimonio in tempo reale."
  },
  {
    id: "step-3-2",
    bg: "black",
    title: "TRASPARENZA ASSOLUTA.",
    text: "L'innovazione non si impone, si vive insieme. Trasformeremo i cantieri digitali in un evento collettivo attraverso 3 appuntamenti chiave: il Launch Ufficiale per svelare la visione, il Mid-Term Check per toccare con mano i progressi, e il Grand Reveal finale per consegnare il futuro alla comunità e alla stampa."
  },
  // SEZIONE 4
  {
    id: "step-4-1",
    bg: `${BASE_URL}/GGM_ACADEMY_-12.jpg`,
    title: "UPGRADE INCESSANTE DEL TWIN.",
    text: "Il vantaggio tecnico primario. Ogni team che opera sul borgo produrrà nuovi dati ingegneristici ad altissima risoluzione. Questi andranno ad aggiornare e densificare il vostro Gemello Digitale a costo zero, garantendo un catasto 3D sempre allineato alla realtà."
  },
  {
    id: "step-4-2",
    bg: `${BASE_URL}/GGM_ACADEMY_-9.jpg`,
    title: "TRAINING BRIDGE PER I TECNICI.",
    text: "Trasferimento tecnologico diretto. I vostri dipendenti comunali (geometri, ingegneri, urbanisti) siederanno ai tavoli con i nostri esperti, acquisendo gratuitamente le competenze per gestire in autonomia la piattaforma 3D e l'urbanistica predittiva."
  },
  {
    id: "step-4-3",
    bg: `${BASE_URL}/GGM_ACADEMY_-4.jpg`,
    title: "PREVENZIONE = RISPARMIO.",
    text: "I rilievi formativi sono indagini reali. Individuare una cavità sotterranea o una rete logora prima che generi un crollo stradale permette all'Amministrazione di programmare interventi mirati, salvando centinaia di migliaia di euro di fondi pubblici d'emergenza."
  },
  // SEZIONE 5
  {
    id: "step-5-1",
    bg: `${BASE_URL}/GGM_ACADEMY_-8.jpg`,
    title: "LANCIO DEL \"VILLAGE DIGITAL TWIN\".",
    text: "A fronte del vostro supporto logistico, schieriamo un piano di comunicazione multicanale di alto profilo. Creeremo e gestiremo la pagina LinkedIn ufficiale \"Village Digital Twin\", supportata da un massiccio calendario editoriale che racconterà il processo giorno per giorno al mondo intero."
  },
  {
    id: "step-5-2",
    bg: `${BASE_URL}/GGM_ACADEMY_-7.jpg`,
    title: "ESPOSIZIONE GLOBALE.",
    text: "Città Sant'Angelo avrà una presenza \"Hero\" (in primo piano) sul nostro sito web istituzionale, accompagnata da editoriali sul nostro blog, produzioni video su YouTube e forte risonanza sui media locali, certificandovi come pionieri dell'Urbanistica Iper-Reale."
  },
  {
    id: "step-5-3",
    bg: `${BASE_URL}/GGM_ACADEMY_-13.jpg`,
    title: "PONTE CON L'INDUSTRIA E L'AFRICA.",
    text: "Metteremo a disposizione il nostro network globale. Attiveremo un canale diretto di scambio con la nostra Divisione in Zambia e le università africane, portando parallelamente a Città Sant'Angelo i nostri top client e player industriali internazionali."
  },
  {
    id: "step-hub-network",
    bg: `${BASE_URL}/GGM_ACADEMY_-11.jpg`,
    title: "HUB TO NETWORK.",
    text: "Il Comune Virtuoso diventa capofila, estendendo la protezione del Digital Twin ai borghi gemellati o limitrofi. Una partnership strategica che permette di accorpare piccoli villaggi ricchi di storia e peculiarità ma privi di budget autonomo, creando una rete geoscientifica integrata che valorizza l'intero ecosistema territoriale senza lasciare nessuno indietro."
  },
  // SEZIONE 6 & 7 COMBINED (Only one black space at the very end before the CTA)
  {
    id: "step-6-combined",
    bg: "black",
    isCompactInfo: true,
    items: [
      {
        title: "ENGINEERED SYNERGY",
        text: "Un'Amministrazione lungimirante non aspetta che la sinergia accada: la progetta. GGM.EARTH trasforma ogni operazione in un asset strategico condiviso per De-Risking del territorio e Lead Generation."
      },
      {
        title: "IL MODELLO DI CO-INVESTIMENTO",
        text: "Strutturiamo alleanze che massimizzano il ROI reciproco attraverso: Ottimizzazione Finanziaria, Superiorità Tecnologica e Trasferimento di Know-How ai vostri tecnici."
      },
      {
        title: "MOLTIPLICARE IL CAPITALE",
        text: "Dal nostro HQ globale in Abruzzo al nuovo hub africano di Ndola, portiamo a Città Sant'Angelo gli standard dell'ingegneria globale per costruire un modello amministrativo esportabile."
      }
    ]
  },
  // SEZIONE CTA
  {
    id: "step-7-1",
    bg: `${BASE_URL}/GGM_ACADEMY_-2.jpg`,
    superTitle: "IL FUTURO INIZIA DA QUI.",
    text: "L'infrastruttura tecnologica è pronta, la rete internazionale è attiva. Il passo successivo non è un appalto, ma una stretta di mano strategica. Costruiamo insieme il Borgo Geoscientifico.",
    action: "Fissa l'Incontro Esecutivo"
  }
];

export default function ProgettoBorgo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = document.querySelectorAll(".story-step");
      
      steps.forEach((step, index) => {
        const bg = imagesRef.current[index];
        const isBlack = storyData[index]?.bg === 'black';

        // Background handling
        if (index > 0 && bg) {
          gsap.fromTo(bg,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
              }
            }
          );
        }

        // --- NEW TEXT ANIMATION LOGIC (Unified Timeline with Scrub for reverse support) ---
        const textBlock = step.querySelector(".text-block");
        const stepTitle = step.querySelector(".step-title");

        if (textBlock || stepTitle) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 90%",
              end: index === storyData.length - 1 ? "bottom 95%" : "bottom 20%",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            }
          });

          // Phase 1: Reveal Title first (the "breathing room" part)
          if (stepTitle) {
            tl.fromTo(stepTitle, 
              { opacity: 0, y: 40, scale: 0.95 }, 
              { opacity: 1, y: 0, scale: 1, ease: "power2.out" }
            );
          }

          // Phase 2: Reveal Text Block (staggered)
          if (textBlock) {
            tl.fromTo(textBlock, 
              { opacity: 0, y: 50 }, 
              { opacity: 1, y: 0, ease: "power2.out" },
              "-=0.2"
            );
          }

          // Phase 3: Hold visibility
          tl.to({}, { duration: 1 });

          // Phase 4: Fade out at the end of the section (only if not the last section)
          if (index !== storyData.length - 1) {
             if (textBlock) tl.to(textBlock, { opacity: 0, y: -40, ease: "power2.in" });
             if (stepTitle) tl.to(stepTitle, { opacity: 0, y: -30, ease: "power2.in" }, "-=0.3");
          }
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-transparent text-white min-h-screen relative font-sans" ref={containerRef}>
      
      {/* Top Header Protection Gradient */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-40 pointer-events-none"></div>

      {/* Global Header */}
      <header className="fixed top-6 left-0 w-full px-6 z-50 flex justify-between items-center pointer-events-none">
          {/* Minimal Logo */}
          <Link href="/">
            <a className="mix-blend-difference pointer-events-auto flex items-center cursor-pointer">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/62963b756bf2c45d308b1e5a/633b892b-f434-41d6-8a93-80f669f4421e/GGM+EARTH+LOGO+CLAIM+-+ALPHA.png?format=500w" 
                alt="GGM.EARTH" 
                className="h-[84px] brightness-0 invert object-contain opacity-70" 
              />
            </a>
          </Link>

          {/* Burger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="pointer-events-auto p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group shadow-[0_0_15px_rgba(0,0,0,0.5)] flex-shrink-0"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-white/80 group-hover:text-white" />
          </button>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div className={`fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-3xl transition-all duration-700 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-[calc(1.5rem+42px)] -translate-y-1/2 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/80 hover:text-white z-[70]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-[60vw] lg:w-[65vw] px-6 md:px-16 pt-24 md:pt-[120px] pb-12 flex flex-col items-start md:border-r border-white/5 md:overflow-y-auto">
           <span className="text-white/30 text-xs font-mono uppercase tracking-[0.3em] mb-8 md:mb-12 block">Index</span>
           <nav className="flex flex-col gap-6 w-full max-w-2xl">
              <Link href="/">
                <a className="text-2xl md:text-3xl lg:text-4xl text-left font-light text-white/50 hover:text-white hover:translate-x-4 transition-all duration-300 w-full border-b border-white/5 pb-4 tracking-tight block">
                  Torna alla Landing Page
                </a>
              </Link>
              <button 
                onClick={() => { setIsMenuOpen(false); setIsContactModalOpen(true); }}
                className="text-2xl md:text-3xl lg:text-4xl text-left font-light text-white/50 hover:text-white hover:translate-x-4 transition-all duration-300 w-full border-b border-white/5 pb-4 tracking-tight block"
              >
                Contatta il Team
              </button>
          </nav>
        </div>

        <div className="w-full md:w-[40vw] lg:w-[35vw] bg-transparent md:bg-white/[0.02] p-6 md:p-16 flex flex-col justify-between md:overflow-y-auto border-t md:border-t-0 border-white/5 pb-24 md:pb-16">
           <div className="space-y-8 md:space-y-12 mt-0 md:mt-20">
              <div>
                 <span className="text-white/30 text-xs font-mono uppercase tracking-[0.3em] mb-4 block">Il Progetto</span>
                 <h3 className="text-2xl font-bold text-white mb-2">Borgo Geoscientifico</h3>
                 <p className="text-white/60 font-light leading-relaxed mb-6">Mappatura e digitalizzazione in alta risoluzione del territorio di Città Sant'Angelo (PE).</p>

                 <a href="https://ggm.earth" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#06b6d4] hover:text-cyan-300 hover:underline underline-offset-4 transition-colors text-sm font-medium">
                    Visita ggm.earth ↗
                 </a>
              </div>
              <div className="space-y-4">
                 <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full border border-white bg-white text-black py-4 rounded-full font-semibold hover:bg-transparent hover:text-white transition-all text-sm tracking-wide"
                 >
                    Fissa un Incontro
                 </button>
                 <a href="mailto:global@ggm.earth" className="w-full text-center inline-block border border-white/20 bg-transparent text-white py-4 rounded-full font-medium hover:bg-white/5 hover:border-white/40 transition-all text-sm tracking-wide">
                    global@ggm.earth
                 </a>
              </div>
           </div>

           <div className="mt-16 pt-8 border-t border-white/10">
              <span className="inline-block px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-widest border border-red-500/20 rounded mb-4">NDA Warming</span>
              <p className="text-xs text-white/40 leading-relaxed tracking-wide">
                 Le informazioni contenute sono classificate come rigorosamente riservate. Divieto assoluto di diffusione, registrazione o riproduzione non autorizzata.
              </p>
           </div>
        </div>
      </div>

      {/* Fixed Background Images Container */}
      <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#050505]">
        {storyData.map((step, index) => {
           const isBlack = step.bg === 'black';
           return (
            <div
              key={`bg-${step.id}`}
              ref={(el) => (imagesRef.current[index] = el)}
              className={`absolute top-0 left-0 w-full h-full ${isBlack ? 'bg-[#050505]' : 'bg-cover bg-center'}`}
              style={{ 
                backgroundImage: isBlack ? 'none' : `url(${step.bg})`,
                opacity: index === 0 ? 1 : 0 
              }}
            >
              {!isBlack && <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>}
            </div>
          );
        })}
      </div>

      {/* Scrollable Content Layers */}
      <div className="relative z-10 w-full">
        {storyData.map((step, index) => {
          // Determine layout style periodically to alternate
          const layoutStyle = index === 0 ? 'hero' : 
                              step.isCompactInfo ? 'compact' :
                              index === storyData.length - 1 ? 'cta' :
                              index % 2 !== 0 ? 'glass-left' : 'glass-right';

          return (
          <div 
            key={`content-${step.id}`}
            id={step.id} 
            className={`story-step w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 \${layoutStyle === 'hero' ? 'min-h-[85vh] md:min-h-screen pt-32 pb-16' : 'min-h-[80vh] md:min-h-[100vh] py-16 md:py-24'} \${layoutStyle === 'glass-right' ? 'items-end' : 'items-start'} \${step.isCompactInfo ? 'items-center !min-h-max py-24 md:py-32' : ''}`}
          >
            {step.isCompactInfo ? (
              <div className="text-block w-full max-w-7xl mx-auto flex flex-col items-center gap-10 md:gap-24 relative z-20">
                 <div className="text-center mb-2 md:mb-8">
                   <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Patto di Valore</h2>
                   <div className="w-16 h-1 bg-[#06b6d4] mx-auto rounded-full"></div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full text-center md:text-left">
                    {step.items?.map((item, i) => (
                      <div key={i} className="flex flex-col gap-3 md:gap-6 items-center md:items-start group border border-white/5 bg-white/5 p-6 md:p-8 rounded-2xl">
                        <div className="text-[#06b6d4] font-mono text-xs md:text-sm tracking-[0.3em] opacity-70">0{i+1}</div>
                        <h3 className="text-xl md:text-3xl font-bold tracking-wide uppercase leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {item.title}
                        </h3>
                        <p className="text-white/70 font-light leading-relaxed text-sm md:text-lg">
                          {item.text}
                        </p>
                      </div>
                    ))}
                 </div>
              </div>
            ) : layoutStyle === 'hero' ? (
              <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative z-20 mt-12 md:mt-0">
                <div className="step-title flex flex-col items-center text-center">
                  <div className="inline-block mb-6 md:mb-10 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                    <span className="text-[10px] md:text-sm font-mono tracking-[0.2em] uppercase text-white/80">Progetto Borgo Geoscientifico</span>
                  </div>
                  <h1 className="text-[2.8rem] sm:text-6xl leading-[0.95] md:text-8xl lg:text-[9rem] font-black tracking-tighter drop-shadow-2xl text-white uppercase mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {step.superTitle}
                  </h1>
                </div>
                <div className="text-block text-center mt-4">
                  <p className="text-lg md:text-3xl leading-relaxed font-light text-white/90 drop-shadow-lg max-w-4xl mx-auto">
                    {step.text}
                  </p>
                </div>
              </div>
            ) : layoutStyle === 'cta' ? (
              <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative z-20">
                <div className="step-title text-center mb-6">
                   <h1 className="text-[2.5rem] sm:text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] drop-shadow-2xl text-white uppercase mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {step.superTitle}
                   </h1>
                </div>
                <div className="text-block w-full max-w-4xl mx-auto text-center bg-black/60 backdrop-blur-3xl border border-white/10 border-t-white/20 rounded-3xl p-8 md:p-20 shadow-[0_16px_64px_-12px_rgba(0,0,0,0.8)]">
                  <p className="text-sm sm:text-base md:text-2xl leading-relaxed font-light text-white/80 drop-shadow-lg mb-8 md:mb-12">
                    {step.text}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                    <button 
                      onClick={() => setIsContactModalOpen(true)}
                      className="inline-flex items-center justify-center bg-white text-black font-bold tracking-widest uppercase text-[10px] sm:text-xs md:text-base px-6 sm:px-8 md:px-10 py-3 md:py-5 rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 duration-300 w-full sm:w-auto"
                    >
                      {step.action}
                    </button>
                    <Link href="/">
                      <a className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white font-semibold tracking-widest uppercase text-[9px] sm:text-[10px] md:text-sm px-4 sm:px-6 md:px-8 py-2 md:py-3.5 rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 duration-300 w-full sm:w-auto">
                        Digital Twin ↗
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              // Standard step with breathing room (Title then Glass Block)
              <div className={`w-full max-w-7xl mx-auto flex flex-col ${layoutStyle === 'glass-right' ? 'items-end' : 'items-start'}`}>
                {step.title && (
                  <div className={`step-title mb-8 md:mb-16 max-w-4xl ${layoutStyle === 'glass-right' ? 'text-right' : 'text-left'}`}>
                    <h2 className="text-[2.2rem] sm:text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white uppercase drop-shadow-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {step.title}
                    </h2>
                  </div>
                )}
                <div className={`text-block w-full max-w-2xl relative z-20 bg-[#060606]/40 backdrop-blur-2xl border border-white/10 border-t-white/20 rounded-3xl p-6 md:p-14 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ${layoutStyle === 'glass-left' ? 'mr-auto' : 'ml-auto'}`}>
                  {step.text && (
                    <div className="flex flex-col gap-4 md:gap-8">
                       <div className="w-12 h-1 bg-[#06b6d4] rounded-full"></div>
                       <p className="text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed font-normal text-white/80">
                         {step.text}
                       </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )})}
      </div>
      
      <div className="h-40 w-full bg-[#060606] relative z-10 flex items-center justify-center">
        <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs uppercase tracking-widest text-white/30 font-mono">
           <span>© {new Date().getFullYear()} GGM.EARTH</span>
           <span className="w-1 h-1 rounded-full bg-white/20"></span>
           <a href="mailto:global@ggm.earth" className="hover:text-white/80 transition-colors">global@ggm.earth</a>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
