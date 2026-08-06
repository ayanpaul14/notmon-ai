import React from "react";
import { motion } from "motion/react";
import logo from "../assets/NotmonAI_logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";

const socials = [
  {
    name: "Instagram",
    handle: "__.shershaah.__",
    url: "https://www.instagram.com/__.shershaah.__/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "hover:text-pink-400",
  },
  {
    name: "GitHub",
    handle: "ayanpaul14",
    url: "https://github.com/ayanpaul14",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "hover:text-gray-300",
  },
  {
    name: "LinkedIn",
    handle: "Ayan Paul",
    url: "https://www.linkedin.com/in/ayan-paul-0b63a2336/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:text-blue-400",
  },
];

function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="z-10 mx-3 sm:mx-6 mb-4 sm:mb-6 mt-16 sm:mt-24 rounded-2xl
      bg-gradient-to-br from-black/90 via-black/80 to-black/90
      backdrop-blur-2xl border border-white/10 px-5 sm:px-8 py-6 sm:py-8
      shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-start">

        {/* BRAND — full width on mobile */}
        <div className="col-span-2 md:col-span-1">
          <motion.div
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="flex flex-col gap-4 transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={logo} alt="Notmon AI" className="h-8 w-8 sm:h-9 sm:w-9 object-contain" />
              <span className="font-semibold text-white">Notmon <span className="text-gray-400">AI</span></span>
            </div>
            <p className="text-sm text-gray-300 max-w-sm">
              Notmon AI helps students generate exam-focused notes, revision material, diagrams, and printable PDFs using AI.
            </p>
            <div className="mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-500 mb-1">Made with ❤️ by</p>
              <p className="text-white font-semibold text-sm">Ayan Paul</p>
            </div>
          </motion.div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 sm:mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={() => navigate("/notes")} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Notes</li>
            <li onClick={() => navigate("/history")} className="text-gray-300 hover:text-white transition-colors cursor-pointer">History</li>
            <li onClick={() => navigate("/pricing")} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Add Credits</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 sm:mb-4">Support & Account</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={() => navigate("/auth")} className="text-gray-300 hover:text-white transition-colors cursor-pointer">Sign In</li>
            <li onClick={handleSignOut} className="text-red-400 hover:text-red-300 transition-colors cursor-pointer">Sign Out</li>
            <li className="text-gray-300 text-xs">support@notmon.ai</li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 sm:mb-4">Follow Me</h3>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-gray-400 ${s.color} transition-colors group`}>
                  <span className="group-hover:scale-110 transition-transform">{s.icon}</span>
                  <span className="text-sm">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="my-5 sm:my-6 h-px bg-white/10" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Notmon AI. All rights reserved.</p>
        <p className="text-xs text-gray-600">Built by <span className="text-gray-400 font-medium">Ayan Paul</span></p>
      </div>
    </motion.footer>
  );
}

export default Footer;