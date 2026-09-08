import { useRef } from "react";
import { useInView, m } from "framer-motion";

import TitleCustom from "../components/TitleCustom";

export default function ViewDefault({
  children = <></>,
  disabledInView = false,
  id = "",
  className = "",
  title = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });
  const isInView_ = disabledInView ? true : isInView;

  return (
    <m.div
      id={id || undefined}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full max-w-[1200px] h-full min-h-[80dvh] flex flex-col items-center gap-6 place-self-center py-6 ${
        className ? " " + className : ""
      }`}
    >
      {isInView_ && title && <TitleCustom title={title} />}

      {isInView_ && children}
    </m.div>
  );
}
