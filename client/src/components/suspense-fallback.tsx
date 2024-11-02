import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SuspenseFallback() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-br from-[#050520] to-[#2a1b3d]">
      <div className="fixed left-0 top-0 h-2 w-full overflow-hidden bg-purple-900/30">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <div className="space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative ml-10 h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-purple-300 border-opacity-20"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-purple-500"></div>
            <div
              className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-pink-500"
              style={{ animationDuration: "1.5s" }}
            ></div>
            <div
              className="absolute inset-4 animate-spin rounded-full border-4 border-transparent border-t-red-500"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Loading...
        </motion.h2>
        <motion.p
          className="text-lg text-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Preparing your content
        </motion.p>
        <motion.div
          className="text-xl font-semibold text-purple-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
    </div>
  );
}
