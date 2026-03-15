// // import React, { useState } from "react";
// // import { motion, AnimatePresence } from "motion/react";
// // import logo from "../assets/ExamNotes_logo.png";
// // import { useSelector, useDispatch } from "react-redux";
// // import axios from "axios";
// // import { serverUrl } from "../App";
// // import { useNavigate } from "react-router-dom";
// // import { setUserData } from "../redux/userSlice";

// // function Navbar() {
// //   const credits =
// //     useSelector((state) => state?.user?.userData?.credits) ?? 50;

// //   const [showCredits, setShowCredits] = useState(false);
// //   const [showProfile, setShowProfile] = useState(false);

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   // ✅ FIXED SIGNOUT FUNCTION
// //   const handleSignOut = async () => {
// //     try {
// //       await axios.post(
// //         serverUrl + "/api/auth/logout",
// //         {},
// //         { withCredentials: true }
// //       );

// //       dispatch(setUserData(null)); // clear redux
// //       setShowProfile(false);       // close dropdown
// //       navigate("/auth");           // redirect to login page
// //     } catch (error) {
// //       console.error("Error signing out:", error);
// //     }
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: -15 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.6 }}
// //       className="relative z-20 mx-4 sm:mx-6 mt-6
// //       rounded-2xl
// //       bg-black
// //       border border-white/10
// //       shadow-[0_22px_55px_rgba(0,0,0,0.75)]
// //       flex items-center justify-between px-4 sm:px-8 py-4"
// //     >
// //       {/* LEFT SIDE */}
// //       <div className="flex items-center gap-3">
// //         <img src={logo} alt="examnotes" className="w-9 h-9" />
// //         <span className="text-lg hidden md:block font-semibold text-white">
// //           ExamNotes <span className="text-gray-400">AI</span>
// //         </span>
// //       </div>

// //       {/* RIGHT SIDE */}
// //       <div className="flex items-center gap-3 sm:gap-4 relative">

// //         {/* CREDIT BUTTON */}
// //         <div className="relative">
// //           <motion.div
// //             onClick={() => {
// //               setShowCredits(!showCredits);
// //               setShowProfile(false);
// //             }}
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.97 }}
// //             className="flex items-center gap-2
// //             px-3 sm:px-4 py-2 rounded-full
// //             bg-white/10
// //             border border-white/20
// //             text-white text-sm
// //             shadow-md
// //             cursor-pointer"
// //           >
// //             <span className="text-lg sm:text-xl">💎</span>
// //             <span>{credits}</span>
// //             <motion.span whileHover={{ scale: 1.2 }}
// //             whileTap={{ scale: 0.97 }}
// //             className="ml-1 sm:ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
// //               ➕
// //             </motion.span>
// //           </motion.div>

// //           <AnimatePresence>
// //             {showCredits && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //                 animate={{ opacity: 1, y: 10, scale: 1 }}
// //                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //                 transition={{ duration: 0.2 }}
// //                 className="absolute right-0 mt-4 w-60
// //                 rounded-xl
// //                 bg-black/95 backdrop-blur-xl
// //                 border border-white/10
// //                 shadow-[0_25px_60px_rgba(0,0,0,0.7)]
// //                 p-4 text-white"
// //               >
// //                 <h3 className="font-semibold mb-2">Buy Credits</h3>
// //                 <p className="text-sm text-gray-300 mb-4">
// //                   Use credits to generate AI notes, diagrams & PDFs.
// //                 </p>

// //                 <button
// //                   onClick={() => {setShowCredits(false); navigate("/pricing")}}
// //                   className="w-full py-2 rounded-lg
// //                   bg-gradient-to-br from-white to-gray-200
// //                   text-black font-semibold
// //                   hover:opacity-90"
// //                 >
// //                   Buy More Credits
// //                 </button>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>

// //         {/* PROFILE BUTTON */}
// //         <div className="relative">
// //           <motion.div
// //             onClick={() => {
// //               setShowProfile(!showProfile);
// //               setShowCredits(false);
// //             }}
// //             whileHover={{ scale: 1.1 }}
// //             whileTap={{ scale: 0.97 }}
// //             className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
// //             bg-gradient-to-br from-gray-700 to-gray-900
// //             border border-white/20
// //             flex items-center justify-center
// //             text-white font-semibold
// //             cursor-pointer"
// //           >
// //             A
// //           </motion.div>

// //           <AnimatePresence>
// //             {showProfile && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //                 animate={{ opacity: 1, y: 10, scale: 1 }}
// //                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //                 transition={{ duration: 0.2 }}
// //                 className="absolute right-0 mt-4 w-44
// //                 rounded-xl
// //                 bg-black/95 backdrop-blur-xl
// //                 border border-white/10
// //                 shadow-[0_25px_60px_rgba(0,0,0,0.7)]
// //                 p-2 text-white"
// //               >
// //                 <button
// //                   onClick={() => {
// //                     setShowProfile(false);
// //                     navigate("/history");
// //                   }}
// //                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
// //                 >
// //                   History
// //                 </button>

// //                 <button
// //                   onClick={handleSignOut}
// //                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400"
// //                 >
// //                   Sign Out
// //                 </button>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>

// //       </div>
// //     </motion.div>
// //   );
// // }

// // export default Navbar;


// import React, { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import logo from "../assets/ExamNotes_logo.png";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { serverUrl } from "../App";
// import { useNavigate } from "react-router-dom";
// import { setUserData } from "../redux/userSlice";

// function Navbar() {
//   const credits = useSelector((state) => state?.user?.userData?.credits) ?? 0;
//   const userData = useSelector((state) => state?.user?.userData);
//   const initial = userData?.name?.charAt(0).toUpperCase() ?? "?"; // ✅ dynamic initial

//   const [showCredits, setShowCredits] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSignOut = async () => {
//     try {
//       await axios.post(
//         serverUrl + "/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       dispatch(setUserData(null));
//       setShowProfile(false);
//       navigate("/auth");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="relative z-20 mx-4 sm:mx-6 mt-6
//       rounded-2xl
//       bg-black
//       border border-white/10
//       shadow-[0_22px_55px_rgba(0,0,0,0.75)]
//       flex items-center justify-between px-4 sm:px-8 py-4"
//     >
//       {/* LEFT SIDE */}
//       <div className="flex items-center gap-3">
//         <img src={logo} alt="examnotes" className="w-9 h-9" />
//         <span className="text-lg hidden md:block font-semibold text-white">
//           ExamNotes <span className="text-gray-400">AI</span>
//         </span>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-3 sm:gap-4 relative">

//         {/* CREDIT BUTTON */}
//         <div className="relative">
//           <motion.div
//             onClick={() => {
//               setShowCredits(!showCredits);
//               setShowProfile(false);
//             }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.97 }}
//             className="flex items-center gap-2
//             px-3 sm:px-4 py-2 rounded-full
//             bg-white/10
//             border border-white/20
//             text-white text-sm
//             shadow-md
//             cursor-pointer"
//           >
//             <span className="text-lg sm:text-xl">💎</span>
//             <span>{credits}</span>
//             <motion.span
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.97 }}
//               className="ml-1 sm:ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold"
//             >
//               ➕
//             </motion.span>
//           </motion.div>

//           <AnimatePresence>
//             {showCredits && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 10, scale: 1 }}
//                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-0 mt-4 w-60
//                 rounded-xl
//                 bg-black/95 backdrop-blur-xl
//                 border border-white/10
//                 shadow-[0_25px_60px_rgba(0,0,0,0.7)]
//                 p-4 text-white"
//               >
//                 <h3 className="font-semibold mb-2">Buy Credits</h3>
//                 <p className="text-sm text-gray-300 mb-4">
//                   Use credits to generate AI notes, diagrams & PDFs.
//                 </p>
//                 <button
//                   onClick={() => { setShowCredits(false); navigate("/pricing"); }}
//                   className="w-full py-2 rounded-lg
//                   bg-gradient-to-br from-white to-gray-200
//                   text-black font-semibold
//                   hover:opacity-90"
//                 >
//                   Buy More Credits
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* PROFILE BUTTON */}
//         <div className="relative">
//           <motion.div
//             onClick={() => {
//               setShowProfile(!showProfile);
//               setShowCredits(false);
//             }}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.97 }}
//             className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
//             bg-gradient-to-br from-gray-700 to-gray-900
//             border border-white/20
//             flex items-center justify-center
//             text-white font-semibold
//             cursor-pointer"
//           >
//             {initial} {/* ✅ shows first letter of user's name */}
//           </motion.div>

//           <AnimatePresence>
//             {showProfile && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 10, scale: 1 }}
//                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-0 mt-4 w-44
//                 rounded-xl
//                 bg-black/95 backdrop-blur-xl
//                 border border-white/10
//                 shadow-[0_25px_60px_rgba(0,0,0,0.7)]
//                 p-2 text-white"
//               >
//                 {/* Show user name at top of dropdown */}
//                 <div className="px-3 py-2 border-b border-white/10 mb-1">
//                   <p className="text-sm font-semibold truncate">{userData?.name}</p>
//                   <p className="text-xs text-gray-400 truncate">{userData?.email}</p>
//                 </div>

//                 <button
//                   onClick={() => {
//                     setShowProfile(false);
//                     navigate("/history");
//                   }}
//                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
//                 >
//                   History
//                 </button>

//                 <button
//                   onClick={handleSignOut}
//                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400"
//                 >
//                   Sign Out
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//       </div>
//     </motion.div>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../assets/NotmonAI_logo.svg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../config";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";

function Navbar() {
  const credits = useSelector((state) => state?.user?.userData?.credits) ?? 0;
  const userData = useSelector((state) => state?.user?.userData);
  const initial = userData?.name?.charAt(0).toUpperCase() ?? "?";

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
      dispatch(setUserData(null));
      setShowProfile(false);
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 mx-4 sm:mx-6 mt-6
      rounded-2xl bg-black border border-white/10
      shadow-[0_22px_55px_rgba(0,0,0,0.75)]
      flex items-center justify-between px-4 sm:px-8 py-4"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Notmon AI" className="w-20 h-20" />
        <span className="text-2xl font-bold text-white tracking-wide">
          Notmon <span className="text-gray-400">AI</span>
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4 relative">

        {/* CREDIT BUTTON */}
        <div className="relative">
          <motion.div
            onClick={() => { setShowCredits(!showCredits); setShowProfile(false); }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full
            bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
          >
            <span className="text-lg sm:text-xl">💎</span>
            <span>{credits}</span>
            <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.97 }}
              className="ml-1 sm:ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
              ➕
            </motion.span>
          </motion.div>

          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-60 rounded-xl bg-black/95 backdrop-blur-xl
                border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white"
              >
                <h3 className="font-semibold mb-2">Buy Credits</h3>
                <p className="text-sm text-gray-300 mb-4">Use credits to generate AI notes, diagrams & PDFs.</p>
                <button
                  onClick={() => { setShowCredits(false); navigate("/pricing"); }}
                  className="w-full py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold hover:opacity-90"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PROFILE BUTTON */}
        <div className="relative">
          <motion.div
            onClick={() => { setShowProfile(!showProfile); setShowCredits(false); }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.97 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
            bg-gradient-to-br from-gray-700 to-gray-900
            border border-white/20 flex items-center justify-center
            text-white font-semibold cursor-pointer"
          >
            {initial}
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-44 rounded-xl bg-black/95 backdrop-blur-xl
                border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-2 text-white"
              >
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-sm font-semibold truncate">{userData?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{userData?.email}</p>
                </div>
                <button onClick={() => { setShowProfile(false); navigate("/history"); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10">
                  History
                </button>
                <button onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400">
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}

export default Navbar;