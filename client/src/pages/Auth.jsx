// // // import React from "react";
// // // import { motion } from "motion/react"
// // // import { FcGoogle } from "react-icons/fc";
// // // import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// // // import { auth } from "../utils/firebase";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import { serverUrl } from "../App";
// // // import { useDispatch } from "react-redux";
// // // import { setUserData } from "../redux/userSlice";

// // // function Auth() {
// // //     const provider = new GoogleAuthProvider();
// // //     const navigate = useNavigate();
// // //     const dispatch = useDispatch();

// // //     const handleGoogleAuth = async () => {
// // //         try {
// // //             const response = await signInWithPopup(auth, provider);
// // //             const user = response.user;
// // //             const name = user.displayName;
// // //             const email = user.email;

// // //             const result = await axios.post(
// // //                 serverUrl + "/api/auth/google",
// // //                 { name, email },
// // //                 { withCredentials: true }
// // //             );

// // //             dispatch(setUserData(result.data));
// // //             navigate("/notes");  // ✅ redirect after login

// // //         } catch (error) {
// // //             console.log("Google Sign-In failed:", error);
// // //         }
// // //     }

// // //     return (
// // //         <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
// // //             <motion.header
// // //                 initial={{ opacity: 0, y: -15 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ duration: 1.5 }}
// // //                 className="max-w-7xl mx-auto mt-8
// // //                 rounded-2xl
// // //                 bg-black/80 backdrop-blur-xl
// // //                 border border-white/10
// // //                 px-8 py-6
// // //                 shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
// // //                 <h1 className="text-4xl font-bold bg-linear-to-r from-white via-gray-300 to-white
// // //                 bg-clip-text text-transparent">ExamNotes AI</h1>
// // //                 <p className="text-lg text-gray-300">AI-powered exam-oriented notes & revision assistant</p>
// // //             </motion.header>

// // //             <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
// // //                 {/*left content*/}
// // //                 <motion.div
// // //                     initial={{ opacity: 0, x: -50 }}
// // //                     animate={{ opacity: 1, x: 0 }}
// // //                     transition={{ duration: 1.2 }}
// // //                     className="text-center lg:text-left">
// // //                     <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
// // //                         Unlock Smart AI Notes
// // //                     </h2>

// // //                     <motion.button
// // //                         onClick={handleGoogleAuth}
// // //                         whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 0.95 }}
// // //                         whileTap={{ scale: 0.97 }}
// // //                         transition={{ type: "spring", stiffness: 200, damping: 18 }}
// // //                         className="mt-10 px-8 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/90 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:bg-black/90 transition duration-300">
// // //                         <FcGoogle />
// // //                         Continue with Google
// // //                     </motion.button>

// // //                     <p className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
// // //                         You get <span className="font-semibold">50 FREE credits</span> to create exam notes, project notes, charts, graphs and download clean PDFS - instantly using AI.
// // //                     </p>
// // //                     <p className="mt-4 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
// // //                         Start creating your notes now and experience the power of AI in your studies!
// // //                     </p>
// // //                 </motion.div>

// // //                 {/*right content*/}
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
// // //                     <Feature icon="🎁" title="50 FREE Credits" description="Start with 50 FREE credits to generate notes without paying." />
// // //                     <Feature icon="📒" title="Exam Notes" description="High-yield, revision-ready exam-oriented notes." />
// // //                     <Feature icon="📂" title="Project Notes" description="Well-structured documentation for assignments & projects." />
// // //                     <Feature icon="📊" title="Charts & Graphs" description="Generate visual aids like charts and graphs to enhance your notes." />
// // //                     <Feature icon="⬇️" title="Clean PDF Downloads" description="Download your generated notes as clean, well-formatted PDFs." />
// // //                     <Feature icon="🧠" title="Smart AI Summaries" description="Instantly convert long topics into short, exam-ready summaries for quick revision." />
// // //                 </div>
// // //             </main>
// // //         </div>
// // //     );
// // // }

// // // function Feature({ icon, title, description }) {
// // //     return (
// // //         <motion.div
// // //             whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
// // //             whileTap={{ scale: 0.97 }}
// // //             transition={{ type: "spring", stiffness: 200, damping: 18 }}
// // //             className="relative p-6 rounded-xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white"
// // //             style={{ transformStyle: "preserve-3d" }}>

// // //             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

// // //             <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
// // //                 <div className="text-4xl mb-3">{icon}</div>
// // //                 <h3 className="text-lg font-semibold mb-2">{title}</h3>
// // //                 <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
// // //             </div>
// // //         </motion.div>
// // //     )
// // // }

// // // export default Auth;


// // import React from "react";
// // import { motion } from "motion/react"
// // import { FcGoogle } from "react-icons/fc";
// // import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// // import { auth } from "../utils/firebase";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { serverUrl } from "../App";
// // import { useDispatch } from "react-redux";
// // import { setUserData } from "../redux/userSlice";

// // function Auth() {
// //     const provider = new GoogleAuthProvider();
// //     const navigate = useNavigate();
// //     const dispatch = useDispatch();

// //     const handleGoogleAuth = async () => {
// //         try {
// //             const response = await signInWithPopup(auth, provider);
// //             const user = response.user;
// //             const name = user.displayName;
// //             const email = user.email;

// //             const result = await axios.post(
// //                 serverUrl + "/api/auth/google",
// //                 { name, email },
// //                 { withCredentials: true }
// //             );

// //             dispatch(setUserData(result.data.user)); // ✅ FIXED - store just user object
// //             navigate("/notes");

// //         } catch (error) {
// //             console.log("Google Sign-In failed:", error);
// //         }
// //     }

// //     return (
// //         <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
// //             <motion.header
// //                 initial={{ opacity: 0, y: -15 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 1.5 }}
// //                 className="max-w-7xl mx-auto mt-8
// //                 rounded-2xl
// //                 bg-black/80 backdrop-blur-xl
// //                 border border-white/10
// //                 px-8 py-6
// //                 shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
// //                 <h1 className="text-4xl font-bold bg-linear-to-r from-white via-gray-300 to-white
// //                 bg-clip-text text-transparent">ExamNotes AI</h1>
// //                 <p className="text-lg text-gray-300">AI-powered exam-oriented notes & revision assistant</p>
// //             </motion.header>

// //             <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
// //                 {/* left content */}
// //                 <motion.div
// //                     initial={{ opacity: 0, x: -50 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     transition={{ duration: 1.2 }}
// //                     className="text-center lg:text-left">
// //                     <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
// //                         Unlock Smart AI Notes
// //                     </h2>

// //                     <motion.button
// //                         onClick={handleGoogleAuth}
// //                         whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 0.95 }}
// //                         whileTap={{ scale: 0.97 }}
// //                         transition={{ type: "spring", stiffness: 200, damping: 18 }}
// //                         className="mt-10 px-8 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/90 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:bg-black/90 transition duration-300">
// //                         <FcGoogle />
// //                         Continue with Google
// //                     </motion.button>

// //                     <p className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
// //                         You get <span className="font-semibold">200 FREE credits</span> to create exam notes, project notes, charts, graphs and download clean PDFS - instantly using AI.
// //                     </p>
// //                     <p className="mt-4 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
// //                         Start creating your notes now and experience the power of AI in your studies!
// //                     </p>
// //                 </motion.div>

// //                 {/* right content */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
// //                     <Feature icon="🎁" title="200 FREE Credits" description="Start with 200 FREE credits to generate notes without paying." />
// //                     <Feature icon="📒" title="Exam Notes" description="High-yield, revision-ready exam-oriented notes." />
// //                     <Feature icon="📂" title="Project Notes" description="Well-structured documentation for assignments & projects." />
// //                     <Feature icon="📊" title="Charts & Graphs" description="Generate visual aids like charts and graphs to enhance your notes." />
// //                     <Feature icon="⬇️" title="Clean PDF Downloads" description="Download your generated notes as clean, well-formatted PDFs." />
// //                     <Feature icon="🧠" title="Smart AI Summaries" description="Instantly convert long topics into short, exam-ready summaries for quick revision." />
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }

// // function Feature({ icon, title, description }) {
// //     return (
// //         <motion.div
// //             whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
// //             whileTap={{ scale: 0.97 }}
// //             transition={{ type: "spring", stiffness: 200, damping: 18 }}
// //             className="relative p-6 rounded-xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white"
// //             style={{ transformStyle: "preserve-3d" }}>

// //             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

// //             <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
// //                 <div className="text-4xl mb-3">{icon}</div>
// //                 <h3 className="text-lg font-semibold mb-2">{title}</h3>
// //                 <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
// //             </div>
// //         </motion.div>
// //     )
// // }

// // export default Auth;

// import React from "react";
// import { motion } from "motion/react"
// import { FcGoogle } from "react-icons/fc";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { serverUrl } from "../App";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";
// import logo from "../assets/ExamNotes_logo.png";

// function Auth() {
//     const provider = new GoogleAuthProvider();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleGoogleAuth = async () => {
//         try {
//             const response = await signInWithPopup(auth, provider);
//             const user = response.user;
//             const name = user.displayName;
//             const email = user.email;

//             const result = await axios.post(
//                 serverUrl + "/api/auth/google",
//                 { name, email },
//                 { withCredentials: true }
//             );

//             dispatch(setUserData(result.data.user));
//             navigate("/notes");

//         } catch (error) {
//             console.log("Google Sign-In failed:", error);
//         }
//     }

//     return (
//         <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
//             <motion.header
//                 initial={{ opacity: 0, y: -15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1.5 }}
//                 className="max-w-7xl mx-auto mt-8
//                 rounded-2xl
//                 bg-black/80 backdrop-blur-xl
//                 border border-white/10
//                 px-8 py-6
//                 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
//                 flex items-center gap-3">

//                 <img src={logo} alt="ExamNotes logo" className="w-10 h-10" />

//                 <div>
//                     <h1 className="text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white
//                     bg-clip-text text-transparent">ExamNotes AI</h1>
//                     <p className="text-sm text-gray-300">AI-powered exam-oriented notes & revision assistant</p>
//                 </div>
//             </motion.header>

//             <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//                 <motion.div
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 1.2 }}
//                     className="text-center lg:text-left">
//                     <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
//                         Unlock Smart AI Notes
//                     </h2>

//                     <motion.button
//                         onClick={handleGoogleAuth}
//                         whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 0.95 }}
//                         whileTap={{ scale: 0.97 }}
//                         transition={{ type: "spring", stiffness: 200, damping: 18 }}
//                         className="mt-10 px-8 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/90 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:bg-black/90 transition duration-300">
//                         <FcGoogle />
//                         Continue with Google
//                     </motion.button>

//                     <p className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
//                         You get <span className="font-semibold">200 FREE credits</span> to create exam notes, project notes, charts, graphs and download clean PDFS - instantly using AI.
//                     </p>
//                     <p className="mt-4 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
//                         Start creating your notes now and experience the power of AI in your studies!
//                     </p>
//                 </motion.div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                     <Feature icon="🎁" title="200 FREE Credits" description="Start with 200 FREE credits to generate notes without paying." />
//                     <Feature icon="📒" title="Exam Notes" description="High-yield, revision-ready exam-oriented notes." />
//                     <Feature icon="📂" title="Project Notes" description="Well-structured documentation for assignments & projects." />
//                     <Feature icon="📊" title="Charts & Graphs" description="Generate visual aids like charts and graphs to enhance your notes." />
//                     <Feature icon="⬇️" title="Clean PDF Downloads" description="Download your generated notes as clean, well-formatted PDFs." />
//                     <Feature icon="🧠" title="Smart AI Summaries" description="Instantly convert long topics into short, exam-ready summaries for quick revision." />
//                 </div>
//             </main>
//         </div>
//     );
// }

// function Feature({ icon, title, description }) {
//     return (
//         <motion.div
//             whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
//             whileTap={{ scale: 0.97 }}
//             transition={{ type: "spring", stiffness: 200, damping: 18 }}
//             className="relative p-6 rounded-xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white"
//             style={{ transformStyle: "preserve-3d" }}>

//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

//             <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
//                 <div className="text-4xl mb-3">{icon}</div>
//                 <h3 className="text-lg font-semibold mb-2">{title}</h3>
//                 <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
//             </div>
//         </motion.div>
//     )
// }

// export default Auth;


import React from "react";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import logo from "../assets/NotmonAI_logo.svg";

function Auth() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const result = await axios.post(serverUrl + "/api/auth/google",
                { name: user.displayName, email: user.email },
                { withCredentials: true }
            );
            dispatch(setUserData(result.data.user));
            navigate("/notes");
        } catch (error) {
            console.log("Google Sign-In failed:", error);
        }
    }

    return (
        <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
            <motion.header
                initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}
                className="max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-xl
                border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
                flex items-center gap-3">
                <img src={logo} alt="Notmon AI" className="w-20 h-20" />
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-wide">Notmon <span className="text-gray-400">AI</span></h1>
                    <p className="text-sm text-gray-300">AI-powered exam-oriented notes & revision assistant</p>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}
                    className="text-center lg:text-left">
                    <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
                        Unlock Smart AI Notes
                    </h2>
                    <motion.button onClick={handleGoogleAuth}
                        whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 0.95 }} whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className="mt-10 px-8 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/90 to-black/90
                        border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:bg-black/90 transition duration-300">
                        <FcGoogle />
                        Continue with Google
                    </motion.button>
                    <p className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
                        You get <span className="font-semibold">200 FREE credits</span> to create exam notes, project notes, charts, graphs and download clean PDFs.
                    </p>
                     <p className="mt-4 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
                        Start creating your notes now and experience the power of AI in your studies!                 </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Feature icon="🎁" title="200 FREE Credits" description="Start with 200 FREE credits to generate notes without paying." />
                    <Feature icon="📒" title="Exam Notes" description="High-yield, revision-ready exam-oriented notes." />
                    <Feature icon="📂" title="Project Notes" description="Well-structured documentation for assignments & projects." />
                    <Feature icon="📊" title="Charts & Graphs" description="Generate visual aids like charts and graphs." />
                    <Feature icon="⬇️" title="Clean PDF Downloads" description="Download your generated notes as clean, well-formatted PDFs." />
                    <Feature icon="🧠" title="Smart AI Summaries" description="Instantly convert long topics into short, exam-ready summaries." />
                </div>
            </main>
        </div>
    );
}

function Feature({ icon, title, description }) {
    return (
        <motion.div whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }} whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative p-6 rounded-xl bg-gradient-to-br from-black/90 via-black/80 to-black/90
            backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white"
            style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    )
}

export default Auth;