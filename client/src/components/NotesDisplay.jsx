import React, { useRef } from "react";
import { motion } from "framer-motion";

// Helper: render star importance
const Stars = ({ value }) => {
  const count = (value?.match(/⭐/g) || []).length || 0;
  return (
    <span className="text-yellow-400 text-sm">
      {"⭐".repeat(Math.min(count, 5))} <span className="text-gray-400 text-xs">({count}/5)</span>
    </span>
  );
};

// Helper: parse markdown-ish notes to sections
const parseNotes = (raw = "") => {
  return raw
    .split(/\n(?=#{1,3} |\*\*[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
};

export default function NotesDisplay({ result }) {
  const printRef = useRef();

  if (!result) return null;

  const { data, noteId, creditsLeft } = result;
  const {
    notes = "",
    subTopics = {},
    importance = "",
    charts = [],
    diagram,
    questions = {},
    revisionPoints = [],
  } = data || {};

  // ─── PDF Download ──────────────────────────────────────────────
const handleDownloadPDF = () => {
  const cleanNotes = notes
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/#{3} (.*)/g, "<h3>$1</h3>")
    .replace(/#{2} (.*)/g, "<h2>$1</h2>")
    .replace(/#{1} (.*)/g, "<h1>$1</h1>")
    .replace(/\n/g, "<br/>");

  const htmlContent = `
    <html>
    <head>
      <title>Notmon AI - ${noteId}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: auto; color: #111; }
        h1 { font-size: 22px; border-bottom: 2px solid #000; padding-bottom: 8px; }
        h2 { font-size: 18px; margin-top: 20px; color: #222; }
        h3 { font-size: 15px; color: #333; }
        .section { margin-bottom: 24px; }
        .tag { display: inline-block; background: #eee; padding: 3px 10px; border-radius: 20px; margin: 3px; font-size: 12px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 6px; font-size: 14px; }
        .stars { color: orange; }
        .label { font-weight: bold; font-size: 13px; color: #555; text-transform: uppercase; margin-bottom: 6px; }
      </style>
    </head>
    <body>
      <h1>📝 Notemon AI</h1>
      <p class="stars">Importance: ${importance}</p>

      <div class="section">
        <div class="label">Notes</div>
        <div>${cleanNotes}</div>
      </div>

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
  setTimeout(() => {
    printWindow.print(); // User selects "Save as PDF" in print dialog
  }, 500);
};
  // ─── Render ────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold text-lg">📄 Generated Notes</span>
          {importance && <Stars value={importance} />}
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-5 py-2 rounded-full
          bg-white text-black font-semibold text-sm
          shadow-lg hover:bg-gray-100 transition"
        >
          ⬇️ Download PDF
        </motion.button>
      </div>

      <div ref={printRef} className="space-y-5">

        {/* Notes Content */}
        {notes && (
          <Section title="📝 Notes">
            <div className="prose prose-invert max-w-none text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
              {notes
                .replace(/\*\*(.*?)\*\*/g, (_, m) => `**${m}**`)
                .split("\n")
                .map((line, i) => {
                  if (/^#{1,3} /.test(line))
                    return <p key={i} className="font-bold text-white text-base mt-3">{line.replace(/^#{1,3} /, "")}</p>;
                  if (/^\*\*(.*?)\*\*/.test(line))
                    return <p key={i} className="font-semibold text-gray-100">{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
                  return <p key={i} className="text-gray-300">{line}</p>;
                })}
            </div>
          </Section>
        )}

        {/* Revision Points */}
        {revisionPoints?.length > 0 && (
          <Section title="🔁 Revision Points">
            <ul className="space-y-2">
              {revisionPoints.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-200">
                  <span className="text-green-400 font-bold">{i + 1}.</span> {pt}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Sub Topics */}
        {Object.keys(subTopics).length > 0 && (
          <Section title="📚 Sub Topics">
            <div className="space-y-3">
              {Object.entries(subTopics).map(([stars, topics]) => (
                <div key={stars}>
                  <p className="text-yellow-400 text-xs mb-1">{stars}</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Questions */}
        {(questions?.short?.length > 0 || questions?.long?.length > 0) && (
          <Section title="❓ Practice Questions">
            {questions?.short?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Short Answer</p>
                <ol className="space-y-2">
                  {questions.short.map((q, i) => (
                    <li key={i} className="text-sm text-gray-200 flex gap-2">
                      <span className="text-blue-400 font-bold">{i + 1}.</span> {q}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {questions?.long?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Long Answer</p>
                <ol className="space-y-2">
                  {questions.long.map((q, i) => (
                    <li key={i} className="text-sm text-gray-200 flex gap-2">
                      <span className="text-purple-400 font-bold">{i + 1}.</span> {q}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </Section>
        )}

        {/* Diagram */}
        {diagram && (
          <Section title="🔷 Diagram">
            <pre className="text-xs text-green-300 bg-black/40 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
              {typeof diagram === "object" ? JSON.stringify(diagram, null, 2) : diagram}
            </pre>
          </Section>
        )}

        {/* Charts */}
        {charts?.length > 0 && (
          <Section title="📊 Charts">
            {charts.map((c, i) => (
              <pre key={i} className="text-xs text-cyan-300 bg-black/40 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap mb-3">
                {typeof c === "object" ? JSON.stringify(c, null, 2) : c}
              </pre>
            ))}
          </Section>
        )}

      </div>

      {/* Credits Info */}
      <p className="text-xs text-gray-500 text-right">Credits remaining: {creditsLeft}</p>
    </motion.div>
  );
}

// Reusable Section wrapper
function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-6 shadow-lg"
    >
      <h2 className="text-white font-semibold text-base mb-4 border-b border-white/10 pb-2">{title}</h2>
      {children}
    </motion.div>
  );
}