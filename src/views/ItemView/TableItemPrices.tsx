import { useState } from "react";
import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import type { TypeOutletContext } from "../../consts/types";
import type { ClassDBItem } from "../../consts/classes";

import {
  capitalizeText,
  downloadContentToImg,
  getCurrentDate,
  handlePriceData,
  toPriceFormat,
} from "../../libs/functions";

import { scrollStyle } from "../../libs/tvs";

import { Divider, Button, OutlinedInput } from "@mui/material";

import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";
import TableCustom from "../../components/TableCustom";
import StoreOnlineButtons from "../../components/StoreOnlineButtons";

import CompareIcon from "@mui/icons-material/Compare";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface IntfProps {
  itemData: ClassDBItem;
}

export default function TableItemPrices({ itemData }: IntfProps) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;
  const inCart = itemData.id in cart;
  const qttCart = inCart ? cart[itemData.id] : 0;
  const pricesQtts = itemData?.priceData?.pricesQtts;
  const salesUnit = itemData.priceData.salesUnit;
  const categories = itemData.categorie.map((cat) => capitalizeText(cat));
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
  const [loading, setLoading] = useState(false);

  const handleChangeQttFix = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qtt = Number(event.target.value);
    itemData.priceData = handlePriceData(itemData.priceData, false, qtt);
    setQttFix(qtt);
  };
  const handleBlurQttFix = (event: any) => {
    let qtt = Number(event.target.value);
    if (
      qtt > 0 &&
      qtt < 1 &&
      itemData.priceData.salesDecimal &&
      !itemData.priceData.salesDecimal.includes(qtt)
    ) {
      qtt = 1;
      itemData.priceData = handlePriceData(itemData.priceData, false, qtt);
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

  const handleCopyPrices = async () => {
    const prices = itemData.priceData.pricesQtts;

    if (prices) {
      let text = "➤" + categories.join(" > ") + "\n";

      text += "➤" + itemData.label + "\n";
      text += "➤Precios:\n";

      Object.entries(prices).forEach(([key, val]) => {
        text += toPriceFormat(val) + "\t";
        text += "x" + key + (itemData.priceData.salesUnit || "u") + "\t";
        text += "=" + toPriceFormat(Number(key) * Number(val)) + "\n";
      });

      text += "➤Fecha: " + getCurrentDate();

      try {
        await navigator.clipboard.writeText(text);
        alert("Texto copiado!");
      } catch (err) {
        console.error("Error al copiar:", err);
        alert("Error al copiar");
      }
    }
  };

  const handleDownloadImg = () => {
    const label = "lista_de_precios-" + itemData.label;
    downloadContentToImg("lista_de_precios", true, setLoading, label);
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
      <article className={"col-span-full" + (pricesQtts ? " order-1" : "")}>
        <div className="flex gap-2 pb-2">
          {itemData.isComparable && (
            <Button
              color="secondary"
              variant="contained"
              title="Mostrar referencia de tamaño"
              onClick={() => context.setMagnetData(itemData)}
              sx={{ minWidth: 0, px: 1, borderRadius: 2 }}
            >
              <CompareIcon className="h-7 w-fit" />
            </Button>
          )}
          <h1 className="text-4xl font-bold">{itemData?.label}</h1>
        </div>
        <Divider />
      </article>

      <article
        className={
          "flex flex-col items-end gap-2 " +
          (pricesQtts
            ? "sm:gap-4 order-2 md:order-3 lg:order-1"
            : "col-span-full")
        }
      >
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
            <OutlinedInput
              id="input-qtt"
              type="number"
              placeholder="Cantidad"
              color="success"
              className="max-w-36 bg-content1"
              endAdornment={
                itemData.priceData.salesUnit ? (
                  <span className="px-1 text-neutral-400">
                    {itemData.priceData.salesUnit}
                  </span>
                ) : undefined
              }
              inputProps={{
                min: 0,
                "aria-label": "cantidad",
              }}
              classes={{
                notchedOutline:
                  "rounded-lg border-2 " +
                  (inCart ? "border-success" : "border-custom1"),
              }}
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

          {itemData.links && (
            <StoreOnlineButtons links={itemData.links} complete />
          )}
        </div>
      </article>

      {pricesQtts && (
        <article className={"space-y-4 order-3 md:order-2 overflow-hidden"}>
          <TableCustom
            aria-label="Tabla de precios"
            id="lista_de_precios"
            columns={cols}
            rows={rows}
            tdLabel
            className={
              "place-self-end table-dinamic shadow-small " +
              scrollStyle +
              (loading
                ? ""
                : " w-full max-w-[90vw] lg:max-w-full overflow-x-auto")
            }
            classNames={{
              table: "w-full",
              row: "hover:bg-violet-500/50 hover:font-semibold bg-custom1/50 odd:bg-custom1-5/50 dark:bg-custom2-10/40 dark:odd:bg-custom2-10/20 dark:hover:bg-violet-500/50",
              td: "first:text-end text-center",
              th: "py-2 !bg-custom1 text-custom2 dark:bg-custom2-10 dark:text-custom1 last:rounded-br-none first:rounded-bl-none",
              tfoot:
                "bg-custom1 text-custom2 dark:bg-custom2-10 dark:text-custom1",
            }}
            // @ts-ignore
            makeCellContent={makeCellContent}
            tfootContent={
              loading ? (
                <p className="p-2">
                  {itemData.label}
                  <br />
                  {categories.join(" > ")}
                </p>
              ) : undefined
            }
          />

          <div className="flex flex-wrap justify-end gap-4">
            <Button
              variant="contained"
              color="secondary"
              title="Descargar lista como imagen"
              onClick={handleDownloadImg}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                fontFamily: "unset",
                fontWeight: "bold",
              }}
            >
              <SimCardDownloadOutlinedIcon /> Descargar
            </Button>
            <Button
              variant="contained"
              color="primary"
              title="Copiar lista como texto"
              onClick={handleCopyPrices}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                fontFamily: "unset",
                fontWeight: "bold",
              }}
            >
              <ContentCopyIcon /> Copiar
            </Button>
          </div>
        </article>
      )}
    </motion.section>
  );
}
