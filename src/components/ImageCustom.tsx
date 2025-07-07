import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { Skeleton } from "@mui/material";

import UnknowImg from "../assets/layout/unknow-img.webp";

const MotionSkeleton = motion.create(Skeleton);

export default function ImageCustom({
  src = UnknowImg,
  alt = "Imagen desconocida",
  className = "",
  width = 100,
  height = 100,
  classes = { wrapper: "" },
  propsWrapper = {},
  ...props
}) {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={"relative" + (classes.wrapper ? " " + classes.wrapper : "")}
      {...propsWrapper}
    >
      <MotionSkeleton
        variant="rounded"
        className="w-full h-full absolute inset-0"
        initial={{ opacity: 1 }}
        animate={isInView && load && { opacity: 0, display: "none" }}
      />

      <motion.img
        src={src}
        width={width}
        height={height}
        loading="lazy"
        alt={alt}
        className={"w-full" + (className ? " " + className : "")}
        initial={{ opacity: 0 }}
        animate={isInView && load && { opacity: 1 }}
        onLoad={() => setLoad(true)}
        {...props}
      />
    </div>
  );
}
