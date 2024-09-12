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
import { TextGenerateEffect } from "@/@/components/ui/text-generate-effect";

export default function LandingPage() {
  return (
    <div className="bg-[#050520] font-sans text-white">
      <Navbar></Navbar>
      {/* Hero Section */}
      <BackgroundLines className="relative flex justify-center overflow-hidden pb-16 pt-16 sm:h-[60vh]">
        <div className="container relative z-10 mx-auto px-4">
          {/* Journey Announcement */}
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-purple-500/30 px-4 text-sm text-purple-200 shadow-lg">
              Your Campus Journey Starts Here
            </span>
          </div>

          <main className="text-center">
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-7xl">
              <TextGenerateEffect
                words="Discover, Review, and Elevate"
                className="mb-4 text-5xl font-bold leading-tight sm:text-7xl"
                gradientClassName="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500"
              />
              <br />
              <span className="text-white">Your University Experience!</span>
            </h1>

            <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-xl">
              Uncover student insights, rate your campus, and find the best fit
              for your future!
            </p>
          </main>
        </div>
      </BackgroundLines>

      {/* Dashboard Preview and Features Section */}
      <div className="bg-[#050520] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-lg font-bold sm:text-3xl">
              Everything you need - all in one platform.
            </h2>
            <p className="text-sm text-gray-400 sm:text-xl">
              From campus exploration to decision-making - navigate your
              university journey seamlessly.
            </p>
          </div>

          {/* Dashboard Preview */}
          {/* Removed Image component */}

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-[#1A1B26] p-6">
              <Search className="mb-4 h-10 w-10 text-purple-400" />
              <h3 className="mb-2 text-xl font-semibold">Campus Explorer</h3>
              <p className="text-gray-400">
                Search and compare universities based on real student reviews
                and ratings.
              </p>
            </div>
            <div className="rounded-lg bg-[#1A1B26] p-6">
              <Star className="mb-4 h-10 w-10 text-yellow-400" />
              <h3 className="mb-2 text-xl font-semibold">Review &amp; Rate</h3>
              <p className="text-gray-400">
                Share your campus experience and help others make informed
                decisions.
              </p>
            </div>
            <div className="rounded-lg bg-[#1A1B26] p-6">
              <Users className="mb-4 h-10 w-10 text-green-400" />
              <h3 className="mb-2 text-xl font-semibold">Community Forum</h3>
              <p className="text-gray-400">
                Connect with fellow students, ask questions, and share insights.
              </p>
            </div>
            <div className="rounded-lg bg-[#1A1B26] p-6">
              <BarChart2 className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="mb-2 text-xl font-semibold">Data Insights</h3>
              <p className="text-gray-400">
                Access detailed analytics and trends about universities and
                campus life.
              </p>
            </div>
            <div className="rounded-lg bg-[#1A1B26] p-6">
              <MessageSquare className="mb-4 h-10 w-10 text-pink-400" />
              <h3 className="mb-2 text-xl font-semibold">Q&amp;A Platform</h3>
              <p className="text-gray-400">
                Get your university-related questions answered by current
                students and alumni.
              </p>
            </div>
            <div className="rounded-lg bg-[#1A1B26] p-6">
              <Award className="mb-4 h-10 w-10 text-orange-400" />
              <h3 className="mb-2 text-xl font-semibold">
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
      <footer className="border-t border-gray-800 bg-[#050520] py-8">
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
