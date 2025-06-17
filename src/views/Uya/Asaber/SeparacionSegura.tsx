import CardUya from "../CardUya";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import img_1 from "../../../assets/uya/asaber/separacion/1.webp";
import img_2 from "../../../assets/uya/asaber/separacion/2.webp";
import img_3 from "../../../assets/uya/asaber/separacion/3.webp";
import img_4 from "../../../assets/uya/asaber/separacion/4.webp";

export default function SeparacionSegura() {
  const class_icon = "absolute z-10 left-3 top-3 text-4xl";

  const items = [
    {
      text: "Retirar el imán de la pila deslizándolo hacia un lado",
      src: img_1,
    },
    {
      text: "Una vez la mayor parte este fuera de la pila, levantar",
      src: img_2,
    },
    {
      text: "No jalar, levantar ni hacer palanca sin primero deslizar hacia el costado",
      src: img_3,
    },
    {
      text: "No permitir que los imanes se golpeen entre sí o con cualquier superficie magnética porque puede romperlos",
      src: img_4,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-8">
      {items.map((item, i) => (
        <CardUya
          key={i + 1}
          src={item.src}
          text={item.text}
          className="relative w-full"
          classNames={{
            img: "object-contain",
            wrapper:
              "bg-white w-full max-h-[250px] max-w-none flex justify-center " +
              (i < 2 ? "border-success" : "border-danger"),
          }}
          contentPlus={
            i < 2 ? (
              <CheckCircleOutlineIcon
                className={`text-success ${class_icon}`}
              />
            ) : (
              <HighlightOffIcon className={`text-danger ${class_icon}`} />
            )
          }
        />
      ))}
    </div>
  );
}
