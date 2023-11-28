import { motion } from "framer-motion";

type CommentProps = {
  author: string;
  content: string;
};

export function Comment({ author, content }: CommentProps) {
  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.div
      className="py-1 px-2 hover:border rounded-lg w-[27vw]"
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 4, type: "tween", ease: "easeInOut" }}
    >
      <h1 className="text-lg">{author}</h1>
      <h2 className="text-md">{content}</h2>
    </motion.div>
  );
}
