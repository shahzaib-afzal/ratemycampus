import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check, X } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Result } from "@/components/ui/Result";
import { Loader } from "@/components/ui/Loader";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setIsSuccessful(null);
      try {
        if (!token) throw new Error();
        const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
        await axios.post(`${backendUrl}/user/reset-password?token=${token}`, {
          password,
        });
        setIsSuccessful(true);
      } catch (error) {
        setIsSuccessful(false);
      } finally {
        setIsLoading(false);
      }
    },
    [password],
  );

  const passwordStrength = () => {
    if (
      password.length > 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return "strong";
    } else if (password.length > 6) {
      return "medium";
    } else {
      return "weak";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050520] to-[#2a1b3d] p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -right-1/4 top-1/3 h-1/2 w-1/2 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute -bottom-1/4 left-1/3 h-1/2 w-1/2 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
      </div>
      <div className="relative w-full max-w-md rounded-2xl bg-white bg-opacity-10 p-8 backdrop-blur-lg backdrop-filter md:p-12">
        <h2 className="mb-6 text-4xl font-bold text-white">Set New Password</h2>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader size={48} />
            <p className="mt-4 text-center text-lg text-white">
              Processing your request...
            </p>
          </div>
        ) : isSuccessful !== null ? (
          <Result
            success={isSuccessful}
            headlineSuccess="Success"
            headlineError="Error"
            successMessage="Your password has been changed successfully."
            failureMessage="We encountered an issue changing your password. Please try again or contact support."
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-blue-300 bg-transparent py-3 pl-4 pr-10 text-white placeholder-blue-200 transition duration-300 focus:border-blue-500 focus:outline-none"
                placeholder="New Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-blue-300 transition duration-300 hover:text-blue-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <div className="absolute -bottom-6 left-0 h-1 w-full overflow-hidden rounded-full bg-gray-300">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength() === "weak"
                      ? "w-1/3 bg-red-500"
                      : passwordStrength() === "medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                  }`}
                ></div>
              </div>
            </div>
            <div className="relative mt-8">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-b-2 border-blue-300 bg-transparent py-3 pl-4 pr-10 text-white placeholder-blue-200 transition duration-300 focus:border-blue-500 focus:outline-none"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-blue-300 transition duration-300 hover:text-blue-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {confirmPassword && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 transform">
                  {password === confirmPassword ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <X className="text-red-500" size={20} />
                  )}
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
              disabled={password !== confirmPassword || password.length === 0}
            >
              Set New Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
