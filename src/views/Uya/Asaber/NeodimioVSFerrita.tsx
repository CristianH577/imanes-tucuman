import type { TypeObjectGeneral } from "../../../consts/types";

import TableCustom from "../../../components/TableCustom";
import ImageCustom from "../../../components/ImageCustom";

import neodimioImg from "../../../assets/uya/asaber/vs-n.webp";
import ferritaImg from "../../../assets/uya/asaber/vs-f.webp";

const columns = [
  {
    key: "campo",
    label: "",
  },
  {
    key: "neodimio",
    label: "Neodimio",
  },
  {
    key: "ferrita",
    label: "Ferrita",
  },
];
const rows = [
  {
    id: "img",
    campo: "",
    neodimio: neodimioImg,
    ferrita: ferritaImg,
  },
  {
    id: "ventajas",
    campo: "ventajas",
    neodimio: "Gran adhesión magnética, ≈10 veces más que uno de ferrita",
    ferrita:
      "Material resistente, difícil de desmontar y gran capacidad magnética",
  },
  {
    id: "uso",
    campo: "uso",
    neodimio:
      "Ideales para usar en grandes áreas o superficies interiores, gracias a su fuerza y estética",
    ferrita: "Recomendado su uso en superficies exteriores",
  },
  {
    id: "resistencia",
    campo: "resistencia térmica",
    neodimio: "Pierden su fuerza magnética a mas de 80°C",
    ferrita: "Soportan temperaturas de entre -40 y 250 °C",
  },
  {
    id: "corrosion",
    campo: "Resistencia corrosiva",
    neodimio: "No tiene mucha, pero al revestirse esto queda solucionado",
    ferrita: "Resistente a la corrosión",
  },
  {
    id: "precio",
    campo: "precio",
    neodimio: "Elevado",
    ferrita: "Económico",
  },
];

export default function NeodimioVSFerrita() {
  const makeCell = (_: any, col: string) => {
    return <td data-label={col === "campo" ? "" : col}></td>;
  };

  const makeCellContent = (row: TypeObjectGeneral, col: string) => {
    const val = row?.[col] || null;

    if (row.id === "img") {
      return val ? (
        <ImageCustom
          src={val}
          classes={{ wrapper: "max-sm:self-center drop-shadow-custom" }}
          alt="Imanes redondos"
          width={300}
          height={300}
        />
      ) : null;
    }

    switch (col) {
      case "campo":
        return (
          <span className="font-semibold capitalize max-sm:w-full max-sm:text-center text-custom2 dark:text-custom1">
            {val}
          </span>
        );

      default:
        return val;
    }
  };

  return (
    <div className="table-dinamic">
      <TableCustom
        aria-label="Tabla de comparación: neodimio vs ferrita"
        columns={columns}
        rows={rows}
        className="max-sm:p-0 bg-transparent max-w-2xl"
        classNames={{
          th: "text-center",
          td: "max-sm:flex-col",
          theadRow: "rounded-lg shadow-md",
          row: "border-b border-divider",
        }}
        makeCell={makeCell}
        makeCellContent={makeCellContent}
      />
    </div>
  );
}
