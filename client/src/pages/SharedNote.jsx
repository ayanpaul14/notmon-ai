import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getSharedNotes } from "../services/api";

const Stars = ({ value }) => {
  const count = (value?.match(/⭐/g) || []).length || 0;
  return (
    <span className="text-yellow-400 text-sm">
      {"⭐".repeat(Math.min(count, 5))} <span className="text-gray-400 text-xs">({count}/5)</span>
    </span>
  );
};

export default function SharedNote() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        const response = await getSharedNotes(shareId);
        setNote(response?.note);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch shared note");
      } finally {
        setLoading(false);
      }
    };
    fetchSharedNote();
  }, [shareId]);

  const handleDownloadPDF = () => {
    if (!note) return;
    const { content = {}, topic, classLevel, examType } = note;
    const { notes: rawNotes = "", revisionPoints = [], subTopics = {}, questions = {}, importance = "" } = content;

    const cleanNotes = rawNotes
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/#{3} (.*)/g, "<h3>$1</h3>")
      .replace(/#{2} (.*)/g, "<h2>$1</h2>")
      .replace(/#{1} (.*)/g, "<h1>$1</h1>")
      .replace(/\n/g, "<br/>");

    const htmlContent = `
      <html>
      <head>
        <title>Shared with Notmon AI - ${topic}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: auto; color: #111; }
          h1 { font-size: 22px; border-bottom: 2px solid #000; padding-bottom: 8px; }
          h2 { font-size: 18px; margin-top: 20px; color: #222; }
          h3 { font-size: 15px; color: #333; }
          .section { margin-bottom: 24px; }
          .tag { display: inline-block; background: #eee; padding: 3px 10px; border-radius: 20px; margin: 3px; font-size: 12px; }
          ul, ol { padding-left: 20px; }
          li { margin-bottom: 6px; font-size: 14px; }
          .stars { color: orange; }
          .label { font-weight: bold; font-size: 13px; color: #555; text-transform: uppercase; margin-bottom: 6px; }
        </style>
      </head>
      <body>
        <h1>📝 ${topic}</h1>
        <p>Shared via Notmon AI</p>
        ${importance ? `<p class="stars">Importance: ${importance}</p>` : ""}
        ${rawNotes ? `<div class="section"><div class="label">Notes</div><div>${cleanNotes}</div></div>` : ""}
        ${revisionPoints?.length ? `
        <div class="section">
          <div class="label">🔁 Revision Points</div>
          <ul>${revisionPoints.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>` : ""}
        ${Object.keys(subTopics).length ? `
        <div class="section">
          <div class="label">📚 Sub Topics</div>
          ${Object.entries(subTopics).map(([stars, topics]) => `
            <p class="stars">${stars}</p>
            ${topics.map(t => `<span class="tag">${t}</span>`).join("")}
          `).join("")}
        </div>` : ""}
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090e13] text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="text-4xl"
        >
          ⚙️
        </motion.div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-[#090e13] text-white flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">🔒</span>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Note Private or Not Found</h2>
        <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
          {error || "This note might have been set to private by the creator, or the link is invalid."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-semibold hover:opacity-90 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const { content = {} } = note;
  const { notes = "", revisionPoints = [], subTopics = {}, importance = "", suggestedVideos = [] } = content;

  return (
    <div className="min-h-screen bg-[#090e13] text-white px-4 sm:px-6 py-6 sm:py-8 relative">
      {/* Background aurora blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full
          bg-gradient-to-br from-teal-400/15 via-cyan-400/10 to-emerald-500/12 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full
          bg-gradient-to-tr from-violet-500/10 via-teal-400/6 to-transparent blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Header Bar */}
        <header className="rounded-2xl bg-white/4 backdrop-blur-xl border border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold">
              Notmon <span className="text-teal-400">AI</span>
            </h1>
            <p className="text-xs text-gray-500">Shared Note Preview</p>
          </div>
          <button
            onClick={() => navigate("/auth")}
            className="px-4 py-2 rounded-full bg-teal-500 text-black font-semibold text-xs sm:text-sm hover:opacity-90"
          >
            Create Your Own Notes →
          </button>
        </header>

        {/* Note Info */}
        <div className="rounded-2xl bg-white/4 border border-white/8 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">📝 {note.topic}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {note.classLevel && (
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-gray-300 text-xs">{note.classLevel}</span>
                )}
                {note.examType && (
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-gray-300 text-xs">{note.examType}</span>
                )}
                {importance && <Stars value={importance} />}
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-gray-100 transition shadow-lg"
            >
              ⬇️ Download PDF
            </button>
          </div>

          <hr className="border-white/10" />

          {/* Notes Content */}
          {notes && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Notes</h3>
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {notes
                  .split("\n")
                  .map((line, i) => {
                    if (/^#{1,3} /.test(line))
                      return <p key={i} className="font-bold text-white text-base mt-3">{line.replace(/^#{1,3} /, "")}</p>;
                    if (/\*\*(.*?)\*\*/.test(line))
                      return <p key={i} className="font-semibold text-gray-100">{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
                    return <p key={i} className="text-gray-300">{line}</p>;
                  })}
              </div>
            </div>
          )}

          {/* Revision Points */}
          {revisionPoints?.length > 0 && (
            <div className="space-y-3 mt-4">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">🔁 Revision Points</h3>
              <ul className="space-y-1.5">
                {revisionPoints.map((pt, i) => (
                  <li key={i} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-teal-400 font-bold">{i + 1}.</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sub Topics */}
          {Object.keys(subTopics).length > 0 && (
            <div className="space-y-3 mt-4">
              <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">📚 Sub Topics</h3>
              <div className="space-y-3">
                {Object.entries(subTopics).map(([stars, topics]) => (
                  <div key={stars}>
                    <p className="text-yellow-400 text-xs mb-1">{stars}</p>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Suggested Videos */}
          {suggestedVideos?.length > 0 && (
            <div className="space-y-3 mt-6 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">🎥 Recommended One-Shot Lectures</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedVideos.map((video, idx) => (
                  <a
                    key={idx}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/30 hover:bg-white/8 transition group"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 text-xl group-hover:scale-110 transition-transform">
                      🔺
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-400">
                        {video.language}
                      </span>
                      <h4 className="text-sm font-semibold text-white mt-1 group-hover:text-teal-400 transition-colors line-clamp-1">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Click to search on YouTube →</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
