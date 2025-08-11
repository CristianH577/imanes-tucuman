import ImageCustom from "../../../components/ImageCustom";

import img_1 from "../../../assets/uya/utilidades/usar_bornera_clip/1.webp";
import img_2 from "../../../assets/uya/utilidades/usar_bornera_clip/2.webp";
import img_3 from "../../../assets/uya/utilidades/usar_bornera_clip/3.webp";
import img_4 from "../../../assets/uya/utilidades/usar_bornera_clip/4.webp";

export default function UsarBorneraClip() {
  const items = [
    {
      text: "Medir el largo de punta a pelar",
      src: img_1,
    },
    {
      text: "Levantar el seguro del empalme",
      src: img_2,
    },
    {
      text: "Insertar el cable",
      src: img_3,
    },
    {
      text: "Bajar el seguro para fijar",
      src: img_4,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6 justify-items-center">
      {items.map((item, i) => (
        <div key={i + 1} className="flex flex-col justify-around max-w-xs">
          <ImageCustom
            src={item.src}
            className="w-full"
            classNames={{ wrapper: "drop-shadow-custom" }}
            alt={`Imagen de instruccion ${i + 1}`}
            widht={300}
          />

          <p className="p-2 xs:p-4">
            {i + 1}. {item.text}.
          </p>
        </div>
      ))}
    </div>
  );
}
