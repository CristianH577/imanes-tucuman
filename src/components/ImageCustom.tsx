import { useRef, useState } from "react";
import { useInView, m } from "framer-motion";

import { Skeleton } from "@mui/material";

import UnknowImg from "../assets/unknow-img.webp";

const MotionSkeleton = m.create(Skeleton);

interface IntfProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  classes?: { wrapper: string };
  propsWrapper?: Record<string, string>;
}

export default function ImageCustom({
  src = UnknowImg,
  alt = "Imagen desconocida",
  className,
  width = 100,
  height = 100,
  classes,
  propsWrapper,
  ...props
}: IntfProps) {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      data-slot="img-wrapper"
      className={"relative" + (classes?.wrapper ? " " + classes.wrapper : "")}
      {...propsWrapper}
    >
      <MotionSkeleton
        variant="rounded"
        className="w-full h-full absolute inset-0"
        initial={{ opacity: 1 }}
        animate={isInView && load && { opacity: 0, display: "none" }}
      />

      <m.img
        src={src}
        width={width}
        height={height}
        loading="lazy"
        alt={alt}
        className={className ? " " + className : ""}
        initial={{ opacity: 0 }}
        animate={isInView && load && { opacity: 1 }}
        onLoad={() => setLoad(true)}
        {...props}
      />
    </div>
  );
}
