import React from "react";
import { motion } from "framer-motion";

function Animations({ animationVariants, children }) {
  const animationBasVersHaut = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeInOut" } },
    exit: { opacity: 0, y: 25, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  const animationGoucheVersDroit = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeInOut" } },
    exit: { opacity: 0, x: -25, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  const selectedAnimationVariants = animationVariants === "goucheVersDroit" ? animationGoucheVersDroit : animationBasVersHaut;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={selectedAnimationVariants}
    >
      {children}
    </motion.div>
  );
}

export default Animations;
