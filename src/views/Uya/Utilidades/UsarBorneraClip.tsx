import ImageHeroCustom from "../../../components/ImageHeroCustom";

const images_all = import.meta.glob(
  "../../../assets/uya/utilidades/usar_bornera_clip/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
  }
);
const srcs = Object.entries(images_all).map(
  ([_, module]) => (module as { default: string }).default
);

export default function UsarBorneraClip() {
  const getSrc = (name: string) => srcs.find((src) => src.includes(name));

  const items = [
    "Medir el largo de punta a pelar",
    "Levantar el seguro del empalme",
    "Insertar el cable",
    "Bajar el seguro para fijar",
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6 justify-items-center">
      {items.map((item, i) => (
        <div key={i + 1} className="flex flex-col justify-around max-w-xs">
          <ImageHeroCustom
            src={getSrc(`/${i + 1}.webp`)}
            classNames={{ wrapper: "drop-shadow-custom" }}
            alt={`Imagen de instruccion ${i + 1}`}
            // @ts-ignore
            widht={300}
          />

          <p className="p-2 xs:p-4">
            {i + 1}. {item}.
          </p>
        </div>
      ))}
    </div>
  );
}
