import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { TABLES_FORMS } from "../consts/values";
import type { ClassDBItem } from "../consts/types";

import { scrollStyle } from "../libs/tvs";
import { filterDbForms } from "../libs/functions";

import TableInfo from "./Caracteristicas/TableInfo";

import { Button } from "@mui/material";

type TypeTableFormItem = {
  id: string;
  label: string;
  measureFormat: string;
  items?: ClassDBItem[];
};

const text_class = "text-danger-300 dark:text-danger-600";

export default function Caracteristicas() {
  const [tabSelected, setTabSelected] = useState(0);
  const [tables, setTables] = useState<TypeTableFormItem[] | []>([]);

  useEffect(() => {
    const tables_: TypeTableFormItem[] = [...TABLES_FORMS];

    tables_.map((table) => (table.items = filterDbForms(table.id)));

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

      <section
        className={
          "max-sm:w-full overflow-x-auto bg-gradient-to-t from-custom2 to-custom2-10 rounded-lg px-2 py-1  shadow-md " +
          scrollStyle
        }
      >
        <motion.ul
          role="tabs-wrapper"
          aria-label="formas de los imanes"
          className="flex w-fit relative gap-2"
        >
          {tables.map((table, i) => (
            <li key={i}>
              <Button
                color="inherit"
                size="small"
                role="tab"
                data-selected={i === tabSelected}
                className="whitespace-nowrap font-semibold data-[selected=true]:text-shadow-md data-[selected=true]:text-custom2 text-shadow-black/30 text-white"
                title={"Ver " + table.label}
                onClick={() => setTabSelected(i)}
              >
                {tabSelected === i && (
                  <motion.div
                    layoutId="highlight-caracteristicas"
                    className="absolute right-0 bottom-0 rounded-lg w-full h-full bg-gradient-to-t from-custom1 to-custom1-3"
                  />
                )}
                <span className="z-10 capitalize">{table.label}</span>
              </Button>
            </li>
          ))}
        </motion.ul>
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={tabSelected}
          role="tabpanel"
          layoutId="content-caracteristicas"
          className="w-full text-center sm:flex flex-col items-center "
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TableInfo
            tableAriaLabel={`Tabla de precios: ${TABLES_FORMS[tabSelected].label}`}
            rows={tables[tabSelected]?.items || []}
          />
        </motion.section>
      </AnimatePresence>
    </>
  );
}
