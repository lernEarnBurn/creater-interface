import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageAnimationProps = {
  children: ReactNode;
};

const animations = {
  initial: { scale: 1 },
  animate: { scale: 1.07 },
  exit: { scale: 1, y: 81.9, x: -8 },
};

export const PageAnimation = ({ children }: PageAnimationProps) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, type: "tween", ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
