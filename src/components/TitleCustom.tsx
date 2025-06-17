import { SVGMancha } from "../assets/svgs/svgsLogo";

export default function TitleCustom({ title = "", id = undefined }) {
  return (
    <div className="flex items-center justify-center py-3 sm:py-6 relative w-fit max-xs:break-all">
      <h2 className="text-2xl sm:text-5xl font-extrabold uppercase text-center px-10 z-10 text-white">
        {title}
      </h2>

      <SVGMancha
        id={id}
        from="rgba(255, 139, 0, .8)" //from-custom1/80
        to="rgba(230, 125, 0, .8)" //to-custom1--8/80
        className="absolute w-full h-full"
      />
    </div>
  );
}
