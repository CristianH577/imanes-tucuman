import ImageHeroCustom from "../../../components/ImageHeroCustom";

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
          <ImageHeroCustom
            key={i + 1}
            src={src}
            className="object-cover w-[300px] h-[300px] border-5 border-divider"
            alt={`Imagen de ejemplo ${i + 1}`}
            // @ts-ignore
            shadow="md"
            radius="full"
            height={300}
            widht={300}
          />
        ))}
      </div>
    </div>
  );
}
