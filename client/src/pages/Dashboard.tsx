import { useState } from "react";
import {
  ChevronDown,
  LogOut,
  // Settings, (Line 109)
  Plus,
  // Search, (Line 152)
  Star,
  MapPin,
  Book,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../@/components/ui/avatar";
import { Button } from "../@/components/ui/button";
// import { Input } from "../@/components/ui/input"; (Line 152)
import { useRecoilValueLoadable } from "recoil";
import { universitiesSelector } from "@/recoil/selectors/universities-selector";
import { ratingSelector } from "@/recoil/selectors/uni-rating-selector";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { DashboardSkeleton } from "@/@/components/dashboard-skeleton";
import { userSelector } from "@/recoil/selectors/user-selector";
import { Rating, University, User } from "@/types";

export default function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const uniData = useRecoilValueLoadable(universitiesSelector);
  const userData = useRecoilValueLoadable(userSelector);
  const ratingData = useRecoilValueLoadable(ratingSelector);
  const navigate = useNavigate();

  if (
    uniData.state === "hasError" ||
    userData.state === "hasError" ||
    ratingData.state === "hasError"
  ) {
    const error: { status: number; message: string } = uniData.contents;
    if (error.status === 401 || error.status === 403) {
      return (
        <ErrorPage
          takeMeTo="/login"
          takeMeButton="to Login page"
          message="Access Denied!"
          description="You're not authorized to access this page. Please log in to continue."
        ></ErrorPage>
      );
    } else return <ErrorPage />;
  }

  if (
    uniData.state === "loading" ||
    userData.state === "loading" ||
    ratingData.state === "loading"
  ) {
    return <DashboardSkeleton />;
  }
  if (
    uniData.state === "hasValue" &&
    userData.state === "hasValue" &&
    ratingData.state === "hasValue"
  ) {
    const universities: University[] = uniData.contents;
    const user: User = userData.contents;
    const ratings: Rating[] = ratingData.contents;
    const ratingMap = new Map<number, number>(
      ratings.map((rating) => [rating.universityId, rating.averageRating]),
    );
    const sortedUniversities = [...universities].sort((a, b) => {
      const ratingA = ratingMap.get(a.id) || 0;
      const ratingB = ratingMap.get(b.id) || 0;

      return ratingB - ratingA;
    });

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
                {user.email === import.meta.env.VITE_SUPER_USER ? (
                  <Link to={"/add-university"}>
                    <Button className="hidden transform bg-gradient-to-r from-purple-600 to-pink-600 text-white transition duration-300 ease-in-out hover:scale-105 hover:from-purple-700 hover:to-pink-700 sm:flex">
                      <Plus className="mr-2 h-4 w-4" />
                      Add University
                    </Button>
                  </Link>
                ) : null}
                <div className="relative">
                  <Button
                    className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.profilePhoto || undefined}
                        alt={user.fullName}
                      />
                      <AvatarFallback className="text-lg font-bold text-gray-700">
                        {user.fullName.split(" ")[0].charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-3 hidden font-medium sm:inline">
                      {user.fullName.split(" ")[0]}
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
                      {/* Uncomment after adding Edit profile functionality */}

                      {/* <a
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Settings className="mr-2 inline h-4 w-4" />
                      Edit Profile
                    </a> */}

                      <a
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                          localStorage.removeItem("Authorization");
                          navigate("/");
                        }}
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
              {/* Uncomment after Adding Search Functionality */}
              {/* <div className="w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-purple-300" />
                  <Input
                    type="text"
                    placeholder="Search universities..."
                    className="w-full rounded-full border border-purple-500/50 bg-white/10 py-2 pl-10 pr-4 transition duration-300 focus:border-purple-500 focus:outline-none sm:w-64"
                  />
                </div>
              </div> */}
            </div>
            <div className="mb-4 sm:hidden">
              {user.email === import.meta.env.VITE_SUPER_USER ? (
                <Link to={"/add-university"}>
                  <Button className="w-full transform bg-gradient-to-r from-purple-600 to-pink-600 text-white transition duration-300 ease-in-out hover:scale-105 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add University
                  </Button>
                </Link>
              ) : null}
            </div>
            <div className="space-y-6">
              {sortedUniversities.map((university) => (
                <div
                  key={university.id}
                  className="transform overflow-hidden rounded-xl bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className="sm:flex">
                    <div className="sm:flex-shrink-0">
                      <Avatar className="h-48 w-full rounded-none sm:w-48">
                        <AvatarImage
                          src={university.coverPhoto}
                          alt={university.name}
                          className="h-full w-full object-cover"
                        />
                        <AvatarFallback className="text-2xl text-gray-700">
                          {university.name
                            .split("(")[1]
                            .split("")
                            .filter((n: string) => n !== ")")
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="w-full p-8">
                      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                        <div>
                          <Link
                            to={`/university/${university.name
                              .split("(")[1]
                              .split("")
                              .filter((n: string) => n !== ")")
                              .join("")
                              .toLowerCase()}`}
                            className="mt-1 block text-lg font-semibold leading-tight text-white hover:underline"
                          >
                            {university.name}
                          </Link>
                          <p className="mt-2 flex items-center text-purple-300">
                            <MapPin className="mr-1 h-4 w-4" />{" "}
                            {university.mainCampus}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center rounded-full bg-purple-900/50 px-2 py-1 sm:mt-0">
                          <Star className="mr-1 h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-semibold">
                            {ratings.map((rating) => {
                              if (rating.universityId === university.id) {
                                return rating.averageRating;
                              }
                            })}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-purple-200">
                        Status: {university.status}
                      </p>
                      <p className="text-purple-200">
                        Fee: PKR {university.fee}
                      </p>
                      <div className="mt-4">
                        <span className="mb-2 flex items-center text-sm text-purple-300">
                          <Book className="mr-1 h-4 w-4" /> Top Field:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-block rounded-full bg-purple-900/50 px-3 py-1 text-sm font-semibold text-purple-200">
                            {university.topField}
                          </span>
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
}
