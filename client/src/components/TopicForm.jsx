// import React, { useState } from "react";
// import { motion } from "framer-motion";
// // Add this at the top of TopicForm.jsx
// import { generateNotes } from "../services/api"; // Adjust the path based on where your api.js is

// function TopicForm({setResult, setLoading, loading, setError}) {
//   const [topic, setTopic] = useState("");
//   const [classLevel, setClassLevel] = useState("");
//   const [examType, setExamType] = useState("");
//   const [revisionMode, setRevisionMode] = useState(false);
//   const [includeDiagram, setIncludeDiagram] = useState(false);
//   const [includeChart, setIncludeChart] = useState(false);

// const handleSubmit = async () => {
//   if(!topic.trim()){
//     setError("Please enter the topic")
//     return;
//   }
//   setError("")
//     setLoading(true)
//     setResult(null)
//   try{
//     const result = await generateNotes({
//                 topic,
//                 classLevel, 
//                 examType, 
//                 revisionMode, 
//                 includeDiagram, 
//                 includeChart
//     })
//     setResult(result)
//     setLoading(false)
//   }catch(error){
//     console.log(error)
//     setError("Failed to fetch notes from server");
//     setLoading(false)
//   }
// }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="
//       rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90
//       backdrop-blur-xl
//       border border-white/10
//       shadow-[0_25px_60px_rgba(0,0,0,0.75)]
//       p-8 space-y-6 text-white"
//     >
//       {/* Topic */}
//       <input
//         type="text"
//         className="w-full p-3 rounded-xl
//         bg-white/10 backdrop-blur-lg
//         border border-white/20
//         placeholder-gray-400
//         text-white
//         focus:outline-none focus:ring-2 focus:ring-white/30"
//         placeholder="Enter topic (e.g. Binary Search Tree)"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//       />

//       {/* Class Level */}
//       <input
//         type="text"
//         className="w-full p-3 rounded-xl
//         bg-white/10 backdrop-blur-lg
//         border border-white/20
//         placeholder-gray-400
//         text-white
//         focus:outline-none focus:ring-2 focus:ring-white/30"
//         placeholder="Enter class / level (e.g. Class 10, B.Tech)"
//         value={classLevel}
//         onChange={(e) => setClassLevel(e.target.value)}
//       />

//       {/* Exam Type */}
//       <input
//         type="text"
//         className="w-full p-3 rounded-xl
//         bg-white/10 backdrop-blur-lg
//         border border-white/20
//         placeholder-gray-400
//         text-white
//         focus:outline-none focus:ring-2 focus:ring-white/30"
//         placeholder="Enter exam type (e.g. UPSC, Semester Exam)"
//         value={examType}
//         onChange={(e) => setExamType(e.target.value)}
//       />

//       {/* Small Toggle Options */}
//       <div className="flex flex-wrap gap-6 text-sm">

//         {/* Revision Toggle */}
//         <div className="flex items-center gap-2">
//           <span>Revision Mode</span>
//           <button
//             onClick={() => setRevisionMode(!revisionMode)}
//             className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
//               revisionMode ? "bg-green-500" : "bg-gray-500"
//             }`}
//           >
//             <div
//               className={`bg-white w-4 h-4 rounded-full transform transition ${
//                 revisionMode ? "translate-x-5" : ""
//               }`}
//             />
//           </button>
//         </div>

//         {/* Diagram Toggle */}
//         <div className="flex items-center gap-2">
//           <span>Include Diagrams</span>
//           <button
//             onClick={() => setIncludeDiagram(!includeDiagram)}
//             className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
//               includeDiagram ? "bg-green-500" : "bg-gray-500"
//             }`}
//           >
//             <div
//               className={`bg-white w-4 h-4 rounded-full transform transition ${
//                 includeDiagram ? "translate-x-5" : ""
//               }`}
//             />
//           </button>
//         </div>

//         {/* Chart Toggle */}
//         <div className="flex items-center gap-2">
//           <span>Include Charts</span>
//           <button
//             onClick={() => setIncludeChart(!includeChart)}
//             className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
//               includeChart ? "bg-green-500" : "bg-gray-500"
//             }`}
//           >
//             <div
//               className={`bg-white w-4 h-4 rounded-full transform transition ${
//                 includeChart ? "translate-x-5" : ""
//               }`}
//             />
//           </button>
//         </div>

//       </div>

//       {/* Generate Button */}
//       <motion.button
//       onClick={handleSubmit}
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.95 }}
//         className="
//         w-full py-3 rounded-xl
//         bg-white text-black font-semibold
//         hover:bg-gray-200 transition"
//       >
//         Generate AI Notes
//       </motion.button>

//     </motion.div>
//   );
// }

// export default TopicForm;


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

      // ✅ Update credits in Redux so Navbar reflects new value
      if (result?.creditsLeft !== undefined) {
        dispatch(setUserData({ ...userData, credits: result.creditsLeft }));
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch notes from server");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90
      backdrop-blur-xl
      border border-white/10
      shadow-[0_25px_60px_rgba(0,0,0,0.75)]
      p-8 space-y-6 text-white"
    >
      {/* Topic */}
      <input
        type="text"
        className="w-full p-3 rounded-xl
        bg-white/10 backdrop-blur-lg
        border border-white/20
        placeholder-gray-400
        text-white
        focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter topic (e.g. Binary Search Tree)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      {/* Class Level */}
      <input
        type="text"
        className="w-full p-3 rounded-xl
        bg-white/10 backdrop-blur-lg
        border border-white/20
        placeholder-gray-400
        text-white
        focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter class / level (e.g. Class 10, B.Tech)"
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
      />

      {/* Exam Type */}
      <input
        type="text"
        className="w-full p-3 rounded-xl
        bg-white/10 backdrop-blur-lg
        border border-white/20
        placeholder-gray-400
        text-white
        focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter exam type (e.g. UPSC, Semester Exam)"
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
      />

      {/* Toggles */}
      <div className="flex flex-wrap gap-6 text-sm">

        {/* Revision Toggle */}
        <div className="flex items-center gap-2">
          <span>Revision Mode</span>
          <button
            onClick={() => setRevisionMode(!revisionMode)}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
              revisionMode ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transform transition ${
                revisionMode ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        {/* Diagram Toggle */}
        <div className="flex items-center gap-2">
          <span>Include Diagrams</span>
          <button
            onClick={() => setIncludeDiagram(!includeDiagram)}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
              includeDiagram ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transform transition ${
                includeDiagram ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        {/* Chart Toggle */}
        <div className="flex items-center gap-2">
          <span>Include Charts</span>
          <button
            onClick={() => setIncludeChart(!includeChart)}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
              includeChart ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transform transition ${
                includeChart ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        className={`w-full py-3 rounded-xl font-semibold transition
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

export default TopicForm;