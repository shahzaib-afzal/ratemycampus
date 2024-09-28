import { useState, FormEvent, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Mail,
  User as UserIcon,
  X,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotification } from "@/hooks/useNotification";
import { useLoadingButton } from "@/hooks/useLoadingButton";
export default function SignupPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, setLoading, buttonContent } = useLoadingButton("Sign Up");
  const navigate = useNavigate();
  const { setShowNotification, setNotificationProps, notificationComponent } =
    useNotification();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const fileSizeInKB = file.size / 1024;

        if (fileSizeInKB > 300) {
          setNotificationProps({
            message: "File size cannot exceed 300KB",
            status: "error",
          });
          setShowNotification(true);
          return;
        }
        setFile(file);
      }
    },
    [],
  );
  const handleRemovePhoto = useCallback(() => {
    setFile(null);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true); // Set loading to true when form is submitted

      if (password !== confirmPassword) {
        setNotificationProps({
          message: "Passwords don't match",
          status: "error",
        });
        setShowNotification(true);
        setLoading(false); // Set loading to false if passwords don't match
        return;
      }
      const formData = new FormData();
      formData.append("fullname", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (file) {
        formData.append("image", file);
      }

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
        await axios.post(`${backendUrl}/user/signup`, formData);
        setTimeout(() => navigate("/login"), 2000);
        setNotificationProps({
          message: "Signup successful! Redirecting to Login page...",
          status: "success",
        });
      } catch (error) {
        setNotificationProps({
          message:
            (axios.isAxiosError(error) && error.response?.data?.message) ||
            "Signup failed. Please try again.",
          status: "error",
        });
      } finally {
        setLoading(false); // Set loading to false after response is received
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1500);
      }
    },
    [password, confirmPassword, fullName, email, file],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050520] to-[#2a1b3d] p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-2xl">
        <div className="md:flex">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-8 md:w-1/2"
          >
            <h2 className="mb-6 text-4xl font-bold text-white">
              Join RateMyCampus
            </h2>
            <p className="mb-8 text-gray-300">
              Discover, rate, and connect with campuses worldwide!
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border-b-2 border-gray-400 bg-transparent px-4 py-2 text-white transition-colors focus:border-[#00ffff] focus:outline-none"
                  required
                />
                <UserIcon
                  className="absolute right-2 top-2 text-gray-400"
                  size={20}
                />
              </div>
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
                {password.length >= 8 ? (
                  <Check
                    className="absolute right-8 top-2 text-green-500"
                    size={20}
                  />
                ) : (
                  <X
                    className="absolute right-8 top-2 text-red-500"
                    size={20}
                  />
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b-2 border-gray-400 bg-transparent px-4 py-2 text-white transition-colors focus:border-[#00ffff] focus:outline-none"
                  required
                  minLength={8}
                />
                {confirmPassword.length >= 8 && password === confirmPassword ? (
                  <Check
                    className="absolute right-8 top-2 text-green-500"
                    size={20}
                  />
                ) : (
                  <X
                    className="absolute right-8 top-2 text-red-500"
                    size={20}
                  />
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>{" "}
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
            <div className="mt-4 text-center">
              <p className="mb-3 text-gray-300">Already have an account?</p>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-white px-6 py-2 font-bold text-[#2a1b3d] shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Log In
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0b2e] to-[#3a1b5d] p-8 md:w-1/2"
          >
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-white">
                Upload Profile Picture
              </h3>
              <p className="text-gray-300">Image size cannot exceed 300KB</p>
            </div>
            <div className="relative">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="z-0 flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-[#00ffff] bg-gray-700 transition-colors duration-300 hover:border-[#ff00ff]">
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Upload className="text-white" size={48} />
                  )}
                </div>
              </label>
              {file && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRemovePhoto}
                  className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                >
                  <X size={20} />
                </motion.button>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
