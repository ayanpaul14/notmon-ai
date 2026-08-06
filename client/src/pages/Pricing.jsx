import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PLANS = [
  {
    id: "starter",
    credits: 100,
    price: 49,
    label: "Starter",
    emoji: "⚡",
    description: "Perfect for occasional use",
    perCredit: "₹0.49/credit",
    highlight: false,
  },
  {
    id: "popular",
    credits: 500,
    price: 199,
    label: "Popular",
    emoji: "🔥",
    description: "Best value for students",
    perCredit: "₹0.40/credit",
    highlight: true,
  },
  {
    id: "pro",
    credits: 1000,
    price: 349,
    label: "Pro",
    emoji: "💎",
    description: "For power users & exam prep",
    perCredit: "₹0.35/credit",
    highlight: false,
  },
];

function Pricing() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.userData);
  const credits = userData?.credits ?? 0;
  const [showToast, setShowToast] = useState(false);

  const handleBuy = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#090e13] text-white px-4 sm:px-6 py-6 sm:py-8 relative">

      {/* Aurora blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full
          bg-gradient-to-br from-teal-400/15 via-cyan-400/10 to-emerald-500/12 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full
          bg-gradient-to-tr from-violet-500/10 via-teal-400/6 to-transparent blur-[100px]" />
      </div>

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 sm:mb-10 rounded-2xl
        bg-white/4 backdrop-blur-xl border border-white/10
        px-4 sm:px-8 py-4 sm:py-5
        flex items-center justify-between gap-3 flex-wrap"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Notmon <span className="text-teal-400">AI</span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">Buy credits to keep generating notes</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full
            bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs sm:text-sm font-medium">
            <span>💎</span>
            <span>{credits} <span className="hidden sm:inline">credits remaining</span></span>
          </div>
          <button
            onClick={() => navigate("/notes")}
            className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium
            bg-white/6 border border-white/12 text-gray-300
            hover:bg-white/10 transition"
          >
            ← Back
          </button>
        </div>
      </motion.header>

      {/* COMING SOON TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-auto sm:w-auto
            sm:translate-x-0 z-50 mx-auto
            px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-black text-white text-xs sm:text-sm
            font-semibold shadow-xl border border-white/20 flex items-center gap-2 justify-center"
          >
            🚀 Payments coming soon! We'll notify you when it's live.
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 text-center mb-4"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">Choose Your Plan</h2>
        <p className="text-gray-500 text-base sm:text-lg">Buy credits once, use anytime. No subscription.</p>
      </motion.div>

      {/* COMING SOON BANNER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 max-w-xl mx-auto mb-8 sm:mb-10 px-4 sm:px-6 py-3 rounded-full
        bg-teal-500/10 border border-teal-500/20 text-teal-400
        text-center text-xs sm:text-sm font-medium"
      >
        🚧 Payments are coming soon — plans are locked in, stay tuned!
      </motion.div>

      {/* PLANS */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`relative rounded-2xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-5
            border backdrop-blur-sm
            ${plan.highlight
                ? "bg-white/8 border-teal-500/40 sm:scale-105 shadow-[0_0_40px_rgba(45,212,191,0.1)]"
                : "bg-white/4 border-white/10"
              }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2
              px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500
              text-black text-xs font-bold shadow-lg">
                ⭐ Most Popular
              </div>
            )}

            <div>
              <div className="text-4xl mb-2">{plan.emoji}</div>
              <h3 className="text-xl font-bold text-white">
                {plan.label}
              </h3>
              <p className="text-sm mt-1 text-gray-400">
                {plan.description}
              </p>
            </div>

            <div>
              <div className="flex items-end gap-1">
                <span className={`text-4xl font-extrabold ${plan.highlight ? "text-teal-400" : "text-white"}`}>
                  ₹{plan.price}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-500">
                {plan.perCredit}
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/6 border border-white/8">
              <span className="text-2xl">💎</span>
              <div>
                <p className="font-bold text-lg text-white">
                  {plan.credits} Credits
                </p>
                <p className="text-xs text-gray-500">
                  ~{plan.credits} notes generated
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              {["AI-generated exam notes", "PDF downloads", "Diagrams & charts", "Revision mode"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-teal-400">✓</span> {f}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBuy}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition mt-auto
              flex items-center justify-center gap-2
              ${ plan.highlight
                  ? "bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500/25"
                  : "bg-white/6 text-gray-400 border border-white/10 hover:bg-white/10"
                }`}
            >
              🔒 Coming Soon
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-400 text-xs sm:text-sm mt-10 sm:mt-12 px-4"
      >
        🔒 Secure payments will be powered by Razorpay · Credits never expire
      </motion.p>
    </div>
  );
}

export default Pricing;