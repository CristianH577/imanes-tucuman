import type { ClassMagnetGraphData } from "../consts/classes";

type TypeSvgData = {
  radios?: number[];
  sizes?: number[];
};

export const makeSvgView = (view: string, graphData: ClassMagnetGraphData) => {
  let fix_w = 0;
  let fix_h = 0;
  let content = [];
  let w = 0;
  let h = 0;
  let obj: TypeSvgData = {};
  const radio = graphData.radios ? graphData.radios[0] : 0;
  const radios = graphData.radios ? graphData.radios : [0, 0, 0];
  const ancho = graphData?.ancho || 0;

  switch (view) {
    case "sup":
      switch (graphData.forma[0]) {
        case "esfera":
        case "redondo":
          obj.radios = graphData.radios;
          break;
        case "cuadrado":
          obj.sizes = [graphData.largo, graphData.largo];
          break;
        case "rectangular":
          obj.sizes = [graphData.largo, graphData.ancho];
          if (graphData.forma[1] === "fresado") obj.radios = graphData.radios;
          break;
        default:
          break;
      }
      break;
    case "front":
      switch (graphData.forma[0]) {
        case "esfera":
          obj.radios = graphData.radios;
          break;
        case "redondo":
          obj.sizes = [radio * 2, graphData?.alto];
          break;
        case "cuadrado":
          obj.sizes = [graphData.largo, graphData.largo];
          break;
        case "rectangular":
          obj.sizes = [graphData.largo, graphData.alto];
          break;

        default:
          break;
      }
      break;
    case "lat":
      switch (graphData.forma[0]) {
        case "esfera":
          obj.radios = graphData.radios;
          break;
        case "redondo":
          obj.sizes = [radio * 2, graphData.alto];
          if (graphData.forma[1] === "fresado")
            obj.sizes = [radio * 2, graphData.alto];
          break;
        case "cuadrado":
          obj.sizes = [graphData.largo, graphData.alto];
          break;
        case "rectangular":
          obj.sizes = [graphData.ancho, graphData.alto];
          if (graphData.forma[1] === "fresado")
            obj.sizes = [ancho, graphData.alto];
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }

  if (obj?.sizes) {
    w = obj?.sizes[0];
    h = obj?.sizes[1];
    content.push(
      <rect
        key={`${view}`}
        x="0"
        y="0"
        width={obj?.sizes[0]}
        height={obj?.sizes[1]}
        rx=".2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    );
  }
  if (obj.radios) {
    const d = obj.radios[0] * 2;
    if (d > w) {
      fix_w = 0.2;
      w = d;
    }
    if (d > h) {
      fix_h = 0.2;
      h = d;
    }
    const len = obj.radios.length;
    obj.radios.forEach((item, i) => {
      content.push(
        <circle
          key={"radio" + i}
          cx="50%"
          cy="50%"
          r={item}
          fill={
            graphData.forma[1] === "fresado" && len > 1 && i === len - 1
              ? "background"
              : i === len - 2
              ? "orange"
              : undefined
          }
        />
      );
    });
  }

  if (
    graphData.forma[0] === "redondo" &&
    graphData.forma[1] === "fresado" &&
    ["front", "lat"].includes(view)
  ) {
    content.push([
      <polygon
        key={`${view}_l`}
        points={`${radios[0] - radios[1]},0 ${radios[0] - radios[2]},${
          graphData?.alto
        }`}
        fill="none"
        stroke="black"
        strokeDasharray="1"
        strokeWidth={0.2}
      />,

      <polygon
        key={`${view}_r`}
        points={`${radios[0] + radios[1]},0 ${radios[0] + radios[2]},${
          graphData?.alto
        }`}
        fill="none"
        stroke="black"
        strokeDasharray="1"
        strokeWidth={0.2}
      />,
    ]);
  } else if (
    graphData.forma[0] === "rectangular" &&
    graphData.forma[1] === "fresado"
  ) {
    let mitad = 0;
    if (view === "front") {
      mitad = graphData?.largo / 2;
    } else if (view === "lat") {
      mitad = graphData.ancho / 2;
    }

    if (mitad) {
      content.push([
        <polygon
          key={`${view}_l`}
          points={`${mitad - radios[0]},0 ${mitad - radios[1]},${
            graphData?.alto
          }`}
          fill="none"
          stroke="black"
          strokeDasharray="1"
          strokeWidth={0.2}
        />,
        <polygon
          key={`${view}_r`}
          points={`${mitad + radios[0]},0 ${mitad + radios[1]},${
            graphData?.alto
          }`}
          fill="none"
          stroke="black"
          strokeDasharray="1"
          strokeWidth={0.2}
        />,
      ]);
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${w}mm`}
      height={`${h}mm`}
      viewBox={`0 0 ${w + fix_w} ${h + fix_h}`}
      stroke={radios.length > 1 ? "black" : undefined}
      strokeWidth={0.2}
      className={graphData.id === "tapa" ? "fill-custom1-5" : "fill-custom1"}
    >
      {content}
    </svg>
  );
};
