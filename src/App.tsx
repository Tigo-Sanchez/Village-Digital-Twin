import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { ContactModal } from './components/ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const canvasRef4 = useRef<HTMLCanvasElement>(null);
  const canvasRef5 = useRef<HTMLCanvasElement>(null);
  const canvasRef6 = useRef<HTMLCanvasElement>(null);
  const canvasRef7 = useRef<HTMLCanvasElement>(null);
  const canvasRef8 = useRef<HTMLCanvasElement>(null);
  const canvasRef9 = useRef<HTMLCanvasElement>(null);
  const canvasRef10 = useRef<HTMLCanvasElement>(null);
  const canvasRef11 = useRef<HTMLCanvasElement>(null);
  const canvasRef12 = useRef<HTMLCanvasElement>(null);
  const canvasRef13 = useRef<HTMLCanvasElement>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-container');
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sections with sticky full-height content so we land on the title
      const isSticky = element.offsetHeight > window.innerHeight * 1.5;
      const offset = isSticky && id !== 'hero-container' ? window.innerHeight * 0.5 : 0;
      
      window.scrollTo({
        top: element.offsetTop + offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 1500); // Show after 1.5s of no scrolling
    };
    window.addEventListener('scroll', handleScroll);
    timeout = setTimeout(() => setIsIdle(true), 1500);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  
  useEffect(() => {
    // Image Sequence Scrollytelling Logic
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      canvas.width = 1920;
      canvas.height = 1080;
      const frameCount = 27;
      
      const currentFrame = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776263734/frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images: HTMLImageElement[] = [];
      const imageSeq = { frame: 0 };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      images[0].onload = () => {
        context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
      };

      gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        onUpdate: () => {
          const current = Math.round(imageSeq.frame);
          const img = images[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      });
    }

    // Section 2 Logic
    const canvas2 = canvasRef2.current;
    const context2 = canvas2?.getContext("2d");

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-2",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    gsap.set("#s2-canvas-container", { opacity: 0 });

    tl2.to("#s2-intro", { opacity: 0, y: -100, scale: 0.95, duration: 1, ease: "power2.inOut" })
       .to("#s2-canvas-container", { opacity: 1, duration: 1 }, "-=0.5")
       .addLabel("start-canvas-anim");

    if (canvas2 && context2) {
      canvas2.width = 1920;
      canvas2.height = 1080;
      const frameCount2 = 30; // Assuming 30 frames for the new sequence
      
      const currentFrame2 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776269960/sez_01-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images2: HTMLImageElement[] = [];
      const imageSeq2 = { frame: 0 };

      for (let i = 0; i < frameCount2; i++) {
        const img = new Image();
        img.src = currentFrame2(i);
        images2.push(img);
      }

      images2[0].onload = () => {
        context2.drawImage(images2[0], 0, 0, canvas2.width, canvas2.height);
      };

      tl2.to(imageSeq2, {
        frame: frameCount2 - 1,
        snap: "frame",
        ease: "none",
        duration: 6,
        onUpdate: () => {
          const current = Math.round(imageSeq2.frame);
          const img = images2[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
            context2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
          }
        }
      }, "start-canvas-anim");
    } else {
      tl2.to({}, { duration: 6 }, "start-canvas-anim");
    }

    tl2.fromTo("#s2-f1", { opacity: 0, y: 100, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "start-canvas-anim+=0.5")
       .to("#s2-f1", { opacity: 1, duration: 1 })
       .to("#s2-f1", { opacity: 0, y: -100, scale: 0.95, duration: 1, ease: "power2.inOut" })
       .fromTo("#s2-f2", { opacity: 0, y: 100, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "-=0.5")
       .to("#s2-f2", { opacity: 1, duration: 1 })
       .to("#s2-f2", { opacity: 0, y: -100, scale: 0.95, duration: 1, ease: "power2.inOut" })
       .fromTo("#s2-f3", { opacity: 0, y: 100, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "-=0.5")
       .to("#s2-f3", { opacity: 1, duration: 1 });

    // Section 3 Logic (Iceberg Urbano)
    const canvas3 = canvasRef3.current;
    const context3 = canvas3?.getContext("2d");

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    gsap.set("#s3-canvas-container", { opacity: 0 });
    gsap.set("#s3-dark-overlay", { opacity: 1 }); // Fully dark initially
    gsap.set("#s3-top-light", { opacity: 0 }); // Top illumination initially off

    tl3.to("#s3-intro", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" })
       .to("#s3-canvas-container", { opacity: 1, duration: 1 }, "-=0.5")
       .addLabel("start-canvas-anim-3");

    if (canvas3 && context3) {
      canvas3.width = 1920;
      canvas3.height = 1080;
      const frameCount3 = 20; // Starting from 11 to 30 = 20 frames
      
      const currentFrame3 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776272059/sez_02-frame-${(index + 11).toString().padStart(3, '0')}.jpg`;

      const images3: HTMLImageElement[] = [];
      const imageSeq3 = { frame: 0 };

      for (let i = 0; i < frameCount3; i++) {
        const img = new Image();
        img.src = currentFrame3(i);
        images3.push(img);
      }

      images3[0].onload = () => {
        context3.drawImage(images3[0], 0, 0, canvas3.width, canvas3.height);
      };

      tl3.to(imageSeq3, {
        frame: frameCount3 - 1,
        snap: "frame",
        ease: "none",
        duration: 10, // Adjusted duration to fit all text blocks
        onUpdate: () => {
          const current = Math.round(imageSeq3.frame);
          const img = images3[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            context3.drawImage(img, 0, 0, canvas3.width, canvas3.height);
          }
        }
      }, "start-canvas-anim-3");
    } else {
      tl3.to({}, { duration: 10 }, "start-canvas-anim-3");
    }

    // F1 (30%) - Illuminate top, text at bottom
    tl3.to("#s3-dark-overlay", { opacity: 0, duration: 1 }, "start-canvas-anim-3")
       .to("#s3-top-light", { opacity: 1, duration: 1 }, "start-canvas-anim-3")
       .fromTo("#s3-f1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "start-canvas-anim-3")
       .to({val: 0}, {val: 30, duration: 1, ease: "power2.out", onUpdate: function() { 
         const el = document.getElementById('counter-30');
         if(el) el.innerText = Math.round(this.targets()[0].val).toString(); 
       }}, "start-canvas-anim-3")
       .to("#s3-f1", { opacity: 1, duration: 1.5 })
       .to("#s3-f1", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" });

    // F2 (70%) - Everything dark, text center
    tl3.to("#s3-dark-overlay", { opacity: 0.9, duration: 1 }, "<")
       .to("#s3-top-light", { opacity: 0, duration: 1 }, "<")
       .fromTo("#s3-f2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "<")
       .to({val: 0}, {val: 70, duration: 1, ease: "power2.out", onUpdate: function() { 
         const el = document.getElementById('counter-70');
         if(el) el.innerText = Math.round(this.targets()[0].val).toString(); 
       }}, "<")
       .to("#s3-f2", { opacity: 1, duration: 1.5 })
       .to("#s3-f2", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" });

    // F3 & Illumination - Full light, move canvas up, fade bottom to black, text lower
    tl3.to("#s3-dark-overlay", { opacity: 0, duration: 1.5, ease: "power2.inOut" }, "<")
       .to("#s3-canvas-container", { y: "-25vh", duration: 1.5, ease: "power2.inOut" }, "<")
       .to("#s3-bottom-dark", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "<")
       .fromTo("#s3-f3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "<")
       .to("#s3-f3", { opacity: 1, duration: 2 });

    // Section 4 Logic (L'Ecosistema di Cattura)
    const canvas4 = canvasRef4.current;
    const context4 = canvas4?.getContext("2d");

    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    gsap.set("#s4-canvas-container", { opacity: 0 });

    tl4.to("#s4-intro", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" })
       .to("#s4-canvas-container", { opacity: 1, duration: 1 }, "-=0.5")
       .addLabel("start-canvas-anim-4");

    if (canvas4 && context4) {
      canvas4.width = 1920;
      canvas4.height = 1080;
      const frameCount4 = 30; // Assuming 30 frames
      
      const currentFrame4 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776347416/sez_03-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images4: HTMLImageElement[] = [];
      const imageSeq4 = { frame: 0 };

      for (let i = 0; i < frameCount4; i++) {
        const img = new Image();
        img.src = currentFrame4(i);
        images4.push(img);
      }

      images4[0].onload = () => {
        context4.drawImage(images4[0], 0, 0, canvas4.width, canvas4.height);
      };

      tl4.to(imageSeq4, {
        frame: frameCount4 - 1,
        snap: "frame",
        ease: "none",
        duration: 30, // 3 texts
        onUpdate: () => {
          const current = Math.round(imageSeq4.frame);
          const img = images4[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context4.clearRect(0, 0, canvas4.width, canvas4.height);
            context4.drawImage(img, 0, 0, canvas4.width, canvas4.height);
          }
        }
      }, "start-canvas-anim-4");
    } else {
      tl4.to({}, { duration: 30 }, "start-canvas-anim-4");
    }

    // Act 1: 5 to 10
    tl4.fromTo("#s4-f1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "start-canvas-anim-4+=5")
       .to("#s4-f1", { opacity: 1, duration: 3 }, "start-canvas-anim-4+=6")
       .to("#s4-f1", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" }, "start-canvas-anim-4+=9");

    // Act 2: 12 to 17
    tl4.fromTo("#s4-f2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "start-canvas-anim-4+=12")
       .to("#s4-f2", { opacity: 1, duration: 3 }, "start-canvas-anim-4+=13")
       .to("#s4-f2", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" }, "start-canvas-anim-4+=16");

    // Act 3: 19 to end (30)
    tl4.fromTo("#s4-f3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "start-canvas-anim-4+=19")
       .to("#s4-f3", { opacity: 1, duration: 10 }, "start-canvas-anim-4+=20");

    // Push canvas up into black frame (without zoom out) for final scene Act 3
    tl4.to("#s4-canvas-layer", { y: "-20vh", duration: 11, ease: "power1.inOut" }, "start-canvas-anim-4+=19")
       .to("#s4-act3-mask", { opacity: 1, duration: 2, ease: "power2.inOut" }, "start-canvas-anim-4+=19");

    // Section 5 Logic (Livello 1: Dominio Spazio Aereo)
    const canvas5 = canvasRef5.current;
    const context5 = canvas5?.getContext("2d");

    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-5",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas5 && context5) {
      canvas5.width = 1920;
      canvas5.height = 1080;
      const frameCount5 = 60; // Approximate frames for Section 5 animation sequence
      
      const currentFrame5 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776357422/sez_04-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images5: HTMLImageElement[] = [];
      const imageSeq5 = { frame: 0 };

      for (let i = 0; i < frameCount5; i++) {
        const img = new Image();
        img.src = currentFrame5(i);
        images5.push(img);
      }

      images5[0].onload = () => {
        context5.drawImage(images5[0], 0, 0, canvas5.width, canvas5.height);
      };

      // Background static during Intro (0 to 12), animates over 60 units (12 to 72)
      tl5.to(imageSeq5, {
        frame: frameCount5 - 1,
        snap: "frame",
        ease: "none",
        duration: 60,
        onUpdate: () => {
          const current = Math.round(imageSeq5.frame);
          const img = images5[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context5.clearRect(0, 0, canvas5.width, canvas5.height);
            context5.drawImage(img, 0, 0, canvas5.width, canvas5.height);
          }
        }
      }, 12);
    } else {
      tl5.to({}, { duration: 60 }, 12);
    }

    // Text Sequential Logic for Section 5 (Apple Style Precise Sync)
    
    // Intro Title (Block 1) - BG is still
    tl5.fromTo("#s5-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
       .to("#s5-intro", { opacity: 1, duration: 8 }, 2)
       .to("#s5-intro", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 10);

    // Item 1 (LiDAR Multi-Eco) - BG starts animating simultaneously
    tl5.fromTo("#s5-item-1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 12)
       .to("#s5-item-1", { opacity: 1, duration: 14 }, 14)
       .to("#s5-item-1", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 28);

    // Gap of 3 timeline units (30 to 33)

    // Item 2 (Modelli ad Altissima Risoluzione)
    tl5.fromTo("#s5-item-2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 33)
       .to("#s5-item-2", { opacity: 1, duration: 14 }, 35)
       .to("#s5-item-2", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 49);

    // Gap of 3 timeline units (51 to 54)

    // Item 3 (Ortofoto Pura) - Ends exactly with BG animation
    tl5.fromTo("#s5-item-3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 54)
       .to("#s5-item-3", { opacity: 1, duration: 14 }, 56)
       .to("#s5-item-3", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 70);

    // Add final buffer state to ensure scroll reaches bottom cleanly
    tl5.to({}, { duration: 2 }, 72);

    // Section 6 Logic (Livello 2: Dettaglio Altezza Uomo)
    const canvas6 = canvasRef6.current;
    const context6 = canvas6?.getContext("2d");

    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-6",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas6 && context6) {
      canvas6.width = 1920;
      canvas6.height = 1080;
      const frameCount6 = 64; 
      
      const currentFrame6 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776362198/sez_05-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images6: HTMLImageElement[] = [];
      const imageSeq6 = { frame: 0 };

      for (let i = 0; i < frameCount6; i++) {
        const img = new Image();
        img.src = currentFrame6(i);
        images6.push(img);
      }

      images6[0].onload = () => {
        context6.drawImage(images6[0], 0, 0, canvas6.width, canvas6.height);
      };

      tl6.to(imageSeq6, {
        frame: frameCount6 - 1,
        snap: "frame",
        ease: "none",
        duration: 64, // 1 unit = 1 frame for simple math relative to SF/EF
        onUpdate: () => {
          const current = Math.round(imageSeq6.frame);
          const img = images6[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context6.clearRect(0, 0, canvas6.width, canvas6.height);
            context6.drawImage(img, 0, 0, canvas6.width, canvas6.height);
          }
        }
      }, 0);
    } else {
      tl6.to({}, { duration: 64 }, 0);
    }

    // Text Sync for Section 6 (1 unit = 1 frame)
    // Intro Title (SF 5 - EF 10)
    tl6.fromTo("#s6-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, 5)
       .to("#s6-intro", { opacity: 1, duration: 3 }, 6) 
       .to("#s6-intro", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" }, 9); // finishes fade out by 10

    // Item 1: (SF 15 - EF 22)
    tl6.fromTo("#s6-item-1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" }, 15)
       .to("#s6-item-1", { opacity: 1, duration: 4 }, 16.5)
       .to("#s6-item-1", { opacity: 0, y: -50, scale: 0.95, duration: 1.5, ease: "power2.inOut" }, 20.5);

    // Item 2: (SF 28 - EF 38)
    tl6.fromTo("#s6-item-2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 28)
       .to("#s6-item-2", { opacity: 1, duration: 6 }, 30)
       .to("#s6-item-2", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 36);

    // Item 3: (SF 44 - EF 64)
    tl6.fromTo("#s6-item-3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 3, ease: "power2.out" }, 44)
       .to("#s6-item-3", { opacity: 1, duration: 14 }, 47)
       .to("#s6-item-3", { opacity: 0, y: -50, scale: 0.95, duration: 3, ease: "power2.inOut" }, 61);

    // Section 7 Logic (Livello 3: Radiografare il sottosuolo)
    const canvas7 = canvasRef7.current;
    const context7 = canvas7?.getContext("2d");

    const tl7 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-7",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas7 && context7) {
      canvas7.width = 1920;
      canvas7.height = 1080;
      const frameCount7 = 82; // Estimated frames
      
      const currentFrame7 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776364445/sez_06-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images7: HTMLImageElement[] = [];
      const imageSeq7 = { frame: 0 };

      // Load first frame immediately to guarantee a background
      const firstImg = new Image();
      firstImg.src = currentFrame7(0);
      firstImg.onload = () => {
         context7.drawImage(firstImg, 0, 0, canvas7.width, canvas7.height);
      };
      images7.push(firstImg);

      for (let i = 1; i < frameCount7; i++) {
        const img = new Image();
        img.src = currentFrame7(i);
        images7.push(img);
      }

      // 1. Initial State: Intro Title appears
      gsap.set("#s7-canvas-container", { opacity: 0 });

      // Intro Title (0 to 12) - Plays BEFORE BG sequence starts
      tl7.fromTo("#s7-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
         .to("#s7-intro", { opacity: 1, duration: 8 }, 2) 
         .to("#s7-intro", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 10);

      // Fade in Canvas after Title
      tl7.to("#s7-canvas-container", { opacity: 1, duration: 3 }, 12);

      // 2. BG Animation (Starts AT 15, goes until 97)
      tl7.to(imageSeq7, {
        frame: frameCount7 - 1,
        snap: "frame",
        ease: "none",
        duration: 82, // 82 frames total
        onUpdate: () => {
          const current = Math.round(imageSeq7.frame);
          const img = images7[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context7.clearRect(0, 0, canvas7.width, canvas7.height);
            context7.drawImage(img, 0, 0, canvas7.width, canvas7.height);
          }
        }
      }, 15);

      // 3. Text Blocks Sync (Gap = 4 units)
      // Item 1: Georadar (15 - 21) => duration 6
      tl7.fromTo("#s7-item-1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, 15)
         .to("#s7-item-1", { opacity: 1, duration: 4 }, 16)
         .to("#s7-item-1", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" }, 20);

      // Gap 4 units (21 to 25)

      // Item 2: Classificazione (25 - 31) => duration 6
      tl7.fromTo("#s7-item-2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, 25)
         .to("#s7-item-2", { opacity: 1, duration: 4 }, 26)
         .to("#s7-item-2", { opacity: 0, y: -50, scale: 0.95, duration: 1, ease: "power2.inOut" }, 30);

      // Gap 4 units (31 to 35)

      // Item 3: Prevenzione Rischi (Starts at 35, lasts till end without disappearing)
      // Unit 35 matches exactly frame 20 of the background animation (15 + 20 = 35)
      tl7.fromTo("#s7-item-3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 35)
         .to("#s7-item-3", { opacity: 1, duration: 60 }, 37); // Stays visible until end of BG and slightly after (97+)

      // Final visual buffer
      tl7.to({}, { duration: 5 }, 100);

    } else {
      tl7.to({}, { duration: 110 }, 0);
    }

    // Section 8 Logic (Caso D'uso: Il Catasto Urbano Automatizzato)
    const canvas8 = canvasRef8.current;
    const context8 = canvas8?.getContext("2d");

    const tl8 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-8",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas8 && context8) {
      canvas8.width = 1920;
      canvas8.height = 1080;
      const frameCount8 = 85; 
      
      const currentFrame8 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776370374/sez_07-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images8: HTMLImageElement[] = [];
      const imageSeq8 = { frame: 0 };

      // Load first frame immediately
      const firstImg = new Image();
      firstImg.src = currentFrame8(0);
      firstImg.onload = () => {
         context8.drawImage(firstImg, 0, 0, canvas8.width, canvas8.height);
      };
      images8.push(firstImg);

      for (let i = 1; i < frameCount8; i++) {
        const img = new Image();
        img.src = currentFrame8(i);
        images8.push(img);
      }

      gsap.set("#s8-canvas-container", { opacity: 0 });

      // Intro Title (0 to 12)
      tl8.fromTo("#s8-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
         .to("#s8-intro", { opacity: 1, duration: 8 }, 2) 
         .to("#s8-intro", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 10);

      // Fade in Canvas
      tl8.to("#s8-canvas-container", { opacity: 1, duration: 3 }, 12);

      // BG Animation
      tl8.to(imageSeq8, {
        frame: frameCount8 - 1,
        snap: "frame",
        ease: "none",
        duration: 85,
        onUpdate: () => {
          const current = Math.round(imageSeq8.frame);
          const img = images8[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context8.clearRect(0, 0, canvas8.width, canvas8.height);
            context8.drawImage(img, 0, 0, canvas8.width, canvas8.height);
          }
        }
      }, 15);

      // Gap is 4 frames layout -> We have 4 items
      // Total BG duration is 85. Starts at 15 ends at 100.
      
      // Item 1 (15 - 28)
      tl8.fromTo("#s8-item-1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 15)
         .to("#s8-item-1", { opacity: 1, duration: 9 }, 17)
         .to("#s8-item-1", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 26);

      // Gap (28 - 32)
      
      // Item 2 (32 - 45)
      tl8.fromTo("#s8-item-2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 32)
         .to("#s8-item-2", { opacity: 1, duration: 9 }, 34)
         .to("#s8-item-2", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 43);

      // Gap (45 - 49)

      // Item 3 (49 - 62)
      tl8.fromTo("#s8-item-3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 49)
         .to("#s8-item-3", { opacity: 1, duration: 9 }, 51)
         .to("#s8-item-3", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 60);

      // Gap (62 - 66)

      // Item 4 (66 to end. Wait, user wants it to stay like before? Let's assume yes because it's the final section note)
      tl8.fromTo("#s8-item-4", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 66)
         .to("#s8-item-4", { opacity: 1, duration: 34 }, 68);

      tl8.to({}, { duration: 5 }, 100);

    } else {
      tl8.to({}, { duration: 110 }, 0);
    }

    // Section 9 Logic (Caso D'uso: Manutenzione Istantanea)
    const canvas9 = canvasRef9.current;
    const context9 = canvas9?.getContext("2d");

    const tl9 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-9",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas9 && context9) {
      canvas9.width = 1920;
      canvas9.height = 1080;
      const frameCount9 = 85; 
      
      const currentFrame9 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776422209/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images9: HTMLImageElement[] = [];
      const imageSeq9 = { frame: 0 };

      // Load first frame immediately
      const firstImg9 = new Image();
      firstImg9.src = currentFrame9(0);
      firstImg9.onload = () => {
         context9.drawImage(firstImg9, 0, 0, canvas9.width, canvas9.height);
      };
      images9.push(firstImg9);

      for (let i = 1; i < frameCount9; i++) {
        const img = new Image();
        img.src = currentFrame9(i);
        images9.push(img);
      }

      gsap.set("#s9-canvas-container", { opacity: 0 });

      // Intro Title (0 to 12)
      tl9.fromTo("#s9-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
         .to("#s9-intro", { opacity: 1, duration: 8 }, 2) 
         .to("#s9-intro", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 10);

      // Fade in Canvas
      tl9.to("#s9-canvas-container", { opacity: 1, duration: 3 }, 12);

      // BG Animation
      tl9.to(imageSeq9, {
        frame: frameCount9 - 1,
        snap: "frame",
        ease: "none",
        duration: 85,
        onUpdate: () => {
          const current = Math.round(imageSeq9.frame);
          const img = images9[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context9.clearRect(0, 0, canvas9.width, canvas9.height);
            context9.drawImage(img, 0, 0, canvas9.width, canvas9.height);
          }
        }
      }, 15);

      // Gap is 4 frames layout
      // Total BG duration is 85. Starts at 15 ends at 100.
      
      // We have 3 items: Item 1, Item 2, Item 3
      // Item 1 (15 - 35)
      tl9.fromTo("#s9-item-1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 15)
         .to("#s9-item-1", { opacity: 1, duration: 16 }, 17)
         .to("#s9-item-1", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 33);

      // Gap (35 - 39)
      
      // Item 2 (39 - 59)
      tl9.fromTo("#s9-item-2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 39)
         .to("#s9-item-2", { opacity: 1, duration: 16 }, 41)
         .to("#s9-item-2", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 57);

      // Gap (59 - 63)

      // Item 3 (63 - end)
      tl9.fromTo("#s9-item-3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 63)
         .to("#s9-item-3", { opacity: 1, duration: 37 }, 65);

      tl9.to({}, { duration: 5 }, 100);

    } else {
      tl9.to({}, { duration: 110 }, 0);
    }

    // Section 10 Logic (Caso D'uso: Tutela del Patrimonio Storico)
    const canvas10 = canvasRef10.current;
    const context10 = canvas10?.getContext("2d");

    const tl10 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-10",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas10 && context10) {
      canvas10.width = 1920;
      canvas10.height = 1080;
      const frameCount10 = 85; 
      
      const currentFrame10 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776418963/sez_09-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images10: HTMLImageElement[] = [];
      const imageSeq10 = { frame: 0 };

      // Load first frame immediately
      const firstImg10 = new Image();
      firstImg10.src = currentFrame10(0);
      firstImg10.onload = () => {
         context10.drawImage(firstImg10, 0, 0, canvas10.width, canvas10.height);
      };
      images10.push(firstImg10);

      for (let i = 1; i < frameCount10; i++) {
        const img = new Image();
        img.src = currentFrame10(i);
        images10.push(img);
      }

      gsap.set("#s10-canvas-container", { opacity: 0 });

      // Intro Title (0 to 12)
      tl10.fromTo("#s10-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
         .to("#s10-intro", { opacity: 1, duration: 8 }, 2) 
         .to("#s10-intro", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 10);

      // Fade in Canvas
      tl10.to("#s10-canvas-container", { opacity: 1, duration: 3 }, 12);

      // BG Animation
      tl10.to(imageSeq10, {
        frame: frameCount10 - 1,
        snap: "frame",
        ease: "none",
        duration: 85,
        onUpdate: () => {
          const current = Math.round(imageSeq10.frame);
          const img = images10[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context10.clearRect(0, 0, canvas10.width, canvas10.height);
            context10.drawImage(img, 0, 0, canvas10.width, canvas10.height);
          }
        }
      }, 15);

      // Item 1 (15 - 35) Left Callout
      tl10.fromTo("#s10-item-1", { opacity: 0, x: -50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 2, ease: "power2.out" }, 15)
         .to("#s10-item-1", { opacity: 1, duration: 16 }, 17)
         .to("#s10-item-1", { opacity: 0, x: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 33);

      // Item 2 (39 - 59) Right Callout
      tl10.fromTo("#s10-item-2", { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 2, ease: "power2.out" }, 39)
         .to("#s10-item-2", { opacity: 1, duration: 16 }, 41)
         .to("#s10-item-2", { opacity: 0, x: 50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 57);

      // Item 3 (63 - end) Highlight Box
      tl10.fromTo("#s10-item-3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 63)
         .to("#s10-item-3", { opacity: 1, duration: 37 }, 65);

      tl10.to({}, { duration: 5 }, 100);

    } else {
      tl10.to({}, { duration: 110 }, 0);
    }

    // Section 11 Logic (Caso D'uso: Lo Scudo Idrogeologico)
    const canvas11 = canvasRef11.current;
    const context11 = canvas11?.getContext("2d");

    const tl11 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-11",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas11 && context11) {
      canvas11.width = 1920;
      canvas11.height = 1080;
      const frameCount11 = 85; 
      
      const currentFrame11 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776419258/sez_10-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images11: HTMLImageElement[] = [];
      const imageSeq11 = { frame: 0 };

      // Load first frame immediately
      const firstImg11 = new Image();
      firstImg11.src = currentFrame11(0);
      firstImg11.onload = () => {
         context11.drawImage(firstImg11, 0, 0, canvas11.width, canvas11.height);
      };
      images11.push(firstImg11);

      for (let i = 1; i < frameCount11; i++) {
        const img = new Image();
        img.src = currentFrame11(i);
        images11.push(img);
      }

      gsap.set("#s11-canvas-container", { opacity: 0 });

      // Intro Title (0 to 12)
      tl11.fromTo("#s11-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
         .to("#s11-intro", { opacity: 1, duration: 8 }, 2) 
         .to("#s11-intro", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 10);

      // Fade in Canvas
      tl11.to("#s11-canvas-container", { opacity: 1, duration: 3 }, 12);

      // BG Animation
      tl11.to(imageSeq11, {
        frame: frameCount11 - 1,
        snap: "frame",
        ease: "none",
        duration: 85,
        onUpdate: () => {
          const current = Math.round(imageSeq11.frame);
          const img = images11[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context11.clearRect(0, 0, canvas11.width, canvas11.height);
            context11.drawImage(img, 0, 0, canvas11.width, canvas11.height);
          }
        }
      }, 15);

      // Item 1 (15 - 35) Left
      tl11.fromTo("#s11-item-1", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 15)
         .to("#s11-item-1", { opacity: 1, duration: 16 }, 17)
         .to("#s11-item-1", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 33);

      // Item 2 (39 - 59) Left
      tl11.fromTo("#s11-item-2", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 39)
         .to("#s11-item-2", { opacity: 1, duration: 16 }, 41)
         .to("#s11-item-2", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 57);

      // Item 3 (63 - end) Left Highlighted
      tl11.fromTo("#s11-item-3", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 63)
         .to("#s11-item-3", { opacity: 1, duration: 37 }, 65);

      tl11.to({}, { duration: 5 }, 100);

    } else {
      tl11.to({}, { duration: 110 }, 0);
    }

    // Section 12 Logic (Il Centro di Comando in Cloud)
    const canvas12 = canvasRef12.current;
    const context12 = canvas12?.getContext("2d");

    const tl12 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-12",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas12 && context12) {
      canvas12.width = 1920;
      canvas12.height = 1080;
      const frameCount12 = 85; 
      
      const currentFrame12 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776419337/sez_11-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images12: HTMLImageElement[] = [];
      const imageSeq12 = { frame: 0 };

      // Load first frame immediately
      const firstImg12 = new Image();
      firstImg12.src = currentFrame12(0);
      firstImg12.onload = () => {
         context12.drawImage(firstImg12, 0, 0, canvas12.width, canvas12.height);
      };
      images12.push(firstImg12);

      for (let i = 1; i < frameCount12; i++) {
        const img = new Image();
        img.src = currentFrame12(i);
        images12.push(img);
      }

      gsap.set("#s12-canvas-container", { opacity: 0 });

      // Intro Title (0 to 12)
      tl12.fromTo("#s12-intro", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 0)
         .to("#s12-intro", { opacity: 1, duration: 8 }, 2) 
         .to("#s12-intro", { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 10);

      // Fade in Canvas
      tl12.to("#s12-canvas-container", { opacity: 1, duration: 3 }, 12);

      // BG Animation
      tl12.to(imageSeq12, {
        frame: frameCount12 - 1,
        snap: "frame",
        ease: "none",
        duration: 85,
        onUpdate: () => {
          const current = Math.round(imageSeq12.frame);
          const img = images12[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context12.clearRect(0, 0, canvas12.width, canvas12.height);
            context12.drawImage(img, 0, 0, canvas12.width, canvas12.height);
          }
        }
      }, 15);

      // Item 1 (15 - 35) Right Top
      tl12.fromTo("#s12-item-1", { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 2, ease: "power2.out" }, 15)
         .to("#s12-item-1", { opacity: 1, duration: 16 }, 17)
         .to("#s12-item-1", { opacity: 0, x: 50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 33);

      // Item 2 (39 - 59) Right Middle
      tl12.fromTo("#s12-item-2", { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 2, ease: "power2.out" }, 39)
         .to("#s12-item-2", { opacity: 1, duration: 16 }, 41)
         .to("#s12-item-2", { opacity: 0, x: 50, scale: 0.95, duration: 2, ease: "power2.inOut" }, 57);

      // Item 3 (63 - end) Right Bottom
      tl12.fromTo("#s12-item-3", { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 2, ease: "power2.out" }, 63)
         .to("#s12-item-3", { opacity: 1, duration: 37 }, 65);

      tl12.to({}, { duration: 5 }, 100);

    } else {
      tl12.to({}, { duration: 110 }, 0);
    }

    // BRIDGE SECTION - Borgo Geoscientifico Narrative
    const tlBridge = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-bridge",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tlBridge
      .fromTo("#bridge-title-container", { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 25, ease: "power2.out" })
      .to("#bridge-label-gd", { opacity: 0, y: -20, filter: "blur(10px)", duration: 15 }, "+=15")
      .fromTo("#bridge-label-dt", { opacity: 0, y: 20, filter: "blur(10px)", scale: 0.9 }, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 15 }, "-=15")
      .to("#bridge-title-container", { opacity: 0, y: -100, scale: 1.1, duration: 20, ease: "power2.in" }, "+=20")
      
      .fromTo("#bridge-content-1", { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 25 }, "-=5")
      .to("#bridge-content-1", { opacity: 0, y: -80, scale: 1.05, duration: 25 }, "+=30")
      
      .fromTo("#bridge-content-2", { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 25 }, "-=5")
      .to("#bridge-content-2", { opacity: 0, y: -80, scale: 1.05, duration: 25 }, "+=30")
      
      .fromTo("#bridge-content-3", { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 25 }, "-=5")
      .to("#bridge-content-3", { opacity: 0, y: -80, scale: 1.05, duration: 25 }, "+=30");

    // Section 13 Logic (Il Futuro è Ora)
    const canvas13 = canvasRef13.current;
    const context13 = canvas13?.getContext("2d");

    const tl13 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-13",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    if (canvas13 && context13) {
      canvas13.width = 1920;
      canvas13.height = 1080;
      const frameCount13 = 85; 
      
      const currentFrame13 = (index: number) => 
        `https://res.cloudinary.com/tigosanchez/image/upload/q_auto/f_auto/v1776431095/sez_12-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

      const images13: HTMLImageElement[] = [];
      const imageSeq13 = { frame: 0 };

      // Load first frame immediately
      const firstImg = new Image();
      firstImg.src = currentFrame13(0);
      firstImg.onload = () => {
        context13.drawImage(firstImg, 0, 0, canvas13.width, canvas13.height);
      };

      for (let i = 0; i < frameCount13; i++) {
        const img = new Image();
        img.src = currentFrame13(i);
        images13.push(img);
      }

      gsap.set("#s13-canvas-container", { opacity: 0 });
      tl13.to("#s13-canvas-container", { opacity: 1, duration: 3 }, 0);

      // BG Animation
      tl13.to(imageSeq13, {
        frame: frameCount13 - 1,
        snap: "frame",
        ease: "none",
        duration: 85,
        onUpdate: () => {
          const current = Math.round(imageSeq13.frame);
          const img = images13[current];
          if (img && img.complete && img.naturalWidth > 0) {
            context13.clearRect(0, 0, canvas13.width, canvas13.height);
            context13.drawImage(img, 0, 0, canvas13.width, canvas13.height);
          }
        }
      }, 0);

      // Text block starts visible then moves down
      tl13.fromTo("#s13-text-block", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 5, ease: "power2.out" }, 0)
         .to("#s13-text-block", { opacity: 1, duration: 40 }, 5)
         .to("#s13-text-block", { opacity: 0, y: "50vh", scale: 0.95, duration: 15, ease: "power2.inOut" }, 45);

      // Big Final Logo fades in and enables pointer events
      tl13.fromTo("#s13-big-logo", { opacity: 0, scale: 0.8, pointerEvents: 'none' }, { opacity: 1, scale: 1, pointerEvents: 'auto', duration: 15, ease: "power2.out" }, 55)
         .to("#s13-big-logo", { opacity: 1, duration: 30 }, 70);

    } else {
      tl13.to({}, { duration: 100 }, 0);
    }

    // Text Scrollytelling Logic for Hero
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Tracking Active Sections & End State
    const sectionIds = [
      'hero-container', 'section-paradigma', 'section-3', 'section-4',
      'section-5', 'section-6', 'section-7', 'section-8',
      'section-9', 'section-10', 'section-11', 'section-12', 'section-bridge', 'section-13'
    ];
    sectionIds.forEach((sec) => {
      ScrollTrigger.create({
        trigger: `#${sec}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(sec),
        onEnterBack: () => setActiveSection(sec),
      });
    });

    ScrollTrigger.create({
      trigger: "#section-13",
      start: "top center",
      onEnter: () => setIsAtEnd(true),
      onLeaveBack: () => setIsAtEnd(false)
    });

    // Initial state for blocks
    gsap.set("#block-2", { opacity: 0, y: 80, scale: 0.95 });
    gsap.set("#block-3", { opacity: 0, y: 80, scale: 0.95 });

    tl.to("#block-1", { opacity: 0, y: -100, scale: 0.95, duration: 1.5, ease: "power2.inOut" })
      .to("#block-2", { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" }, "-=1")
      .to("#block-2", { opacity: 1, duration: 1 })
      .to("#block-2", { opacity: 0, y: -100, scale: 0.95, duration: 1.5, ease: "power2.inOut" })
      .to("#block-3", { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" }, "-=1")
      .to("#block-3", { opacity: 1, duration: 1.5 });

    // Paradigma Reveal
    gsap.utils.toArray('.s2-reveal').forEach((elem: any) => {
      gsap.fromTo(elem, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    gsap.utils.toArray('.s2-line').forEach((line: any) => {
      gsap.fromTo(line, 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.inOut",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="scroll-smooth bg-black text-white selection:bg-[#06b6d4] selection:text-black font-sans">
      
      {/* Top Header Protection Gradient */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-40 pointer-events-none"></div>

      {/* Global Header */}
      <header className="fixed top-6 left-0 w-full px-6 z-50 flex justify-between items-center pointer-events-none">
          {/* Minimal Logo */}
          <div className="mix-blend-difference pointer-events-auto flex items-center">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/62963b756bf2c45d308b1e5a/633b892b-f434-41d6-8a93-80f669f4421e/GGM+EARTH+LOGO+CLAIM+-+ALPHA.png?format=500w" 
              alt="GGM.EARTH" 
              className="h-[84px] brightness-0 invert object-contain opacity-70" 
            />
          </div>

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

        {/* Left Side: Navigation Links */}
        <div className="w-full md:w-[60vw] lg:w-[65vw] px-6 md:px-16 pt-24 md:pt-[120px] pb-12 flex flex-col items-start md:border-r border-white/5 md:overflow-y-auto">
           <span className="text-white/30 text-xs font-mono uppercase tracking-[0.3em] mb-8 md:mb-12 block">Index</span>
           <nav className="flex flex-col gap-6 w-full max-w-2xl">
            {[
              { id: 'hero-container', label: '01. Intro' },
              { id: 'section-paradigma', label: '02. Il Paradigma' },
              { id: 'section-3', label: '03. Sotto la Superficie' },
              { id: 'section-4', label: '04. L\'Ecosistema' },
              { id: 'section-5', label: '05. Il Dominio Aereo' },
              { id: 'section-6', label: '06. Dettaglio ad Altezza Uomo' },
              { id: 'section-7', label: '07. Radiografare il Sottosuolo' },
              { id: 'section-8', label: '08. Caso D\'uso: Catasto Urbano' },
              { id: 'section-9', label: '09. Caso D\'uso: Manutenzione' },
              { id: 'section-10', label: '10. Caso D\'uso: Patrimonio Storico' },
              { id: 'section-11', label: '11. Caso D\'uso: Scudo Idrogeologico' },
              { id: 'section-12', label: '12. Centro di Comando in Cloud' },
              { id: 'section-bridge', label: '13. Borgo Geoscientifico' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl md:text-3xl lg:text-4xl text-left font-light text-white/50 hover:text-white hover:translate-x-4 transition-all duration-300 w-full border-b border-white/5 pb-4 tracking-tight"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side: Project Data & CTAs */}
        <div className="w-full md:w-[40vw] lg:w-[35vw] bg-transparent md:bg-white/[0.02] p-6 md:p-16 flex flex-col justify-between md:overflow-y-auto border-t md:border-t-0 border-white/5 pb-24 md:pb-16">
           <div className="space-y-8 md:space-y-12 mt-0 md:mt-20">
              <div>
                 <span className="text-white/30 text-xs font-mono uppercase tracking-[0.3em] mb-4 block">Il Progetto</span>
                 <h3 className="text-2xl font-bold text-white mb-2">Gemello Digitale</h3>
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
                    Contatta il Team
                 </button>
                 <Link href="/progetto-borgo">
                    <button className="w-full border border-white/20 bg-transparent text-white py-4 rounded-full font-medium hover:bg-white/5 hover:border-white/40 transition-all text-sm tracking-wide">
                       Progetto Borgo Geoscientifico
                    </button>
                 </Link>
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

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scrollDown {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Global Scroll Indicator */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 mix-blend-difference pointer-events-none transition-opacity duration-700 ${isIdle && !isAtEnd ? 'opacity-70' : 'opacity-0'}`}>
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-white">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scrollDown"></div>
        </div>
      </div>

      {/* Global Vertical Timeline */}
      <div className={`fixed right-3 md:right-8 top-1/2 -translate-y-1/2 z-[70] flex flex-col items-end gap-2 md:gap-3 pointer-events-none mix-blend-difference transition-opacity duration-700 ${!isIdle && !isAtEnd ? 'opacity-100' : 'opacity-0'}`}>
        {[
          'hero-container', 'section-paradigma', 'section-3', 'section-4',
          'section-5', 'section-6', 'section-7', 'section-8',
          'section-9', 'section-10', 'section-11', 'section-12', 'section-bridge', 'section-13'
        ].map((sec, idx) => (
          <div key={sec} className="flex items-center gap-2 md:gap-3">
            <span className={`text-[8px] md:text-[9px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${activeSection === sec ? 'text-white opacity-100' : 'text-white/0 opacity-0 -translate-x-2'}`}>
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            <div className={`transition-all duration-500 rounded-full ${activeSection === sec ? 'w-4 h-[2px] bg-white' : 'w-2 h-[1px] bg-white/40'}`}></div>
          </div>
        ))}
      </div>

      {/* Sfondo Dinamico */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" id="bg-canvas">
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
      </div>

      {/* HERO SCROLLYTELLING CONTAINER */}
      <div id="hero-container" className="relative w-full h-[400vh] z-10">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          
          {/* Block 1: Titolo e Sottotitolo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" id="block-1">
             <h1 className="text-5xl md:text-[80px] lg:text-[120px] font-bold tracking-tighter leading-[0.9] mb-8">
                Il Gemello Digitale<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">di Città Sant'Angelo</span>
             </h1>
             <p className="text-xl md:text-3xl lg:text-4xl text-white/60 font-light tracking-wide max-w-3xl">
                Preservare la storia, progettare il futuro.
             </p>
             
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
               <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
             </div>
          </div>

          {/* Block 2: Dati in grafica */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" id="block-2">
             <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-24 items-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                <div className="flex flex-col items-center">
                   <span className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] mb-4">Elevazione</span>
                   <span className="text-5xl md:text-7xl lg:text-8xl font-light">320m <span className="text-xl md:text-2xl text-white/50">s.l.m.</span></span>
                </div>
                <div className="w-px h-24 bg-white/10 hidden lg:block"></div>
                <div className="w-24 h-px bg-white/10 lg:hidden mt-4 mb-4"></div>
                <div className="flex flex-col items-center">
                   <span className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] mb-4">Densità Punti</span>
                   <span className="text-5xl md:text-7xl lg:text-8xl font-light"><span className="font-mono">500</span><span className="text-xl md:text-2xl text-white/50">/m²</span></span>
                </div>
             </div>
          </div>

          {/* Block 3: Riquadro informativo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-[100px] md:pt-[130px] pb-8" id="block-3">
             <div className="backdrop-blur-sm bg-black/20 border border-white/10 p-6 md:p-12 rounded-3xl text-left max-w-4xl w-full shadow-none w-[95%] md:w-full">
                <h3 className="text-white/40 text-[10px] md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-8 border-b border-white/10 pb-3 md:pb-4">Project Details</h3>
                
                <div className="space-y-4 md:space-y-8">
                  <div className="group">
                    <h4 className="text-[#06b6d4] text-[9px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-bold">Progetto Tecnico</h4>
                    <p className="text-lg md:text-2xl lg:text-3xl font-light text-white group-hover:text-white/80 transition-colors">Digital Twin & Borgo Geoscientifico</p>
                  </div>
                  <div className="group">
                    <h4 className="text-[#06b6d4] text-[9px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-bold">Destinatario</h4>
                    <p className="text-lg md:text-2xl lg:text-3xl font-light text-white group-hover:text-white/80 transition-colors">Comune di Città Sant'Angelo (PE)</p>
                  </div>
                  <div className="group">
                    <h4 className="text-[#06b6d4] text-[9px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-bold">Partner Tecnologico</h4>
                    <p className="text-lg md:text-2xl lg:text-3xl font-light text-white group-hover:text-white/80 transition-colors mb-2 md:mb-4">GGM.EARTH / GGM SRL</p>
                    <div className="text-white/50 text-[10px] md:text-sm font-light tracking-wide space-y-1 md:space-y-1.5 mb-4 md:mb-8">
                        <p>
                          global@ggm.earth <span className="text-white/20 mx-2">|</span> 
                          <a href="https://ggm.earth" target="_blank" rel="noopener noreferrer" className="text-[#06b6d4] hover:text-white transition-colors underline decoration-[#06b6d4]/30 underline-offset-4">https://ggm.earth</a>
                        </p>
                        <p className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-widest pt-1 md:pt-2">
                          P.Iva IT01891900688 <span className="text-white/20 mx-1 md:mx-2">|</span> Unic Code: M5UXCR1
                        </p>
                    </div>
                  </div>

                  <div className="pt-3 md:pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3 md:gap-4">
                      <span className="inline-block px-1.5 md:px-2 py-0.5 md:py-1 bg-red-500/10 text-red-400 text-[8px] md:text-[10px] font-mono uppercase tracking-widest border border-red-500/20 rounded flex-shrink-0 mt-1">NDA</span>
                      <p className="text-[10px] md:text-sm text-white/50 leading-relaxed font-light">
                        Le informazioni contenute in questo documento e nel gemello digitale sono classificate come <strong className="text-white/80 font-medium">rigorosamente riservate</strong>. È fatto divieto assoluto di diffusione, registrazione o riproduzione non autorizzata dei dati sensibili acquisiti.
                      </p>
                    </div>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: REPLICA VIVENTE */}
      <div id="section-2" className="relative w-full h-[500vh] bg-black z-20">
        {/* Fade transition from canvas */}
        <div className="absolute top-[-50vh] left-0 w-full h-[50vh] bg-gradient-to-b from-transparent to-black pointer-events-none z-30"></div>

        {/* Sticky Container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          {/* Section 2 Canvas Background */}
          <div id="s2-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0">
              <canvas 
                ref={canvasRef2}
                className="w-full h-full object-cover opacity-70 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
          </div>

          {/* Centralized Text Container */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
            
            {/* Intro */}
            <div id="s2-intro" className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="w-px h-24 bg-white/20 mb-8"></div>
              <h2 className="text-[6vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase text-white/40">
                  Non è un modello 3D.
              </h2>
              <h2 className="text-[7vw] md:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-600 mt-2">
                  È una replica vivente.
              </h2>
              <div className="w-px h-24 bg-white/20 mt-8"></div>
            </div>

            {/* Feature 1 */}
            <div id="s2-f1" className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <div className="backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl max-w-4xl w-full shadow-none drop-shadow-2xl">
                <h3 className="text-[#06b6d4] text-sm md:text-base uppercase tracking-[0.3em] font-bold mb-4 drop-shadow-md">Replica Tridimensionale</h3>
                <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight drop-shadow-lg">Acquisizione millimetrica della realtà fisica.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div id="s2-f2" className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <div className="backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl max-w-4xl w-full shadow-none drop-shadow-2xl">
                <h3 className="text-[#06b6d4] text-sm md:text-base uppercase tracking-[0.3em] font-bold mb-4 drop-shadow-md">Database Attivo</h3>
                <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight drop-shadow-lg">Integrazione continua di dati tecnici, anagrafiche e reti di sottoservizi (IoT).</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div id="s2-f3" className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <div className="backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl max-w-4xl w-full shadow-none drop-shadow-2xl">
                <h3 className="text-[#06b6d4] text-sm md:text-base uppercase tracking-[0.3em] font-bold mb-4 drop-shadow-md">Consultazione Universale</h3>
                <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight drop-shadow-lg">Accessibilità web multiutente.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION PARADIGMA */}
      <div id="section-paradigma" className="relative w-full bg-black z-20 pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-[90vw] mx-auto">
            {/* Paradigma */}
            <div className="s2-reveal text-center max-w-5xl mx-auto relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#06b6d4] -mt-32"></div>
                <div className="inline-block border border-[#06b6d4]/30 rounded-full px-6 py-2 mb-12 backdrop-blur-md bg-[#06b6d4]/5">
                    <span className="text-[#06b6d4] text-sm md:text-base uppercase tracking-[0.4em] font-bold">Il paradigma cambia</span>
                </div>
                <p className="text-4xl md:text-5xl lg:text-[80px] font-light leading-[1.1] tracking-tight">
                    Dalla <span className="italic text-white/30 line-through decoration-white/20">materia inerte</span><br/>
                    al <span className="font-medium text-white">dato georeferenziato</span><br/>
                    e interrogabile in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-500 font-bold italic">tempo reale</span>.
                </p>
            </div>
        </div>
      </div>

      {/* SECTION 3: ICEBERG URBANO */}
      <div id="section-3" className="relative w-full h-[500vh] bg-black z-20">
        {/* Fade transition from Paradigma */}
        <div className="absolute top-[-25vh] left-0 w-full h-[25vh] bg-gradient-to-b from-transparent to-black pointer-events-none z-30"></div>

        {/* Sticky Container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          {/* Section 3 Canvas Background */}
          <div id="s3-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0">
              <canvas 
                ref={canvasRef3}
                className="w-full h-full object-cover opacity-100 mix-blend-screen"
              />
              {/* Dark overlay for the whole canvas */}
              <div id="s3-dark-overlay" className="absolute inset-0 bg-black"></div>
              {/* Top light overlay (illuminates the top part) */}
              <div id="s3-top-light" className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-0"></div>
          </div>
          
          {/* Bottom Dark Overlay (Fixed to screen) */}
          <div id="s3-bottom-dark" className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10 opacity-0"></div>

          {/* Centralized Text Container */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
            
            {/* Intro */}
            <div id="s3-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[15vh] text-center">
              <div className="w-px h-24 bg-white/20 mb-8"></div>
              <h2 className="text-[6vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase text-white/40">
                  Il Paradosso
              </h2>
              <h2 className="text-[7vw] md:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-600 mt-2">
                  dell'Iceberg Urbano
              </h2>
              <div className="w-px h-24 bg-white/20 mt-8"></div>
            </div>

            {/* Feature 1 */}
            <div id="s3-f1" className="absolute inset-0 flex flex-col items-center justify-end pb-[10vh] px-6 opacity-0 pointer-events-none z-20">
              <div className="max-w-3xl w-full flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></span>
                  <span className="text-[#06b6d4] font-mono text-xs tracking-[0.3em] uppercase">Sopra la superficie</span>
                </div>
                <div className="text-8xl md:text-[10rem] lg:text-[12rem] font-black leading-none text-white font-mono tracking-tighter drop-shadow-2xl mb-4 py-4">
                  <span id="counter-30">0</span><span className="text-5xl md:text-7xl text-white/50">%</span>
                </div>
                <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed drop-shadow-lg max-w-2xl">
                  Le Amministrazioni gestiscono quasi esclusivamente la <span className="text-white font-medium">punta dell’iceberg</span>: viabilità, facciate, arredo urbano.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div id="s3-f2" className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 pointer-events-none z-20">
              <div className="max-w-3xl w-full flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                  <span className="text-red-400 font-mono text-xs tracking-[0.3em] uppercase">Sotto la superficie</span>
                </div>
                <div className="text-8xl md:text-[10rem] lg:text-[12rem] font-black leading-none text-white font-mono tracking-tighter drop-shadow-2xl mb-4 py-4">
                  <span id="counter-70">0</span><span className="text-5xl md:text-7xl text-white/50">%</span>
                </div>
                <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed drop-shadow-lg max-w-2xl">
                  Il volume maggiore delle infrastrutture critiche è <span className="text-white font-medium">sepolto</span>. Reti idriche, cavità ed elettricità rimangono punti ciechi.
                </p>
              </div>
            </div>

            {/* Feature 3 (Riquadro in evidenza) */}
            <div id="s3-f3" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-[5vh] px-6 opacity-0 pointer-events-none z-20">
              <div className="max-w-4xl w-full text-center">
                <div className="inline-flex items-center gap-4 mb-4 border border-[#06b6d4]/30 rounded-full px-6 py-2 backdrop-blur-md bg-[#06b6d4]/5">
                  <span className="w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse"></span>
                  <span className="font-mono text-[#06b6d4] text-xs tracking-[0.4em] uppercase">Digital Twin Attivo</span>
                </div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 leading-[1.1] tracking-tight drop-shadow-2xl">
                  Il <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-500">Digital Twin</span> illumina l’intera struttura, rendendo l’invisibile <span className="italic text-white">finalmente misurabile</span>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* SECTION 4 - L'Ecosistema di Cattura */}
      <div id="section-4" className="relative w-full h-[300vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 4 Canvas Background */}
          <div id="s4-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0 bg-black overflow-hidden">
              <div id="s4-canvas-layer" className="absolute inset-0 w-full h-full">
                <canvas 
                  ref={canvasRef4}
                  className="w-full h-full object-cover object-bottom opacity-90 mix-blend-screen"
                />
              </div>
              {/* Fade out top and bottom gradients to frame the composition */}
              <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-black via-black/80 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-t from-black via-black/90 to-transparent"></div>
              {/* Medium black bottom mask just for Act 3 - adjusted to be less aggressive */}
              <div id="s4-act3-mask" className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 z-10"></div>
          </div>

          {/* Centralized Text Container */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
            
            {/* Intro */}
            <div id="s4-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[15vh] text-center">
              <div className="w-px h-24 bg-white/20 mb-8"></div>
              <h2 className="text-[5vw] md:text-[4vw] font-black leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                  L’Ecosistema di Cattura
              </h2>
              <h2 className="text-[6vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase text-white/40 mt-2">
                  Un Borgo Letto a Strati
              </h2>
              <p className="mt-8 text-xl md:text-2xl font-light text-[#06b6d4] tracking-widest uppercase">
                Come il team GGM costruisce il Gemello Digitale.
              </p>
              <div className="w-px h-24 bg-white/20 mt-12"></div>
            </div>

            {/* Act 1 */}
            <div id="s4-f1" className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 pointer-events-none z-20">
              <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                <div className="inline-flex items-center gap-4 mb-4">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></span>
                  <span className="font-mono text-white/70 text-xs tracking-[0.4em] uppercase">Atto I</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight drop-shadow-lg">
                  Lo Sguardo dal Cielo
                </h3>
                <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                  <span className="font-medium text-white">LiDAR da drone</span> per morfologia e rischio idrogeologico.
                </p>
              </div>
            </div>

            {/* Act 2 */}
            <div id="s4-f2" className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 pointer-events-none z-20">
               <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                <div className="inline-flex items-center gap-4 mb-4">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>
                  <span className="font-mono text-yellow-400/80 text-xs tracking-[0.4em] uppercase">Atto II</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-4 tracking-tight drop-shadow-lg">
                  L’Invisibile ad Altezza Uomo
                </h3>
                <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                  <span className="font-medium text-white">Laser Scanner Mobile</span> per il catasto urbano dinamico.
                </p>
              </div>
            </div>

            {/* Act 3 */}
            <div id="s4-f3" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-[10vh] md:pb-[15vh] opacity-0 pointer-events-none z-20">
               <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                <div className="inline-flex items-center gap-4 mb-4">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_purple]"></span>
                  <span className="font-mono text-purple-400/70 text-xs tracking-[0.4em] uppercase">Atto III</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-4 tracking-tight drop-shadow-lg">
                  Radiografare il Sottosuolo
                </h3>
                <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                  <span className="font-medium text-white">Georadar 3D</span> per reti nascoste e archeologia.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* SECTION 5 - Livello 1: Dominio Spazio Aereo */}
      <div id="section-5" className="relative w-full h-[400vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 5 Canvas Background */}
          <div id="s5-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden">
              <canvas 
                ref={canvasRef5}
                className="w-full h-full object-cover opacity-80 mix-blend-screen max-md:object-[80%_center]"
              />
              <div className="absolute inset-x-0 top-0 h-[30vh] bg-gradient-to-b from-black via-black/90 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-black via-black/90 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-[50vw] bg-gradient-to-r from-black/80 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
              
              {/* Intro Title */}
              <div id="s5-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-full mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 bg-[#06b6d4] rounded-full shadow-[0_0_10px_#06b6d4] animate-pulse"></span>
                  <span className="font-mono text-[#06b6d4] text-xs tracking-[0.3em] uppercase font-bold pr-1">Livello 1</span>
                </div>
                <h2 className="text-[6vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                  Il Dominio<br />dello Spazio Aereo
                </h2>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 */}
              <div id="s5-item-1" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-[15vh] opacity-0 pointer-events-none z-20">
                <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-400 mb-4 tracking-tight drop-shadow-lg">
                    LiDAR Multi-Eco
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed">
                    Il laser penetra la vegetazione per svelare la vera <span className="font-medium text-white">morfologia del terreno nascosto.</span>
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div id="s5-item-2" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-[15vh] opacity-0 pointer-events-none z-20">
                <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 tracking-tight drop-shadow-lg">
                    Modelli ad Altissima Risoluzione
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed">
                    Generazione simultanea di <span className="text-white font-bold">DTM</span> (Modello del Terreno) e <span className="text-white font-bold">DSM</span> (Modello delle Superfici).
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div id="s5-item-3" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-[15vh] opacity-0 pointer-events-none z-20">
                <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mb-4 tracking-tight drop-shadow-lg">
                    Ortofoto Pura
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed">
                    Immagini aeree perfettamente <span className="font-medium text-white">sovrapponibili alla griglia dati.</span>
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION 6 - Livello 2: Dettaglio Altezza Uomo */}
      <div id="section-6" className="relative w-full h-[350vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 6 Canvas Background */}
          <div id="s6-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden">
              <canvas 
                ref={canvasRef6}
                className="w-full h-full object-cover opacity-80 mix-blend-screen"
              />
              <div className="absolute inset-x-0 top-0 h-[30vh] bg-gradient-to-b from-black via-black/90 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black via-black/95 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
              
              {/* Intro Title */}
              <div id="s6-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_yellow] animate-pulse"></span>
                  <span className="font-mono text-yellow-400 text-xs tracking-[0.4em] uppercase font-bold">Livello 2</span>
                </div>
                <h2 className="text-[6vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                  Il Dettaglio<br />ad Altezza Uomo
                </h2>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 */}
              <div id="s6-item-1" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-[15vh] opacity-0 pointer-events-none z-20">
                <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-4 tracking-tight drop-shadow-lg">
                    1. Precisione
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed">
                    1-2 cm, catturando <span className="font-medium text-white">300.000 punti</span> al secondo.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div id="s6-item-2" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-[15vh] opacity-0 pointer-events-none z-20">
                <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 tracking-tight drop-shadow-lg">
                    2. Censimento Automatico
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed">
                    Identificazione tridimensionale di <span className="text-white font-bold">lampioni, segnaletica, tombini e caditoie.</span>
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div id="s6-item-3" className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-[15vh] opacity-0 pointer-events-none z-20">
                <div className="max-w-4xl w-full text-center backdrop-blur-sm bg-black/20 border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-none">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-400 mb-4 tracking-tight drop-shadow-lg">
                    3. Manutenzione
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed">
                    Individuazione millimetrica degli <span className="font-medium text-white">ammaloramenti delle mura</span> e della pavimentazione per ottimizzare gli appalti.
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION 7 - Livello 3: Radiografare il sottosuolo */}
      <div id="section-7" className="relative w-full h-[350vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 7 Canvas Background */}
          <div id="s7-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden opacity-0">
              <canvas 
                ref={canvasRef7}
                className="w-full h-full object-cover opacity-90 mix-blend-screen"
              />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col px-6">
              
              {/* Intro Title */}
              <div id="s7-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_purple] animate-pulse"></span>
                  <span className="font-mono text-purple-400 text-xs tracking-[0.4em] uppercase font-bold">Livello 3</span>
                </div>
                <h2 className="text-[6vw] md:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                  Radiografare<br />il Sottosuolo
                </h2>
                <p className="mt-8 text-xl md:text-2xl font-light text-purple-300 tracking-widest max-w-2xl drop-shadow-lg">
                  L’invisibile diventa misurabile in 3D.
                </p>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 */}
              <div id="s7-item-1" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-3xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4 tracking-tight drop-shadow-lg">
                    Georadar Multi-Antenna 
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Mappatura 2D/3D di acquedotti, fognature e reti elettriche <span className="font-medium text-white italic">senza alcuno scavo.</span>
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div id="s7-item-2" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-3xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight drop-shadow-lg">
                    Classificazione Reti
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Identificazione esatta per <span className="text-white font-bold">tipologia</span> e <span className="text-[#06b6d4] font-bold">quota (Z)</span>.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div id="s7-item-3" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-3xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 mb-4 tracking-tighter drop-shadow-lg">
                    Prevenzione Rischi
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Individuazione preventiva di cavità, cunicoli e anomalie strutturali.
                  </p>
                  <div className="mt-8">
                    <span className="font-bold text-red-100 uppercase tracking-[0.3em] text-[10px] md:text-sm lg:text-base border border-red-500/50 px-6 py-3 rounded-full inline-block backdrop-blur-md bg-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                      Zero scavi accidentali
                    </span>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION 8 - Caso D'uso: Catasto Urbano Automatizzato */}
      <div id="section-8" className="relative w-full h-[350vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 8 Canvas Background */}
          <div id="s8-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden opacity-0">
              <canvas 
                ref={canvasRef8}
                className="w-full h-full object-cover opacity-90 mix-blend-screen"
              />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col px-6">
              
              {/* Intro Title */}
              <div id="s8-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_emerald] animate-pulse"></span>
                  <span className="font-mono text-emerald-400 text-xs tracking-[0.4em] uppercase font-bold">Caso D'Uso</span>
                </div>
                <h2 className="text-[5vw] md:text-[4.5vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                  Il Catasto Urbano<br />Automatizzato
                </h2>
                <p className="mt-8 text-xl md:text-2xl font-light text-emerald-300 tracking-widest max-w-2xl drop-shadow-lg">
                  Il Digital Twin si trasforma nel motore decisionale quotidiano.
                </p>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 */}
              <div id="s8-item-1" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4 tracking-tight drop-shadow-lg">
                    Dati a schermo
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed font-mono">
                    Lampione L01 - Stato: <span className="text-emerald-400 font-bold">Attivo</span><br/>
                    Segnale S12 - Usura: <span className="text-yellow-400 font-bold">15%</span><br/>
                    Tombino T34 - Quota Z: <span className="text-blue-400 font-bold">-1.2m</span>
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div id="s8-item-2" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight drop-shadow-lg">
                    Censimento Arredo
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Ogni elemento urbano diventa un <span className="text-white font-bold">nodo interrogabile</span>.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div id="s8-item-3" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 tracking-tighter drop-shadow-lg">
                    Stato di Salute
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Assegnazione di <span className="text-white font-bold">priorità di manutenzione</span> in base ai rilievi di usura.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div id="s8-item-4" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-4 tracking-tighter drop-shadow-lg">
                    Banca Dati Viva
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    L’Ufficio Tecnico aggiorna lo stato degli asset <span className="italic text-white">direttamente dal portale web.</span>
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION 9 - Caso D'uso: Manutenzione Istantanea */}
      <div id="section-9" className="relative w-full h-[350vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 9 Canvas Background */}
          <div id="s9-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden opacity-0">
              <canvas 
                ref={canvasRef9}
                className="w-full h-full object-cover opacity-90 mix-blend-screen"
              />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col px-6">
              
              {/* Intro Title */}
              <div id="s9-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_10px_rose] animate-pulse"></span>
                  <span className="font-mono text-rose-400 text-xs tracking-[0.4em] uppercase font-bold">Caso D'Uso</span>
                </div>
                <h2 className="text-[5vw] md:text-[4.5vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                  Manutenzione<br />Istantanea
                </h2>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 */}
              <div id="s9-item-1" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="font-mono text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase">Fasi Operative</span>
                    <span className="w-6 h-[1px] bg-white/20"></span>
                    <span className="font-mono text-[10px] md:text-xs text-rose-400 tracking-[0.2em]">1/3</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 mb-4 tracking-tight drop-shadow-lg">
                    Individuazione Remota
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed font-sans">
                    Il tecnico individua l’ammaloramento <span className="font-medium text-white italic">dal proprio ufficio.</span>
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div id="s9-item-2" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="font-mono text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase">Fasi Operative</span>
                    <span className="w-6 h-[1px] bg-white/20"></span>
                    <span className="font-mono text-[10px] md:text-xs text-rose-400 tracking-[0.2em]">2/3</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
                    Misurazione al volo
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Misura l’area o il volume esatto con <span className="text-white font-bold">due soli click</span> nel Gemello Digitale.
                  </p>
                  <div className="mt-8 flex items-center justify-start">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-6 py-4 bg-rose-500/20 border border-rose-500/50 rounded-2xl shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                      <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse self-start md:self-center mt-2 md:mt-0"></span>
                      <span className="font-mono text-rose-100 text-sm md:text-base uppercase tracking-widest">Dato in grafica:<br className="md:hidden" /> <span className="font-black text-xl md:text-2xl text-white ml-0 md:ml-2">Area 14.2 mq</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div id="s9-item-3" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="font-mono text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase">Fasi Operative</span>
                    <span className="w-6 h-[1px] bg-white/20"></span>
                    <span className="font-mono text-[10px] md:text-xs text-rose-400 tracking-[0.2em]">3/3</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-4 tracking-tighter drop-shadow-lg">
                    Stima dei Costi
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Stima i costi per l’appalto di manutenzione stradale <span className="text-white font-bold">in tempo reale</span>, ottimizzando i budget comunali.
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION 10 - Caso D'uso: Tutela del Patrimonio Storico */}
      <div id="section-10" className="relative w-full h-[350vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 10 Canvas Background */}
          <div id="s10-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden opacity-0">
              <canvas 
                ref={canvasRef10}
                className="w-full h-full object-cover opacity-90 mix-blend-screen"
              />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col px-6">
              
              {/* Intro Title */}
              <div id="s10-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_amber] animate-pulse"></span>
                  <span className="font-mono text-amber-400 text-xs tracking-[0.4em] uppercase font-bold">Caso D'Uso</span>
                </div>
                <h2 className="text-[5vw] md:text-[4vw] font-black leading-[0.85] tracking-tight uppercase text-white drop-shadow-2xl max-w-4xl">
                  Tutela del<br />Patrimonio Storico
                </h2>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 - Left Callout */}
              <div id="s10-item-1" className="absolute top-[30vh] md:top-[40vh] left-[5%] md:left-[10%] flex flex-col items-start justify-center opacity-0 pointer-events-none z-20">
                <div className="max-w-[80vw] md:max-w-md w-full backdrop-blur-md bg-black/40 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative">
                  <div className="absolute top-1/2 -right-12 w-12 h-px bg-white/20 hidden md:block"></div>
                  <h4 className="text-xl md:text-2xl font-black text-amber-400 mb-3 tracking-wide">
                    Modellazione 3D
                  </h4>
                  <p className="text-sm md:text-base font-light text-white/90 leading-relaxed">
                    Modellazione 3D millimetrica degli ambienti di pregio storici.
                  </p>
                </div>
              </div>

              {/* Item 2 - Right Callout */}
              <div id="s10-item-2" className="absolute top-[30vh] md:top-[40vh] right-[5%] md:right-[10%] flex flex-col items-end justify-center opacity-0 pointer-events-none z-20">
                <div className="max-w-[80vw] md:max-w-md w-full backdrop-blur-md bg-black/40 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative text-right">
                  <div className="absolute top-1/2 -left-12 w-12 h-px bg-white/20 hidden md:block"></div>
                  <h4 className="text-xl md:text-2xl font-black text-indigo-400 mb-3 tracking-wide">
                    Indagini Georadar
                  </h4>
                  <p className="text-sm md:text-base font-light text-white/90 leading-relaxed">
                    Indagini Georadar su pavimentazioni per la ricerca di cripte, cunicoli o passaggi murati nascosti.
                  </p>
                </div>
              </div>

              {/* Item 3 - Highlight Box */}
              <div id="s10-item-3" className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 w-full px-6 flex flex-col items-center justify-end opacity-0 pointer-events-none z-20">
                <div className="max-w-4xl w-full backdrop-blur-xl bg-white/[0.05] border border-amber-500/30 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.1)] text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-300 text-xs font-mono tracking-[0.2em] mb-6 uppercase">
                    Riquadro In Evidenza
                  </span>
                  <p className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed">
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Verifica strutturale non invasiva</span> come base esatta e inalterabile per futuri progetti di restauro (inclusi il Teatro Comunale e le chiese di S. Francesco e S. Chiara).
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION 11 - Caso D'uso: Lo Scudo Idrogeologico */}
      <div id="section-11" className="relative w-full h-[350vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 11 Canvas Background */}
          <div id="s11-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden opacity-0">
              <canvas 
                ref={canvasRef11}
                className="w-full h-full object-cover opacity-90 mix-blend-screen mix-blend-plus-lighter"
              />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col px-6">
              
              {/* Intro Title */}
              <div id="s11-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan] animate-pulse"></span>
                  <span className="font-mono text-cyan-400 text-xs tracking-[0.4em] uppercase font-bold">Caso D'Uso</span>
                </div>
                <h2 className="text-[5vw] md:text-[4vw] font-black leading-[0.85] tracking-tight uppercase text-white drop-shadow-2xl max-w-4xl">
                  Lo Scudo<br />Idrogeologico
                </h2>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 */}
              <div id="s11-item-1" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-cyan-950/10 border border-cyan-500/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight drop-shadow-lg">
                    Modellazione Preventiva
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed font-sans">
                    Utilizzo dei modelli DTM/DSM <span className="font-medium text-white">ad alta precisione</span> per simulare scenari di rischio.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div id="s11-item-2" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-md bg-cyan-950/10 border border-cyan-500/10 p-8 md:p-10 lg:p-12 rounded-3xl shadow-2xl text-left">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    Analisi del Deflusso
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed font-sans">
                    Mappatura esatta del deflusso superficiale delle acque.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div id="s11-item-3" className="absolute bottom-[10vh] left-0 flex flex-col items-start justify-end px-6 md:px-16 lg:px-24 opacity-0 pointer-events-none z-20">
                <div className="max-w-2xl lg:max-w-4xl w-full backdrop-blur-xl bg-cyan-950/20 border border-cyan-400/30 p-8 md:p-10 lg:p-12 rounded-3xl shadow-[0_0_30px_rgba(34,211,238,0.15)] text-left">
                  <div className="inline-flex items-center gap-3 mb-6 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="font-mono text-[10px] md:text-xs text-cyan-300 tracking-[0.2em] uppercase">Security Ready</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-500 mb-4 tracking-tighter drop-shadow-lg">
                    Pianificazione Strategica
                  </h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed">
                    Supporto inestimabile per la <span className="font-bold text-white">messa in sicurezza</span> del territorio.
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION 12 - Il Centro di Comando in Cloud */}
      <div id="section-12" className="relative w-full h-[350vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Section 12 Canvas Background */}
          <div id="s12-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden opacity-0">
              <canvas 
                ref={canvasRef12}
                className="w-full h-full object-cover opacity-90 mix-blend-screen"
              />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col px-6">
              
              {/* Intro Title */}
              <div id="s12-intro" className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh] text-center opacity-0 pointer-events-none z-20">
                <div className="w-px h-24 bg-white/20 mb-8"></div>
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_fuchsia] animate-pulse"></span>
                  <span className="font-mono text-fuchsia-400 text-xs tracking-[0.4em] uppercase font-bold">Portale Web</span>
                </div>
                <h2 className="text-[5vw] md:text-[4vw] font-black leading-[0.85] tracking-tight uppercase text-white drop-shadow-2xl max-w-5xl">
                  Il Centro di Comando<br />in Cloud
                </h2>
                <p className="mt-8 text-xl md:text-2xl text-white/70 font-light tracking-wide max-w-2xl px-4">
                  Democratizzazione totale del dato complesso.
                </p>
                <div className="w-px h-24 bg-white/20 mt-12"></div>
              </div>

              {/* Item 1 */}
              <div id="s12-item-1" className="absolute bottom-[10vh] right-[5%] md:right-[10%] flex flex-col items-end justify-center px-6 opacity-0 pointer-events-none z-20">
                <div className="max-w-[85vw] md:max-w-lg w-full text-right drop-shadow-2xl">
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500 mb-3 tracking-tight drop-shadow-lg">
                    Zero Software Pesanti
                  </h4>
                  <p className="text-base md:text-lg lg:text-xl font-medium text-white/95 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    L’intera città è gestibile da un <span className="font-bold text-white">semplice web browser</span>.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div id="s12-item-2" className="absolute bottom-[10vh] right-[5%] md:right-[10%] flex flex-col items-end justify-center px-6 opacity-0 pointer-events-none z-20">
                <div className="max-w-[85vw] md:max-w-lg w-full text-right drop-shadow-2xl">
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                    Accessibilità Universale
                  </h4>
                  <p className="text-base md:text-lg lg:text-xl font-medium text-white/95 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    A disposizione di tutto l’Ufficio Tecnico, dipendenti e <span className="font-bold text-fuchsia-300">progettisti autorizzati</span>.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div id="s12-item-3" className="absolute bottom-[10vh] right-[5%] md:right-[10%] flex flex-col items-end justify-center px-6 opacity-0 pointer-events-none z-20">
                <div className="max-w-[85vw] md:max-w-lg w-full text-right drop-shadow-2xl">
                  <div className="inline-flex items-center gap-3 mb-4 bg-fuchsia-500/10 px-4 py-2 rounded-full border border-fuchsia-500/20 mr-0 backdrop-blur">
                    <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"></div>
                    <span className="font-mono text-[10px] md:text-xs text-fuchsia-300 tracking-[0.2em] uppercase">User Friendly</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-500 mb-3 tracking-tighter drop-shadow-lg">
                    Navigazione Real-Time
                  </h4>
                  <p className="text-base md:text-lg lg:text-xl font-medium text-white/95 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Interfaccia fluida e intuitiva, senza necessità di competenze <span className="font-bold text-white">iperspecializzate</span>.
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>

      {/* SECTION BRIDGE - Borgo Geoscientifico */}
      <div id="section-bridge" className="relative w-full h-[800vh] bg-black z-30">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-black via-blue-900/5 to-black opacity-40"></div>
            </div>

            {/* Narrative content container */}
            <div className="relative w-full h-full flex flex-col items-center justify-center px-8 md:px-12 text-center max-w-[95vw] lg:max-w-[70vw] mx-auto">
               
               {/* 01. Title Animation */}
               <div id="bridge-title-container" className="opacity-0 flex flex-col items-center absolute w-full">
                  <h2 className="text-xl md:text-3xl font-light tracking-[0.4em] text-white/40 uppercase mb-4">Il Gemello Digitale di</h2>
                  <h1 className="text-5xl md:text-8xl lg:text-[9.5rem] font-black uppercase tracking-tighter text-white leading-[0.8] mb-1 md:mb-2 w-full">
                    Città Sant'Angelo
                  </h1>
                  <div className="h-24 md:h-32 flex items-center justify-center relative w-full mt-2">
                    <span id="bridge-label-gd" className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-widest text-[#06b6d4]">Gemello Digitale</span>
                    <span id="bridge-label-dt" className="absolute text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 opacity-0 whitespace-nowrap blur-sm">Digital Twin</span>
                  </div>
                  <div className="w-32 md:w-64 h-px bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent mt-10 scale-x-150"></div>
               </div>

               {/* 02. Content Block 1: Intro Borgo */}
               <div id="bridge-content-1" className="absolute opacity-0 w-full max-w-4xl px-4 md:px-0">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6 font-mono text-blue-400 text-[10px] md:text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">Digital Twin Add-On</div>
                  <h3 className="text-3xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-6 md:mb-8">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Borgo Geoscientifico</span>
                  </h3>
                  <p className="text-lg md:text-3xl font-light text-white/60 tracking-wide leading-relaxed">
                    Un'esperienza immersiva di <span className="text-white font-medium">Urbanistica Iper-Reale</span> dove il dato scientifico diventa identità culturale.
                  </p>
               </div>

               {/* 03. Content Block 2: GGM Academy */}
               <div id="bridge-content-2" className="absolute opacity-0 w-full max-w-5xl px-4 md:px-0">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6 md:mb-8 font-mono text-blue-400 text-[10px] md:text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">GGM Academy Program</div>
                  <h3 className="text-3xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-6 md:mb-8">
                    International <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-600">Internship Residency</span>
                  </h3>
                  <p className="text-lg md:text-3xl font-light text-white/60 tracking-wide leading-relaxed">
                    GGM.EARTH presenta nel <span className="text-white font-bold">2026</span> il primo hub europeo di intelligenza geoscientifica diffusa. 
                    Città Sant'Angelo, sede del nostro HQ, ne diventa il <span className="text-white font-medium italic underline decoration-[#06b6d4]/50 underline-offset-8">pioniere assoluto</span>.
                  </p>
               </div>

               {/* 04. Content Block 3: Network & Hub */}
               <div id="bridge-content-3" className="absolute opacity-0 w-full max-w-5xl px-4 md:px-0">
                  <h3 className="text-3xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8 md:mb-12">
                     Hub. <br />To Network.
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
                    <div>
                      <h4 className="text-blue-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">La Comunità</h4>
                      <p className="text-base md:text-xl font-light text-white/70 leading-relaxed">
                        Coinvolgiamo i comuni italiani virtuosi. Patrimonio storico immenso e intelligenza tecnologica in un unico <span className="text-white font-medium">Network globale.</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#06b6d4] font-mono text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">L'Impatto</h4>
                      <p className="text-base md:text-xl font-light text-white/70 leading-relaxed">
                        GGM.EARTH elabora, coordina e promuove. Trasformiamo borghi storici in <span className="text-white font-medium">centri di attrazione mondiale</span> attraverso Add-ons tecnologici al Digital Twin.
                      </p>
                    </div>
                  </div>
               </div>

            </div>

        </div>
      </div>

      {/* SECTION 13 - Il Futuro è Ora (Closing) */}
      <div id="section-13" className="relative w-full h-[400vh] bg-black z-40">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
          
          {/* Section 13 Canvas Background */}
          <div id="s13-canvas-container" className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden opacity-0">
              <canvas 
                ref={canvasRef13}
                className="w-full h-full object-cover mix-blend-screen opacity-60"
              />
          </div>

          {/* Background Decorative Elem */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#06b6d4]/[0.05] rounded-full blur-[100px] pointer-events-none"></div>

          <div id="s13-text-block" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container relative z-10 mx-auto px-6 max-w-5xl flex flex-col items-center text-center opacity-0 w-full">
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-white/20 mb-8"></div>
            
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter text-white pt-0 mt-0 mb-2 drop-shadow-2xl leading-[0.85]">
              IL FUTURO È <span className="text-transparent bg-clip-text bg-gradient-to-tr from-white via-gray-300 to-gray-600">ORA.</span>
            </h2>
            
            <p className="text-xl md:text-3xl font-light text-white/80 mb-2 tracking-wide max-w-4xl">
              Da borgo storico a pioniere assoluto dell’<span className="font-semibold text-white">Urbanistica Iper-Reale</span> e Hub Internazionale.
            </p>

            <p className="text-base md:text-lg text-white/50 font-light mb-5 max-w-2xl leading-relaxed">
              Il Digital Twin non è solo una mappa. È il nuovo ecosistema nervoso del territorio. <br className="hidden md:block"/>
              <span className="text-white/80 mt-4 block italic text-lg md:text-xl font-serif">Pronti per il salto?</span>
            </p>

            <div className="flex flex-col w-full max-w-md md:max-w-lg gap-4 mx-auto">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="group relative w-full overflow-hidden rounded-full bg-white text-black font-semibold text-base py-4 px-8 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="relative flex items-center justify-center gap-3">
                   Contatta il Team
                 </span>
              </button>

              <Link href="/progetto-borgo">
                 <button className="group relative w-full overflow-hidden rounded-full bg-transparent border border-white/20 text-white font-medium text-base py-4 px-8 transition-all hover:border-white/40 hover:bg-white/[0.03] active:scale-[0.98]">
                    <span className="relative flex items-center justify-center gap-3">
                      Progetto Borgo Geoscientifico
                    </span>
                 </button>
              </Link>
            </div>
            
            <div className="w-px h-16 md:h-24 bg-gradient-to-t from-transparent to-white/10 mt-12"></div>
          </div>

          <div id="s13-big-logo" className="absolute top-[45%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 pointer-events-none w-full flex flex-col items-center justify-center px-6 mt-0">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/62963b756bf2c45d308b1e5a/633b892b-f434-41d6-8a93-80f669f4421e/GGM+EARTH+LOGO+CLAIM+-+ALPHA.png?format=1500w" 
              alt="GGM.EARTH" 
              className="w-full max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-3xl brightness-0 invert object-contain drop-shadow-2xl mb-8 md:mb-12" 
            />
            <div className="flex flex-col sm:flex-row w-full max-w-[280px] sm:max-w-[400px] gap-3 sm:gap-4 mx-auto mt-2 md:mt-4 pointer-events-auto">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full sm:flex-1 overflow-hidden rounded-full bg-white text-black font-semibold text-xs md:text-sm py-4 md:py-3 px-6 transition-transform hover:scale-[1.05] active:scale-[0.95]"
              >
                 Contatta il Team
              </button>
              <Link href="/progetto-borgo" className="w-full sm:flex-1">
                 <button className="w-full overflow-hidden rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-medium text-xs md:text-sm py-4 md:py-3 px-6 transition-all hover:bg-white/10 active:scale-[0.95]">
                    Progetto Borgo
                 </button>
              </Link>
            </div>
          </div>

          {/* Footer Area */}
          <footer className="w-full absolute bottom-6 md:bottom-8 left-0 text-center flex flex-col items-center justify-center px-6 z-10 pointer-events-none">
             <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs uppercase tracking-widest text-white/30 font-mono">
               <span>© {new Date().getFullYear()} GGM.EARTH</span>
               <span className="w-1 h-1 rounded-full bg-white/20"></span>
               <a href="mailto:global@ggm.earth" className="pointer-events-auto hover:text-white/80 transition-colors">global@ggm.earth</a>
               <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></span>
               <span className="hidden md:inline">Tutti i diritti riservati</span>
             </div>
          </footer>
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
