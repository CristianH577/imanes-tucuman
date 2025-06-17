import {
  SVGMancha,
  SVGTextoImanes,
  SVGTextoTucuman,
} from "../assets/svgs/svgsLogo";

function Logo({
  id = "",
  classNames = { svgA: "" },
  className = "",
  href = "",
  ...props
}) {
  return (
    <a
      id={id || undefined}
      href={href || undefined}
      className={`font-['calvera'] relative select-none flex items-center justify-center self-center drop-shadow-custom${
        className ? " " + className : ""
      }`}
      {...props}
    >
      <SVGTextoImanes
        id={`${id || "logo"}_back`}
        data-slot="svgA"
        from="rgba(255, 222, 0, 1)" //from-custom1
        to="rgba(255, 153, 0, 1)" //to-custom1-6
        className={`w-full h-full${
          classNames.svgA ? " " + classNames.svgA : ""
        }`}
      />

      <SVGMancha
        id={`${id || "logo"}_midle`}
        className="absolute h-4/5 w-[60%]"
        from="rgba(230, 125, 0, .6)" //from-custom1--8/60
        to="rgba(204, 111, 0, .6)" //to-custom1--9/60
      />

      <SVGTextoTucuman
        id={`${id || "logo"}_front`}
        className="absolute h-3/5 w-1/2 tracking-[0.4em] z-10 overflow-visible"
      />
    </a>
  );
}

export default Logo;
