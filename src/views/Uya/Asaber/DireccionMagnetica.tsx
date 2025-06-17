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
        className="place-self-center sm:max-w-[700px]"
        alt="Ejemplos de direcciones magnéticas"
        // @ts-ignore
        widht={700}
      />
    </div>
  );
}
