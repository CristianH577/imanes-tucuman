import { lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { scrollStyle } from "../libs/tvs";

import { Button } from "@mui/material";

import ArticleView from "./Uya/ArticleView";
import ArticlesList from "./Uya/ArticlesList";

const NeodimioVSFerrita = lazy(() => import("./Uya/Asaber/NeodimioVSFerrita"));
const SeparacionSegura = lazy(() => import("./Uya/Asaber/SeparacionSegura"));
const FuerzaEnPerspectiva = lazy(
  () => import("./Uya/Asaber/FuerzaEnPerspectiva")
);
const TiposEmpalmes = lazy(() => import("./Uya/Asaber/TiposEmpalmes"));
const AguasDuras = lazy(() => import("./Uya/Asaber/AguasDuras"));
const PeligroVsSeguridad = lazy(
  () => import("./Uya/Asaber/PeligroVsSeguridad")
);
const DireccionMagnetica = lazy(
  () => import("./Uya/Asaber/DireccionMagnetica")
);
const Revestimientos = lazy(() => import("./Uya/Asaber/Revestimientos"));

const Colgar = lazy(() => import("./Uya/Sujecion/Colgar"));
const Cortinas = lazy(() => import("./Uya/Sujecion/Cortinas"));
const Macetas = lazy(() => import("./Uya/Sujecion/Macetas"));
const Atados = lazy(() => import("./Uya/Sujecion/Atados"));
const Pulseras = lazy(() => import("./Uya/Sujecion/Pulseras"));
const Juguetes = lazy(() => import("./Uya/Sujecion/Juguetes"));

const Destornillador = lazy(() => import("./Uya/Utilidades/Destornillador"));
const Perfiles = lazy(() => import("./Uya/Utilidades/Perfiles"));
const Puertas = lazy(() => import("./Uya/Utilidades/Puertas"));
const UsarBorneraClip = lazy(() => import("./Uya/Utilidades/UsarBorneraClip"));

const SoporteFrascos = lazy(() => import("./Uya/Ideas/SoporteFrascos"));
const SoporteHerramientas = lazy(
  () => import("./Uya/Ideas/SoporteHerramientas")
);
const Esponja = lazy(() => import("./Uya/Ideas/Esponja"));
const Pulsera = lazy(() => import("./Uya/Ideas/Pulsera"));
const PuestaTierra = lazy(() => import("./Uya/Ideas/PuestaTierra"));
const Llaveros = lazy(() => import("./Uya/Ideas/Llaveros"));
const RecogedorSimple = lazy(() => import("./Uya/Ideas/RecogedorSimple"));
const Recogedor = lazy(() => import("./Uya/Ideas/Recogedor"));

export default function UyA() {
  const [tabSelected, setTabSelected] = useState(0);

  const tabs = [
    {
      id: "asaber",
      title: "A saber",
    },
    {
      id: "utilidades",
      title: "Utilidades",
    },
    {
      id: "sujecion",
      title: "Sujeción",
    },
    {
      id: "ideas",
      title: "Ideas",
    },
  ];

  const items = {
    asaber: [
      {
        id: "fuerza",
        title: "Fuerza en perspectiva",
        content: <FuerzaEnPerspectiva />,
      },
      {
        id: "separacion",
        title: "Separación segura",
        content: <SeparacionSegura />,
      },
      {
        id: "vs",
        title: "Neodimio VS Ferrita",
        content: <NeodimioVSFerrita />,
      },
      {
        id: "tipos_empalmes",
        title: "Tipos de empalmes",
        content: <TiposEmpalmes />,
      },
      {
        id: "peligro_vs_seguridad",
        title: "Peligro VS Seguridad",
        content: <PeligroVsSeguridad />,
      },
      {
        id: "aguas_duras",
        title: "Aguas duras",
        content: <AguasDuras />,
      },
      {
        id: "direccion_magnetica",
        title: "Dirección magnética",
        content: <DireccionMagnetica />,
      },
      {
        id: "revestimientos",
        title: "Revestimientos",
        content: <Revestimientos />,
      },
    ],
    sujecion: [
      {
        id: "cortinas",
        title: "Cortinas magnéticas",
        content: <Cortinas />,
      },
      {
        id: "colgar",
        title: "Colgar sin perforar",
        content: <Colgar />,
      },
      {
        id: "macetas",
        title: "Casas más verdes",
        content: <Macetas />,
      },
      {
        id: "atados",
        title: "Atados magnéticos",
        content: <Atados />,
      },
      {
        id: "pulseras",
        title: "Cierre de pulseras y collares",
        content: <Pulseras />,
      },
      {
        id: "juguetes",
        title: "Juguetes magnéticos",
        content: <Juguetes />,
      },
    ],
    utilidades: [
      {
        id: "destornillador",
        title: "Destornilladores magnetizados",
        content: <Destornillador />,
      },
      {
        id: "perfiles",
        title: "Encontrar perfiles de durlock",
        content: <Perfiles />,
      },
      {
        id: "puertas",
        title: "Reparar puertas",
        content: <Puertas />,
      },
      {
        id: "usar_bornera_clip",
        title: "Usar bornera clip",
        content: <UsarBorneraClip />,
      },
    ],
    ideas: [
      {
        id: "soporte_herramientas",
        title: "Soporte para herramientas",
        content: <SoporteHerramientas />,
      },
      {
        id: "soporte_frascos",
        title: "Soporte para frascos",
        content: <SoporteFrascos />,
      },
      {
        id: "esponja",
        title: "Limpiador magnetico",
        content: <Esponja />,
      },
      {
        id: "pulsera",
        title: "Pulsera magnetica",
        content: <Pulsera />,
      },
      {
        id: "puesta_tierra",
        title: "Puesta a tierra",
        content: <PuestaTierra />,
      },
      {
        id: "llaveros",
        title: "Llavero magnético",
        content: <Llaveros />,
      },
      {
        id: "recogedor_simple",
        title: "Recogedor Magnético Simple",
        content: <RecogedorSimple />,
      },
      {
        id: "recogedor",
        title: "Recogedor Magnético",
        content: <Recogedor />,
      },
    ],
  };

  return (
    <>
      <section
        className={
          "max-sm:w-full overflow-x-auto bg-gradient-to-t from-custom2 to-custom2-10 rounded-lg px-2 py-1 shadow-md " +
          scrollStyle
        }
      >
        <motion.ul
          role="tabs-wrapper"
          aria-label="formas de los imanes"
          className="flex w-fit relative gap-2"
        >
          {tabs.map((tab, i) => (
            <li key={i}>
              <Button
                color="inherit"
                size="small"
                role="tab"
                data-selected={i === tabSelected}
                className="whitespace-nowrap font-semibold data-[selected=true]:text-shadow-md data-[selected=true]:text-custom2 text-shadow-black/30 text-white"
                title={"Ver " + tab.title}
                onClick={() => setTabSelected(i)}
              >
                {tabSelected === i && (
                  <motion.div
                    layoutId="highlight-uya"
                    className="absolute right-0 bottom-0 rounded-lg w-full h-full bg-gradient-to-t from-custom1 to-custom1-3"
                  />
                )}
                <span className="z-10 capitalize">{tab.title}</span>
              </Button>
            </li>
          ))}
        </motion.ul>
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={tabSelected}
          role="tabpanel"
          layoutId="content-uya"
          className="w-full text-center sm:flex flex-col items-center "
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArticlesList
            list={items[tabs[tabSelected].id as keyof typeof items]}
          />

          {items[tabs[tabSelected].id as keyof typeof items].map((item) => (
            <ArticleView key={item.id} id={item.id} h1={item.title}>
              {item.content}
            </ArticleView>
          ))}
        </motion.section>
      </AnimatePresence>
    </>
  );
}
