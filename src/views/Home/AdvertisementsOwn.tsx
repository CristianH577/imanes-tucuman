import { motion } from "framer-motion";

import { title } from "../../libs/tvs";

import { Button } from "@mui/material";

import ImageCustom from "../../components/ImageCustom";

import PhishingIcon from "@mui/icons-material/Phishing";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

import {
  SVGMagnet,
  SVGRibbon,
  SVGVibratingBall,
  SVGWallpaper,
} from "../../assets/svgs/svgsIcons";

import de_arrastre from "../../assets/home/AdvertisementsOwn/de_arrastre.webp";
import ceramico from "../../assets/home/AdvertisementsOwn/iman-ceramico-60.webp";
import tira_flexible from "../../assets/home/AdvertisementsOwn/tira_flexible-13.webp";
import plancha from "../../assets/home/AdvertisementsOwn/plancha-31.webp";
import kluster from "../../assets/home/AdvertisementsOwn/kluster.webp";
import electricidad from "../../assets/home/AdvertisementsOwn/electricidad.webp";

const items = [
  {
    id: "de_arrastre",
    src: de_arrastre,
    href: "categorie=imanes,neodimio&forma=redondo,arrastre",
    title: "Imánes de Arrastre",
    text: "O imán de pesca. Tiene un cáncamo cerrado que permite su sujeción y posterior tracción",
    icon: PhishingIcon,
  },
  {
    id: "ceramico",
    src: ceramico,
    href: "categorie=imanes,ferrita",
    title: "Imanes de ferrita",
    text: "No suelen ser tan potentes pero si económicos. Tienen alta resistencia a la temperatura y corrosión",
    icon: SVGMagnet,
  },
  {
    id: "tira_flexible",
    src: tira_flexible,
    href: "categorie=imanes,flexibles&text=tira",
    title: "Imanes en tira",
    text: "Usado frecuentemente para hacer mosquiteros y manualidades",
    icon: SVGRibbon,
  },
  {
    id: "plancha",
    src: plancha,
    href: "categorie=imanes,flexibles&text=lamina",
    title: "Láminas de imán",
    text: "Puede pegarse para hacer souvenirs, calendarios, imanes publicitarios, etc",
    icon: SVGWallpaper,
  },
  {
    id: "juguetes",
    src: kluster,
    href: "text=juguetes",
    title: "Juguetes",
    text: "Entre los diversos usos de los imanes esta el de usarse para jugar a construir o evitar que se junten",
    icon: SVGVibratingBall,
  },
  // {
  //   id: "neocube",
  //   src: neocube,
  //   href: "text=neocube%dorado",
  //   title: "neocube",
  //   text: "216 imanes esféricos de 5mm de diámetro",
  //   icon: SVGBallPyramid,
  // },
  {
    id: "electricidad",
    src: electricidad,
    href: "categorie=electricidad",
    title: "Accesorios Eléctricos",
    text: "Facilitan la instalación y conexión de cables",
    icon: ElectricalServicesIcon,
  },
];

export function AdvertisementsOwn() {
  return (
    <motion.section
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      className="grid grid-cols-1 2xl:grid-cols-2 gap-4"
    >
      {items.map((item, i) => {
        return (
          <motion.article
            key={i}
            variants={{
              hidden: { opacity: 0, x: i % 2 === 0 ? "-50%" : "50%" },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
            className="relative grid grid-cols-1 sm:grid-cols-2 w-full gap-8 p-2 xs:p-8"
          >
            <item.icon
              className={`absolute h-full w-fit z-0 text-custom2/20 dark:text-custom1-5/20 self-center ${
                i % 2 === 0 ? "sm:right-0" : "sm:left-0 2xl:right-0"
              }`}
            />

            <ImageCustom
              src={item.src}
              alt={item.title}
              height={320}
              width={320}
              className="object-contain"
              classes={{
                wrapper:
                  "z-10 place-self-center drop-shadow-md" +
                  (i % 2 === 0 ? "" : " sm:order-2"),
              }}
            />

            <div
              className={`flex-1 flex flex-col gap-4 max-sm:text-center max-w-96 2xl:max-w-80 place-self-center ${
                i % 2 === 0
                  ? "sm:items-start"
                  : "sm:order-1 sm:text-end sm:items-end"
              }`}
            >
              <h2
                className={`${title({
                  color: "custom2",
                  size: "md",
                  shadow: "md",
                  darkColor: "custom1",
                })}${i % 2 === 0 ? "" : " sm:self-end"}`}
              >
                {item.title}
              </h2>

              <p className="font-semibold max-sm:text-center">{item.text}.</p>

              <Button
                component={"a"}
                href={`#buscar?${item?.href}`}
                className="bg-gradient-to-tr hover:to-50% hover:bg-custom1-2 from-custom2 to-custom2-10 -skew-x-12 px-4 text-custom1 dark:text-black dark:from-custom1 dark:to-custom1-5 shadow-md"
                title={"Ver " + item.title}
                endIcon={
                  <ArrowCircleRightIcon className="h-6 w-fit skew-x-12" />
                }
                sx={{
                  textTransform: "none",
                  borderRadius: 3,
                  fontFamily: "unset",
                }}
              >
                <b className="skew-x-12">Ver mas</b>
              </Button>
            </div>
          </motion.article>
        );
      })}
    </motion.section>
  );
}

export default AdvertisementsOwn;
