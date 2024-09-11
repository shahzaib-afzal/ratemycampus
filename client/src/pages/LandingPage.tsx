import {
  Star,
  Users,
  MessageSquare,
  Search,
  BarChart2,
  Award,
} from "lucide-react";
import Navbar from "../@/components/ui/Navbar";
import { BackgroundLines } from "../@/components/ui/background-lines";

export default function LandingPage() {
  return (
    <div className="bg-[#050520] text-white font-sans">
      <Navbar></Navbar>
      {/* Hero Section */}
      <BackgroundLines>
        <div className="min-h-screen flex flex-row justify-center relative overflow-hidden pt-16">
          <div className="container mx-auto px-4 py-8 relative z-10">
            {/* Journey Announcement */}
            <div className="text-center mb-12">
              <span className="inline-block bg-purple-500/30 text-purple-200 text-sm py-1 px-4 rounded-full shadow-lg">
                Your Campus Journey Starts Here
              </span>
            </div>

            <main className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500">
                  Discover, Review, and Elevate
                </span>{" "}
                <br />
                <span className="text-white">Your University Experience!</span>
              </h1>

              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Uncover student insights, rate your campus, and find the best
                fit for your future!
              </p>
            </main>
          </div>
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/2 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
      </BackgroundLines>

      {/* Dashboard Preview and Features Section */}
      <div className="py-20 bg-[#0D0E17]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need - all in one platform.
            </h2>
            <p className="text-xl text-gray-400">
              From campus exploration to decision-making - navigate your
              university journey seamlessly.
            </p>
          </div>

          {/* Dashboard Preview */}
          {/* Removed Image component */}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-[#1A1B26] rounded-lg">
              <Search className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Campus Explorer</h3>
              <p className="text-gray-400">
                Search and compare universities based on real student reviews
                and ratings.
              </p>
            </div>
            <div className="p-6 bg-[#1A1B26] rounded-lg">
              <Star className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Review &amp; Rate</h3>
              <p className="text-gray-400">
                Share your campus experience and help others make informed
                decisions.
              </p>
            </div>
            <div className="p-6 bg-[#1A1B26] rounded-lg">
              <Users className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Forum</h3>
              <p className="text-gray-400">
                Connect with fellow students, ask questions, and share insights.
              </p>
            </div>
            <div className="p-6 bg-[#1A1B26] rounded-lg">
              <BarChart2 className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Data Insights</h3>
              <p className="text-gray-400">
                Access detailed analytics and trends about universities and
                campus life.
              </p>
            </div>
            <div className="p-6 bg-[#1A1B26] rounded-lg">
              <MessageSquare className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Q&amp;A Platform</h3>
              <p className="text-gray-400">
                Get your university-related questions answered by current
                students and alumni.
              </p>
            </div>
            <div className="p-6 bg-[#1A1B26] rounded-lg">
              <Award className="w-10 h-10 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                University Rankings
              </h3>
              <p className="text-gray-400">
                Explore crowd-sourced rankings based on various factors and
                student experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A0B14] py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} RateMyCampus. All rights reserved.
          </p>
          <nav className="mt-4">{/* Removed Link components */}</nav>
        </div>
      </footer>
    </div>
  );
}
