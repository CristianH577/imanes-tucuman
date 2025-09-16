import { useState } from "react";
import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import type { TypeOutletContext } from "../../consts/types";
import type { ClassDBItem } from "../../consts/classes";

import { handlePriceData, toPriceFormat } from "../../libs/functions";

import { scrollStyle } from "../../libs/tvs";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@mui/material";

import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";
import TableCustom from "../../components/TableCustom";

import ML from "../../assets/layout/ml.webp";
import MS from "../../assets/layout/ms.webp";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CompareIcon from "@mui/icons-material/Compare";

interface IntfProps {
  itemData: ClassDBItem;
}

export default function TableItemPrices({ itemData }: IntfProps) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;
  const inCart = itemData.id in cart;
  const qttCart = inCart ? cart[itemData.id] : 0;
  const pricesQtts = itemData?.price_data?.prices_qtts;
  const salesUnit = itemData.price_data.salesUnit;
  const rows = pricesQtts
    ? Object.entries(pricesQtts)
        .map(([qtt, price]) => {
          return { qtt: Number(qtt), price: Number(price) };
        })
        .sort((a, b) => a.qtt - b.qtt)
    : [];
  const cols = [
    { id: "qtt", label: "Cantidad" },
    {
      id: "price",
      label: "Precio(x1" + (salesUnit ? salesUnit + ")" : "u)"),
    },
    { id: "subtotal", label: "Subtotal" },
    { id: "panel", label: "" },
  ];

  const [qttFix, setQttFix] = useState(0);

  const handleChangeQttFix = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qtt = Number(event.target.value);
    itemData.price_data = handlePriceData(itemData.price_data, false, qtt);
    setQttFix(qtt);
  };
  const handleBlurQttFix = (event: React.ChangeEvent<HTMLInputElement>) => {
    let qtt = Number(event.target.value);
    if (
      qtt > 0 &&
      qtt < 1 &&
      itemData.price_data.salesDecimal &&
      !itemData.price_data.salesDecimal.includes(qtt)
    ) {
      qtt = 1;
      itemData.price_data = handlePriceData(itemData.price_data, false, qtt);
      setQttFix(qtt);
    }
  };

  const handleButtonInputCart = () => {
    let qtt_ = 0;
    if (qttFix) {
      if (qttFix !== qttCart) qtt_ = qttFix;
    } else {
      if (!inCart) qtt_ = 1;
    }

    context.cart.add(itemData.id, qtt_);
  };

  const makeCellContent = (row = { qtt: 0, price: 0 }, col = "") => {
    switch (col) {
      case "qtt":
        return row.qtt + (salesUnit || "");
      case "price":
        return toPriceFormat(row.price);
      case "subtotal":
        return toPriceFormat(row.qtt * row.price);
      case "panel":
        const inCart_qtt = inCart && qttCart === row.qtt;
        return (
          <ButtonAddCart
            size="sm"
            inCart={inCart_qtt}
            handleAdd={() => {
              let qtt_ = 0;
              if (!inCart_qtt) qtt_ = row.qtt;

              context.cart.add(itemData.id, qtt_);
            }}
          />
        );

      default:
        return "-";
    }
  };

  return (
    <motion.section
      variants={{
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0 },
      }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1"
    >
      <article className="col-span-full order-1">
        <div className="flex gap-2">
          {itemData.isComparable && (
            <Button
              color="secondary"
              isIconOnly
              title="Mostrar referencia de tamaño"
              onPress={() => context.setMagnetData(itemData)}
            >
              <CompareIcon className="h-7 w-fit" />
            </Button>
          )}
          <h1 className="text-4xl font-bold pb-2">{itemData?.label}</h1>
        </div>
        <Divider />
      </article>

      <article className="flex flex-col items-end gap-2 sm:gap-4 order-2 md:order-3 lg:order-1 lg:items-">
        {itemData?.noStock && (
          <b className="text-danger text-tert">Sin Stock</b>
        )}

        <div className="flex flex-col items-end gap-2 xs:gap-4 xs:flex-row xs:items-center xs:flex-wrap justify-end">
          <PriceLabel
            itemData={itemData}
            classNames={{
              price: "text-custom2 dark:text-custom1 font-semibold text-4xl",
            }}
          />

          <div className="flex flex-wrap gap-3 items-end xs:flex-row xs:items-center">
            <Input
              type="number"
              min={0}
              isInvalid={false}
              label="Cantidad"
              className="max-w-36"
              classNames={{
                inputWrapper:
                  "border-3 " +
                  (inCart ? "border-success" : "border-custom1-3"),
              }}
              endContent={itemData.price_data.salesUnit || undefined}
              value={qttFix ? String(qttFix) : ""}
              onChange={handleChangeQttFix}
              onBlur={handleBlurQttFix}
            />

            <ButtonAddCart
              inCart={inCart && qttFix === cart[itemData.id]}
              handleAdd={handleButtonInputCart}
            />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:gap-4 sm:flex-wrap">
          <p>
            <a
              href="#faqs"
              title="Ir a preguntas frecuentes"
              className="text-second text-custom2 dark:text-custom1 font-semibold underline"
            >
              *Condiciones de venta
            </a>
            <br />
            <span className="text-xs text-neutral-400">
              Los precios pueden variar
            </span>
          </p>

          {itemData?.links && (
            <div className="flex flex-wrap gap-2 justify-end">
              {itemData.links?.ML && (
                <Button
                  as={"a"}
                  className="bg-[#fee701] font-bold text-blue-900 shadow-md"
                  href={itemData.links.ML}
                  title="Ir a Mercado Libre"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ML} /> MercadoLibre <OpenInNewIcon />
                </Button>
              )}

              {itemData.links?.MS && (
                <Button
                  as={"a"}
                  className="bg-[#e82d88] font-bold text-white shadow-md"
                  href={itemData.links.MS}
                  title="Ir a Mercado Shops"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={MS} /> MercadoShops <OpenInNewIcon />
                </Button>
              )}
            </div>
          )}
        </div>
      </article>

      {pricesQtts && (
        <TableCustom
          aria-label="Tabla de precios"
          columns={cols}
          rows={rows}
          tdLabel
          className={`place-self-end order-3 md:order-2 w-full lg:max-w-full max-w-[90vw] overflow-x-auto table-dinamic bg-custom1/20 sm:p-0 sm:dark:bg-custom2-10/20 ${scrollStyle}`}
          classNames={{
            row: "border-b border-neutral-500/50 hover:bg-violet-500/50 hover:font-semibold",
            td: "first:text-end text-center",
            th: "py-2 !bg-custom1 text-custom2 dark:bg-custom2-10 dark:text-custom1",
            table: "border-spacing-y-2 w-full",
          }}
          // @ts-ignore
          makeCellContent={makeCellContent}
        />
      )}
    </motion.section>
  );
}
