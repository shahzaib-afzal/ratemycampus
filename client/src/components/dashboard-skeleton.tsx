import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050520] to-[#2a1b3d] text-white">
      <nav className="sticky top-0 z-10 border-b border-purple-900/50 bg-[#050520]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="h-8 w-40 bg-purple-400/30" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="hidden h-10 w-40 rounded-full bg-purple-600/30 sm:block" />
              <Skeleton className="h-10 w-10 rounded-full bg-gray-800/50" />
              <Skeleton className="hidden h-6 w-20 bg-gray-800/50 sm:block" />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <Skeleton className="h-10 w-64 bg-purple-400/30" />
            <Skeleton className="h-10 w-full rounded-full bg-white/10 sm:w-64" />
          </div>
          <div className="mb-4 sm:hidden">
            <Skeleton className="h-10 w-full rounded-full bg-purple-600/30" />
          </div>
          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl bg-white/5 shadow-lg backdrop-blur-sm"
              >
                <div className="sm:flex">
                  <Skeleton className="h-48 w-full rounded-none bg-purple-300/20 sm:w-48" />
                  <div className="w-full p-8">
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                      <div className="w-full space-y-2 sm:w-2/3">
                        <Skeleton className="h-6 w-full bg-purple-300/30" />
                        <Skeleton className="h-4 w-2/3 bg-purple-300/20" />
                      </div>
                      <Skeleton className="mt-2 h-8 w-16 rounded-full bg-purple-900/50 sm:mt-0" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <Skeleton className="h-4 w-1/2 bg-purple-300/20" />
                      <Skeleton className="h-4 w-1/3 bg-purple-300/20" />
                    </div>
                    <div className="mt-4">
                      <Skeleton className="mb-2 h-4 w-1/4 bg-purple-300/20" />
                      <div className="flex flex-wrap gap-2">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton
                            key={i}
                            className="h-6 w-20 rounded-full bg-purple-900/50"
                          />
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
