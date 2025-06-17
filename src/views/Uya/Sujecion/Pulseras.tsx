import CardUya from "../CardUya";

import img_1 from "../../../assets/uya/sujecion/pulseras/1.webp";
import img_2 from "../../../assets/uya/sujecion/pulseras/2.webp";
import img_3 from "../../../assets/uya/sujecion/pulseras/3.webp";

export default function Pulseras() {
  return (
    <div className="flex flex-col-reverse items-center gap-4 sm:flex-row">
      <div className="space-y-4 sm:w-full">
        {[img_1, img_2, img_3].map((src, i) => (
          <CardUya key={i + 1} src={src} />
        ))}
      </div>

      <p className="text-xl sm:text-4xl md:text-5xl">
        Los imanes proporcionan un cierre fuerte y cómodo para accesorios de uso
        cotidiano.
      </p>
    </div>
  );
}
