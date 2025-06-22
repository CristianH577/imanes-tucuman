import { motion } from "framer-motion";

import ImageCustom from "../../components/ImageCustom";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import plano from "../../assets/formas/plano.webp";
import boton from "../../assets/formas/boton.webp";
import cilindro from "../../assets/formas/cilindro.webp";
import arandela from "../../assets/formas/arandela.webp";
import cuadrado from "../../assets/formas/cuadrado.webp";
import plancha from "../../assets/formas/plancha.webp";
import ladrillo from "../../assets/formas/ladrillo.webp";
import cuadrado_fresado from "../../assets/formas/cuadrado-fresado.webp";
import esfera from "../../assets/formas/esfera.webp";
import de_arrastre from "../../assets/formas/de_arrastre.webp";

const items = [
  {
    id: "plano",
    label: "Redondo Plano",
    hrefAdd: "&forma=redondo",
    src: plano,
  },
  {
    id: "boton",
    label: "Redondo Botón",
    hrefAdd: "&forma=redondo",
    src: boton,
  },
  {
    id: "cilindro",
    label: "Redondo Cilindro",
    hrefAdd: "&forma=redondo",
    src: cilindro,
  },
  {
    id: "arandela",
    label: "Redondo Fresado",
    hrefAdd: "&forma=redondo%fresado",
    src: arandela,
  },
  {
    id: "cuadrado",
    label: "Cuadrado",
    hrefAdd: "&forma=cuadrado",
    src: cuadrado,
  },
  {
    id: "plancha",
    label: "Cuadrado Plancha",
    hrefAdd: "&forma=cuadrado",
    src: plancha,
  },
  {
    id: "ladrillo",
    label: "Cuadrado Bloque",
    hrefAdd: "&forma=cuadrado",
    src: ladrillo,
  },
  {
    id: "cuadrado_fresado",
    label: "Cuadrado Fresado",
    hrefAdd: "&forma=cuadrado%fresado",
    src: cuadrado_fresado,
  },
  { id: "esfera", label: "Esfera", hrefAdd: "&forma=esfera", src: esfera },
  {
    id: "de_arrastre",
    label: "De Arrastre /Pesca",
    hrefAdd: "",
    src: de_arrastre,
  },
];

export default function Formas() {
  return (
    <section className="space-y-4 w-full">
      <article className="text-center">
        <p>Aquí tiene una muestra de las formas con las que trabajamos.</p>

        <p className="font-size-secondary text-neutral-400">
          Imágenes a modo ilustrativo.
        </p>
      </article>

      <motion.article
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid xs:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 sm:gap-8"
      >
        {items.map((item) => (
          <motion.a
            key={item.id}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
            href={
              "#buscar?categorie=imanes&subcategorie=" +
              (item.id === "de_arrastre" ? "arrastre" : "neodimio") +
              item.hrefAdd
            }
            className="bg-neutral-500/20 rounded-lg p-4 sm:p-8 max-w-[400px] xs:min-h-[150px] max-h-[400px] flex items-center justify-center relative select-none group/item"
          >
            <ImageCustom
              src={item.src}
              alt={`Iman ${item.label}`}
              width={200}
              height={200}
              className="object-contain group-hover/item:blur-sm h-fit drop-shadow-[-2px_4px_6px_black]"
            />
            <span
              className="absolute text-3xl font-bold hidden text-center px-4 sm:px-8 text-white group-hover/item:block"
              style={{
                textShadow: "-2px 4px 6px black",
              }}
            >
              {item.label}
            </span>
            <span className="absolute bottom-4 right-4 opacity-50 group-hover/item:opacity-100 text-custom2 dark:text-custom1">
              <ArrowCircleRightIcon className="h-12 w-fit" />
            </span>
          </motion.a>
        ))}
      </motion.article>
    </section>
  );
}
