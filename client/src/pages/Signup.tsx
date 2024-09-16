import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Upload, Lock, Mail, User, X } from "lucide-react";
import { Link } from "react-router-dom";

export function SignupPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setFile(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (file) {
      formData.append("image", file);
    }

    console.log("Form data ready to be sent:", Object.fromEntries(formData));
  };

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
                <User
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b-2 border-gray-400 bg-transparent px-4 py-2 text-white transition-colors focus:border-[#00ffff] focus:outline-none"
                  required
                />
                <Lock
                  className="absolute right-2 top-2 text-gray-400"
                  size={20}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b-2 border-gray-400 bg-transparent px-4 py-2 text-white transition-colors focus:border-[#00ffff] focus:outline-none"
                  required
                />
                <Lock
                  className="absolute right-2 top-2 text-gray-400"
                  size={20}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] py-3 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Sign Up
              </motion.button>
            </form>
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
              <p className="text-gray-300">Show the world who you are!</p>
            </div>
            <div className="relative">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-[#00ffff] bg-gray-700 transition-colors duration-300 hover:border-[#ff00ff]">
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
