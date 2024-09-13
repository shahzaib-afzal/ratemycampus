import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { HamburgerMenu } from "../hamburger-menu";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) featuresSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between bg-[#050520] px-2 py-6 transition-transform duration-300 sm:px-16 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-8 w-8 cursor-pointer" />
        <span className="cursor-pointer text-xl font-bold text-white">
          RateMyCampus
        </span>
      </div>
      <div className="hidden items-center space-x-6 sm:flex">
        <div className="cursor-pointer text-sm font-semibold text-gray-300 transition-colors hover:text-purple-500">
          About
        </div>
        <div
          className="cursor-pointer text-sm font-semibold text-gray-300 transition-colors hover:text-pink-600"
          onClick={scrollToFeatures}
        >
          Features
        </div>
        <div className="cursor-pointer text-sm font-semibold text-gray-300 transition-colors hover:text-orange-500">
          Login
        </div>
        <div className="rounded-md bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-purple-600 hover:to-pink-700">
          Join Now
        </div>
      </div>
      <HamburgerMenu />
    </nav>
  );
}
