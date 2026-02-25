import CardUya from "../CardUya";
import LinkToFont from "../components/LinkToFont";

import img_1 from "../../../assets/uya/ideas/esponja/1.webp";
import img_2 from "../../../assets/uya/ideas/esponja/2.webp";
import img_3 from "../../../assets/uya/ideas/esponja/3.webp";
import img_4 from "../../../assets/uya/ideas/esponja/4.webp";

const items = [
  {
    text: "Hacer un corte en el centro de la esponja donde entre el imán",
    src: img_1,
  },
  {
    text: "Introducir un imán del tamaño adecuado",
    src: img_2,
  },
  {
    text: "Sellar el corte con pegamento",
    src: img_3,
  },
  {
    text: "Hacer lo mismo con otra esponja y comprobar que funcione",
    src: img_4,
  },
];

export default function Esponja() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
        {items.map((item, i) => (
          <CardUya
            key={i + 1}
            src={item.src}
            text={`${i + 1}. ${item.text}`}
            className="md:max-w-[400px]"
            width={400}
          />
        ))}
      </div>

      <LinkToFont
        href="https://www.youtube.com/watch?v=ApjyZ_hwxBE"
        text="Youtube/ComoHacerPara"
      />
    </div>
  );
}
