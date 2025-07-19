import { useState } from "react";
import { useOutletContext } from "react-router";

import type { ClassDBItem, TypeOutletContext } from "../../consts/types";

import { handlePriceData, toPriceFormat } from "../../libs/functions";

import { scrollStyle } from "../../libs/tvs";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";

import ML from "../../assets/layout/ml.webp";
import MS from "../../assets/layout/ms.webp";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TableCustom from "../../components/TableCustom";

interface InterfaceTableItemPricesPros {
  itemData: ClassDBItem;
}

export default function TableItemPrices({
  itemData,
}: InterfaceTableItemPricesPros) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;
  const inCart = itemData.id in cart;
  const qttCart = inCart ? cart[itemData.id].qtt : 0;
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
    itemData.qtt = qtt;

    itemData.price_data = handlePriceData(itemData);

    setQttFix(qtt);
  };

  const handleButtonInputCart = () => {
    let qtt_ = 0;
    if (qttFix) {
      if (qttFix !== qttCart) qtt_ = qttFix;
    } else {
      if (!inCart) qtt_ = 1;
    }

    itemData.qtt = qtt_;

    context?.cart?.add(itemData);
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
            // @ts-ignore
            size="sm"
            inCart={inCart_qtt}
            itemData={itemData}
            handleAdd={() => {
              let qtt_ = 0;
              if (!inCart_qtt) qtt_ = row.qtt;
              itemData.qtt = qtt_;

              context.cart.add(itemData);
            }}
          />
        );

      default:
        return "-";
    }
  };

  return (
    <section className="w-full flex flex-col gap-2 md:gap-4 md:flex-row-reverse lg:flex-col p-2 sm:p-4 items-end md:items-start lg:items-center lg:border-2 lg:min-w-64 rounded-lg border-divider h-full">
      <article className="space-y-2 sm:space-y-4 lg:self-end">
        <div className="flex flex-col gap-2 justify-center items-end sm:gap-4">
          {itemData?.noStock && (
            <b className="text-danger text-tert">Sin Stock</b>
          )}

          <PriceLabel
            itemData={itemData}
            classNames={{
              price: "text-custom2 dark:text-custom1 font-semibold text-4xl",
            }}
          />

          <div className="flex flex-wrap gap-3 items-end xs:flex-row xs:items-center">
            <Input
              type="number"
              label="Cantidad"
              className="max-w-36"
              classNames={{
                inputWrapper: "border-3 border-custom1-3",
              }}
              endContent={itemData.price_data.salesUnit || undefined}
              value={qttFix ? String(qttFix) : ""}
              onChange={handleChangeQttFix}
            />

            <ButtonAddCart
              inCart={inCart}
              itemData={itemData}
              handleAdd={handleButtonInputCart}
            />
          </div>

          <a
            href="#faqs"
            title="Ir a preguntas frecuentes"
            className="text-second text-custom2 dark:text-custom1 font-semibold underline"
          >
            *Condiciones de venta
          </a>
        </div>

        {itemData?.links && (
          <div className="place-self-center xs:place-self-end flex flex-col gap-3">
            {itemData.links?.ML && (
              <Button
                as={"a"}
                className="bg-[#fee701] font-bold text-blue-900 shadow-md"
                href={itemData.links.ML}
                title="Ir a Mercado Libre"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={ML} /> Mercado Libre <OpenInNewIcon />
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
                <img src={MS} /> Mercado Shops <OpenInNewIcon />
              </Button>
            )}
          </div>
        )}
      </article>

      {pricesQtts && (
        <TableCustom
          aria-label="Tabla de precios"
          columns={cols}
          rows={rows}
          tdLabel
          className={`lg:max-w-full max-w-[90vw] overflow-x-auto table-dinamic !p-3 ${scrollStyle}`}
          classNames={{
            row: "border-b border-neutral-500/50 hover:bg-violet-500/50 hover:font-semibold",
            td: "first:text-end text-center",
            th: "py-2",
            table: "border- border-spacing-y-2",
          }}
          // @ts-ignore
          makeCellContent={makeCellContent}
        />
      )}
    </section>
  );
}
