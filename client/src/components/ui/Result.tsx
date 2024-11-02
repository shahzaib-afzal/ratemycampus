import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultProps {
  success: boolean;
  headlineSuccess?: string;
  headlineError?: string;
  successMessage?: string;
  failureMessage?: string;
}

export const Result = ({
  success,
  headlineSuccess = "Email Verified!",
  headlineError = "Verification Failed",
  successMessage = "Your email has been successfully verified. Welcome to RateMyCampus!",
  failureMessage = "We encountered an issue verifying your email. Please try again or contact support.",
}: ResultProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`flex flex-col items-center rounded-lg p-8 ${
      success ? "bg-green-500 bg-opacity-20" : "bg-red-500 bg-opacity-20"
    } text-white`}
  >
    {success ? (
      <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
    ) : (
      <XCircle className="mb-4 h-16 w-16 text-red-500" />
    )}
    <h2 className="mb-2 text-center text-2xl font-bold">
      {success ? headlineSuccess : headlineError}
    </h2>
    <p className="text-center text-sm md:text-base">
      {success ? successMessage : failureMessage}
    </p>
  </motion.div>
);
