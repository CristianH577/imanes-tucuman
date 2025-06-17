import CardUya from "../CardUya";

import img_1 from "../../../assets/uya/ideas/llaveros/1.webp";
import img_2 from "../../../assets/uya/ideas/llaveros/2.webp";
import img_3 from "../../../assets/uya/ideas/llaveros/3.webp";

export default function Llaveros() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p>
        Introduciendo un imán en una funda de cuero, agregándole un mosquetón
        con una tira de cuero y un remache se puede hacer un llavero que sirve
        para colgar bolsos o mochilas en muchos lugares.
      </p>

      <CardUya src={img_1} alt="Llavero de cuero con iman" />

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        {[img_2, img_3].map((src, i) => (
          <CardUya key={i} src={src} />
        ))}
      </div>
    </div>
  );
}
