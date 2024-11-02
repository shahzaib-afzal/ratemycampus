import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { Result } from "@/components/ui/Result";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function EmailVerification() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) throw new Error();
        const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
        const response = await axios.get(
          `${backendUrl}/user/verify-email?token=${token}`,
        );
        setIsVerified(response.status === 200);
      } catch (error) {
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };
    verifyEmail();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050520] to-[#2a1b3d] p-4 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="mb-8 text-center text-4xl font-bold">RateMyCampus</h1>
        <div className="rounded-xl bg-white bg-opacity-10 p-8 shadow-lg backdrop-blur-lg">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader size={48} />
              <p className="mt-4 text-center text-lg">
                Verifying your email...
              </p>
            </div>
          ) : (
            <Result success={isVerified!} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
