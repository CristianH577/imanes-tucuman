import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

import { TABLES_FORMS } from "../consts/values";
import type { ClassDBItem, TypeOutletContext } from "../consts/types";

import { scrollStyle } from "../libs/tvs";
import { filterDbForms } from "../libs/functions";

import { Button } from "@mui/material";

import TablePrices from "./Imanes/TablePrices";

import {
  SVGRedondoFresadoMeasures,
  SVGCuadradoMeasures,
  SVGRedondoMeasures,
  SVGCuadradoFresadoMeasures,
} from "../assets/svgs/svgsFormas";

type TypeTableFormItem = {
  id: string;
  label: string;
  measureFormat: string;
  items?: ClassDBItem[];
};

const svgs = {
  redondo: SVGRedondoMeasures,
  cuadrado: SVGCuadradoMeasures,
  "redondo fresado": SVGRedondoFresadoMeasures,
  "cuadrado fresado": SVGCuadradoFresadoMeasures,
};

export default function Imanes() {
  const context: TypeOutletContext = useOutletContext();

  const [tabSelected, setTabSelected] = useState(0);
  const [tables, setTables] = useState<TypeTableFormItem[] | []>([]);

  const Svg = svgs[TABLES_FORMS[tabSelected].id as keyof typeof svgs];

  useEffect(() => {
    const tables_: TypeTableFormItem[] = [...TABLES_FORMS];

    tables_.map((table) => (table.items = filterDbForms(table.id)));

    setTables(tables_);
  }, []);

  return (
    <>
      <section className="max-w-[80%] text-center space-y-4 font-semibold prose dark:prose-invert">
        <p>
          <i>Todos</i> los imanes presentados en las tablas son de{" "}
          <i>neodimio</i> de alta potencia y sus medidas están en{" "}
          <i>milímetros</i>.
          <br />
          Seleccione la forma que le interese y revise las medidas y precios. En
          la tabla podrá ver que varia el precio por unidad según la cantidad.
          <br />
          Las medidas con <span className="bg-divider px-1">fondo gris</span> es
          por falta de stock.
          <br />
          Consulte por medidas no listadas.
        </p>

        <p className="font-size-secondary text-neutral-400">
          Los precios pueden variar.
        </p>
      </section>

      <section
        className={
          "max-sm:w-full overflow-x-auto bg-gradient-to-t from-custom2 to-custom2-10 rounded-lg px-2 py-1 shadow-md " +
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
                    layoutId="highlight-imanes"
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
          layoutId="content-imanes"
          className="w-full text-center sm:flex flex-col items-center "
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center h-[250px]">
            <Svg className="w-full h-full" />
          </div>

          <TablePrices
            tableAriaLabel={`Tabla de precios: ${TABLES_FORMS[tabSelected].label}`}
            measureFormat={TABLES_FORMS[tabSelected].measureFormat}
            rows={tables[tabSelected]?.items || []}
            cart={context.cart.value}
            handleAdd={context.cart.add}
            setItemToComparate={context.setMagnetData}
          />
        </motion.section>
      </AnimatePresence>
    </>
  );
}
