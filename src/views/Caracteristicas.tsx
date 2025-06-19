import { useEffect, useState } from "react";

import { Tabs, Tab } from "@heroui/react";

import TableInfo from "./Caracteristicas/TableInfo";
import { filterDbForms } from "../libs/functions";
import type { ClassDBItem } from "../consts/types";

type TypeTableMagnetsCaract = {
  form: string;
  measureFormat: string;
  items: ClassDBItem[];
};

const text_class = "text-danger-300 dark:text-danger-600";
const tables_default: TypeTableMagnetsCaract[] = [
  {
    form: "redondo",
    measureFormat: "AxB",
    items: [],
  },
  {
    form: "cuadrado",
    measureFormat: "AxBxC",
    items: [],
  },
  {
    form: "redondo fresado",
    measureFormat: "AxB D-d",
    items: [],
  },
  {
    form: "cuadrado fresado",
    measureFormat: "AxBxC D-d",
    items: [],
  },
];

export default function Caracteristicas() {
  const [tab, setTab] = useState<string>("redondo");
  const [tables, setTables] = useState(tables_default);

  useEffect(() => {
    const tables_ = [...tables_default];

    tables_.map((table) => (table.items = filterDbForms(table.form)));

    setTables(tables_);
  }, []);

  return (
    <>
      <section className="max-w-[80%] text-center space-y-4 font-semibold prose dark:prose-invert">
        <p>
          No contamos con la informacion tecnica precisa.
          <br />
          La fuerza experimental(F. exp.) esta medida mediante la adhesión
          magnética de un peso al imán que a su vez esta adherido a una placa de
          metal de casi 10mm en un sentido vertical.
          <br />
          Los valores de fuerza y gauss por grado son{" "}
          <span className={text_class}>aproximados</span> y bajo{" "}
          <span className={text_class}>condiciones ideales</span>. La
          información es <span className={text_class}>inchequeable</span> y de{" "}
          <span className={text_class}>dudosa</span> procedencia; utilizar solo
          a modo de referencia.
        </p>
      </section>

      <section className="w-full text-center sm:flex flex-col items-center">
        <Tabs
          aria-label="Categorias del imanes"
          classNames={{
            tabList:
              "bg-gradient-to-t from-custom1 to-custom1-3 flex-wrap justify-center shadow-md ",
            tabContent:
              "text-custom2 font-bold group-data-[selected=true]:text-white capitalize",
            cursor: "bg-gradient-to-t from-custom2 to-custom2-10",
            panel: "mt-4 flex flex-col md:items-center w-full md:w-fit",
            tab: "w-fit",
          }}
          selectedKey={tab}
          onSelectionChange={(key) => setTab(String(key))}
        >
          {tables.map((table) => (
            <Tab key={table.form} title={table.form}>
              <TableInfo
                tableAriaLabel={`Tabla de precios: ${table.form}`}
                rows={table.items}
              />
            </Tab>
          ))}
        </Tabs>
      </section>
    </>
  );
}
