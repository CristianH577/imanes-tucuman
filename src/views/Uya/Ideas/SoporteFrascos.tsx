import CardUya from "../CardUya";
import LinkToFont from "../components/LinkToFont";

import img_1 from "../../../assets/uya/ideas/soporte_frascos/1.webp";
import img_2 from "../../../assets/uya/ideas/soporte_frascos/2.webp";
import img_3 from "../../../assets/uya/ideas/soporte_frascos/3.webp";
import img_4 from "../../../assets/uya/ideas/soporte_frascos/4.webp";
import img_5 from "../../../assets/uya/ideas/soporte_frascos/5.webp";
import img_6 from "../../../assets/uya/ideas/soporte_frascos/6.webp";

const items = [
  {
    text: "Conseguir frascos(de preferencia de tapa melánica)",
    src: img_1,
  },
  {
    text: "Pegar un imán ancho en cada tapa",
    src: img_2,
  },
  {
    text: "Conseguir una tira o barra fina metálica",
    src: img_3,
  },
  {
    text: "Colocar una cinta doble faz en la tira",
    src: img_4,
  },
  {
    text: "Pegar la tira en el lugar donde se quieren tener los frascos",
    src: img_5,
  },
  {
    text: "Probar que los frascos queden bien sujetos",
    src: img_6,
  },
];

export default function SoporteFrascos() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {items.map((item, i) => (
          <CardUya
            key={i + 1}
            src={item.src}
            text={`${i + 1}. ${item.text}.`}
          />
        ))}
      </div>

      <LinkToFont
        href="https://www.youtube.com/watch?v=0WhJmS7423E"
        text="Youtube/IDEAS EN 5 MINUTOS"
      />
    </div>
  );
}
