import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { SVGMagnet } from "../assets/svgs/svgsIcons";

export const NAV_ITEMS = [
  { id: "", href: "", label: "Inicio", icon: HomeOutlinedIcon },
  {
    id: "search_view",
    href: "buscar",
    label: "Buscar",
    icon: ContentPasteSearchOutlinedIcon,
    search: "?orderBy=price-asc",
  },
  { id: "imanes", href: "neodimio", label: "Neodimio", icon: SVGMagnet },
  {
    id: "uya",
    href: "uya",
    label: "U&A",
    title: "Usos y Aplicaciones",
    icon: ImportContactsIcon,
  },
  {
    id: "faqs",
    href: "faqs",
    label: "FAQs",
    title: "Preguntas Frecuentes",
    icon: HelpOutlineIcon,
  },
];

export const LINKS_SITES = {
  whatsapp: "https://api.whatsapp.com/send?phone=543813156907",
  googlemaps:
    "https://www.google.com.ar/maps/place/Imanes+Tucum%C3%A1n/@-26.8887704,-65.2256411,17.54z/data=!4m6!3m5!1s0x94225b001419003b:0x46095acd3879452e!8m2!3d-26.8894591!4d-65.2246928!16s%2Fg%2F11wb1cdws9?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
  facebook: "https://www.facebook.com/imanestucuman",
  instagram: "https://www.instagram.com/imanestucuman/",
  x: "https://x.com/imanestucuman",
  tiendanube: "https://imanestucuman.mitiendanube.com/",
  catalogo:
    "https://drive.google.com/file/d/1TFOWDem-Iqdg3zdf3W0KKzgLELq4ZmHw/view?usp=drive_link",
  fotos:
    "https://drive.google.com/drive/folders/1C2T_BZKXTpU-GPEH9PLk1QRGViV85Iz_?usp=drive_link",
  mercadoshops: "https://imanestucuman.mercadoshops.com.ar/",
  web: "https://www.imanestucuman.com.ar/",
  // telegram: "https://t.me/imanestucuman",
  // signal: "https://signal.me/#p/+543813156907",
  "form_encuesta-20250109": "https://forms.gle/Qo8PUYAkysYGuTPK8",
  googlemaps_indicaciones:
    "https://www.google.com.ar/maps/dir/Av.+Gral.+Roca+%26+Pcia+de+Jujuy,+T4000+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n/Imanes+Tucum%C3%A1n,+9+de+Julio,+San+Miguel+de+Tucum%C3%A1n,+Provincia+de+Tucum%C3%A1n/@-26.8639462,-65.2214478,14.26z/data=!4m14!4m13!1m5!1m1!1s0x94225c0b2e16d2d5:0x2df6ddf6da9766ac!2m2!1d-65.2140368!2d-26.8420076!1m5!1m1!1s0x94225b001419003b:0x46095acd3879452e!2m2!1d-65.2246979!2d-26.8894679!3e0?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D",
};

export const LINKS_SITES_SHORTs = {
  whatsapp: "https://tinyurl.com/3amwj9vt.",
  googlemaps: "https://tinyurl.com/3wxjm6bn",
  facebook: "https://tinyurl.com/mu4n496h",
  catalogo: "https://tinyurl.com/bdcwxh75",
  mercadoshops: "https://tinyurl.com/3mfpadr8",
  web: "https://tinyurl.com/3ace3xj8",
  fotos: "https://tinyurl.com/cjb6z65z",
  googlemaps_indicaciones: "https://tinyurl.com/yc65a8dj",
};

export const FONTS_VALUES = {
  md: {
    primary: "medium",
    secondary: "small",
    tertiary: "large",
  },
  lg: {
    primary: "large",
    secondary: "medium",
    tertiary: "x-large",
  },
  xl: {
    primary: "x-large",
    secondary: "large",
    tertiary: "xx-large",
  },
};
