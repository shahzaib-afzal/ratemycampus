import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export const Result = ({ success }: { success: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`flex flex-col items-center rounded-lg p-8 ${
      success ? "bg-green-500 bg-opacity-20" : "bg-red-500 bg-opacity-20"
    }`}
  >
    {success ? (
      <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
    ) : (
      <XCircle className="mb-4 h-16 w-16 text-red-500" />
    )}
    <h2 className="mb-2 text-center text-2xl font-bold">
      {success ? "Email Verified!" : "Verification Failed"}
    </h2>
    <p className="text-center text-sm md:text-base">
      {success
        ? "Your email has been successfully verified. Welcome to RateMyCampus!"
        : "We encountered an issue verifying your email. Please try again or contact support."}
    </p>
  </motion.div>
);
