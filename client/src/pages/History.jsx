import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserHistory } from "../services/api";

function History() {
  const navigate = useNavigate();
  const credits = useSelector((state) => state?.user?.userData?.credits) ?? 0;
  const userData = useSelector((state) => state?.user?.userData);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // for expanded view

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getUserHistory();
        setNotes(data?.notes || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const handleDownloadPDF = (note) => {
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
        <title>ExamNotes - ${topic}</title>
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
          .meta { font-size: 12px; color: #888; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>📝 ${topic}</h1>
        <p class="meta">${classLevel ? `Class: ${classLevel}` : ""} ${examType ? `| Exam: ${examType}` : ""}</p>
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

        ${questions?.short?.length ? `
        <div class="section">
          <div class="label">❓ Short Answer Questions</div>
          <ol>${questions.short.map(q => `<li>${q}</li>`).join("")}</ol>
        </div>` : ""}

        ${questions?.long?.length ? `
        <div class="section">
          <div class="label">📝 Long Answer Questions</div>
          <ol>${questions.long.map(q => `<li>${q}</li>`).join("")}</ol>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10
        px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
        flex md:items-center justify-between gap-4 flex-col md:flex-row items-start"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Notmon AI
          </h1>
          <p className="text-gray-300 text-sm">Your generated notes history</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
            <span className="text-xl">💎</span>
            <span>{credits}</span>
          </button>

          <button
            onClick={() => navigate("/notes")}
            className="px-4 py-3 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 transition flex items-center gap-2"
          >
            ✏️ New Notes
          </button>
        </div>
      </motion.header>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="text-4xl"
          >
            ⚙️
          </motion.div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && notes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-64 rounded-2xl flex flex-col items-center justify-center
          bg-white/10 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500"
        >
          <span className="text-4xl mb-3">📭</span>
          <p className="text-sm">No notes generated yet</p>
          <button
            onClick={() => navigate("/notes")}
            className="mt-4 px-6 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
          >
            Generate Your First Notes
          </button>
        </motion.div>
      )}

      {/* NOTES GRID */}
      {!loading && notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {notes.map((note, i) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10
              shadow-lg p-6 flex flex-col gap-4 cursor-pointer hover:border-white/30 transition"
              onClick={() => setSelected(note)}
            >
              {/* Topic */}
              <div>
                <h2 className="text-white font-bold text-lg truncate">📝 {note.topic}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.classLevel && (
                    <span className="px-2 py-1 rounded-full bg-white/10 text-gray-300 text-xs">{note.classLevel}</span>
                  )}
                  {note.examType && (
                    <span className="px-2 py-1 rounded-full bg-white/10 text-gray-300 text-xs">{note.examType}</span>
                  )}
                  {note.revisionMode && (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Revision</span>
                  )}
                </div>
              </div>

              {/* Preview */}
              {note.content?.notes && (
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                  {note.content.notes.replace(/[#*`]/g, "").slice(0, 150)}...
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                <span className="text-gray-500 text-xs">{formatDate(note.createdAt)}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDownloadPDF(note); }}
                  className="px-3 py-1 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition"
                >
                  ⬇️ PDF
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* EXPANDED NOTE MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl
              w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">📝 {selected.topic}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadPDF(selected)}
                    className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
                  >
                    ⬇️ PDF
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.classLevel && <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs">{selected.classLevel}</span>}
                {selected.examType && <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs">{selected.examType}</span>}
                {selected.revisionMode && <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Revision Mode</span>}
                <span className="px-3 py-1 rounded-full bg-white/10 text-gray-400 text-xs">{formatDate(selected.createdAt)}</span>
              </div>

              {/* Notes Content */}
              {selected.content?.notes && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Notes</p>
                  <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {selected.content.notes
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
              {selected.content?.revisionPoints?.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">🔁 Revision Points</p>
                  <ul className="space-y-1">
                    {selected.content.revisionPoints.map((pt, i) => (
                      <li key={i} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-green-400">{i + 1}.</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Questions */}
              {selected.content?.questions?.short?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">❓ Short Questions</p>
                  <ol className="space-y-1">
                    {selected.content.questions.short.map((q, i) => (
                      <li key={i} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-blue-400">{i + 1}.</span> {q}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default History;