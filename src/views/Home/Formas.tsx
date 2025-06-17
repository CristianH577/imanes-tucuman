import ImageCustom from "../../components/ImageCustom";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const images_all = import.meta.glob(
  "../../assets/formas/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
  }
);
const srcs = Object.entries(images_all).map(
  ([_, module]) => (module as { default: string }).default
);

const items = [
  { id: "plano", label: "Redondo Plano", href_add: "&forma=redondo" },
  { id: "boton", label: "Redondo Botón", href_add: "&forma=redondo" },
  { id: "cilindro", label: "Redondo Cilindro", href_add: "&forma=redondo" },
  {
    id: "arandela",
    label: "Redondo Fresado",
    href_add: "&forma=redondo%fresado",
  },
  { id: "cuadrado", label: "Cuadrado", href_add: "&forma=cuadrado" },
  { id: "plancha", label: "Cuadrado Plancha", href_add: "&forma=cuadrado" },
  { id: "ladrillo", label: "Cuadrado Bloque", href_add: "&forma=cuadrado" },
  {
    id: "cuadrado-fresado",
    label: "Cuadrado Fresado",
    href_add: "&forma=cuadrado%fresado",
  },
  { id: "esfera", label: "Esfera", href_add: "&forma=esfera" },
  {
    id: "de_arrastre",
    label: "De Arrastre /Pesca",
    href_add: "",
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

      <article className="grid xs:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 sm:gap-8">
        {items.map((item) => {
          let href = "#search?categorie=imanes";

          if (item.id === "de_arrastre") {
            href += "&subcategorie=arrastre";
          } else {
            href += "&subcategorie=neodimio";
          }

          const href_add = item?.href_add;
          if (href_add) href += href_add;

          return (
            <a
              href={href}
              key={item.id}
              className="bg-neutral-500/20 rounded-lg p-4 sm:p-8 max-w-[400px] xs:min-h-[150px] max-h-[400px] flex items-center justify-center relative select-none group/item"
            >
              <ImageCustom
                src={srcs.find((src) => src.includes(`/${item.id}.webp`))}
                alt={`Iman ${item.label}`}
                width={200}
                height={200}
                className="object-contain group-hover/item:blur-sm h-fit drop-shadow-[-2px_4px_6px_black]"
              />

              <span className="absolute text-3xl font-bold hidden text-center px-4 sm:px-8 text-white group-hover/item:block text-shadow-[0_0_5px_black]">
                {item.label}
              </span>

              <span className="absolute bottom-4 right-4 opacity-50 group-hover/item:opacity-100 text-custom2 dark:text-custom1">
                <ArrowCircleRightIcon className="h-12 w-fit" />
              </span>
            </a>
          );
        })}
      </article>
    </section>
  );
}
