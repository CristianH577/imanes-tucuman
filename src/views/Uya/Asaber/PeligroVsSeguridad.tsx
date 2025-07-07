import CardUya from "../CardUya";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import img_1 from "../../../assets/uya/asaber/peligro_vs_seguridad/1.webp";
import img_2 from "../../../assets/uya/asaber/peligro_vs_seguridad/2.webp";
import img_3 from "../../../assets/uya/asaber/peligro_vs_seguridad/3.webp";
import img_4 from "../../../assets/uya/asaber/peligro_vs_seguridad/4.webp";

const cols = [
  {
    id: "tradicional",
    header: {
      icon: ClearIcon,
      label: "Tradicional",
      bg: "from-danger to-danger-400 dark:to-danger-300",
    },
    items: [
      {
        src: img_1,
        text: "La cinta aislante se seca y puede causar incendios",
      },
      {
        src: img_2,
        text: "Las altas temperaturas son relativamente faciles de filtrar",
      },
    ],
  },
  {
    id: "terminales",
    header: {
      icon: CheckIcon,
      label: "Con Terminales",
      bg: "from-success to-success-400 dark:to-success-300",
    },
    items: [
      {
        src: img_3,
        text: "Los terminales son fáciles de operar y evitan riesgos de seguridad",
      },
      {
        src: img_4,
        text: "Material ignífugo resistente a las altas temperaturas",
      },
    ],
  },
];

export default function PeligroVsSeguridad() {
  return (
    <div className="grid sm:grid-cols-2 gap-8 justify-items-center">
      {cols.map((col) => (
        <div key={col.id} className="grid grid-rows-5 gap-6">
          <div
            className={`rounded-lg h-full flex flex-col items-center justify-evenly text-3xl shadow-md px-2 bg-gradient-to-t dark:bg-gradient-to-b ${col.header.bg}`}
          >
            <col.header.icon className="h-10 w-fit" />

            <b className="text-white break-all">{col.header.label}</b>
          </div>

          {col.items.map((item, i) => (
            <CardUya
              key={col.id + i + 1}
              id={col.id + i + 1}
              src={item.src}
              text={item.text}
              className="row-span-2"
              classes={{
                img: "sm:h-[200px]",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
