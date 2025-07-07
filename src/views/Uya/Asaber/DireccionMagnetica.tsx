import CardUya from "../CardUya";

import img from "../../../assets/uya/asaber/direccion_magnetica.webp";

export default function DireccionMagnetica() {
  return (
    <div className="space-y-4">
      <p>
        La dirección de magnetización del imán se determinaría durante la
        pulsación y una vez hecha no se puede cambiar.
      </p>

      <CardUya
        src={img}
        className="sm:max-w-[720px] place-self-center"
        alt="Ejemplos de direcciones magnéticas"
        classes={{ img: "w-full" }}
        // @ts-ignore
        widht={720}
        height={720}
      />
    </div>
  );
}
