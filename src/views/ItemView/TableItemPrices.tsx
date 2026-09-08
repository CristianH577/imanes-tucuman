import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { m } from "framer-motion";

import type { TypeOutletContext } from "../../consts/types";
import type { ClassDBItem } from "../../consts/classes";

import {
  capitalizeText,
  downloadContentToImg,
  handlePriceData,
  toPriceFormat,
} from "../../libs/functions";

import { Divider, Button } from "@mui/material";

import ButtonAddCart from "../../components/ButtonAddCart";
import LabelPrice from "../../components/LabelPrice";
import ButtonsStoreOnline from "../../components/ButtonsStoreOnline";
import LabelStockData from "../../components/LabelStockData";
import InputAddCart from "./InputAddCart";

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
  const salesUnit = itemData.priceData.salesUnit || "U";
  const categories = itemData.categorie.map((cat) => capitalizeText(cat));

  const measures = itemData.measures;
  const is_comparable =
    ["neodimio", "ferrita"].includes(itemData.categorie[1]) &&
    (measures?.largo || measures?.diametro) &&
    (measures?.alto || measures?.ancho);

  const rows = pricesQtts
    ? Object.entries(pricesQtts)
      .map(([qtt, price]) => {
        return { qtt: Number(qtt), price: Number(price) };
      })
      .sort((a, b) => a.qtt - b.qtt)
    : [];

  const [qttFix, setQttFix] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeQttFix = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChangeQttFix")
    const qtt = Number(event.target.value);
    itemData.priceData = handlePriceData(itemData.priceData, qtt);
    setQttFix(qtt);
  };
  const handleBlurQttFix = (event: React.FocusEvent<HTMLInputElement>) => {
    let qtt = Number(event.target.value);

    if (
      qtt > 0 &&
      qtt < 1 &&
      !itemData?.priceData?.salesDecimal?.includes(qtt)
    ) {
      qtt = 1;
      itemData.priceData = handlePriceData(itemData.priceData, qtt);
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
    setQttFix(qtt_);
  };

  const handleCopyPrices = async () => {
    const prices = itemData.priceData.pricesQtts;

    if (prices) {
      let text = "➤" + categories.join(" > ") + "\n";

      text += "➤" + itemData.label + "\n";
      text += "➤Precios x"+salesUnit+":\n";

      Object.entries(prices).forEach(([key, val]) => {
        text += toPriceFormat(val);
        text += " = " + toPriceFormat(Number(key) * Number(val))
          + "\n";
      });

      try {
        await navigator.clipboard.writeText(text);
        alert("Texto copiado!");
      } catch (err) {
        // console.error("Error al copiar:", err);
        alert("Error al copiar");
      }
    }
  };

  const handleDownloadImg = () => {
    const label = "lista_de_precios-" + itemData.label;
    downloadContentToImg("lista_de_precios", true, setLoading, label);
  };

  useEffect(() => {
    if (qttCart > 0) {
      itemData.priceData = handlePriceData(itemData.priceData, qttCart);
      setQttFix(qttCart);
    }
  }, []);

  return (
    <m.section
      variants={{
        hidden: { opacity: 0, x: 200 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
          },
        },
      }}
      className="space-y-3"
    >
      <div className="flex gap-2 flex-wrap">
        {is_comparable && (
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
        <h1 className="text-4xl font-semibold">{itemData?.label}</h1>
      </div>
      <Divider />

      <article className="flex flex-wrap gap-3 justify-end">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-4 justify-end items-center bg-custom1/20 dark:bg-content1 p-4 rounded-md transition-all border dark:border-neutral-600 hover:scale-[1.02] hover:border-custom1 hover:shadow-[0_0_8px_#ff8b00] shadow-custom1 select-none place-self-end">
            <LabelPrice
              itemData={itemData}
              classNames={{
                price: "text-custom2 dark:text-custom1 text-2xl",
              }}
            />

            <InputAddCart
              handleAdd={handleButtonInputCart}
              value={qttFix ? String(qttFix) : ""}
              onChange={handleChangeQttFix}
              onBlur={handleBlurQttFix}
              qttCart={qttCart}
            />
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <LabelStockData
              stock={itemData.stock}
              className="text-tert place-self-end"
            />

            {itemData.links && (
              <ButtonsStoreOnline links={itemData.links} complete />
            )}

            <p>
              <a
                href="#faqs"
                title="Ir a preguntas frecuentes"
                className="text-second text-custom2 dark:text-custom1 font-semibold underline"
              >
                *Condiciones de venta
              </a>
              <br />
              <span className="text-xs text-divider/60 font-sans">
                Los precios pueden variar
              </span>
            </p>
          </div>
        </div>

        {pricesQtts && (
          <div className="space-y-4 overflow-hidden">
            <div
              id="lista_de_precios"
              className="w-fit rounded-md bg-white dark:bg-content1 p-3 shadow-md space-y-3 place-self-end"
            >
              <m.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="rounded-md bg-gradient-to-r from-custom1 to-custom1-5 p-2 text-center font-bold shadow-md text-black"
              >
                Precios x{salesUnit}
                {loading && (
                  <>
                    <br />
                    {itemData.label}
                    <br />
                    {categories.join(" > ")}
                  </>
                )}
              </m.p>

              <ol className="flex flex-col gap-3">
                {rows.map((row) => (
                  <m.li
                    key={row.qtt}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="flex items-center justify-center xs:justify-between bg-custom1/20 dark:bg-content2 rounded-md p-2 transition-all border border-neutral-300 dark:border-neutral-500 hover:scale-[1.02] hover:border-custom1 hover:shadow-[0_0_8px_#ff8b00] shadow-custom1 select-none gap-2 flex-wrap"
                    style={{
                      textAlign: loading ? "center" : undefined,
                    }}
                  >
                    <div
                      className="bg-white dark:bg-content1 rounded-md"
                      style={{ display: loading ? "none" : "unset" }}
                    >
                      <ButtonAddCart
                        qtt={row.qtt}
                        qttCart={qttCart}
                        handleAdd={() => {
                          let qtt_ = 0;
                          if (!inCart) {
                            qtt_ = row.qtt;
                          } else {
                            if (qttCart !== row.qtt) qtt_ = row.qtt;
                          }

                          context.cart.add(itemData.id, qtt_);
                          setQttFix(qtt_);
                        }}
                      />
                    </div>

                    <div
                      className="flex items-center gap-2 font-semibold break-keep justify-center flex-1"
                      style={{
                        flexWrap: loading ? undefined : "wrap",
                      }}
                    >
                      <span className="text-customSwitch">
                        x{row.qtt}
                      </span>
                      <span className="text-neutral-500">•</span>
                      <span>{toPriceFormat(row.price)}</span>
                      <span className="text-neutral-500">=</span>
                      <span className="text-custom2-10 dark:text-custom1-5">
                        {toPriceFormat(row.price * row.qtt)}
                      </span>
                    </div>
                  </m.li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap justify-end gap-4">
              <Button
                variant="outlined"
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
                variant="outlined"
                color="info"
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
          </div>
        )}
      </article>
    </m.section>
  );
}
