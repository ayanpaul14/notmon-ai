import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopicForm from "../components/TopicForm";
import NotesDisplay from "../components/NotesDisplay"; // adjust path if needed

function Notes() {
  const navigate = useNavigate();
  const credits = useSelector((state) => state?.user?.userData?.credits) ?? 50;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10
        px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
        items-start flex md:items-center justify-between gap-4 flex-col md:flex-row"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Notmon AI
          </h1>
          <p className="text-lg text-gray-300">AI-powered exam-oriented notes & revision assistant</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
            <span className="text-xl">💎</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold"
            >
              ➕
            </motion.span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-4 py-3 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-white hover:bg-white/20 transition flex items-center gap-2"
          >
            📚 Your Notes
          </button>
        </div>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-6 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm"
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="h-64 rounded-2xl flex flex-col items-center justify-center
          bg-white/10 backdrop-blur-lg border border-dashed border-gray-300"
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
          className="h-64 rounded-2xl flex flex-col items-center justify-center
          bg-white/10 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500 shadow-inner"
        >
          <span className="text-4xl mb-3">📝</span>
          <p className="text-sm">Generated notes will appear here</p>
        </motion.div>
      )}

      {/* Notes Display */}
      {result && !loading && (
        <NotesDisplay result={result} />
      )}

    </div>
  );
}

export default Notes;