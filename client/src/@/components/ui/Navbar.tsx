import { GraduationCap } from "lucide-react";
import { HamburgerMenu } from "../hamburger-menu";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#050520] px-2 py-6 sm:px-16">
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-8 w-8" />
        <span className="text-xl font-bold text-white">RateMyCampus</span>
      </div>
      <div className="hidden items-center space-x-6 sm:flex">
        <div className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-white">
          About
        </div>
        <div className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-white">
          Features
        </div>
        <div className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-white">
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
