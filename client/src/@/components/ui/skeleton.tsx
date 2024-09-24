import { cn } from "../../lib/utils";

function Skeleton({
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

export { Skeleton };
