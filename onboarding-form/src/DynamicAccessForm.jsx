// src/DynamicAccessForm.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { handleOnboardingSubmit } from "./onboardingHandlers.js";

// Alias the motion.div component so eslint recognizes it as used
const MotionDiv = motion.div;

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE || "MY-DEV-CODE";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_ID || "G-Z1JFM6M8YR";

export default function DynamicAccessForm() {
  const [codeInput, setCodeInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load GA4
  useEffect(() => {
    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args) => window.dataLayer.push(args);
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID);
    }
  }, []);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleCodeSubmit = e => {
    e.preventDefault();
    if (codeInput.trim() === ACCESS_CODE) setAccessGranted(true);
    else {
      alert("🚫 Incorrect code");
      setCodeInput("");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black min-h-screen overflow-hidden transition-colors">
      {/* Animated Orbs */}
      {[...Array(6)].map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute rounded-full mix-blend-screen pointer-events-none bg-white/30 dark:bg-indigo-600/20"
          style={{
            width: 150 + i * 40,
            height: 150 + i * 40,
            top: `${(i * 25) % 100}vh`,
            left: `${(i * 40 + 10) % 100}vw`,
            filter: "blur(60px)",
          }}
          animate={{ y: [0, -50, 0], x: [0, 50, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full max-w-xl">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-gray-800 backdrop-blur shadow-lg"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              /* Sun Icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-12.728l1.414 1.414M16.95 16.95l1.414 1.414" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-yellow-300" />
              </svg>
            ) : (
              /* Moon Icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 0112.21 3a7 7 0 107.79 9.79z" />
              </svg>
            )}
          </button>

          {/* Card */}
          <MotionDiv
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-8"
          >
            <h1 className="text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400">
              Build Brain Onboarding
            </h1>

            {!accessGranted ? (
              <form onSubmit={handleCodeSubmit} className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="password"
                  value={codeInput}
                  onChange={e => setCodeInput(e.target.value)}
                  placeholder="Enter onboarding code"
                  className="flex-1 p-4 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
                >
                  Unlock
                </button>
              </form>
            ) : (
              <form onSubmit={handleOnboardingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Full Name</label>
                    <input type="text" placeholder="Your Name" className="p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">Email Address</label>
                    <input type="email" placeholder="you@example.com" className="p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none" />
                  </div>
                  <div className="sm:col-span-2 flex flex-col">
                    <label className="mb-1 text-sm font-medium">Role / Department</label>
                    <select className="p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none">
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Support</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col">
                    <label className="mb-1 text-sm font-medium">Start Date</label>
                    <input type="date" className="p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
                >
                  Submit Onboarding
                </button>
              </form>
            )}
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
