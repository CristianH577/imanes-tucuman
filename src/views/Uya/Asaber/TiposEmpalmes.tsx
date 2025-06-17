import CardUya from "../CardUya";

import img_1 from "../../../assets/uya/asaber/tipos_empalmes/1.webp";
import img_2 from "../../../assets/uya/asaber/tipos_empalmes/2.webp";
import img_3 from "../../../assets/uya/asaber/tipos_empalmes/3.webp";
import img_4 from "../../../assets/uya/asaber/tipos_empalmes/4.webp";

const items = [
  {
    tipo: "Derivador",
    desc: "permite conectar un cable y derivar otro",
    src: img_1,
  },
  {
    tipo: "Terminal",
    desc: "solo se insertan los cables en las entradas de las terminales",
    src: img_2,
  },
  {
    tipo: "Terminal clip",
    desc: "se debe liberar el seguro de la entrada para insertar o quitar los cables",
    src: img_3,
  },
  {
    tipo: "Bornera",
    desc: "se inserta el cable de un lado y su continuación en el otro",
    src: img_4,
  },
];

export default function TiposEmpalmes() {
  return (
    <div className="grid sm:grid-cols-2 gap-6 justify-items-center">
      {items.map((item, i) => (
        <CardUya
          key={i + 1}
          src={item.src}
          alt={`Imagen de ${item.tipo}`}
          text={
            <>
              <b>{item.tipo}</b>: {item.desc}
            </>
          }
          classNames={{
            img: "h-full",
            wrapper: "h-full",
          }}
        />
      ))}
    </div>
  );
}
