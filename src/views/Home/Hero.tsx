import { motion } from "framer-motion";

import { title, title1 } from "../../libs/tvs";

import { Button } from "@heroui/button";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import {
  SVGBarsStaggered,
  SVGMagnet,
  SVGMagnet2,
  SVGMagnetBlast,
} from "../../assets/svgs/svgsIcons";

const images_all = import.meta.glob(
  "../../assets/home/Hero/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
    import: "default",
  }
);
const srcs = Object.entries(images_all) as string[][];

const class_icons_main =
  "absolute w-12 xs:w-14 sm:w-20 lg:w-28 h-auto transition-all text-custom1/90";

const icons = [
  <SVGMagnet2
    className={`top-0 left-6 sm:left-12 -rotate-[100deg] ${class_icons_main}`}
  />,
  <SVGMagnet
    className={`bottom-0 right-0 sm:right-10 rotate-[80deg] ${class_icons_main}`}
  />,
  <ElectricBoltIcon
    className={`top-0 sm:top-8 right-0 sm:right-16 rotate-[10deg] ${class_icons_main}`}
  />,
  <SVGBarsStaggered
    className={`bottom-0 left-2 sm:left-16 ${class_icons_main}`}
  />,
];

const imgs = Array.from({ length: 5 }).map((_, i) => {
  const sizes = [
    {
      w: 360,
      src: "",
    },
    {
      w: 640,
      src: "",
    },
    {
      w: 768,
      src: "",
    },
    {
      w: 1024,
      src: "",
    },
    {
      w: 1280,
      src: "",
    },
  ];

  sizes.forEach((size) => {
    size.src =
      srcs.find(([path, _]) => path.includes(`/${size.w}/${i + 1}`))?.[1] || "";
  });
  return sizes;
});

export default function Hero() {
  return (
    <motion.section
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
        },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      className="w-screen relative right-2 sm:right-10 lg:right-12 overflow-hidden shadow-md shadow-black/50 min-[2000px]:h-[1200px] pt-2 bg-radial from-custom2-10 to-custom2"
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <div className="relative flex flex-col gap-4 items-center w-full h-full max-w-7xl place-self-center">
        <SVGMagnetBlast className="absolute inset-0 w-fit h-[105%] lg:h-[110%] opacity-30 text-custom1 place-self-center" />

        <article className="relative w-full flex flex-grow items-center justify-center">
          {icons.map((icon, i) => (
            <span key={i}>{icon}</span>
          ))}

          <span
            className="w-1/3 h-3/5 md:w-1/5 md:h-3/4 xl:text-danger rounded-lg -skew-x-6 -skew-y-12 absolute shadow-large from-custom1 to-custom1-2 transition-all z-"
            style={{
              background: `linear-gradient(45deg, var(--tw-gradient-stops))`,
            }}
          />

          {/* {imgs.map((sizes, i) => (
            <motion.img
              key={i}
              loading="eager"
              width={"100%"}
              height={"100%"}
              alt={`Iman de neodimio ${i + 1}`}
              className={`hidden sm:block object-contain h-full absolute inset-0 mx-auto pb-2 sm:pb-4 drop-shadow-custom z-${
                i * 10
              }`}
              src={sizes[0].src}
              srcSet={`
                  ${sizes[0].src} 360w,
                  ${sizes[1].src} 640w,
                  ${sizes[2].src} 768w,
                  ${sizes[3].src} 1024w,
                  ${sizes[4].src} 1280w,
                `}
              whileInView={{ y: [0, (i + 1) * 6, 0] }}
              transition={{
                duration: i + 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))} */}

          {imgs.map((sizes, i) => (
            <img
              key={i}
              loading="eager"
              width={"100%"}
              height={"100%"}
              alt={`Iman de neodimio ${i + 1}`}
              // sm:hidden
              className="object-contain h-full absolute inset-0 mx-auto pb-2 sm:pb-4 drop-shadow-custom"
              src={sizes[0].src}
              srcSet={`
                  ${sizes[0].src} 360w,
                  ${sizes[1].src} 640w,
                  ${sizes[2].src} 768w,
                  ${sizes[3].src} 1024w,
                  ${sizes[4].src} 1280w,
                `}
              fetchPriority="high"
            />
          ))}
        </article>

        <article className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-4 h-fit px-4 pb-8">
          <div className="text-center max-w-[900px]">
            <h1 className={title({ size: "md", shadow: "custom" })}>
              Imanes tucuman
            </h1>
            <h2 className={title1({ size: "sm" }) + " text-white"}>
              Un{" "}
              <span className={title1({ color: "yellow" })}>
                emprendimiento
              </span>{" "}
              dedicado a la comercialización de imanes de{" "}
              <span className={title1({ color: "yellow" })}>neodimio</span>.
            </h2>
            <h3 className="my-2 text-lg lg:text-xl text-neutral-400">
              Atencion, calidad y precio.
            </h3>
          </div>

          <Button
            radius="full"
            variant="ghost"
            color="warning"
            size="lg"
            className="font-bold"
            title="Ver sección de formas"
            onPress={() => {
              const section = document.querySelector("#formas");
              if (section) section.scrollIntoView();
            }}
          >
            Explorar
          </Button>
        </article>
      </div>
    </motion.section>
  );
}
