import {
  SVGArrastre,
  SVGCuadrado,
  SVGCuadradoFresado,
  SVGRedondo,
  SVGRedondoFresado,
} from "../assets/svgs/svgsFormas";

export const MEASURES_MEASURES = {
  largo: "mm",
  ancho: "mm",
  alto: "mm",
  "alto total": "mm",
  peso: "g",
  fuerza: "kg",
  "diametro superior": "mm",
  "diametro inferior": "mm",
};

export const SVG_FORMA = {
  redondo: SVGRedondo,
  cuadrado: SVGCuadrado,
  "redondo fresado": SVGRedondoFresado,
  "cuadrado fresado": SVGCuadradoFresado,
  arrastre: SVGArrastre,
};

export const TABLES_FORMS = [
  {
    id: "redondo",
    label: "redondos",
    measureFormat: "AxB",
  },
  {
    id: "cuadrado",
    label: "cuadrados",
    measureFormat: "AxBxC",
  },
  {
    id: "redondo fresado",
    label: "redondos fresados",
    measureFormat: "AxB D-d",
  },
  {
    id: "cuadrado fresado",
    label: "cuadrados fresados",
    measureFormat: "AxBxC D-d",
  },
];
