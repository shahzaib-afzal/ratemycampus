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
import { HoverEffect } from "@/@/components/ui/card-hover-effect";
import { ContainerScroll } from "@/@/components/ui/container-scroll-animation";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Search className="text-purple-400" />,
    title: "Campus Explorer",
    description:
      "Search and compare universities based on real student reviews and ratings.",
  },
  {
    icon: <Star className="text-yellow-400" />,
    title: "Review & Rate",
    description:
      "Share your campus experience and help others make informed decisions.",
  },
  {
    icon: <Users className="text-green-400" />,
    title: "Community Forum",
    description:
      "Connect with fellow students, ask questions, and share insights.",
  },
  {
    icon: <BarChart2 className="text-blue-400" />,
    title: "Data Insights",
    description:
      "Access detailed analytics and trends about universities and campus life.",
  },
  {
    icon: <MessageSquare className="text-pink-400" />,
    title: "Q&A Platform",
    description:
      "Get your university-related questions answered by current students and alumni.",
  },
  {
    icon: <Award className="text-orange-400" />,
    title: "University Rankings",
    description:
      "Explore crowd-sourced rankings based on various factors and student experiences.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-[#050520] font-sans text-white">
      <Navbar></Navbar>
      {/* Hero Section */}
      <BackgroundLines className="relative flex justify-center overflow-hidden pb-16 pt-16 sm:h-[60vh]">
        <div className="container relative z-10 mx-auto px-4 pt-6">
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

      {/* Dashboard Preview */}
      <div className="relative z-0 mt-28 sm:-mt-24">
        <ContainerScroll
          titleComponent={
            <>
              <span className="mt-2 block bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text pb-4 text-2xl font-bold leading-tight text-transparent sm:text-4xl">
                Unlock All Your University Insights Effortlessly{" "}
              </span>
            </>
          }
        >
          {/* Desktop Image */}
          <img
            src="https://cdn.ratemycampus.live/desktop.jpg"
            alt="RateMyCampus's Dashboard"
            height={720}
            width={1400}
            className="mx-auto hidden h-full w-full rounded-2xl object-contain sm:block"
            draggable={false}
          />
          {/* Mobile Image */}
          <img
            src="https://cdn.ratemycampus.live/mobile%20(2).jpg"
            alt="RateMyCampus's Dashboard"
            height={720}
            width={1400}
            className="mx-auto block h-full w-full rounded-2xl object-cover sm:hidden"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      {/* Features Section */}
      <div className="bg-[#050520] py-20" id="features">
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

          {/* Features Grid */}
          <HoverEffect features={features}></HoverEffect>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#050520] py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p className="pb-1 text-sm text-white sm:text-base">
            &copy; {new Date().getFullYear()} RateMyCampus <br />{" "}
          </p>
          <span className="text-sm text-white sm:text-base">
            Developed with ❤️ by{" "}
            <Link to={"/about"}>
              <a className="font-bold">Shahzaib</a>
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
