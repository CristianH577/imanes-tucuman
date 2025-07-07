import { Fragment } from "react";

import ImageCustom from "../../../components/ImageCustom";

import img_1 from "../../../assets/uya/asaber/aguas_duras/1.webp";
import img_2 from "../../../assets/uya/asaber/aguas_duras/2.webp";
import img_3 from "../../../assets/uya/asaber/aguas_duras/3.webp";
import img_4 from "../../../assets/uya/asaber/aguas_duras/4.webp";

export default function AguasDuras() {
  const getAtom = ({ label = "H", top = 0, left = 0, fontSize = "unset" }) => {
    return (
      <div
        className="bg-radial from-white to-default-500 text-black rounded-full p-1 absolute"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          fontSize: fontSize,
        }}
      >
        {label}
      </div>
    );
  };

  const aguas = [
    {
      key: "blanda",
      atoms: [
        { label: "Ca", top: 20, left: 20 },
        { label: "Mg", top: 60, left: 50 },
      ],
    },
    {
      key: "dura",
      atoms: [
        { label: "Ca", top: 20, left: 20 },
        { label: "Ca", top: 60, left: 50 },
        { label: "Mg", top: 10, left: 70 },
        { label: "Mg", top: 35, left: 45, fontSize: "x-small" },
        { label: "Mg", top: 70, left: 25, fontSize: "small" },
      ],
    },
  ];

  const items = [
    {
      title: "Que son?",
      text: "Las aguas duras contienen gran cantidad de minerales, particularmente de sales de magnesio(Mg) y calcio(Ca). Puede corroborarse esto al mezclarla con jabón y ver como produce menos espuma de lo normal",
      img: (
        <span className="flex flex-col xs:flex-row gap-4 drop-shadow-custom">
          {aguas.map((agua) => (
            <div
              key={agua.key}
              className="w-fit flex flex-col items-center gap-2"
            >
              <p className="px-2 border-b border-divider w-fit capitalize italic">
                {agua.key}
              </p>

              <div
                className="h-36 w-36 bg-gradient-to-t from-blue-600 to-blue-400 relative font-semibold"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
                }}
              >
                {agua.atoms.map((atom, i) => (
                  <Fragment key={i}>{getAtom(atom)}</Fragment>
                ))}
              </div>
            </div>
          ))}
        </span>
      ),
    },
    {
      title: "Que problemas causan?",
      text: "Generan sarro que puede acumularse en las cañerías generando obstrucciones y corrosión que a su vez favorecen a la aparición de membranas orgánicas que pueden albergar gérmenes y bacterias",
      src: img_1,
      alt: "Tubo de cañeria con sarro",
    },
    {
      title: "Que hacen las sales de polifosfato?",
      text: "Las sales inhiben la formación de sarro previniendo las obstrucciones y reduciendo la corrosión alargando la vida útil de la instalación de agua. Además no modifican el sabor ni el olor del agua",
      src: img_2,
      alt: "Sales de polifosfato",
    },
    {
      title: "Como se usan?",
      text: (
        <>
          Las sales pueden colocarse en:
          <br />
          ➤ Un filtro fijo antes de la entrada de agua de la casa o de la
          cisterna.
          <br />➤ Un tanque de agua dentro de una boya o una malla que permita
          elcontacto de las sales y el agua
        </>
      ),
      img: (
        <span className="grid grid-cols-1 justify-items-center gap-4 max-w-xs xs:grid-cols-2 xs:items-center drop-shadow-custom">
          <ImageCustom alt="Filtro largo" src={img_3} height={300} />

          <ImageCustom alt="Filtro boya" src={img_4} height={300} />
        </span>
      ),
    },
  ];

  return (
    <ol className="sm:text-start prose dark:prose-invert">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex flex-col items-center gap-4 border-divider py-4 sm:gap-8 ${
            i % 2 === 0
              ? "sm:text-start sm:flex-row"
              : "sm:text-end sm:flex-row-reverse"
          }`}
          style={{
            borderTopWidth: i !== 0 ? "1px" : "",
          }}
        >
          {item?.img ? (
            item.img
          ) : (
            <ImageCustom
              src={item.src}
              className="w-full rounded-lg"
              classes={{ wrapper: "sm:w-full drop-shadow-custom" }}
              alt={item.alt}
              width={300}
              height={300}
            />
          )}

          <div>
            <b>{item.title}</b>
            <p>{item.text}.</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
