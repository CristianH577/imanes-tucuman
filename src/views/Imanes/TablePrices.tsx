import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

import type { TypeCart } from "../../consts/types";
import type { ClassDBItem } from "../../consts/classes";

import { scrollStyle } from "../../libs/tvs";
import { toPriceFormat } from "../../libs/functions";

import { Button } from "@mui/material";

import ButtonAddCart from "../../components/ButtonAddCart";

import CompareIcon from "@mui/icons-material/Compare";
import TooltipFuerzaExp from "../../components/TooltipFuerzaExp";

interface InterfaceTablePricesProps {
  tableAriaLabel: string;
  measureFormat: string;
  rows: ClassDBItem[];
  cart: TypeCart;
  setItemToComparate: (itemData: ClassDBItem) => void;
  handleAdd: (id: number, qtt: number) => void;
}
const rowsPerView = 15;

export default function TablePrices({
  setItemToComparate = (itemData: ClassDBItem) => {
    itemData;
  },
  tableAriaLabel = "",
  measureFormat = "",
  rows = [],
  cart,
  handleAdd,
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
        <thead className="border-b-4 max-xs:hidden">
          <tr>
            <th className="p-2 border-e-4">
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
                className="group hover:font-semibold hover:bg-secondary/30 data-[incart=false]:data-[nostock=true]:bg-divider/15 data-[incart=true]:!bg-success/30 max-xs:grid max-xs:grid-cols-1 max-xs:border-2 max-xs:rounded-lg max-xs:mb-3 xs:even:text-custom2-10 xs:dark:even:text-custom1"
                data-nostock={noStock}
                data-incart={inCart}
              >
                <td className="px-2 py-1 xs:py-2 whitespace-nowrap xs:col-span-2 max-xs:border-b-4 xs:border-e-4 xs:text-start">
                  <div className="flex flex-col gap-1 xs:gap-2 items-center w-full break-all max-xs:py-1 xs:flex-row">
                    <Button
                      color="secondary"
                      variant="contained"
                      size="small"
                      className="shadow-md"
                      title="Ver referencia de tamaños"
                      disabled={!item.isComparable}
                      onClick={() => setItemToComparate(item)}
                      sx={{ minWidth: 0, px: 1, borderRadius: 2 }}
                    >
                      <CompareIcon className="h-7 w-fit" />
                    </Button>

                    <a
                      href={"#buscar/" + item.id}
                      title="Ver producto"
                      className="max-xs:whitespace-normal hover:underline"
                    >
                      {item.label}
                    </a>
                  </div>

                  {item.measures && item.measures.fuerzaExp && (
                    <p className="text-center mt-1">
                      <TooltipFuerzaExp exp /> ≈{item.measures.fuerzaExp}kg
                    </p>
                  )}
                </td>

                {item?.priceData?.pricesQtts &&
                  Object.entries(item.priceData.pricesQtts).map(
                    ([qtt, price]) => {
                      const inCart_qtt =
                        inCart && cart[item.id] === Number(qtt);
                      return (
                        <td key={`precio_x${qtt}`} className="p-2">
                          <div className="flex flex-col gap-1 xs:gap-2 justify-end items-center">
                            <p className="max-xs:break-all">
                              {toPriceFormat(price)}
                              <span className="font-size-secondary">
                                ({qtt}u)
                              </span>
                            </p>

                            <ButtonAddCart
                              inCart={inCart_qtt}
                              handleAdd={() => {
                                let qtt_ = 0;
                                if (!inCart_qtt) qtt_ = Number(qtt);
                                handleAdd(item.id, qtt_);
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
            <td className="py-4">
              {totalVisibleRows < rows.length && (
                <Button
                  ref={ref}
                  size="large"
                  className="bg-custom1-2 text-custom2 text-xl hover:scale-105"
                  title="Mostrar mas"
                  onClick={() => showMore()}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    fontFamily: "unset",
                    fontWeight: "bold",
                  }}
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
