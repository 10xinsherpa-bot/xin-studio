"use client";

import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function XinStudioHomepage() {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [timeMode, setTimeMode] = useState("night");
  const [cursorText, setCursorText] = useState("Enter");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5200);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setTimeMode("morning");
    } else if (hour >= 12 && hour < 18) {
      setTimeMode("evening");
    } else {
      setTimeMode("night");
    }
  }, []);

  useEffect(() => {
    const lenisScript = document.createElement("script");
    lenisScript.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled/lenis.min.js";
    lenisScript.async = true;

    lenisScript.onload = () => {
      // @ts-ignore
      const lenis = new window.Lenis({
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    document.body.style.scrollBehavior = "auto";

    document.head.appendChild(lenisScript);
  }, []);

  const projects = [
    {
      title: "Queen's Pod",
      image: "/images/night-front.png",
    },
  ];

  const queensPodGallery = [
    "/images/hero-moneyshot.jpg",
    "/images/forest-entry.jpg",
    "/images/bamboo-atmosphere.jpg",
    "/images/portal-detail.jpeg",
    "/images/night-front.png",
    "/images/night-aerial.JPG",
    "/images/retrofuturism.jpg",
    "/images/site-context.jpg",
    "/images/form-evolution.jpg",
  ];

  return (
    <>
      {/* CUSTOM CURSOR */}
      <motion.div
        animate={{
          x: cursorPosition.x - 40,
          y: cursorPosition.y - 40,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="fixed top-0 left-0 w-20 h-20 rounded-full border border-white/20 backdrop-blur-xl bg-white/5 z-[9999] pointer-events-none hidden md:flex items-center justify-center text-[10px] uppercase tracking-[0.25em] text-white/70 transition-all duration-500 shadow-[0_0_60px_rgba(255,255,255,0.08)]"
      >
        {cursorText}
      </motion.div>

      {/* THE ARRIVAL */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.4, delay: 3.2 }}
          className="fixed inset-0 z-[999999] bg-black overflow-hidden flex items-center justify-center"
        >
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <div className="absolute top-[20%] left-[15%] w-[700px] h-[700px] rounded-full bg-[#B78B52]/10 blur-[260px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] rounded-full bg-[#2E3B34]/10 blur-[320px]" />
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.04, 0.12, 0.04],
              x: [-40, 40, -40],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[15%] left-[-10%] w-[1000px] h-[400px] rounded-full bg-white/10 blur-[220px]"
          />

          <div className="relative z-10 text-center px-8 max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.45, y: 0 }}
              transition={{ duration: 1.8, delay: 0.8 }}
              className="uppercase tracking-[0.45em] text-[10px] text-white/40 mb-14"
            >
              The Arrival
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.2, delay: 1.2 }}
              className="text-[clamp(48px,6vw,120px)] leading-[0.9] tracking-[-0.06em] font-light"
            >
              Before architecture,
              <br />
              there was atmosphere.
            </motion.h1>

            <motion.div
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="mt-20 text-[#8D8B87] uppercase tracking-[0.35em] text-[10px]"
            >
              mist • river • silence • terrain
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* LOADING SCREEN */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, delay: 1.6 }}
          className="fixed inset-0 z-[99999] bg-[#030303] flex flex-col items-center justify-center"
        >
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            src="/images/xin-logo.png"
            alt="Xin Studio"
            className="h-16 w-auto object-contain mb-10"
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="text-[clamp(40px,5vw,90px)] tracking-[-0.05em] font-light text-center leading-[0.95]"
          >
            Queen's Pod
            <br />
            immersive spatial cinema.
          </motion.h1>
        </motion.div>
      )}

      <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
      className={`min-h-screen overflow-x-hidden font-sans selection:bg-white/20 relative scroll-smooth transition-colors duration-[3000ms] text-[#EAE6DF] ${
        timeMode === "morning"
          ? "bg-[#0B1114]"
          : timeMode === "evening"
          ? "bg-[#120E0B]"
          : "bg-[#030303]"
      }`}
    >
      {/* DYNAMIC TIME ATMOSPHERE */}
      <div
        className={`fixed inset-0 pointer-events-none transition-all duration-[4000ms] ${
          timeMode === "morning"
            ? "opacity-60"
            : timeMode === "evening"
            ? "opacity-50"
            : "opacity-40"
        }`}
      >
        <div
          className={`absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-[4000ms] ${
            timeMode === "morning"
              ? "bg-[#8FAFC2]/20"
              : timeMode === "evening"
              ? "bg-[#D28B47]/20"
              : "bg-[#B78B52]/10"
          }`}
        />
        <div
          className={`absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-[4000ms] ${
            timeMode === "morning"
              ? "bg-[#56717B]/20"
              : timeMode === "evening"
              ? "bg-[#5C3420]/30"
              : "bg-[#2E3B34]/20"
          }`}
        />
      </div>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_40%)] pointer-events-none" />

      {/* FILM GRAIN */}
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none z-[2] mix-blend-soft-light">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* FLOATING ATMOSPHERE */}
      <motion.div
        animate={{
          opacity: [0.08, 0.14, 0.08],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]"
      >
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#B78B52]/10 blur-[180px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#2E3B34]/10 blur-[220px]" />
      </motion.div>

      {/* ATMOSPHERIC MIST SYSTEM */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] opacity-40">
        <motion.div
          animate={{
            x: [-120, 120, -120],
            opacity: [0.04, 0.1, 0.04],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[-10%] w-[900px] h-[420px] rounded-full bg-white/10 blur-[180px]"
        />

        <motion.div
          animate={{
            x: [80, -140, 80],
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 44,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[8%] right-[-10%] w-[1000px] h-[480px] rounded-full bg-[#B8C6D1]/10 blur-[220px]"
        />

        <motion.div
          animate={{
            y: [-40, 40, -40],
            opacity: [0.02, 0.06, 0.02],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[35%] left-[20%] w-[700px] h-[300px] rounded-full bg-[#D2B48C]/10 blur-[200px]"
        />
      </div>

      <header className="fixed top-0 left-0 w-full z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-8 pt-6 flex items-center justify-between">
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-full px-6 h-[64px] flex items-center justify-between w-full shadow-[0_0_80px_rgba(255,255,255,0.03)]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="tracking-[0.2em] uppercase text-xs text-[#EAE6DF] flex items-center gap-4"
          >
            <img
              src="/images/xin-logo.png"
              alt="Xin Studio"
              className="h-8 w-auto object-contain"
            />
          </motion.div>

          <nav className="hidden md:flex gap-12 text-sm text-[#8D8B87]">
            <a className="hover:text-white transition-all duration-700" href="#index">
              Index
            </a>
            <a className="hover:text-white transition-all duration-700" href="#work">
              Work
            </a>
            <a className="hover:text-white transition-all duration-700" href="#location">
              Location
            </a>
            <a className="hover:text-white transition-all duration-700" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (!audioRef.current) return;

              if (!soundOn) {
                audioRef.current.volume = 0.28;
                audioRef.current.play();
              } else {
                audioRef.current.pause();
              }

              setSoundOn(!soundOn);
            }}
            className="hidden md:flex h-11 px-5 rounded-full border border-white/10 bg-white/5 items-center justify-center text-[10px] uppercase tracking-[0.3em] text-[#BDB8B0] hover:bg-white/10 transition-all duration-500"
          >
            {soundOn ? "Sound On" : "Sound Off"}
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-500"
          >
            <Menu size={18} />
          </button>
          </div>
          </div>
        </div>
      </header>

      {/* AMBIENT AUDIO */}
<audio
  ref={audioRef}
  loop
  className="hidden"
>
  <source
    src="https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"
    type="audio/mpeg"
  />
</audio>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-[#050505]/95 backdrop-blur-3xl flex flex-col justify-between p-8"
        >
          <div className="flex items-center justify-between">
            <img
              src="/images/xin-logo.png"
              alt="Xin Studio"
              className="h-8 w-auto"
            />

            <button
              onClick={() => setMenuOpen(false)}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-10 text-[clamp(42px,6vw,96px)] leading-[0.9] tracking-[-0.05em] font-light">
            <a href="#index" className="hover:translate-x-4 transition-all duration-700">Index</a>
            <a href="#work" className="hover:translate-x-4 transition-all duration-700">Projects</a>
            <a href="#location" className="hover:translate-x-4 transition-all duration-700">Location</a>
            <a href="#contact" className="hover:translate-x-4 transition-all duration-700">Contact</a>
          </div>

          <div className="text-[#8D8B87] uppercase tracking-[0.25em] text-xs">
            Cinematic Spatial Practice • Gangtok
          </div>
        </motion.div>
      )}

      <section
        id="index"
        onMouseEnter={() => setCursorText("Enter")}
        className="relative h-screen w-full flex items-end overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#B78B52]/10 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -20, 40, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#2E3B34]/20 blur-3xl"
        />
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="/images/hero-moneyshot.jpg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-50 scale-[1.02]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/20 to-black/80" />

        <div className="absolute inset-0 backdrop-blur-[2px]" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-[1440px] mx-auto w-full px-8 pb-20"
        >
          <div className="max-w-5xl">
            <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-8">
              Queen's Pod • Himalayan Spatial Narrative
            </p>

            <h1 className="text-[clamp(72px,8vw,150px)] leading-[0.88] tracking-[-0.07em] font-light drop-shadow-[0_0_60px_rgba(255,255,255,0.06)] backdrop-blur-sm">
              Queen's Pod
            <br />
            immersive spatial cinema.
            </h1>
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-12 text-sm text-[#9F9C96] border-t border-white/10 pt-10">
            <div className="absolute top-10 right-8 uppercase tracking-[0.35em] text-[10px] text-white/40">
              {timeMode === "morning"
                ? "Morning Atmosphere"
                : timeMode === "evening"
                ? "Evening Atmosphere"
                : "Night Atmosphere"}
            </div>
            <div>
              01 — Arrival Through Forest
              <br />
              Gangtok, Sikkim
            </div>

            <div>
              02 — Bamboo Threshold
              <br />
              Atmospheric Immersion
            </div>

            <div className="uppercase tracking-[0.2em] text-xs">
              03 — Lantern Pavilion
              <br />
              Scroll to Explore
            </div>
          </div>
        </motion.div>
      </section>

      {/* SPATIAL POETRY */}
      <section
        onMouseEnter={() => setCursorText("Feel")}
        className="relative py-[180px] border-t border-white/5 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

        <div className="relative max-w-[1200px] mx-auto px-8 space-y-40">
          {[
            "Atmosphere is the first material.",
            "The forest enters the architecture.",
            "Emotion directs form.",
            "Silence becomes structure.",
          ].map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.6 }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0.02, 0.08, 0.02] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-10 left-0 text-[14vw] leading-none tracking-[-0.08em] text-white pointer-events-none"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.div>

              <p className="relative z-10 text-[clamp(36px,4vw,72px)] leading-[1.1] tracking-[-0.05em] font-light max-w-4xl text-[#EAE6DF]">
                {line}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        onMouseEnter={() => setCursorText("Listen")}
        className="relative py-[260px] border-t border-white/5 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#B78B52]/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#2E3B34]/20 blur-[220px] rounded-full" />
        </div>

        <div className="relative max-w-[1100px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-20"
          >
            <p className="uppercase tracking-[0.35em] text-xs text-[#8D8B87]">
              The Myth
            </p>

            <h2 className="text-[clamp(44px,6vw,110px)] leading-[0.95] tracking-[-0.05em] font-light max-w-5xl">
              Under the blanket
              <br />
              of a starry sky,
              <br />
              the river whispered
              <br />
              stories into the forest.
            </h2>

            <div className="grid md:grid-cols-2 gap-20 pt-24">
              <div>
                <p className="text-[#8D8B87] leading-[2] text-[16px]">
                  Queen&apos;s Pod emerges as an atmospheric spatial narrative balancing structural precision with handcrafted ecological materiality
                  shaped through layered materiality — steel structure, glass, aluminum, bamboo craft, cane trellis systems, ecological polycarbonate shading, Himalayan terrain, river memory, and cinematic light.
                </p>
              </div>

              <div>
                <p className="text-[#8D8B87] leading-[2] text-[16px]">
                  More than a structure, the pavilion unfolds as an emotional
                  sequence — a slow choreography of shadow, texture, silence,
                  reflection, and arrival.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-[260px] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-black to-[#030303]" />

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative max-w-[1600px] mx-auto px-8"
        >
          <div className="mb-24 max-w-5xl">
            <p className="uppercase tracking-[0.35em] text-xs text-[#8D8B87] mb-8">
              Film Sequence
            </p>

            <h2 className="text-[clamp(46px,6vw,120px)] leading-[0.92] tracking-[-0.05em] font-light">
              A spatial film
              <br />
              unfolding through
              <br />
              shadow, river,
              <br />
              structure, craft, and silence.
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black shadow-[0_0_160px_rgba(255,255,255,0.04)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />

            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/FeFgnO-AHtc?autoplay=1&mute=1&controls=0&loop=1&playlist=FeFgnO-AHtc&modestbranding=1&rel=0"
                title="Queen's Pod Film"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-20 pt-24">
            <div>
              <p className="text-[#8D8B87] leading-[2] text-[16px]">
                Emerging beside the Himalayan river edge, Queen&apos;s Pod is choreographed through cinematic transitions between darkness, reflection, steel structure, translucent surfaces, woven cane textures, and filtered light.
              </p>
            </div>

            <div>
              <p className="text-[#8D8B87] leading-[2] text-[16px]">
                The project is experienced not as an isolated object, but as an emotional sequence woven into terrain, atmosphere, movement, memory, and silence.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        onMouseEnter={() => setCursorText("Observe")}
        id="work"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-[220px] border-t border-white/5"
      >
        <div className="max-w-[1440px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-6">
              Featured Spatial Narrative
            </p>

            <h3 className="text-[clamp(40px,5vw,80px)] leading-[0.95] font-light tracking-[-0.04em] mb-10">
              Queen&apos;s Pod
            </h3>

            <p className="text-[#8D8B87] leading-[1.9] text-[16px] max-w-xl">
              An immersive architectural pavilion emerging through steel, glass, aluminum, bamboo, cane craft, filtered Himalayan light, and atmospheric river terrain.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_120px_rgba(255,255,255,0.03)]">
            <img
              src="/images/forest-entry.jpg"
              alt="Queen's Pod"
              className="w-full h-[720px] object-cover hover:scale-[1.04] transition-transform duration-[2500ms]"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-[220px] border-t border-white/5"
      >
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="mb-20">
            <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-6">
              Queen's Pod Storyboard
            </p>

            <h3 className="text-[clamp(40px,5vw,72px)] leading-[0.95] font-light tracking-[-0.04em]">
              A cinematic architectural journey unfolding through layered material expression, atmospheric light, Himalayan terrain, ecological shading systems, and immersive spatial storytelling.
            </h3>
          </div>

          <div className="space-y-32">
            {projects.map((project) => (
              <div
                key={project.title}
                className="grid md:grid-cols-2 gap-16 items-end"
              >
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[720px] object-cover hover:scale-[1.03] transition-transform duration-[2000ms]"
                  />
                </div>

                <div className="pb-8 max-w-xl">
                  <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-6">
                    Materiality • Terrain • Atmosphere
                  </p>

                  <h4 className="text-[clamp(42px,5vw,82px)] leading-[0.92] font-light tracking-[-0.05em] mb-8">
                    {project.title}
                  </h4>

                  <p className="text-[#8D8B87] leading-[1.9] text-[16px]">
                    An evolving spatial narrative emerging through steel shell structures, glass surfaces, aluminum framing, bamboo and cane trellis systems, cinematic lighting, ecological shading, river terrain, and immersive Himalayan atmosphere.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* QUEEN'S POD GALLERY */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-[220px] border-t border-white/5"
      >
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="mb-20 max-w-3xl">
            <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-6">
              Queen's Pod Atmosphere
            </p>

            <h3 className="text-[clamp(40px,5vw,72px)] leading-[0.95] font-light tracking-[-0.04em] mb-8">
              Spatial sequences emerging through layered materiality, structural rhythm, filtered light, terrain, and cinematic atmosphere.
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {queensPodGallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 120, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.015 }}
                className={`overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_100px_rgba(255,255,255,0.03)] ${index % 3 === 0 ? "md:col-span-2" : ""}`}
              >
                <motion.img
                  initial={{ scale: 1.12, opacity: 0.7 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                  src={image}
                  alt={"Queen's Pod " + (index + 1)}
                  className="w-full object-cover hover:scale-[1.03] transition-transform duration-[2200ms]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CINEMATIC TRANSITION */}
      <section
        onMouseEnter={() => setCursorText("Drift")}
        className="relative h-[140vh] border-t border-white/5 overflow-hidden"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.img
            initial={{ scale: 1.2, opacity: 0.5 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.6 }}
            viewport={{ once: false, amount: 0.4 }}
            src="/images/retrofuturism.jpg"
            alt="Atmospheric Transition"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px]" />

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            viewport={{ once: false, amount: 0.5 }}
            className="relative z-10 text-center px-8"
          >
            <p className="uppercase tracking-[0.35em] text-xs text-white/50 mb-10">
              Spatial Emotion
            </p>

            <h2 className="text-[clamp(56px,8vw,160px)] leading-[0.88] tracking-[-0.07em] font-light max-w-6xl">
              Space becomes
              <br />
              memory through
              <br />
              atmosphere.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* RIVER MEMORY */}
      <section
        onMouseEnter={() => setCursorText("Drift")}
        className="relative h-[180vh] border-t border-white/5 overflow-hidden"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <img
              src="/images/night-aerial.JPG"
              alt="River Memory"
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: false, amount: 0.4 }}
            className="relative z-10 max-w-5xl px-8 text-center"
          >
            <p className="uppercase tracking-[0.35em] text-xs text-white/40 mb-10">
              River Memory
            </p>

            <h2 className="text-[clamp(58px,8vw,170px)] leading-[0.88] tracking-[-0.07em] font-light">
              The river
              <br />
              remembers before
              <br />
              architecture arrives.
            </h2>

            <motion.p
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="mt-16 text-[#8D8B87] max-w-2xl mx-auto leading-[2] text-[15px]"
            >
              Queen&apos;s Pod emerges not as an isolated object, but as an atmosphere woven into Himalayan terrain, reflective darkness, filtered light, drifting mist, and the emotional silence of the river edge.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* THE STILLNESS */}
      <section
        onMouseEnter={() => setCursorText("Listen")}
        className="relative h-[160vh] border-t border-white/5 overflow-hidden"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
          <motion.div
            animate={{
              opacity: [0.04, 0.1, 0.04],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <div className="absolute top-[20%] left-[25%] w-[500px] h-[500px] rounded-full bg-[#B78B52]/10 blur-[220px]" />
            <div className="absolute bottom-[15%] right-[20%] w-[600px] h-[600px] rounded-full bg-[#2E3B34]/10 blur-[260px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2 }}
            viewport={{ once: false, amount: 0.5 }}
            className="relative z-10 text-center px-8 max-w-5xl"
          >
            <motion.p
              animate={{ opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="uppercase tracking-[0.4em] text-[10px] text-white/30 mb-16"
            >
              The Stillness
            </motion.p>

            <h2 className="text-[clamp(52px,8vw,180px)] leading-[0.86] tracking-[-0.08em] font-light text-white/90">
              Some spaces
              <br />
              are heard before
              <br />
              they are seen.
            </h2>

            <motion.div
              animate={{ opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="mt-20 text-[#8D8B87] text-[14px] tracking-[0.3em] uppercase"
            >
              silence • atmosphere • memory
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative h-screen border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative z-10 max-w-6xl px-8 text-center"
        >
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center text-[22vw] tracking-[-0.1em] font-light text-white pointer-events-none"
          >
            FEEL
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-[clamp(56px,8vw,170px)] leading-[0.88] tracking-[-0.07em] font-light"
          >
            Architecture
            <br />
            is not constructed.
            <br />
            It is felt.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-16 text-[#8D8B87] uppercase tracking-[0.3em] text-xs"
          >
            Emotional Spatial Interlude
          </motion.p>
        </motion.div>
      </section>

      <section className="relative h-[300vh] border-t border-white/5">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.img
            initial={{ scale: 1.12, opacity: 0.4 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            src="/images/night-aerial.JPG"
            alt="Queen's Pod Cinematic"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          <div className="relative z-10 max-w-[1200px] mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <p className="uppercase tracking-[0.35em] text-xs text-white/60 mb-8">
                Cinematic Spatial Sequence
              </p>

              <h2 className="text-[clamp(56px,7vw,140px)] leading-[0.9] tracking-[-0.06em] font-light max-w-5xl">
                Architecture
                <br />
                dissolving into
                <br />
                atmosphere.
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="location"
        onMouseEnter={() => setCursorText("Wander")}
        className="py-[220px] border-t border-white/5"
      >
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="mb-20 max-w-4xl">
            <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-6">
              Project Location
            </p>

            <h3 className="text-[clamp(40px,5vw,72px)] leading-[0.95] font-light tracking-[-0.04em] mb-8">
              Nestled within the Himalayan terrain of Gangtok, Queen's Pod emerges through forest atmosphere, mountain light, and cinematic ecological immersion.
            </h3>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_120px_rgba(255,255,255,0.03)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5861.592638493281!2d88.59131747711773!3d27.324191776404223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a5e78261b69d%3A0x733f02ccfeb021e!2sQueen&#39;s%20Pod!5e1!3m2!1sen!2sin!4v1779894950633!5m2!1sen!2sin"
              width="100%"
              height="650"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 brightness-90"
            ></iframe>
          </div>
        </div>
      </section>

                        <section
        id="contact"
        onMouseEnter={() => setCursorText("Begin")}
        className="py-[220px] border-t border-white/5"
      >
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="mb-20 max-w-4xl">
            <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-6">
              Contact
            </p>

            <h3 className="text-[clamp(40px,5vw,72px)] leading-[0.95] font-light tracking-[-0.04em] mb-8">
              Let us compose spaces through atmosphere, terrain, emotion,
              memory, and cinematic spatial storytelling.
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-20 border-t border-white/10 pt-16">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-6">
                Xin Studio
              </p>

              <p className="text-[#8D8B87] leading-[2] text-[16px] max-w-xl">
                A cinematic spatial practice exploring emotional architecture,
                immersive storytelling, atmospheric environments, and soulful
                experiential narratives emerging through terrain, light,
                silence, and memory.
              </p>
            </div>

            <div className="space-y-8 text-[#EAE6DF]">
              <div>
                <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-3">
                  Email
                </p>

                <p className="text-[22px] tracking-[-0.03em]">
                  xinstudio2020@gmail.com
                </p>
              </div>

              <div>
                <p className="uppercase tracking-[0.3em] text-xs text-[#8D8B87] mb-3">
                  Location
                </p>

                <p className="text-[22px] tracking-[-0.03em]">
                  Gangtok, Sikkim
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  </>
  );
}