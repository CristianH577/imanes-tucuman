import { motion } from "framer-motion";

import { LINKS_SITES } from "../consts/siteConfig";

import { Tooltip } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
// import TelegramIcon from "@mui/icons-material/Telegram";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PinDropIcon from "@mui/icons-material/PinDrop";
import DescriptionIcon from "@mui/icons-material/Description";

import { SVGMercadoLibre } from "../assets/svgs/svgsIcons";

type LinkKey = keyof typeof LINKS_SITES;

const redes = [
  {
    id: "facebook",
    icon: FacebookIcon,
    label: "Facebook",
  },
  {
    id: "instagram",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    id: "x",
    icon: XIcon,
    label: "X",
  },
  {
    id: "googlemaps",
    icon: PinDropIcon,
    label: "Ubicación",
  },
  // {
  //   id: "telegram",
  //   icon: TelegramIcon,
  //   // className="text-[#0088cc]"
  //   label: "Telegram",
  // },
  // {
  //   id: "signal",
  //   icon: SVGSSignalMessenger,
  //   label: "Signal",
  // },
  {
    id: "catalogo",
    icon: PictureAsPdfIcon,
    label: "Catalogo",
  },
  {
    id: "mercadoshops",
    icon: SVGMercadoLibre,
    label: "Tienda Online",
    classNames: {
      icon: "h-full w-fit",
    },
  },
  {
    id: "form_encuesta-20250109",
    icon: DescriptionIcon,
    label: "Encuesta",
  },
];

export default function Redes({
  classNames = { link: "", icon: "" },
  className = "",
  slice = 0,
}) {
  return (
    <div
      className={`flex gap-2 justify-center items-center flex-wrap${
        className ? " " + className : ""
      }`}
    >
      {redes.slice(0, slice || redes.length).map((item, i) => (
        <Tooltip key={i} title={item.label} hidden={!item?.label} arrow>
          <motion.a
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
            initial="hidden"
            animate="visible"
            href={LINKS_SITES[item.id as LinkKey]}
            className={`text-neutral-400 transition-all${
              classNames.link ? " " + classNames.link : ""
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <item.icon
              className={"" + (classNames?.icon ? " " + classNames.icon : "")}
            />
          </motion.a>
        </Tooltip>
      ))}
    </div>
  );
}
