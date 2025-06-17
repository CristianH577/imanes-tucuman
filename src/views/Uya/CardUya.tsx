import ImageHeroCustom from "../../components/ImageHeroCustom";

interface InterfaceCardUyaProps {
  id?: string;
  src?: string;
  text?: string | React.ReactElement;
  className?: string;
  classNames?: { img?: string; wrapper?: string };
  alt?: string;
  contentPlus?: React.ReactElement;
  width?: number;
  srcSet?: string;
}

export default function CardUya({
  id,
  src,
  text = "",
  className = "",
  classNames = { img: "", wrapper: "" },
  alt = "",
  contentPlus,
  width = 300,
  srcSet = undefined,
}: InterfaceCardUyaProps) {
  return (
    <div
      className={
        "flex flex-col items-center gap-2 h-full max-w-xs" +
        (className ? ` ${className}` : "")
      }
    >
      <ImageHeroCustom
        src={src}
        alt={alt || id ? `Imagen de ejemplo ${id}` : ""}
        className={
          "object-cover rounded-none" +
          (classNames?.img ? ` ${classNames.img}` : "")
        }
        classNames={{
          wrapper:
            "border-5 border-divider overflow-hidden" +
            (classNames?.wrapper ? ` ${classNames.wrapper}` : ""),
        }}
        width={width}
        srcSet={srcSet}
      />

      {text && <p>{text}.</p>}

      {contentPlus}
    </div>
  );
}
