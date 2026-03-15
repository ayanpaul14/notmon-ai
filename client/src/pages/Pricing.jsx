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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10
        px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
        flex md:items-center justify-between gap-4 flex-col md:flex-row items-start"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Notmon AI
          </h1>
          <p className="text-gray-300 text-sm">Buy credits to keep generating notes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
            <span className="text-xl">💎</span>
            <span>{credits} credits remaining</span>
          </div>
          <button
            onClick={() => navigate("/notes")}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 transition"
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
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50
            px-6 py-3 rounded-full bg-black text-white text-sm font-semibold shadow-xl
            border border-white/20 flex items-center gap-2"
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
        className="text-center mb-4"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Choose Your Plan</h2>
        <p className="text-gray-500 text-lg">Buy credits once, use anytime. No subscription.</p>
      </motion.div>

      {/* COMING SOON BANNER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-xl mx-auto mb-10 px-6 py-3 rounded-full
        bg-yellow-400/20 border border-yellow-400/40 text-yellow-700
        text-center text-sm font-medium"
      >
        🚧 Payments are coming soon — plans are locked in, stay tuned!
      </motion.div>

      {/* PLANS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`relative rounded-2xl p-8 flex flex-col gap-5 shadow-xl
            ${plan.highlight
                ? "bg-black text-white border-2 border-white/20 scale-105"
                : "bg-white text-black border border-gray-200"
              }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2
              px-4 py-1 rounded-full bg-white text-black text-xs font-bold shadow-lg">
                ⭐ Most Popular
              </div>
            )}

            <div>
              <div className="text-4xl mb-2">{plan.emoji}</div>
              <h3 className={`text-xl font-bold ${plan.highlight ? "text-white" : "text-black"}`}>
                {plan.label}
              </h3>
              <p className={`text-sm mt-1 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                {plan.description}
              </p>
            </div>

            <div>
              <div className="flex items-end gap-1">
                <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-black"}`}>
                  ₹{plan.price}
                </span>
              </div>
              <p className={`text-sm mt-1 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                {plan.perCredit}
              </p>
            </div>

            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl
            ${plan.highlight ? "bg-white/10" : "bg-gray-100"}`}>
              <span className="text-2xl">💎</span>
              <div>
                <p className={`font-bold text-lg ${plan.highlight ? "text-white" : "text-black"}`}>
                  {plan.credits} Credits
                </p>
                <p className={`text-xs ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                  ~{plan.credits} notes generated
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              {["AI-generated exam notes", "PDF downloads", "Diagrams & charts", "Revision mode"].map((f) => (
                <li key={f} className={`flex items-center gap-2 text-sm
                ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="text-green-400">✓</span> {f}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBuy}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition mt-auto
              flex items-center justify-center gap-2
              ${plan.highlight
                  ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
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
        className="text-center text-gray-400 text-sm mt-12"
      >
        🔒 Secure payments will be powered by Razorpay · Credits never expire
      </motion.p>

    </div>
  );
}

export default Pricing;