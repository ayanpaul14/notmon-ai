import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import img from "../assets/frontpage.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[#090e13] text-white relative">

      {/* Aurora blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
          bg-gradient-to-br from-teal-400/20 via-cyan-400/12 to-emerald-500/15 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full
          bg-gradient-to-tr from-violet-500/12 via-teal-400/8 to-transparent blur-[110px]" />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mt-8 pt-16 sm:pt-20 lg:pt-28
        grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              AI-powered exam notes generator
            </div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-5"
              whileHover={{ y: -4 }}
            >
              Create Smart{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                AI Notes
              </span>
              <br />in Seconds
            </motion.h1>

            <motion.p
              whileHover={{ y: -2 }}
              className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed"
            >
              Generate exam-focused notes, project documentation, flow diagrams
              and revision-ready content using AI — faster, cleaner and smarter.
            </motion.p>

            <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(45,212,191,0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="mt-8 sm:mt-10 px-8 py-3.5 rounded-xl flex items-center gap-3
              bg-gradient-to-r from-teal-500 to-emerald-500
              text-black font-semibold text-base sm:text-lg
              shadow-[0_8px_32px_rgba(20,184,166,0.35)]"
            >
              Get Started →
            </motion.button>

            <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
              <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
                🎁 200 free credits
              </span>
              <span>No credit card required</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-emerald-500/8
            rounded-3xl blur-3xl scale-110 -z-10" />
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            <img src={img} alt="App preview" className="w-full" />
          </div>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-16 sm:mt-24">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center mb-10">
          <p className="text-xs text-teal-400 font-semibold uppercase tracking-widest mb-3">What you get</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Everything you need to ace your exams</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Feature icon="📓" title="Exam Notes" description="High-yield, revision-ready exam-oriented notes." />
          <Feature icon="📂" title="Project Notes" description="Well-structured documentation for assignments & projects." />
          <Feature icon="📊" title="Diagrams" description="Generate visual aids like charts and graphs." />
          <Feature icon="⬇️" title="PDF Downloads" description="Download clean, printable well-formatted PDFs." />
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6, borderColor: "rgba(45,212,191,0.35)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative p-4 sm:p-6 rounded-xl bg-white/4 border border-white/8
      backdrop-blur-sm transition-all"
    >
      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{icon}</div>
      <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed hidden sm:block">{description}</p>
    </motion.div>
  );
}

export default Home;