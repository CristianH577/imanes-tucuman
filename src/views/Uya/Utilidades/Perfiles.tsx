import ImageCustom from "../../../components/ImageCustom";

import img_1 from "../../../assets/uya/utilidades/perfiles/perfiles-1.webp";
import img_2 from "../../../assets/uya/utilidades/perfiles/perfiles-2.webp";

export default function Perfiles() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 items-center">
      <ImageCustom
        src={img_1}
        className="object-cover w-full h-full rounded-full"
        classes={{
          wrapper:
            "w-[300px] h-[300px] place-self-center border-5 border-divider/15 rounded-full shadow-md",
        }}
        alt="Pared de perfiles de aluminio sin tapar"
        height={300}
      />
      <p>
        Utilizando imanes se puede fácilmente encontrar la ubicación de los
        perfiles de aluminio detrás de las placas de Durlock.
      </p>

      <p>
        Simplemente moviendo el imán suavemente sobre la placa al estar sobre el
        perfil quedara fijo.
      </p>

      <ImageCustom
        src={img_2}
        className="object-cover w-full h-full object-left rounded-full"
        classes={{
          wrapper:
            "w-[300px] h-[300px] place-self-center border-5 border-divider/15 rounded-full shadow-md",
        }}
        alt="Dedo señalando un iman sobre pared de drywall"
        height={300}
      />
    </div>
  );
}
