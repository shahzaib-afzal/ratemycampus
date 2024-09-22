import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  takeMeTo?: string;
  takeMeButton?: string;
  message?: string;
  description?: string;
}

export default function ErrorPage({
  takeMeTo = "/",
  message = "Oops! Something Went Wrong",
  description = "It looks like we've reached the limit of our free resources for this month 🙁",
  takeMeButton = "Home",
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050520] to-[#2a1b3d] p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8 inline-block"
        >
          <AlertTriangle
            size={120}
            className="drop-shadow-glow text-yellow-400"
          />
        </motion.div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {message}
        </h1>
        <p className="mb-8 text-base leading-normal text-gray-300 sm:text-xl">
          {description}
        </p>
        <Link to={takeMeTo}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-purple-600 px-6 py-3 text-lg font-semibold shadow-lg transition-colors duration-300 hover:bg-purple-700 hover:shadow-xl"
          >
            Take Me {takeMeButton}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
