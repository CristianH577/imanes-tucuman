import CardUya from "../CardUya";

const images_all = import.meta.glob(
  "../../assets/uya/sujecion/atados/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
  }
);
const srcs = Object.entries(images_all).map(
  ([_, module]) => (module as { default: string }).default
);

const class_img_wrapper = "md:rounded-none md:shadow-none md:border-none";

export default function Atados() {
  const getSrc = (name: string) => srcs.find((src) => src.includes(name));

  return (
    <div className="space-y-4">
      <p>
        Con un cordón o linga con imanes en sus puntas se puede hacer un atado o
        enrollado rápido y sencillo.
      </p>

      <div className="max-md:space-y-4 md:grid md:grid-cols-4 md:rounded-lg md:overflow-hidden md:shadow-medium max-sm:max-w-xs max-sm:place-self-center sm:justify-items-center">
        <CardUya
          src={getSrc(`/320/1.webp`)}
          srcSet={`
              ${getSrc(`/320/1.webp`)} 359w,
              ${getSrc(`/650/1.webp`)} 360w,
            `}
          alt="Cortina atada y accesorio"
          className="col-span-2 row-span-3 md:max-w-full"
          classNames={{
            img: "h-full",
            wrapper: `h-full ${class_img_wrapper}`,
          }}
        />

        <CardUya
          src={getSrc(`/320/2.webp`)}
          srcSet={`
              ${getSrc(`/320/2.webp`)} 359w,
              ${getSrc(`/650/2.webp`)} 360w,
            `}
          alt="Cuerda con imanes en las puntas"
          className="col-span-2 col-start-3 md:max-w-full"
          classNames={{
            img: "h-full",
            wrapper: `h-full ${class_img_wrapper}`,
          }}
        />

        <div className="flex flex-col max-md:items-center md:col-span-2 md:col-start-3 sm:flex-row max-md:gap-4">
          <CardUya
            src={getSrc(`./3.webp`)}
            alt="Lingas con imanes en las puntas"
            className="md:w-2/3"
            classNames={{
              img: "h-full",
              wrapper: `h-full ${class_img_wrapper}`,
            }}
          />

          <CardUya
            src={getSrc(`./4.jpg`)}
            alt="Persiana sostenida con cuerdas agarradas a ganchos magnéticos"
            className="md:w-2/3"
            classNames={{
              img: "h-full",
              wrapper: `h-full ${class_img_wrapper}`,
            }}
            width={225}
          />
        </div>
      </div>
    </div>
  );
}
