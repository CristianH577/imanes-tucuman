import { useState } from "react";
import { useOutletContext } from "react-router";

import { handlePriceData, toPriceFormat } from "../../libs/functions";

import { scrollStyle } from "../../libs/tvs";

import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Link,
} from "@heroui/react";

import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";

import ML from "../../assets/layout/ml.webp";
import MS from "../../assets/layout/ms.webp";
import type { ClassDBItem, TypeOutletContext } from "../../consts/types";

interface InterfaceTableItemPricesPros {
  itemData: ClassDBItem;
}

const cols = [
  { id: "qtt", label: "Cantidad" },
  { id: "price", label: "Precio" },
  { id: "subtotal", label: "Subtotal" },
  { id: "panel", label: "" },
];

export default function TableItemPrices({
  itemData,
}: InterfaceTableItemPricesPros) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;
  const inCart = itemData.id in cart;
  const qttCart = inCart ? cart[itemData.id].qtt : 0;
  const pricesQtts = itemData?.price_data?.prices_qtts;

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

  const makeCell = (col = "", qtt = 0, price = 0) => {
    switch (col) {
      case "qtt":
        return qtt;
      case "price":
        return toPriceFormat(price);
      case "subtotal":
        return toPriceFormat(qtt * price);
      case "panel":
        const inCart_qtt = inCart && qttCart === qtt;
        return (
          <ButtonAddCart
            // @ts-ignore
            size="sm"
            inCart={inCart_qtt}
            itemData={itemData}
            handleAdd={() => {
              let qtt_ = 0;
              if (!inCart_qtt) qtt_ = qtt;
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
    <section className="flex flex-col gap-2 md:gap-4 md:flex-row-reverse lg:flex-col p-2 pt-4 sm:p-4 items-end md:items-start lg:items-end lg:border-2 lg:min-w-64 rounded-lg border-divider h-full">
      <article className=" space-y-2 sm:space-y-4">
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

          <div className="flex flex-col gap-3 items-end xs:flex-row xs:items-center">
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
            <p>Tambien puede comprar por:</p>
            {itemData.links?.ML && (
              <Button
                showAnchorIcon
                as={Link}
                className="bg-[#fee701] font-bold text-blue-900 shadow-md"
                href={itemData.links.ML}
                isExternal
                title="Ir a Mercado Libre"
              >
                <img src={ML} /> Mercado Libre
              </Button>
            )}

            {itemData.links?.MS && (
              <Button
                showAnchorIcon
                as={Link}
                className="bg-[#e82d88] font-bold text-white shadow-md"
                href={itemData.links.MS}
                isExternal
                title="Ir a Mercado Shops"
              >
                <img src={MS} /> Mercado Shops
              </Button>
            )}
          </div>
        )}
      </article>

      {pricesQtts && (
        <Table
          aria-label="Tabla de precios"
          className="max-sm:border-separate border-spacing-y-2 w-fit"
          shadow="none"
          classNames={{
            wrapper: `w-full max-w-[90vw] overflow-auto ${scrollStyle}`,
            th: "text-foreground",
          }}
        >
          <TableHeader>
            {cols.map((col) => (
              <TableColumn key={col.id} className="text-end !text-prima">
                {col.label}
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            {Object.entries(pricesQtts).map(([qtt, price]) => (
              <TableRow key={qtt} className="sm:hover:bg-violet-500/20">
                {cols.map((col) => (
                  <TableCell
                    key={col.id + "-" + qtt}
                    className="first:font-bold text-end !text-prima"
                    data-label={col.label}
                  >
                    {makeCell(col.id, Number(qtt), Number(price))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
