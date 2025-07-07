import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

import type { ClassDBItem, TypeCartValue } from "../../consts/types";

import { scrollStyle } from "../../libs/tvs";
import { toPriceFormat } from "../../libs/functions";

import { Button } from "@heroui/button";

import ButtonAddCart from "../../components/ButtonAddCart";

import CompareIcon from "@mui/icons-material/Compare";

interface InterfaceTablePricesProps {
  tableAriaLabel: string;
  measureFormat: string;
  rows: ClassDBItem[];
  cart: TypeCartValue;
  setItemToComparate: (itemData: ClassDBItem) => void;
  handleAdd: (itemData: ClassDBItem) => void;
}
const rowsPerView = 10;

export default function TablePrices({
  setItemToComparate = (itemData: ClassDBItem) => {
    itemData;
  },
  tableAriaLabel = "",
  measureFormat = "",
  rows = [],
  cart,
  handleAdd = (itemData: ClassDBItem) => {
    itemData;
  },
}: InterfaceTablePricesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const [totalVisibleRows, setTotalVisibleRows] = useState(rowsPerView);
  const visibleRows: ClassDBItem[] = rows.slice(0, totalVisibleRows);

  const showMore = () => {
    const total_ = totalVisibleRows + rowsPerView;
    setTotalVisibleRows(total_);
  };

  useEffect(() => {
    if (isInView) showMore();
  }, [isInView]);

  return (
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
        aria-label={tableAriaLabel || undefined}
        className="w-full xs:min-w-[750px] text-tert table- max-xs:border-separate border-spacing-y-3"
      >
        <thead className="border-b-3 max-xs:hidden">
          <tr>
            <th className="p-2 border-e-3">
              <p>Medida</p>
              {measureFormat || null}
            </th>

            <th colSpan={4} className="p-2">
              <p>
                Precio(xU)
                <span className="font-size-secondary">Unidades minimas</span>
              </p>
            </th>
          </tr>
        </thead>

        <tbody>
          {visibleRows?.map((item) => {
            const noStock = item?.noStock || false;
            const inCart = item.id in cart;

            return (
              <motion.tr
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                key={item.id}
                className="group hover:font-semibold hover:bg-secondary/30 data-[incart=false]:data-[nostock=true]:bg-divider data-[incart=true]:!bg-success/30 max-xs:grid max-xs:grid-cols-1 max-xs:border-3 max-xs:rounded-lg max-xs:mb-3 xs:even:text-custom2-10 xs:dark:even:text-custom1"
                data-nostock={noStock}
                data-incart={inCart}
              >
                <td className="px-2 py-1 xs:py-2 whitespace-nowrap xs:col-span-2 max-xs:border-b-3 xs:border-e-3 xs:text-start">
                  <div className="flex gap-1 xs:gap-2 justify-end items-center w-full max-xs:flex-col xs:flex-row-reverse break-all">
                    <a
                      href={"#buscar/" + item.id}
                      title="Ver producto"
                      className="max-xs:whitespace-normal hover:underline"
                    >
                      {item.label}
                    </a>

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

                {item?.price_data?.prices_qtts &&
                  Object.entries(item.price_data.prices_qtts).map(
                    ([qtt, price]) => {
                      const inCart_qtt =
                        inCart && cart[item.id].qtt === Number(qtt);
                      return (
                        <td
                          key={`precio_x${qtt}`}
                          className="px-2 py-1 xs:py-2"
                        >
                          <div className="flex flex-col gap-1 xs:gap-2 justify-end items-center">
                            <p className="max-xs:break-all">
                              {toPriceFormat(price)}
                              <span className="font-size-secondary">
                                ({qtt}u)
                              </span>
                            </p>

                            <ButtonAddCart
                              //@ts-ignore
                              size="sm"
                              inCart={inCart_qtt}
                              itemData={item}
                              handleAdd={() => {
                                let qtt_ = 0;
                                if (!inCart_qtt) qtt_ = Number(qtt);
                                item.qtt = qtt_;

                                handleAdd(item);
                              }}
                            />
                          </div>
                        </td>
                      );
                    }
                  )}
              </motion.tr>
            );
          })}

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
    </motion.div>
  );
}
