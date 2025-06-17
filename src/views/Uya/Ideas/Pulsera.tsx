import CardUya from "../CardUya";

import img from "../../../assets/uya/ideas/pulsera.webp";

export default function Pulsera() {
  return (
    <div className="space-y-4">
      <p>
        Añadiendo pequeños imanes adentro de una pulsera de tela se puede tener
        un accesorio de trabajo para sostener fácil y cómodamente pequeños
        objetos que vayan a usarse.
      </p>

      <CardUya
        src={img}
        className="place-self-center"
        alt="Brazo con pulsera de ejemplo"
      />
    </div>
  );
}
