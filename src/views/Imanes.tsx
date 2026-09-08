import { useOutletContext } from "react-router";

import type { TypeOutletContext, TypeTableFormItem } from "../consts/types";

import { filterDbForms } from "../libs/functions";

import TabsCustom from "../components/TabsCustom";
import TablePrices from "./Imanes/TableImanesPrices";

import {
  SVGCuadradoMeasures,
  SVGRectangularFresadoMeasures,
  SVGRectangularMeasures,
  SVGRedondoFresadoMeasures,
  SVGRedondoMeasures,
} from "../assets/svgs/svgsFormas";

const TABLES_FORMS: TypeTableFormItem[] = [
  {
    label: "redondos",
    measureFormat: "DxH",
    form: "redondo",
    exclude: ["fresado", "arrastre"],
    icon: SVGRedondoMeasures,
  },
  {
    icon: SVGRedondoFresadoMeasures,
    label: "redondos fresados",
    measureFormat: "DxH Ds-Di",
    form: "redondo",
    include: ["fresado"],
  },
  {
    icon: SVGRectangularMeasures,
    label: "rectangulares",
    measureFormat: "LxAxH",
    form: "rectangular",
    exclude: ["fresado"],
  },
  {
    icon: SVGRectangularFresadoMeasures,
    label: "rectangulares fresados",
    measureFormat: "LxAxH Ds-Di",
    form: "rectangular",
    include: ["fresado"],
  },
  {
    icon: SVGCuadradoMeasures,
    label: "cuadrados",
    measureFormat: "LxLxH",
    form: "cuadrado",
  },
];

export default function Imanes() {
  const context: TypeOutletContext = useOutletContext();

  const tabs = TABLES_FORMS.map((table) => {
    const Svg = table.icon;
    const items = filterDbForms(table) || [];
    const content = (
      <>
        <div className="flex items-center justify-center h-[250px]">
          <Svg className="w-full h-full" />
        </div>

        <TablePrices
          tableAriaLabel={`Tabla de precios: ${table.label}`}
          measureFormat={table.measureFormat}
          rows={items}
          cart={context.cart.value}
          addCart={context.cart.add}
          setItemToComparate={context.setMagnetData}
        />
      </>
    );

    return { label: table.label, content: content };
  });

  return (
    <>
      <section className="max-w-xl text-center space-y-4 font-semibold prose dark:prose-invert">
        <p>
          <i>Todos</i> los imanes presentados en las tablas son de{" "}
          <i>neodimio</i> de alta potencia y sus medidas están en{" "}
          <i>milímetros</i>.
          <br />
          Seleccione la forma que le interese y revise las medidas y precios. En
          la tabla podrá ver que varia el precio por unidad según la cantidad.
          <br />
          Las medidas con menos opacas es por falta de stock.
          <br />
          Consulte por medidas no listadas.
        </p>

        <p className="font-size-secondary text-neutral-400">
          Los precios pueden variar.
        </p>
      </section>

      <TabsCustom
        ariaLAbel="Panel de formas de imanes"
        tabs={tabs}
        classes={{
          contentWrapper: "text-center",
          tabsWrapper: "sm:place-self-center",
        }}
      />
    </>
  );
}
