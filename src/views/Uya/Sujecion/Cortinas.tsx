import CardUya from "../CardUya";

import img_1 from "../../../assets/uya/sujecion/cortinas/1.webp";
import img_2 from "../../../assets/uya/sujecion/cortinas/2.webp";
import img_3 from "../../../assets/uya/sujecion/cortinas/3.webp";
import img_4 from "../../../assets/uya/sujecion/cortinas/4.webp";
import ImageCustom from "../../../components/ImageCustom";

const items = [
  {
    text: "Con 2 imanes entre el doblez de una tela se puede hacer rápidamente una cortina",
    src: img_3,
  },
  {
    text: "Cociendo parches con imanes adentro en un lado de una tela impermeable se puede hacer una cortina de ducha para la caja de un vehículo de viaje",
    src: img_4,
  },
];

export default function Cortinas() {
  return (
    <div className="space-y-4">
      <p>
        Los imanes pueden ser usados de varias formas para colocar cortinas.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 sm:flex-row sm:flex-wrap">
        <div className="max-w-[320px] sm:max-w-[660px]">
          <div className="sm:flex justify-center rounded-lg shadow-md overflow-hidden">
            {[img_1, img_2].map((src, i) => (
              <ImageCustom
                key={i}
                src={src}
                alt={`Imagen de ejemplo ${i + 1}`}
                className="w-full"
              />
            ))}
          </div>

          <p className="p-2 xs:p-4">
            Incorporando un pitón o gancho a un imán se puede crear un soporte
            para caño de cortina sin necesidad de hacer perforaciones.
          </p>
        </div>

        {items.map((item, i) => (
          <CardUya
            key={i + 3}
            src={item.src}
            text={item.text}
            classes={{
              img: "object-cover w-full max-h-[350px]",
            }}
          />
        ))}
      </div>
    </div>
  );
}
