import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../@/components/ui/table";
import { LogOut, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../@/components/ui/avatar";
import { Button } from "../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";

export default function Dashboard() {
  const [universities] = useState([
    {
      id: 1,
      name: "National University of Sciences and Technology (NUST)",
      topField: "Computer Science",
      status: "Public",
      fee: "171,350",
    },
    {
      id: 2,
      name: "National University of Computer and Emerging Sciences (FAST NUCES)",
      topField: "Computer Science",
      status: "Private",
      fee: "166,250",
    },
    {
      id: 3,
      name: "Comsats University Islamabad (CUI)",
      topField: "Computer Science",
      status: "Semi-Govt",
      fee: "133,000",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#050520] px-2 py-6 text-white sm:p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-3xl font-bold text-transparent">
          My Campuses
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 rounded-full pl-2 pr-4"
            >
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                {/* Display S in the avatar circle if image failed to load */}
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Shahzaib</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-[#050520] p-2 py-2 shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-zinc-700">
                <TableHead className="pb-2 text-left text-gray-300">
                  S.No.
                </TableHead>
                <TableHead className="pb-2 text-left text-gray-300">
                  University Name
                </TableHead>
                <TableHead className="pb-2 text-left text-gray-300">
                  Top Field of Study
                </TableHead>
                <TableHead className="pb-2 text-left text-gray-300">
                  Status
                </TableHead>
                <TableHead className="hidden pb-2 text-right text-gray-300 sm:table-cell">
                  Fee (PKR)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universities.map((uni, index) => (
                <TableRow
                  key={uni.id}
                  className="cursor-pointer border-b border-zinc-700 transition-colors hover:bg-[#0a0a40]"
                >
                  <TableCell className="py-4 font-medium sm:text-base">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-4 font-semibold sm:text-lg sm:font-medium">
                    {uni.name}
                  </TableCell>
                  <TableCell className="py-4 sm:text-base">
                    {uni.topField}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${
                        uni.status === "Private"
                          ? "bg-blue-500 text-blue-900"
                          : uni.status === "Public"
                            ? "bg-green-500 text-green-900"
                            : "bg-yellow-500 text-yellow-900"
                      }`}
                    >
                      {uni.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden py-4 text-right sm:table-cell sm:text-base sm:font-medium">
                    {uni.fee}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
