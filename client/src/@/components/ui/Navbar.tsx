import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-6 mx-8 bg-[#050520]">
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-8 w-8" />
        <span className="text-xl font-bold text-white">RateMyCampus</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
          About
        </div>
        <div className="cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
          Features
        </div>
        <div className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
          Login
        </div>
        <div className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-md hover:from-purple-600 hover:to-pink-700 transition-colors">
          Join Now
        </div>
      </div>
    </nav>
  );
}
