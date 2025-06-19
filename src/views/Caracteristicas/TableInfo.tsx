import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { scrollStyle } from "../../libs/tvs";

import { Button } from "@heroui/react";
import type { ClassDBItem } from "../../consts/types";

interface InterfaceTableInfoProps {
  tableAriaLabel: string;
  rows: ClassDBItem[];
}

const rowsPerView = 10;
const columns = [
  {
    key: "label",
    label: "Medida",
  },
  {
    key: "peso",
    label: "Peso",
    measure: "g",
  },
  {
    key: "fuerza_experimental",
    label: "F. exp.",
  },
  {
    key: "grade",
    label: "Grado",
  },
  {
    key: "fuerza",
    label: "Fuerza",
    measure: "kg",
  },
  {
    key: "gauss",
    label: "Campo",
    measure: "gauss",
  },
];

function TableInfo({ tableAriaLabel = "", rows }: InterfaceTableInfoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const [totalVisibleRows, setTotalVisibleRows] = useState(rowsPerView);
  const visibleRows: ClassDBItem[] = rows.slice(0, totalVisibleRows);

  const makeCell = (row: ClassDBItem, key: string) => {
    const caract = row?.fuerza_N;

    switch (key) {
      case "label":
        return (
          <a
            href={"#buscar/" + row.id}
            title="Ver producto"
            className="max-sm:whitespace-normal"
          >
            {row.label}
          </a>
        );
      case "peso":
        return row?.measures?.peso || "-";
      case "fuerza_experimental":
        return row?.especificaciones?.fuerza_experimental || "-";
      case "grade":
        return caract
          ? Object.keys(caract).map((g, i) => <p key={i}>N{g}</p>)
          : "-";
      case "fuerza":
      case "gauss":
        return caract
          ? Object.values(caract).map((v, i) => <div key={i}>{v?.[key]}</div>)
          : "-";

      default:
        return row.hasOwnProperty(key) ? row[key as keyof ClassDBItem] : "-";
    }
  };

  const showMore = () => {
    const total_ = totalVisibleRows + rowsPerView;
    setTotalVisibleRows(total_);
  };

  useEffect(() => {
    if (isInView) showMore();
  }, [isInView]);

  return (
    <div
      data-slot="table-container"
      className={`w-full overflow-x-auto ${scrollStyle}`}
    >
      <table
        aria-label={tableAriaLabel || undefined}
        className="w-full sm:min-w-[750px] max-w-[900px] lg:place-self-center table-dinamic-sm max-sm:border-separate border-spacing-y-3"
      >
        <thead className="border-b-3">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-2">
                {col?.label}
                {col?.measure ? <div>({col?.measure})</div> : null}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {visibleRows.map((row) => (
            <tr
              key={row.id}
              className="even:text-custom2-10 dark:even:text-custom1 group hover:font-semibold hover:bg-secondary/30"
            >
              {columns.map((col) => (
                <td
                  key={`${row.id}_${col?.key}`}
                  data-label={
                    col?.label + (col?.measure ? `(${col?.measure})` : "")
                  }
                  className="p-2 max-sm:first:border-y-3 max-sm:last:border-b-3 max-sm:border-x-3 max-sm:last:rounded-b-lg max-sm:first:rounded-t-lg whitespace-nowrap"
                >
                  {makeCell(row, col.key)}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td className="pt-4">
              {totalVisibleRows < rows.length && (
                <Button
                  ref={ref}
                  size="lg"
                  className="bg-custom1-2 text-custom2--2 font-bold text-xl hover:scale-105"
                  title="Mostrar mas"
                  onPress={() => showMore()}
                >
                  +Mas
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableInfo;
