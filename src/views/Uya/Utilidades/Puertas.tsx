import ImageCustom from "../../../components/ImageCustom";

import img_1 from "../../../assets/uya/utilidades/puertas/1.webp";
import img_2 from "../../../assets/uya/utilidades/puertas/2.webp";
import img_3 from "../../../assets/uya/utilidades/puertas/3.webp";
import img_4 from "../../../assets/uya/utilidades/puertas/4.webp";

export default function Puertas() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p>
        Las bisagras de uso cotidiano tienden a cerrar mal con el tiempo y
        cuando pasa se puede solucionar fácilmente agregando un imán para un
        conseguir un cierre completo y cómodo.
      </p>

      <div className="grid sm:grid-cols-2 gap-8">
        {[img_1, img_2, img_3, img_4].map((src, i) => (
          <ImageCustom
            key={i + 1}
            src={src}
            className="object-cover w-[300px] h-[300px] rounded-lg border-5 border-divider shadow-md"
            alt={`Imagen de ejemplo ${i + 1}`}
            height={300}
            widht={300}
          />
        ))}
      </div>
    </div>
  );
}
