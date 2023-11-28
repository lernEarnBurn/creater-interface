import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function Alert() {
  return (
    <motion.div
      className="alert text-2xl absolute py-2 px-4 rounded-lg"
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      Saved
    </motion.div>
  );
}
