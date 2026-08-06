import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopicForm from "../components/TopicForm";
import NotesDisplay from "../components/NotesDisplay";

function Notes() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.userData);
  const credits = userData?.credits ?? 50;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
        className="relative z-10 mb-6 sm:mb-8 rounded-2xl
        bg-white/4 backdrop-blur-xl border border-white/10
        px-4 sm:px-8 py-4 sm:py-5
        flex items-center justify-between gap-3 flex-wrap"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Notmon <span className="text-teal-400">AI</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">AI-powered exam-oriented notes & revision assistant</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak & XP Widget */}
          {userData && (
            <div className="flex items-center gap-1.5 sm:gap-3 bg-teal-500/10 border border-teal-500/20 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-teal-400 font-medium">
              <span title="Daily study streak">🔥 {userData?.streak || 0}</span>
              <span className="h-3 w-px bg-teal-500/20 hidden sm:inline" />
              <span className="hidden sm:inline" title="Experience Points">⚡ {userData?.xp || 0} XP</span>
            </div>
          )}
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full
            bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs sm:text-sm font-medium"
          >
            <span>💎</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-1 h-5 w-5 flex items-center justify-center rounded-full
              bg-teal-500 text-black text-xs font-bold"
            >
              ➕
            </motion.span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium
            bg-white/6 border border-white/12 text-gray-300
            hover:bg-white/10 hover:border-white/20 transition flex items-center gap-1"
          >
            📚 <span className="hidden sm:inline">Your Notes</span><span className="sm:hidden">Notes</span>
          </button>
        </div>
      </motion.header>

      {/* FORM */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-6 sm:mb-8">
        <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="relative z-10 mb-4 sm:mb-6 px-4 py-3 rounded-xl
          bg-red-500/15 border border-red-500/30 text-red-400 text-sm"
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="relative z-10 h-48 sm:h-64 rounded-2xl flex flex-col items-center justify-center
          bg-white/4 backdrop-blur-lg border border-dashed border-white/15"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="text-4xl mb-4"
          >
            ⚙️
          </motion.div>
          <p className="text-gray-400 text-sm">Generating your notes...</p>
        </motion.div>
      )}

      {/* Empty State */}
      {!result && !loading && (
        <motion.div
          className="relative z-10 h-48 sm:h-64 rounded-2xl flex flex-col items-center justify-center
          bg-white/4 backdrop-blur-lg border border-dashed border-white/15 text-gray-500"
        >
          <span className="text-4xl mb-3">📝</span>
          <p className="text-sm">Generated notes will appear here</p>
        </motion.div>
      )}

      {/* Notes Display */}
      {result && !loading && (
        <div className="relative z-10">
          <NotesDisplay result={result} />
        </div>
      )}
    </div>
  );
}

export default Notes;