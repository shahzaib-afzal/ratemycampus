import { useState } from "react";
import {
  ChevronDown,
  LogOut,
  Settings,
  Plus,
  Search,
  Star,
  MapPin,
  Book,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../@/components/ui/avatar";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";

const universities = [
  {
    name: "National University of Science and Technology (NUST)",
    location: "Islamabad, PK",
    rating: 4.6,
    topFields: ["Computer Science", "Engineering"],
    status: "Public",
    fee: "PKR 171,350",
    image: "https://cdn.ratemycampus.live/uni-cover/cover1",
  },
  {
    name: "National University of Computer and Emerging Sciences (FAST NUCES)",
    location: "Islamabad, PK",
    rating: 4.5,
    topFields: ["Computer Science"],
    status: "Private",
    fee: "PKR 166,250",
    image: "https://cdn.ratemycampus.live/uni-cover/cover2",
  },
  {
    name: "MIT",
    location: "Cambridge, MA",
    rating: 4.9,
    topFields: ["Engineering", "Technology", "Sciences"],
    status: "Private",
    fee: "$53,790",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "University of California, Berkeley",
    location: "Berkeley, CA",
    rating: 4.7,
    topFields: ["Computer Science", "Engineering", "Business"],
    status: "Public",
    fee: "$14,312",
    image:
      "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "University of Oxford",
    location: "Oxford, UK",
    rating: 4.8,
    topFields: ["Arts and Humanities", "Social Sciences", "Medicine"],
    status: "Public",
    fee: "£9,250",
    image:
      "https://images.unsplash.com/photo-1580492516014-4a28623f4fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
];

export function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050520] to-[#2a1b3d] text-white">
      <nav className="sticky top-0 z-10 border-b border-purple-900/50 bg-[#050520]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                RateMyCampus
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="hidden transform bg-gradient-to-r from-purple-600 to-pink-600 text-white transition duration-300 ease-in-out hover:scale-105 hover:from-purple-700 hover:to-pink-700 sm:flex">
                <Plus className="mr-2 h-4 w-4" />
                Add University
              </Button>
              <div className="relative">
                <Button
                  className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Shahzaib"
                    />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <span className="ml-3 hidden font-medium sm:inline">
                    Shahzaib
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      className="hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Settings className="mr-2 inline h-4 w-4" />
                      Edit Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <LogOut className="mr-2 inline h-4 w-4" />
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <h2 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Discover Universities
            </h2>
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-purple-300" />
                <Input
                  type="text"
                  placeholder="Search universities..."
                  className="w-full rounded-full border border-purple-500/50 bg-white/10 py-2 pl-10 pr-4 transition duration-300 focus:border-purple-500 focus:outline-none sm:w-64"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 sm:hidden">
            <Button className="w-full transform bg-gradient-to-r from-purple-600 to-pink-600 text-white transition duration-300 ease-in-out hover:scale-105 hover:from-purple-700 hover:to-pink-700">
              <Plus className="mr-2 h-4 w-4" />
              Add University
            </Button>
          </div>
          <div className="space-y-6">
            {universities.map((university, index) => (
              <div
                key={index}
                className="transform overflow-hidden rounded-xl bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="sm:flex">
                  <div className="sm:flex-shrink-0">
                    <Avatar className="h-48 w-full rounded-none sm:w-48">
                      <AvatarImage
                        src={university.image}
                        alt={university.name}
                        className="h-full w-full object-cover"
                      />
                      <AvatarFallback className="text-2xl">
                        {university.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-full p-8">
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                      <div>
                        <a
                          href="#"
                          className="mt-1 block text-lg font-semibold leading-tight text-white hover:underline"
                        >
                          {university.name}
                        </a>
                        <p className="mt-2 flex items-center text-purple-300">
                          <MapPin className="mr-1 h-4 w-4" />{" "}
                          {university.location}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center rounded-full bg-purple-900/50 px-2 py-1 sm:mt-0">
                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-semibold">
                          {university.rating}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-purple-200">
                      Status: {university.status}
                    </p>
                    <p className="text-purple-200">Fee: {university.fee}</p>
                    <div className="mt-4">
                      <span className="mb-2 flex items-center text-sm text-purple-300">
                        <Book className="mr-1 h-4 w-4" /> Top Fields:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {university.topFields.map((field, i) => (
                          <span
                            key={i}
                            className="inline-block rounded-full bg-purple-900/50 px-3 py-1 text-sm font-semibold text-purple-200"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
