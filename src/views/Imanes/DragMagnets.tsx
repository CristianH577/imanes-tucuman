import { motion } from "framer-motion";

import type {
  ClassDBItem,
  TypeCartValue,
  TypeMeasures,
} from "../../consts/types";

import { scrollStyle } from "../../libs/tvs";

import { Button } from "@heroui/react";

import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";

import CompareIcon from "@mui/icons-material/Compare";

import { SVGDragMagnetMeasures } from "../../assets/svgs/svgsFormas";

interface InterfaceDragMagnetsProps {
  rows: ClassDBItem[];
  cart: TypeCartValue;
  setItemToComparate: (itemData: ClassDBItem) => void;
  handleAdd: (itemData: ClassDBItem) => void;
}

const cols = [
  { id: "alto", label: "B", measure: "mm" },
  { id: "alto total", label: "C", measure: "mm" },
  { id: "peso", label: "Peso", measure: "g" },
  { id: "fuerza", label: "Fuerza", measure: "kg" },
];

const class_td =
  "p-2 data-[incart=false]:group-hover:bg-secondary/30 data-[nostock=true]:bg-divider data-[incart=true]:!bg-success/30";
const class_td_dinamyc =
  "max-sm:last:border-b-3 max-sm:border-x-3 max-sm:last:rounded-b-lg";

export default function DragMagnets({
  rows,
  cart,
  setItemToComparate,
  handleAdd,
}: InterfaceDragMagnetsProps) {
  return (
    <>
      <div className="flex items-center justify-center h-[250px]">
        <SVGDragMagnetMeasures className="h-full w-full max-h-[250px]" />
      </div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: 0.1,
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        data-slot="table-container"
        className={"w-full overflow-x-auto " + scrollStyle}
      >
        <table
          aria-label="Tabla de precios: imanes de arrastre"
          className="w-full sm:min-w-[750px] text-tert table-dinamic max-sm:border-separate border-spacing-y-3 lg:w-fit lg:place-self-center"
        >
          <thead className="border-b-3">
            <tr>
              <th className="p-2 border-e-3">A</th>

              {cols.map((col) => (
                <th key={col.id} className="p-2">
                  <div className="flex flex-col gap-1">
                    <span className="capitalize">{col.label}</span>(
                    {col.measure})
                  </div>
                </th>
              ))}

              <th className="p-2 text-end">Precio</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item) => {
              const noStock = item?.noStock;
              const inCart = item.id in cart;

              return (
                <motion.tr
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: {
                      opacity: 1,
                      x: 0,
                    },
                  }}
                  className="even:text-custom2-10 dark:even:text-custom1 group hover:font-semibold"
                >
                  <td
                    className={
                      "text-start whitespace-nowrap sm:border-e-3 max-sm:border-3 max-sm:rounded-t-lg " +
                      class_td
                    }
                    data-incart={inCart}
                    data-nostock={noStock}
                  >
                    <div className="flex gap-2 justify-end items-center w-full sm:flex-row-reverse">
                      <span>{item.label}</span>
                      <Button
                        color="secondary"
                        isIconOnly
                        className="shadow-md"
                        title="Ver referencia de tamaños"
                        onPress={() => setItemToComparate(item)}
                      >
                        <CompareIcon className="h-7 w-fit" />
                      </Button>
                    </div>
                  </td>

                  {cols.map((col) => (
                    <td
                      key={`${item.id}_${col.id}`}
                      className={class_td_dinamyc + " " + class_td}
                      data-incart={inCart}
                      data-nostock={noStock}
                      data-label={`${col.label}(${col.measure})`}
                    >
                      {item.measures?.[col.id as keyof TypeMeasures] || "-"}
                    </td>
                  ))}

                  <td
                    className={class_td_dinamyc + " " + class_td}
                    data-incart={inCart}
                    data-nostock={noStock}
                    data-label="Precio"
                  >
                    <PriceLabel itemData={item} />
                  </td>

                  <td
                    className={class_td_dinamyc + " " + class_td}
                    data-incart={inCart}
                    data-nostock={noStock}
                    data-label=""
                  >
                    <ButtonAddCart
                      inCart={inCart}
                      itemData={item}
                      handleAdd={() => {
                        let qtt_ = 0;
                        if (!inCart) qtt_ = 1;
                        item.qtt = qtt_;

                        handleAdd(item);
                      }}
                    />
                  </td>
                </motion.tr>
              );
            })}

            <tr>
              <td colSpan={4} className="pt-4"></td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </>
  );
}
