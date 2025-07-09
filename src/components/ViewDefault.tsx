import { useRef } from "react";
import { useInView, motion } from "framer-motion";

import TitleCustom from "./TitleCustom";

export default function ViewDefault({
  children = <></>,
  disabledInView = false,
  // id = "",
  className = "",
  title = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });
  const isInView_ = disabledInView ? true : isInView;

  return (
    <motion.div
      // id={id || undefined}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full min-h-screen max-w-[1200px] flex flex-col items-center gap-6 place-self-center pt-${
        className ? " " + className : ""
      }`}
    >
      {isInView_ && title && <TitleCustom title={title} />}

      {isInView_ && children}
    </motion.div>
  );
}
