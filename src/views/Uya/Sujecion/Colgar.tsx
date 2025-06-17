import ImageHeroCustom from "../../../components/ImageHeroCustom";
import CardUya from "../CardUya";

import img_1 from "../../../assets/uya/sujecion/colgar/1.webp";
import img_2 from "../../../assets/uya/sujecion/colgar/2.webp";
import img_3 from "../../../assets/uya/sujecion/colgar/3.webp";
import img_4 from "../../../assets/uya/sujecion/colgar/4.webp";

export default function Colgar() {
  return (
    <div className="space-y-4">
      <p>
        Con imanes se pueden colgar fotos, posters, afiches o marcos sin tener
        que hacer perforaciones en la pared ni pegar cintas sobre los mismos que
        puedan dañarlos al retirarlos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 justify-items-center">
        <div className="sm:col-span-2 sm:col-start-2 relative ">
          <ImageHeroCustom
            src={img_2}
            className="min-h-0"
            classNames={{
              wrapper:
                "absolute z-20 w-[64px] top-2 left-6 overflow-hidden shadow-md",
            }}
            alt="Clip con cinta"
            width={64}
          />

          <CardUya key={1} src={img_1} />
        </div>

        {[img_3, img_4].map((src, i) => (
          <CardUya
            key={i}
            src={src}
            className="sm:col-span-2 h-full"
            classNames={{
              img: "h-full",
              wrapper: "h-full",
            }}
          />
        ))}
      </div>
    </div>
  );
}
