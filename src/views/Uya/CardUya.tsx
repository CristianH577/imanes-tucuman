import ImageCustom from "../../components/ImageCustom";

interface InterfaceCardUyaProps {
  id?: string;
  src?: string;
  text?: string | React.ReactElement;
  className?: string;
  classes?: { img?: string; imgWrapper?: string };
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
  classes = { img: "", imgWrapper: "" },
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
      <ImageCustom
        src={src}
        alt={alt ? alt : id ? `Imagen de ejemplo ${id}` : ""}
        className={
          "rounded-md w-full" + (classes?.img ? ` ${classes.img}` : "")
        }
        classes={{
          wrapper: classes?.imgWrapper ? classes.imgWrapper : "",
        }}
        width={width}
        srcSet={srcSet}
      />

      {text && <p>{text}.</p>}

      {contentPlus}
    </div>
  );
}
