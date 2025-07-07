import CardUya from "../CardUya";

import img from "../../../assets/uya/ideas/puesta_tierra.webp";

export default function PuestaTierra() {
  return (
    <div className="space-y-4">
      <p>
        Con un imán de tipo arandela, un tornillo, una placa de madera, una
        varilla roscada de cobre, tuercas y arandelas se puede hacer una puesta
        a tierra cómoda para usar soldadores.
      </p>

      <CardUya
        src={img}
        className="place-self-center"
        alt="Brazo con pulsera de ejemplo"
        classes={{ img: "w-full" }}
      />
    </div>
  );
}
