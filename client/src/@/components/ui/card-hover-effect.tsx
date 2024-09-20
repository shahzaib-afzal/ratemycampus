import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useState } from "react";

export const HoverEffect = ({
  features,
  className,
}: {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {features.map((feature, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative block h-full w-full p-2"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-[#192230] dark:bg-slate-800/[0.8]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.1 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1, delay: 0 },
                }}
              />
            )}
          </AnimatePresence>

          <Card className="border border-[#334155]">
            <div className="mb-2 h-10 w-10">{feature.icon}</div>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-[#050520] p-4 group-hover:border-slate-700 dark:border-white/[0.2]",
        className,
      )}
    >
      <div>{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("text-xl font-semibold text-white", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <p className={cn("mt-2 text-gray-400", className)}>{children}</p>;
};
