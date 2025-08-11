import { useState } from "react";
import { useOutletContext } from "react-router";
import { toPng } from "html-to-image";

import { handlePriceData, toPriceFormat } from "../libs/functions";

import { DB_ALL } from "../consts/dbs";
import type { TypeOutletContext } from "../consts/types";

import { Button } from "@heroui/button";
import { CircularProgress, Tooltip } from "@mui/material";

import Estimate from "./CartView/Estimate";

import SendIcon from "@mui/icons-material/Send";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";

import { SVGBroom } from "../assets/svgs/svgsIcons";

export default function CartView() {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  const [downloading, setDownloading] = useState(false);
  const [entrega, setEntrega] = useState({
    value: "retiro",
    label: "Voy a retirar",
    following: false,
  });

  const handleSend = () => {
    const items_msg = ["Hola. Me interesa hacer este pedido:\n"];
    items_msg.push(`*${entrega.label}\n`);

    if (entrega.following) {
      items_msg.push(`*Sigo las redes.\n`);
    }

    let total: number = 0;
    let items = DB_ALL.filter((item) => item.id in cart);
    items = JSON.parse(JSON.stringify(items));

    items.forEach((item) => {
      const array = [];
      const qtt = cart[item.id] || 0;
      const priceData = handlePriceData(
        item.price_data,
        entrega.following && item.categorie[0] === "imanes",
        qtt
      );
      const use = priceData.usePrice;
      const price = priceData.prices[use] || 0;
      const subtotal = price * qtt;
      const label = item?.label;

      total += subtotal;

      array.push(item.id + " -");
      array.push(label + " =>");
      array.push(toPriceFormat(price));
      array.push(`x${qtt}${priceData.salesUnit || "u"}`);
      array.push(`= ${toPriceFormat(subtotal)}`);
      const list_text = array.join(" ");

      items_msg.push(list_text);
    });

    const total_str = toPriceFormat(total);

    items_msg.push(`Total ${total_str}`);

    const msg = items_msg.join("\n");
    const encoded_message = encodeURIComponent(msg);
    const url = `${context.links?.whatsapp}&text=${encoded_message}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.focus();
    // console.log(decodeURIComponent(encoded_message));
  };

  const getDate = () => {
    const fechaActual = new Date();

    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");

    const horas = String(fechaActual.getHours()).padStart(2, "0");
    const minutos = String(fechaActual.getMinutes()).padStart(2, "0");

    return `${año}/${mes}/${dia}-${horas}:${minutos}`;
  };

  const downloadEstimate = async () => {
    const ref = document.querySelector("#presupuesto");
    const bg = document.body.classList.contains("dark") ? "black" : "white";
    if (ref) {
      const date = getDate();
      setDownloading(true);

      const configs = {
        backgroundColor: bg,
        pixelRatio: 2,
      };

      setTimeout(async () => {
        try {
          // @ts-ignore
          const dataUrl = await toPng(ref, configs);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `presupuesto-imanes_tucuman-${date}.png`;
          link.click();
        } catch (error) {
          console.error("Error al generar la imagen:", error);
        }
        setDownloading(false);
      }, 200);
    }
  };

  const buttonConsole = [
    {
      label: "Limpiar lista",
      icon: SVGBroom,
      color: "default",
      onPress: () => context.cart.set({}),
    },
    {
      label: "Descargar como imagen",
      icon: SimCardDownloadOutlinedIcon,
      color: "secondary",
      onPress: downloadEstimate,
    },
    {
      label: "Continuar por WhatsApp",
      icon: SendIcon,
      color: "primary",
      onPress: handleSend,
    },
  ];

  return (
    <>
      <section className="text-center">
        Cuanto termine de revisar la lista envié el pedido y será redirigido a
        whatsapp para continuar.
        <br />
        Los pedidos de 500 o más unidades pueden conllevar una seña y/o costo de
        envío y tiempo de espera.
      </section>

      <section className={`overflow-hidden max-xs:px-2 `}>
        <Estimate
          downloading={downloading}
          entrega={entrega}
          setEntrega={setEntrega}
        />

        {downloading && (
          <span className="bg-black/50 absolute inset-0 z-10 flex items-center justify-center">
            <CircularProgress size="lg" color="secondary" />
          </span>
        )}
      </section>

      <section className="flex gap-2 items-center max-xs:px-2 max-xs:flex-wrap">
        {buttonConsole.map((button, i) => (
          <Tooltip key={i} title={button.label} arrow>
            <span>
              <Button
                // @ts-ignore
                color={button.color}
                isIconOnly
                className="p-2 max-xs:w-full"
                isDisabled={Object.keys(cart)?.length < 1 || downloading}
                onPress={button?.onPress || null}
              >
                {button?.icon ? <button.icon className="h-full w-fit" /> : null}
              </Button>
            </span>
          </Tooltip>
        ))}
      </section>

      <p className="font-size-secondary text-neutral-400 sm:hidden">
        Si esta usando un dispositivo móvil y quiere descargar el pedido en una
        imagen es recomendable estar conectado a una red wifi dado que la imagen
        generada tendrá un peso considerable.
      </p>
    </>
  );
}
