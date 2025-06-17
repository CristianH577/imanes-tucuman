import { scrollStyle } from "../../../libs/tvs";

import TableCustom from "../../../components/TableCustom";
import ImageCustom from "../../../components/ImageCustom";
import type { TypeObjectGeneral } from "../../../consts/types";

const images_all = import.meta.glob(
  "../../../assets/uya/asaber/revestimientos/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
    import: "default",
  }
);
const srcs = Object.entries(images_all) as string[][];

const columns = [
  {
    id: "img",
    label: "",
  },
  {
    id: "id",
    label: "Nombre",
  },
  {
    id: "composicion",
    label: "Composición",
  },
  {
    id: "interior",
    label: "Uso interior",
  },
  {
    id: "abrasion",
    label: "Resistencia abrasiva",
  },
  {
    id: "humedad",
    label: "Resistencia a la humedad",
  },
  {
    id: "agua",
    label: "Resistencia al agua",
  },
  {
    id: "sal_aire",
    label: "Resistencia al aire salado",
  },
  {
    id: "sal_agua",
    label: "Resistencia al agua salada",
  },
  {
    id: "pegamento",
    label: "Resistencia al pegamento",
  },
  {
    id: "grosor",
    label: "Grosor",
  },
  {
    id: "precio",
    label: "Precio",
  },
];

const calificaciones = {
  1: {
    label: "Inferior",
    bg: "bg-success/25",
  },
  2: {
    label: "Bueno",
    bg: "bg-success/50",
  },
  3: {
    label: "Excelente",
    bg: "bg-success/75",
  },
  4: {
    label: "Excepcional",
    bg: "bg-success",
  },
};

const precios = {
  1: {
    label: "Bajo",
    bg: "bg-warning/20",
  },
  2: {
    label: "Medio",
    bg: "bg-warning/70",
  },
  3: {
    label: "Alto",
    bg: "bg-warning",
  },
};

const items = [
  {
    id: "nickel",
    composicion: "Ni-Cu-Ni",
    interior: 3,
    abrasion: 2,
    humedad: 2,
    agua: 1,
    sal_aire: 1,
    sal_agua: 1,
    pegamento: 1,
    grosor: "10-20",
    precio: 1,
  },
  {
    id: "zinc_platinado",
    composicion: "Zn",
    interior: 3,
    abrasion: 3,
    humedad: 3,
    agua: 2,
    sal_aire: 2,
    sal_agua: 1,
    pegamento: 2,
    grosor: "8-10",
    precio: 1,
  },
  {
    id: "oro",
    composicion: "Ni-Cu-Au",
    interior: 4,
    abrasion: 2,
    humedad: 4,
    agua: 4,
    sal_aire: 4,
    sal_agua: 4,
    pegamento: 1,
    grosor: "10-20",
    precio: 3,
  },
  {
    id: "epoxi_negro",
    composicion: "Ni-Cu-BE",
    interior: 4,
    abrasion: 1,
    humedad: 4,
    agua: 4,
    sal_aire: 3,
    sal_agua: 3,
    pegamento: 2,
    grosor: "15-25",
    precio: 2,
  },
  {
    id: "epoxi_crudo",
    composicion: "BE",
    interior: 4,
    abrasion: 2,
    humedad: 4,
    agua: 4,
    sal_aire: 3,
    sal_agua: 3,
    pegamento: 4,
    grosor: "10-20",
    precio: 2,
  },
  {
    id: "plastico",
    label: "plástico",
    composicion: "ABS",
    interior: 4,
    abrasion: 4,
    humedad: 4,
    agua: 4,
    sal_aire: 4,
    sal_agua: 4,
    pegamento: 3,
    grosor: "250-500",
    precio: 3,
  },
  {
    id: "teflon",
    label: "teflón",
    composicion: "BE",
    interior: 4,
    abrasion: 2,
    humedad: 4,
    agua: 4,
    sal_aire: 3,
    sal_agua: 3,
    pegamento: 1,
    grosor: "250-500",
    precio: 3,
  },
];

const makeHeaderCell = (col: string | TypeObjectGeneral) => {
  return (
    <span className="max-w-[130px] whitespace-normal">
      {typeof col === "string" ? col : col?.label}
    </span>
  );
};

const makeCellContent = (row: TypeObjectGeneral, col: string) => {
  const val = row?.[col] || null;

  switch (col) {
    case "img":
      return (
        <ImageCustom
          src={srcs.find(([path, _]) => path.includes(row.id))?.[1] || ""}
          className="sm:min-w-32 drop-shadow-custom"
          alt={`Iman con recubrimiento de ${row?.label}`}
        />
      );
    case "id":
      return <span className="capitalize">{val.replace("_", " ")}</span>;
    case "interior":
    case "abrasion":
    case "humedad":
    case "agua":
    case "sal_aire":
    case "sal_agua":
    case "pegamento":
      const calificacion = calificaciones[val as keyof typeof calificaciones];
      return (
        <span
          className={`px-2 py-1 max-sm:h-fit rounded-lg bg-success ${calificacion.bg}`}
        >
          {calificacion.label}
        </span>
      );
    case "grosor":
      return <span>{val} Micrones</span>;
    case "precio":
      const precio = precios[val as keyof typeof precios];
      return (
        <span className={`px-2 py-1 rounded-lg bg-success ${precio.bg}`}>
          {precio.label}
        </span>
      );

    default:
      return val;
  }
};

export default function Revestimientos() {
  return (
    <div className="space-y-4">
      <p>
        La direccion de magnetizacion del iman se determinaria durante la
        pulsacion y una vez hecha no se puede cambiar.
      </p>

      <TableCustom
        columns={columns}
        rows={items}
        className={`max-w-[90vw] place-self-center overflow-x-auto table-dinamic ${scrollStyle}`}
        classNames={{
          row: "border-y border-divider",
        }}
        tdLabel
        makeCellContent={makeCellContent}
        makeHeaderCell={makeHeaderCell}
      />
    </div>
  );
}
