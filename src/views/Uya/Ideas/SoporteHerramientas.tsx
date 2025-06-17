import CardUya from "../CardUya";
import LinkToFont from "../components/LinkToFont";

import img_1 from "../../../assets/uya/ideas/soporte_herramientas/1.webp";
import img_2 from "../../../assets/uya/ideas/soporte_herramientas/2.webp";
import img_3 from "../../../assets/uya/ideas/soporte_herramientas/3.webp";
import img_4 from "../../../assets/uya/ideas/soporte_herramientas/4.webp";

export default function SoporteHerramientas() {
  const items = [
    {
      text: "Conseguir una pieza de madera",
      src: img_1,
    },
    {
      text: "Calar y pegar imanes en los huecos",
      src: img_2,
    },
    {
      text: "Barnizar la superficie",
      src: img_3,
    },
    {
      text: "Colgar en una superficie metálica o agregar soportes",
      src: img_4,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        <p className="sm:col-span-2">
          Esto puede usarse tanto con utensilios de cocina como con herramientas
          de construcción, artículos de librería, piezas de juegos, etc.
        </p>

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
