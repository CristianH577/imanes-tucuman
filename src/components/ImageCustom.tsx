import { useRef } from "react";
import { useInView } from "framer-motion";

import UnknowImg from "../assets/layout/unknow-img.webp";

interface TypeImageCustomProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  // style?: { [key: string]: string };
}
export default function ImageCustom({
  src = "",
  alt = "Imagen desconocida",
  className = undefined,
  width = 150,
  height = 150,
  ...props
}: TypeImageCustomProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    //@ts-ignore
    threshold: 0.3,
    once: true,
  });

  return (
    <img
      ref={ref}
      src={isInView && src ? src : UnknowImg}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      width={width}
      height={height}
      {...props}
    />
  );
}
