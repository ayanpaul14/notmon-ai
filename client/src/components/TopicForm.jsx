import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { generateNotes } from "../services/api";

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user?.userData);

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });

      setResult(result);

      if (result?.user) {
        dispatch(setUserData({ ...userData, ...result.user }));
      } else if (result?.creditsLeft !== undefined) {
        dispatch(setUserData({ ...userData, credits: result.creditsLeft }));
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch notes from server");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90
      backdrop-blur-xl border border-white/10
      shadow-[0_25px_60px_rgba(0,0,0,0.75)]
      p-5 sm:p-8 space-y-4 sm:space-y-6 text-white"
    >
      {/* Topic */}
      <input
        type="text"
        className="w-full p-3 rounded-xl
        bg-white/10 backdrop-blur-lg border border-white/20
        placeholder-gray-400 text-white text-sm sm:text-base
        focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter topic (e.g. Binary Search Tree)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      {/* Class Level + Exam Type — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <input
          type="text"
          className="w-full p-3 rounded-xl
          bg-white/10 backdrop-blur-lg border border-white/20
          placeholder-gray-400 text-white text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Class / Level (e.g. B.Tech)"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 rounded-xl
          bg-white/10 backdrop-blur-lg border border-white/20
          placeholder-gray-400 text-white text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Exam type (e.g. UPSC, Semester)"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        />
      </div>

      {/* Toggles — wrap nicely on mobile */}
      <div className="flex flex-wrap gap-3 sm:gap-6 text-sm">

        <Toggle label="Revision Mode" value={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
        <Toggle label="Include Diagrams" value={includeDiagram} onChange={() => setIncludeDiagram(!includeDiagram)} />
        <Toggle label="Include Charts" value={includeChart} onChange={() => setIncludeChart(!includeChart)} />

      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        className={`w-full py-3 rounded-xl font-semibold transition text-sm sm:text-base
        ${loading
          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
          : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {loading ? "⚙️ Generating..." : "Generate AI Notes"}
      </motion.button>
    </motion.div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs sm:text-sm text-gray-300">{label}</span>
      <button
        onClick={onChange}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
          value ? "bg-green-500" : "bg-gray-500"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transform transition ${
            value ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}

export default TopicForm;