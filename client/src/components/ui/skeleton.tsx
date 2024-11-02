import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export const PulseSkeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-full w-full rounded bg-gray-300 dark:bg-gray-700"></div>
  </div>
);

export const PostSkeleton = () => (
  <Card className="mb-6 border-none bg-white/5 shadow-lg backdrop-blur-sm">
    <CardContent className="p-6">
      <div className="mb-4 flex items-center space-x-4">
        <PulseSkeleton className="h-12 w-12 rounded-full" />
        <PulseSkeleton className="h-4 w-1/4" />
      </div>
      <PulseSkeleton className="mb-2 h-4 w-full" />
      <PulseSkeleton className="mb-2 h-4 w-3/4" />
      <PulseSkeleton className="mb-4 h-40 w-full" />
      <PulseSkeleton className="h-8 w-1/4" />
    </CardContent>
  </Card>
);

export const CommentSkeleton = () => (
  <div className="mb-2 w-full rounded-lg bg-white/10 p-3">
    <PulseSkeleton className="mb-2 h-4 w-1/4" />
    <PulseSkeleton className="h-4 w-full" />
  </div>
);
