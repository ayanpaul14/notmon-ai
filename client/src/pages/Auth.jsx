import React, { useRef } from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../config";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Footer from "../components/Footer";
import logo from "../assets/NotmonAI_logo.svg";

const FEATURES = [
  { icon: "🎁", title: "200 FREE Credits", desc: "Start generating notes instantly, no payment needed." },
  { icon: "📒", title: "Exam Notes", desc: "High-yield, revision-ready, exam-focused notes." },
  { icon: "📂", title: "Project Notes", desc: "Structured docs for assignments & projects." },
  { icon: "📊", title: "Charts & Graphs", desc: "AI-generated visual aids for better understanding." },
  { icon: "⬇️", title: "PDF Downloads", desc: "Clean, printable PDFs ready in seconds." },
  { icon: "🧠", title: "Smart Summaries", desc: "Long topics distilled into exam-ready bullets." },
];

function Auth() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const result = await axios.post(
        serverUrl + "/api/auth/google",
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      navigate("/notes");
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#090e13] text-white overflow-x-hidden relative">

      {/* ── Aurora blobs ─────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* top-right large teal blob */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
          bg-gradient-to-br from-teal-400/25 via-cyan-400/15 to-emerald-500/20
          blur-[120px]" />
        {/* bottom-left purple blob */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full
          bg-gradient-to-tr from-violet-500/15 via-teal-400/10 to-transparent
          blur-[110px]" />
        {/* center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[800px] h-[300px] rounded-full
          bg-gradient-to-r from-transparent via-teal-500/8 to-transparent
          blur-[100px]" />
      </div>

      {/* ── Navbar ───────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-6 sm:pt-8
          flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Notmon AI" className="w-10 h-10" />
          <span className="text-lg font-bold tracking-tight">
            Notmon <span className="text-teal-400">AI</span>
          </span>
        </div>

        {/* Nav CTA */}
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/8 border border-white/12 text-sm text-gray-300
            hover:bg-white/14 hover:border-white/20 transition-all backdrop-blur-sm"
        >
          <FcGoogle className="text-lg" />
          Sign in
        </motion.button>
      </motion.nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8
        pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-20
        grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
            bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Powered by Groq llama-3.3-70b
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-5">
            Create Smart<br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400
              bg-clip-text text-transparent">
              AI Notes
            </span>{" "}
            in Seconds
          </h1>

          {/* Sub-description */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
            Generate exam-focused notes, flow diagrams, revision points and
            clean PDFs — all powered by AI, tailored to your exam and level.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={handleGoogleAuth}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(45,212,191,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl
                bg-gradient-to-r from-teal-500 to-emerald-500
                text-black font-semibold text-base
                shadow-[0_8px_32px_rgba(20,184,166,0.35)] transition-all"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </motion.button>

            <motion.button
              onClick={scrollToFeatures}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                bg-white/6 border border-white/12 text-gray-300
                hover:bg-white/10 hover:border-white/20 transition-all text-base font-medium"
            >
              See how it works →
            </motion.button>
          </div>

          {/* Social proof / free credits callout */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
              🎁 200 free credits
            </span>
            <span>No credit card required</span>
          </div>
        </motion.div>

        {/* RIGHT — Floating notes preview card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/10
            rounded-3xl blur-3xl scale-110 -z-10" />

          {/* Notes preview card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
            shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden">

            {/* Card header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs text-gray-500 font-mono">Notmon AI — Binary Search Trees</span>
            </div>

            {/* Simulated note content */}
            <div className="p-5 sm:p-6 space-y-4 text-sm">
              <div>
                <p className="text-xs text-teal-400 font-semibold uppercase tracking-widest mb-2">📝 Notes</p>
                <div className="space-y-1.5">
                  <div className="h-2.5 rounded-full bg-white/15 w-full" />
                  <div className="h-2.5 rounded-full bg-white/10 w-4/5" />
                  <div className="h-2.5 rounded-full bg-white/15 w-11/12" />
                  <div className="h-2.5 rounded-full bg-white/10 w-3/4" />
                </div>
              </div>

              <div>
                <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mb-2">🔁 Revision Points</p>
                <div className="space-y-1.5">
                  {[3, 4, 2.5].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <div className={`h-2 rounded-full bg-white/10`} style={{ width: `${w * 25}%` }} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-widest mb-2">❓ Practice Questions</p>
                <div className="space-y-1.5">
                  <div className="h-2 rounded-full bg-white/10 w-11/12" />
                  <div className="h-2 rounded-full bg-white/10 w-4/5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/8">
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-full bg-teal-500/15 text-teal-400 text-xs">B.Tech</span>
                  <span className="px-2 py-1 rounded-full bg-white/8 text-gray-400 text-xs">Semester Exam</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">⬇️ PDF ready</span>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 px-3 py-2 rounded-xl
              bg-gradient-to-br from-teal-500 to-emerald-500
              text-black text-xs font-bold shadow-lg shadow-teal-500/30"
          >
            ✨ AI Generated
          </motion.div>

          {/* Credits badge */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl
              bg-white/8 border border-white/15 backdrop-blur-sm
              text-white text-xs font-semibold shadow-xl"
          >
            💎 190 credits remaining
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Features ─────────────────────────────────── */}
      <section ref={featuresRef} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-teal-400 font-semibold uppercase tracking-widest mb-3">What you get</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Everything you need to ace your exams
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: "rgba(45,212,191,0.35)" }}
              className="p-4 sm:p-5 rounded-xl bg-white/4 border border-white/8
                backdrop-blur-sm transition-all cursor-default group"
            >
              <div className="text-2xl sm:text-3xl mb-3">{f.icon}</div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed hidden sm:block">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Full Footer ───────────────────────────────── */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default Auth;