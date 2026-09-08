import { useState } from "react";
import { m } from "framer-motion";

import type { TypeCart } from "../../consts/types";
import type { ClassDBItem } from "../../consts/classes";

import { toPriceFormat } from "../../libs/functions";

import { Button } from "@mui/material";

import ButtonAddCart from "../../components/ButtonAddCart";
import TooltipFuerzaExp from "../../components/TooltipFuerzaExp";

import CompareIcon from "@mui/icons-material/Compare";

interface InterfaceTablePricesProps {
  tableAriaLabel?: string;
  measureFormat: string;
  rows: ClassDBItem[];
  cart: TypeCart;
  setItemToComparate: (itemData: ClassDBItem) => void;
  addCart: (id: number, qtt: number) => void;
}
const rowsPerView = 15;

export default function TableImanesPrices({
  setItemToComparate = (itemData: ClassDBItem) => {
    itemData;
  },
  tableAriaLabel,
  measureFormat = "",
  rows,
  cart,
  addCart,
}: InterfaceTablePricesProps) {
  const [totalVisibleRows, setTotalVisibleRows] = useState(rowsPerView);
  const visibleRows: ClassDBItem[] = rows.slice(0, totalVisibleRows);

  const showMore = () => {
    const total_ = totalVisibleRows + rowsPerView;
    setTotalVisibleRows(total_);
  };

  return (
    <m.ol
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-4 font-semibold max-w-4xl md:place-self-center"
      aria-label={tableAriaLabel}
    >
      <li className="grid xs:grid-cols-6 gap-2 text-black">
        <m.p className="xs:col-span-2 sm:col-span-1 rounded-md bg-gradient-to-r from-custom1 to-custom1-5 p-2 text-center font-bold shadow-md">
          Medida{" "}
          {measureFormat && (
            <span>
              <br />
              {measureFormat}
            </span>
          )}
        </m.p>

        <m.p className="xs:col-span-4 sm:col-span-5 rounded-md bg-gradient-to-r from-custom1 to-custom1-5 p-2 text-center font-bold shadow-md content-center">
          Precio (xU)
          <span className="font-size-secondary">Unidades minimas</span>
        </m.p>
      </li>

      {visibleRows?.map((item) => {
        const stock = item?.stock === 0 ? false : true;
        const measures = item.measures;
        const is_comparable =
          (measures?.largo || measures?.diametro) &&
          (measures?.alto || measures?.ancho);
        return (
          <m.li
            key={item.id}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: stock ? 1 : 0.5,
              },
            }}
            whileHover={{ opacity: 1 }}
            className="grid xs:grid-cols-6 gap-2 bg-custom1/20 dark:bg-content1 rounded-md p-3 transition-all border border-neutral-300 dark:border-neutral-500 hover:scale-[1.02] hover:border-custom1 hover:shadow-[0_0_8px_#ff8b00] shadow-custom1 select-none"
          >
            <div className="xs:col-span-2 sm:col-span-1 flex flex-wrap gap-2 items-center justify-center content-center">
              <Button
                color="secondary"
                variant="contained"
                size="small"
                title="Ver referencia de tamaños"
                disabled={!is_comparable}
                onClick={() => setItemToComparate(item)}
                sx={{ minWidth: 0, px: 0.5, borderRadius: 2 }}
              >
                <CompareIcon className="h-5 w-fit" />
              </Button>

              <a
                href={"#buscar/" + item.id}
                title="Ver producto"
                className="break-all hover:underline"
              >
                {" "}
                {item.label}
              </a>

              {item.measures && item.measures.fuerzaExp && (
                <>
                  <p>≈{item.measures.fuerzaExp}kg</p>
                  <TooltipFuerzaExp exp />
                </>
              )}
            </div>

            <div className="xs:col-span-4 sm:col-span-5 flex flex-wrap justify-center sm:justify-between content-center md:grid md:grid-cols-5">
              {item?.priceData?.pricesQtts &&
                Object.entries(item.priceData.pricesQtts).map(
                  ([qtt, price]) => (
                    <div key={`precio_x${qtt}`} className="py-1 px-2">
                      <div className="flex flex-col gap-1 xs:gap-2 justify-end items-center">
                        <p className="flex items-center gap-0.5">
                          {toPriceFormat(price)}
                          <span className="text-second"> ({qtt}u)</span>
                        </p>

                        <ButtonAddCart
                          qtt={Number(qtt)}
                          qttCart={cart[item.id]}
                          handleAdd={() => {
                            let qtt_ = 0;
                            if (
                              !(
                                item.id in cart && cart[item.id] === Number(qtt)
                              )
                            )
                              qtt_ = Number(qtt);
                            addCart(item.id, qtt_);
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </m.li>
        );
      })}

      {totalVisibleRows < rows.length && (
        <m.li
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <Button
            color="warning"
            variant="contained"
            className="text-tert hover:scale-[1.02] transition-transform shadow-sm"
            title="Mostrar mas"
            onClick={() => showMore()}
            sx={{
              width: "100%",
            }}
          >
            ▼
          </Button>
        </m.li>
      )}
    </m.ol>
  );
}
