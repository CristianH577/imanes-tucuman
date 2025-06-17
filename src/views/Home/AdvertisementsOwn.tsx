import { title } from "../../libs/tvs";

import { Button, Link } from "@heroui/react";

import ImageCustom from "../../components/ImageCustom";

import PhishingIcon from "@mui/icons-material/Phishing";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

import {
  SVGBallPyramid,
  SVGMagnet,
  SVGRibbon,
  SVGVibratingBall,
  SVGWallpaper,
} from "../../assets/svgs/svgsIcons";

const images_all = import.meta.glob(
  "../../assets/home/AdvertisementsOwn/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
  }
);
const srcs = Object.entries(images_all).map(
  ([_, module]) => (module as { default: string }).default
);

const items = [
  {
    src: "de_arrastre",
    href: "categorie=imanes&subcategorie=arrastre",
    title: "Imán de Arrastre",
    text: "O imán de pesca. Tiene un cáncamo cerrado que permite su sujeción y posterior tracción",
    icon: PhishingIcon,
  },
  {
    src: "iman-ceramico-60",
    href: "categorie=imanes&subcategorie=ferrita",
    title: "Imán de ferrita",
    text: "Tienen alta resistencia a la temperatura y corrosión, esto le permiten ser usados en exteriores y hornos",
    icon: SVGMagnet,
  },
  {
    src: "tira_flexible-13",
    href: "categorie=imanes&subcategorie=otros&text=tira",
    title: "Imán en tira",
    text: "Usado frecuentemente para hacer mosquiteros y manualidades",
    icon: SVGRibbon,
  },
  {
    src: "plancha-31",
    href: "categorie=imanes&subcategorie=otros&text=plancha",
    title: "Imán en plancha",
    text: "Puede pegarse para hacer souvenirs, calendarios, imanes publicitarios, etc",
    icon: SVGWallpaper,
  },
  {
    src: "kluster",
    href: "text=kluster",
    title: "kluster",
    text: "Juego de 20 piedras ovaladas de hematita magnetizadas y pulidas",
    icon: SVGVibratingBall,
  },
  {
    src: "neocube-dorado",
    href: "text=neocube%dorado",
    title: "neocube",
    text: "216 imanes esféricos de 5mm de diámetro",
    icon: SVGBallPyramid,
  },
  {
    src: "electricidad",
    href: "categorie=electricidad",
    title: "Accesorios Eléctricos",
    text: "Facilitan la instalación y conexión de cables",
    icon: ElectricalServicesIcon,
  },
];

export function AdvertisementsOwn() {
  return (
    <section className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <article
          key={i}
          className="relative grid grid-cols-1 sm:grid-cols-2 w-full gap-8 p-2 xs:p-8"
        >
          <item.icon
            className={`absolute h-full w-fit z-0 text-custom2/20 dark:text-custom1-5/20 self-center ${
              i % 2 === 0 ? "sm:right-0" : "sm:left-0 2xl:right-0"
            }`}
          />

          <ImageCustom
            src={srcs.find((src) => src.includes(`/${item.src}.webp`))}
            alt={item.title}
            height={320}
            width={320}
            className={
              "object-contain z-10 place-self-center drop-shadow-md" +
              (i % 2 === 0 ? "" : " sm:order-2")
            }
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
              as={Link}
              href={`#search?${item?.href}`}
              className="bg-gradient-to-tr hover:to-50% hover:bg-custom1-2 from-custom2 to-custom2-10 -skew-x-12 font-bold px-4 text-custom1 dark:text-black dark:from-custom1 dark:to-custom1-5 shadow-md"
              title={"Ver " + item.title}
            >
              <span className="skew-x-12">Ver mas</span>
              <ArrowCircleRightIcon className="h-10 w-fit skew-x-12" />
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default AdvertisementsOwn;
