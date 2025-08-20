import {
  SVGArrastre,
  SVGRectangularBloque,
  SVGRectangularFresado,
  SvgCylinder,
  SVGRedondoBoton,
  SVGRedondoFresado,
  SVGRedondoPlano,
  SVGCuadradoPlano,
  SVGRectangularPlano,
  SVGEsfera,
  SVGCuadradoCubico,
  SvgCuadradoBloque,
} from "../assets/svgs/svgsFormas";
import type {
  TypeFiltersValues,
  TypeObjCategorie,
  TypeObjShape,
} from "./types";

export const OBJ_SHAPES: TypeObjShape = {
  redondo: {
    measureFormat: "DxH",
    icon: SVGRedondoBoton,
    subs: {
      plano: { icon: SVGRedondoPlano },
      boton: { label: "botón", icon: SVGRedondoBoton },
      cilindro: { icon: SvgCylinder },
      fresado: {
        measureFormat: "DxH Ds-Di",
        icon: SVGRedondoFresado,
      },
      arrastre: { label: "redondo", icon: SVGArrastre },
    },
  },
  cuadrado: {
    measureFormat: "LxLxH",
    icon: SVGCuadradoPlano,
    subs: {
      plano: { icon: SVGCuadradoPlano },
      cubico: { label: "cúbico", icon: SVGCuadradoCubico },
      bloque: { icon: SvgCuadradoBloque },
    },
  },
  rectangular: {
    measureFormat: "LxAxH",
    icon: SVGRectangularBloque,
    subs: {
      plano: { icon: SVGRectangularPlano },
      bloque: {},
      fresado: {
        measureFormat: "LxAxH Ds-Di",
        icon: SVGRectangularFresado,
      },
    },
  },
  esfera: {
    measureFormat: "D",
    icon: SVGEsfera,
  },
};

export const OBJ_MEASURES: {
  [key: string]: { label?: string; measure: string };
} = {
  largo: {
    measure: "mm",
  },
  ancho: {
    measure: "mm",
  },
  alto: {
    measure: "mm",
  },
  altoTotal: {
    label: "Alto total",
    measure: "mm",
  },
  peso: {
    measure: "g",
  },
  fuerza: {
    measure: "kg",
  },
  fuerzaExp: {
    label: "fuerza experimental",
    measure: "kg",
  },
  fuerzaLevante: {
    label: "fuerza levante",
    measure: "kg",
  },
  diametroSup: {
    label: "diámetro superior",
    measure: "mm",
  },
  diametroInf: {
    label: "diámetro inferior",
    measure: "mm",
  },
};

export const OBJ_CATEGORIES: TypeObjCategorie = {
  imanes: {
    subs: {
      neodimio: {},
      ferrita: {},
      flexibles: {},
      otrosImanes: { label: "Otros imanes" },
    },
  },
  electricidad: {},
  otros: {},
};

export const OBJ_ORDERBY: TypeObjCategorie = {
  "id-asc": {
    label: "Mas antiguo",
  },
  "id-desc": {
    label: "Mas reciente",
  },
  "label-desc": {
    label: "Nombre ↑",
  },
  "label-asc": {
    label: "Nombre ↓",
  },
  "price-desc": {
    label: "Precio ↑",
  },
  "price-asc": {
    label: "Precio ↓",
  },
};

export const FILTERS_INPUTS = [
  {
    id: "orderBy",
    label: "Ordenar por",
    format: "select",
    valueArray: false,
    items: OBJ_ORDERBY,
  },
  {
    id: "categorie",
    label: "Categoría",
    format: "select",
    valueArray: true,
    items: OBJ_CATEGORIES,
  },
  {
    id: "forma",
    label: "Forma",
    format: "select",
    valueArray: true,
    items: OBJ_SHAPES,
  },
  {
    id: "price",
    label: "Precio",
    format: "number",
  },
];

export const FILTERS_VALUES_DEFAULT: TypeFiltersValues = {
  apply: false,
  page: 1,
  orderBy: "price-asc",
  text: "",
  categorie: [],
  forma: [],
  priceMin: undefined,
  priceMax: undefined,
};
