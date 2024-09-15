import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";

export function Notification({
  message,
  time,
  status,
}: {
  message: string;
  time: number;
  status: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, time);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="animate-slide-up fixed bottom-4 right-4 w-80 overflow-hidden rounded-lg bg-gradient-to-r from-[#050520] to-[#0a0a40] p-1 shadow-lg">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative flex items-start">
          <Bell className="mr-4 h-6 w-6 text-purple-400" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{status}</h3>
            <p className="mt-1 text-sm text-gray-300">{message}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Close notification"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
