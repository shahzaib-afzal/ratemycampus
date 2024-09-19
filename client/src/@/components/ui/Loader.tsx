import { motion } from "framer-motion";

export const Loader = ({
  size = 24,
  color1 = "#007BFF",
  color2 = "#FF33CC",
}: {
  size?: number;
  color1?: string;
  color2?: string;
}) => (
  <motion.div
    className={`relative mx-auto`}
    style={{ width: `${size}px`, height: `${size}px` }}
    animate={{ rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  >
    <motion.div
      className="absolute inset-0 rounded-full border-t-4"
      style={{ borderColor: color1 }}
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-0 rounded-full border-r-4"
      style={{ borderColor: color2 }}
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);
