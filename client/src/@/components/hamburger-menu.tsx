import { useState } from "react";
import { Menu, X } from "lucide-react";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-4 z-50 p-2 transition-opacity"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white hover:opacity-80 active:opacity-60" />
        )}
      </button>

      {isOpen && (
        <div className="fixed right-0 top-0 z-40 mr-4 mt-16 overflow-hidden rounded-lg bg-[#0a0a1e] bg-opacity-95 shadow-lg">
          <nav className="flex flex-col items-start space-y-4 p-4">
            <a
              href="#"
              className="w-full text-lg text-white transition-colors hover:text-purple-400"
            >
              About
            </a>
            <a
              href="#"
              className="w-full text-lg text-white transition-colors hover:text-purple-400"
            >
              Features
            </a>
            <a
              href="#"
              className="w-full text-lg text-white transition-colors hover:text-purple-400"
            >
              Login
            </a>
            <button className="w-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-4 py-2 text-lg font-bold text-white transition-opacity hover:opacity-90">
              Join Now
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
