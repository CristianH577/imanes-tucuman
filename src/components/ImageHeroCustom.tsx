import { useRef } from "react";
import { useInView } from "framer-motion";

import { Image } from "@heroui/react";

import UnknowImg from "../assets/layout/unknow-img.webp";

interface TypeImageHeroCustomProps {
  src?: string;
  alt: string;
  className?: string;
  classNames?: {
    wrapper: string;
  };
  width?: number;
  srcSet?: string;
}

export default function ImageHeroCustom({
  src,
  alt = "Imagen desconocida",
  className = undefined,
  classNames = {
    wrapper: "",
  },
  width,
  srcSet,
  ...props
}: TypeImageHeroCustomProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    //@ts-ignore
    threshold: 0.3,
    once: true,
  });

  return (
    <Image
      ref={ref}
      src={isInView && src ? src : UnknowImg}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      classNames={classNames}
      width={width}
      {...props}
    />
  );
}
