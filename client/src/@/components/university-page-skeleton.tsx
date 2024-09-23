import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  MapPin,
  Building,
  DollarSign,
  Image,
  Send,
  MessageCircle,
  Star,
} from "lucide-react";

const PulseSkeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-full w-full rounded bg-gray-300 dark:bg-gray-700"></div>
  </div>
);

export function UniversityPageSkeleton() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050520] font-sans text-white">
      <div className="relative h-72 overflow-hidden pb-10 sm:h-96 sm:pb-20">
        <PulseSkeleton className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050520] via-[#050520]/70 to-transparent" />
        <div className="absolute left-0 right-0 top-36 flex flex-col items-start justify-between p-1 sm:bottom-0 sm:top-auto sm:flex-row sm:items-end sm:p-10">
          <div className="mb-4 flex items-center sm:mb-0">
            <PulseSkeleton className="h-28 w-28 rounded-full sm:h-32 sm:w-32" />
            <div className="ml-4 sm:max-w-5xl">
              <PulseSkeleton className="h-8 w-64 sm:w-96" />
              <div className="mt-2 flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-gray-300" />
                <PulseSkeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="hidden items-center space-x-2 rounded-lg bg-white/10 p-3 shadow-lg backdrop-blur-sm sm:flex">
            <PulseSkeleton className="h-8 w-16" />
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-gray-400" />
              ))}
            </div>
            <PulseSkeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-none bg-white/5 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between">
              <div className="mb-4 flex items-center space-x-6 sm:mb-0">
                <div className="flex items-center rounded-lg bg-white/10 p-3 shadow-sm">
                  <Building className="mr-2 h-5 w-5 text-gray-300" />
                  <PulseSkeleton className="h-5 w-24" />
                </div>
                <div className="flex items-center rounded-lg bg-white/10 px-1 py-3 shadow-sm">
                  <DollarSign className="mr-1 h-5 w-5 text-gray-300" />
                  <PulseSkeleton className="h-5 w-32" />
                </div>
              </div>
              <div className="flex w-full flex-col space-y-4 sm:w-auto sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-300">
                    Your Rating:
                  </span>
                  <div className="ml-4 flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 text-gray-400" />
                    ))}
                  </div>
                </div>
                <Button disabled className="w-full sm:w-auto">
                  Submit Rating
                </Button>
              </div>
            </div>
            <PulseSkeleton className="mb-4 h-24 w-full" />
            <div className="flex items-center justify-between">
              <Button variant="outline" disabled className="flex items-center">
                <Image className="mr-2 h-4 w-4" /> Add Photo
              </Button>
              <Button disabled className="flex items-center">
                <Send className="mr-2 h-4 w-4" /> Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {[1, 2, 3].map((index) => (
          <Card
            key={index}
            className="mb-6 border-none bg-white/5 shadow-lg backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <PulseSkeleton className="h-10 w-10 rounded-full" />
                  <PulseSkeleton className="ml-3 h-4 w-32" />
                </div>
              </div>
              <PulseSkeleton className="mb-4 h-16 w-full" />
              <Button
                variant="ghost"
                disabled
                className="flex items-center text-gray-400"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                <PulseSkeleton className="h-4 w-24" />
              </Button>
            </CardContent>
          </Card>
        ))}

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            disabled
            className="border-gray-600 bg-transparent text-gray-400"
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
