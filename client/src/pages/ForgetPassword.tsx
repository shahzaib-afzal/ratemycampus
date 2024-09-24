import { useCallback, useState } from "react";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";
import axios from "axios";
import { Result } from "../@/components/ui/Result";
import { Loader } from "../@/components/ui/Loader";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setIsVerified(null);
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
        await axios.post(`${backendUrl}/user/request-password`, {
          email,
        });
        setIsVerified(true);
      } catch (error) {
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    },
    [email],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050520] to-[#2a1b3d] p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -right-1/4 top-1/3 h-1/2 w-1/2 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute -bottom-1/4 left-1/3 h-1/2 w-1/2 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
      </div>
      <div className="relative w-full max-w-md rounded-2xl bg-white bg-opacity-10 p-8 backdrop-blur-lg backdrop-filter md:p-12">
        <h2 className="mb-6 text-4xl font-bold text-white">Reset Password</h2>
        <p className="mb-8 text-blue-200">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader size={48} />
            <p className="mt-4 text-center text-lg text-white">
              Processing your request...
            </p>
          </div>
        ) : isVerified !== null ? (
          <Result
            success={isVerified}
            headlineSuccess="Sent"
            headlineError="Failed"
            successMessage="A reset password link has been sent to your email."
            failureMessage="We encountered an issue sending the reset password link. Please try again or contact support."
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-2 border-blue-300 bg-white bg-opacity-20 py-3 pl-10 pr-4 text-white transition duration-300 focus:border-blue-500 focus:outline-none"
                required
              />
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-blue-300"
                size={20}
              />
            </div>
            <Button
              type="submit"
              className="w-full transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
              Reset Password
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
