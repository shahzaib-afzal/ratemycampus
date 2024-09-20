import { useState, FormEvent, useCallback } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotification } from "@/hooks/useNotification";
import { useLoadingButton } from "@/hooks/useLoadingButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, buttonContent } = useLoadingButton("Log In");
  const { setShowNotification, setNotificationProps, notificationComponent } =
    useNotification();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
        const response = await axios.post(`${backendUrl}/user/login`, {
          email,
          password,
        });
        localStorage.setItem("Authorization", response.data.token);
        setTimeout(() => navigate("/dashboard"), 2000);
        setNotificationProps({
          message: "Login successful! Redirecting to Dashboard...",
          status: "success",
        });
      } catch (error) {
        setNotificationProps({
          message:
            (axios.isAxiosError(error) && error.response?.data?.error) ||
            "Login failed. Please try again.",
          status: "error",
        });
      } finally {
        setLoading(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
      }
    },
    [email, password],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050520] to-[#2a1b3d] p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-2xl">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8"
        >
          <h2 className="mb-6 text-center text-4xl font-bold text-white">
            Welcome Back!
          </h2>
          <p className="mb-8 text-center text-gray-300">
            Log in to your RateMyCampus account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b-2 border-gray-400 bg-transparent px-4 py-2 text-white transition-colors focus:border-[#00ffff] focus:outline-none"
                required
              />
              <Mail
                className="absolute right-2 top-2 text-gray-400"
                size={20}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-gray-400 bg-transparent px-4 py-2 text-white transition-colors focus:border-[#00ffff] focus:outline-none"
                required
                minLength={8}
              />
              <Lock
                className="absolute right-2 top-2 text-gray-400"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-10 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-full bg-gradient-to-r from-[#3a7bd5] to-[#3a6073] py-3 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              disabled={loading}
            >
              {buttonContent}
            </motion.button>
          </form>
          {notificationComponent}
          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-[#00ffff] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p className="mb-1 text-gray-300">Don't have an account?</p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 rounded-full bg-white px-6 py-2 font-bold text-[#2a1b3d] shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
