import { isValidElement, useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router";

import listJson from "../assets/jsons/faqs.json";
import type { TypeOutletContext } from "../consts/types";

import { searchParamsToObj, toPlainText } from "../libs/functions";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import Pagos from "./Faqs/Pagos";
import Envios from "./Faqs/Envios";
import InputSearch from "../components/InputSearch";
import LinkCustom from "../components/LinkCustom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type TypeListFaqs = {
  title: string;
  content: string | React.ReactNode;
  tags?: string[];
};

export default function Faqs() {
  const context: TypeOutletContext = useOutletContext();
  const { search } = useLocation();

  const list: TypeListFaqs[] = [
    {
      title: "Como recibo mi producto?",
      content: (
        <Envios
          links={{
            googlemaps: context.links.googlemaps,
            whatsapp: context.links.whatsapp,
            googlemaps_indicaciones: context.links.googlemaps_indicaciones,
          }}
        />
      ),
      tags: [
        "retiro",
        "mapa",
        "horario",
        "consulta",
        "entrega",
        "uber",
        "envio",
        "ubicacion",
        "llegar",
      ],
    },
    {
      title: "Cuales son las formas de pago?",
      content: <Pagos />,
      tags: [
        "tarjeta",
        "tienda online",
        "mercado",
        "libre",
        "credito",
        "debito",
        "transferencia",
      ],
    },
    {
      title: "Pedidos grandes",
      content: (
        <article>
          <p>Los pedidos de 500 o más unidades pueden conllevar:</p>
          <ul className="list-disc">
            <li>Una seña de entre un 30-50%.</li>
            <li>Un costo de envio de entre $2000-$80000 aprox.</li>
            <li>Un tiempo de entrega de 1 a 3 semanas.</li>
          </ul>
        </article>
      ),
    },
    {
      title: "Como se consigue la mayor fuerza de atracción del imán?",
      content: (
        <ol className="list-disc">
          {[
            "Adhiriéndolo a materiales 100% ferromagnéticos (no se logra con otros materiales, fundición, acero inoxidable, bronce, cobre, aluminio, latón, oro, plata, etc.)",
            "Adhiriendo el 100% de la superficie (no se logra si se adhiere en forma parcial o en una superficie curva, garrafa, caño de bicicleta, llanta, varilla redonda, etc.)",
            "En elementos con más de 10mm de espesor (no se logra en una heladera, lavarropas, zinguería, chapas finas o similar, ya que el imán no tiene el material necesario para ejercer campo magnético)",
            "Evitando cualquier tipo de material entre el imán y la superficie metálica",
            "Evitando superficies sucias, pintadas, oxidadas restaran poder de atracción",
            "Los Kg de atracción indicados son en forma horizontal (si se adhiere a una superficie vertical, el imán tendrá alrededor del 30% de la fuerza)",
          ].map((item, i) => (
            <li key={i}>{item}.</li>
          ))}
        </ol>
      ),
      tags: ["potencia", "arrastre"],
    },
    {
      title: "Con que se pueden pegar los imanes de neodimio?",
      content: (
        <ol className="list-decimal">
          {[
            "Epoxi bicomponente(poxipol)",
            "Cianoacrilato(Gotita)",
            "Pegamento de poliuretano",
            "Pegamento multiproposito(unipox, pulpito, etc.)",
            "Silicona industrial/acética",
            "Silicona fría/caliente(poco efectivo)",
            "Cinta doble faz(poco efectivo)",
          ].map((item, i) => (
            <li key={i}>{item}.</li>
          ))}
        </ol>
      ),
    },
    {
      title: "Que usos tienen los imanes de neodimio?",
      content: (
        <>
          <ol className="list-disc">
            {[
              "Sostener o colgar objetos",
              "Separación de materiales",
              "Limpieza fin de obra (clavos, tornillos, virutas metálicas, trozos de alambre, etc.)",
              "Cierres para accesorios, cortinas, etc",
              "Crear objetos o juegues desarmables",
              "Detectar perfiles o columnas detrás de placas de Durlock",
              "Detección de oro falso",
              "Mantener cerradas puertas sin trabas",
              "Pesca magnética: recuperación de objetos ferro magnéticos caídos al mar, ríos, lagunas, cámaras sépticas, pozos ciegos o dentro de cañerías",
              "Detección de impurezas en procesos industriales o alimenticios",
              "Otros usos industriales específicos",
              "Motores, sensores, generadores, micrófonos, altavoces, etc.",
            ].map((cond, i) => (
              <li key={i}>{cond}.</li>
            ))}
          </ol>

          <p className="mt-4">
            Encuentre algunas ideas sobre lo que se puede hacer con imanes en la
            pagina de{" "}
            <LinkCustom
              href={context?.links?.facebook}
              title="Ir a la pagina de Facebook"
            >
              Facebook
            </LinkCustom>{" "}
            o en la pagina de{" "}
            <LinkCustom href="#uya" title="Ir a U&A" target="_self">
              Usos y aplicaciones
            </LinkCustom>
            .
          </p>
        </>
      ),
    },
    {
      title: "Sugerencias",
      content: (
        <ol className="list-disc">
          {[
            "El neodimio(NdFeB)(neodimio, hierro y boro) es un compuesto artificial que si bien es muy duro, es frágil ante los golpes",
            "Si se va a usar para recoger objetos chicos es recomendable primero poner el imán dentro de una bolsa de nylon para facilitar quitar lo adherido",
            "Al quitar un iman es recomendable deslizar hacia un lado antes de levantarlo",
            "Mantenga alejado de tarjetas con banda magnética",
          ].map((item, i) => (
            <li key={i}>{item}.</li>
          ))}
        </ol>
      ),
    },

    ...listJson,
  ].sort((a, b) => a.title.localeCompare(b.title));

  const [items, setItems] = useState(list);
  const [inputText, setInputText] = useState("");

  const handleSearch = (text?: string) => {
    const text_search = text || inputText || "";
    const text_search_formated = toPlainText(text_search);

    const items_ = list.filter((item) => {
      const title_bool = toPlainText(item.title).includes(text_search_formated);
      if (title_bool) return true;

      const tags = item?.tags?.some((tag) =>
        tag.includes(text_search_formated)
      );
      if (tags) return true;

      const content_text = extractText(item.content);
      const content_bool =
        toPlainText(content_text).includes(text_search_formated);
      return content_bool;
    });

    setItems(items_);
  };

  // @ts-ignore
  const extractText = (node) => {
    if (typeof node === "string" || typeof node === "number") {
      return node.toString();
    }

    if (Array.isArray(node)) {
      return node.map(extractText).join(" ");
    }

    if (isValidElement(node)) {
      // @ts-ignore
      return extractText(node.props.children);
    }

    return "";
  };

  useEffect(() => {
    if (search) {
      const params = searchParamsToObj(search);

      if (params.search) {
        setInputText(params.search);
        handleSearch(params.search);
      }
    }
  }, [search]);

  return (
    <>
      <section className="max-w-[80%] text-center space-y-2">
        <b>
          Cualquier duda que no se responda en esta sección puede consultarla
          por las{" "}
          <span
            title="Ir a redes"
            className="font-bold text-custom1--9 dark:text-custom1 hover:underline cursor-pointer"
            onClick={() => {
              const e = document.querySelector("#footer");
              if (e) e.scrollIntoView();
            }}
          >
            redes
          </span>
          .
        </b>
      </section>

      <InputSearch
        value={inputText}
        setValue={setInputText}
        handleSearch={() => handleSearch()}
      />

      {items.length < 1 ? (
        <b>Sin resultados</b>
      ) : (
        <section className="w-full max-w-[900px]">
          {items.map((item, idx) => (
            <Accordion
              key={idx}
              className="w-full bg-content1 text-foreground dark:shadow-none hover:bg-custom1/20 dark:hover:bg-custom2-10/50 transition-colors"
              classes={{ expanded: "bg-custom1/10 dark:bg-custom2-10/20" }}
            >
              <AccordionSummary
                id={"panel-header " + idx}
                aria-controls={"panel-content " + idx}
                expandIcon={<ExpandMoreIcon className="text-foreground" />}
                className="font-semibold"
              >
                {item.title}
              </AccordionSummary>

              <AccordionDetails className="prose dark:prose-invert data-[open=true]:border-y-4 border-custom2 dark:border-custom1 whitespace-pre-line">
                {item.content}
              </AccordionDetails>
            </Accordion>
          ))}
        </section>
      )}
    </>
  );
}
