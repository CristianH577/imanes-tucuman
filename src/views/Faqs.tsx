import { isValidElement, useState } from "react";
import { useOutletContext } from "react-router";

import type { TypeOutletContext } from "../consts/types";

import { Accordion, AccordionItem } from "@heroui/react";

import LinkCustom from "../components/LinkCustom";
import Pagos from "./Faqs/Pagos";
import Envios from "./Faqs/Envios";
import InputSearch from "../components/InputSearch";

import EmergencyIcon from "@mui/icons-material/Emergency";

function Faqs() {
  const context: TypeOutletContext = useOutletContext();

  const list = [
    {
      title: "Cuales son las condiciones de venta?",
      content: (
        <p>
          Los productos pueden traer defectos de fabrica, revíselos al comprar.
          <br />
          Las fuerzas y medidas mostradas son aproximadas y pueden variar
          ligeramente.
        </p>
      ),
    },
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
      title: "Los productos tienen garantia?",
      content: (
        <>
          Los productos no son reembolsables pero tienen 1 semana de garantía
          para cambios siempre y cuando no hayan sido usados y estén en
          condiciones. Esto no aplica para el iman en tira y plancha que deben
          ser cortados.
          <br />
          Los productos pueden traer algún pequeño defecto de forma de fabrica,
          recuerde revisar o avisar si esto es un problema.
        </>
      ),
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
      title: "Cual es la diferencia entre los imanes de ferrita y neodimio?",
      content:
        "Principalmente se diferencian en que los de neodimio son mucho mas potentes y mas caros pero los de ferrita son mas resistentes a la corrosion y temperatura.",
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
    },
    {
      title: "Se pueden cortar o perforar los imanes de neodimio?",
      content:
        "No es recomendable hacerlo ya que son frágiles y su corte puede generar polvo inflamable y reducir o perder su magnetismo ademas de quitar la capa de recubrimiento que los protege.",
    },
    {
      title: "Para que se recubren los imanes de neodimio?",
      content:
        "Para protegerlos de la corrosión y la oxidación, mejorando su durabilidad y prolongando su vida útil. El recubrimiento también puede mejorar la estética del imán y facilitar su adherencia a otros materiales.",
    },
    {
      title: "Que significa la letra 'N'?",
      content:
        "Es el grado o clasificación del imán, suele estar entre 35 y 52; indica la medida de energía máxima que puede almacenar el material con que se fabrico, es decir, indica la resistencia máxima a la que puede magnetizarse el material. Entre más alto es el grado, más fuerte es el iman.",
    },
    {
      title: "Que temperatura resisten los imanes de neodimio?",
      content:
        "En general, en calidad N, pueden resistir una temperatura máxima de 80°C, despues de esta empiezan a perder la magnetización. Existen otras calidades que resisten más temperatura: M, H, SH, etc.",
    },
    {
      title: "Pierden su magnetismo los imanes de neodimio?",
      content: (
        <>
          Sí, pueden perder su magnetismo, aunque de manera muy lenta en
          condiciones normales. La pérdida de magnetismo es más pronunciada
          cuando son expuestos a altas temperaturas o campos magnéticos fuertes.
          <br />
          Un imán de neodimio permanente estándar, mantenido en condiciones de
          almacenamiento adecuadas y no sujeto a otros factores externos,
          perderá en promedio menos del 5% de su magnetización en un lapso de un
          siglo entero.
        </>
      ),
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
    {
      title: "Que es el principio de imputación de Menger?",
      content: (
        <p>
          Este establece que los precios de los factores productivos se
          determinan por su contribución al valor final de un bien, o sea, el
          que sube los precios sin razon se va tener que meter lo que vende en
          el{" "}
          <span className="inline-block align-middle">
            <EmergencyIcon />
          </span>
          .
        </p>
      ),
    },
  ];

  const [items, setItems] = useState(list);
  const [inputText, setInputText] = useState("");

  const handleSearch = () => {
    const items_ = list.filter((item) => {
      const text_content = extractText(item.content).toLowerCase();
      const text_search = inputText.toLowerCase();

      return (
        item.title.includes(text_search) ||
        text_content.includes(text_search) ||
        item?.tags?.some((texto) => texto.includes(text_search))
      );
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
        handleSearch={handleSearch}
      />

      {items.length < 1 ? (
        <b>Sin resultados</b>
      ) : (
        <Accordion selectionMode="multiple" className="max-w-[65ch]">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              aria-label={item.title}
              title={item.title}
              className="prose dark:prose-invert data-[open=true]:border-y-4 border-custom2 dark:border-custom1"
              classNames={{
                title: "font-bold",
                heading: "m-0",
              }}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}

export default Faqs;
