import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SVGProps } from "react";
import type { ClassDBItem } from "./classes";

// general ---------------------------------
export type TypeObjectGeneral = { [key: string | number]: any | undefined };

export type TypeIconMui = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
export type TypeIcon = TypeIconMui | React.FC<SVGProps<SVGSVGElement>>;

export type TypeRoute = {
  id: string;
  label: string;
  href: string;
  icon?: TypeIcon;
  search?: string;
  title?: string;
};
// ---------------------------------

export type TypeCart = {
  [key: number]: number;
};

export type TypeOutletContext = {
  cart: {
    value: TypeCart;
    set: (cart: TypeCart | {}) => {};
    add: (id: number, qtt: number) => {};
  };
  setMagnetData: (itemData: ClassDBItem) => {};
  db: {
    value: TypeDatabaseImg;
    set: (value: TypeDatabaseImg) => {};
  };
  extractorRef: any;
};

export type TypeFiltersValues = {
  apply: boolean;
  page: number;
  orderBy: string;
  text: string;
  categorie: string[];
  forma: string[];
  priceMin?: number;
  priceMax?: number;
  stock: boolean;
  discount: boolean;
};

export type TypeFiltersInput = {
  id: string;
  label: string;
  format: string;
  valueArray?: boolean;
  items?: TypeObjCategorie;
};

export type TypeSalesUnit = "u" | "m" | "kg" | string;

export type TypeObjShape = {
  [key: string]: {
    label?: string;
    measureFormat?: string;
    icon?: TypeIcon;
    subs?: TypeObjShape;
  };
};

export type TypeTableFormItem = {
  label: string;
  measureFormat: string;
  form: string;
  include?: string[];
  exclude?: string[];
  items?: ClassDBItem[];
  icon: TypeIcon;
};

export type TypeObjCategorie = {
  [key: string]: {
    label?: string;
    icon?: TypeIcon;
    subs?: TypeObjCategorie;
  };
};

export type TypeItemImgs = {
  haveSvg?: boolean;
  preview?: string;
  imgs?: string[];
  full?: string[];
  thumbnails?: string[];
};

export type TypeDatabaseImg = {
  [key: number]: TypeItemImgs;
};

export type TypeItemImgsArray = "imgs" | "full" | "thumbnails";

export type TypeStockData = boolean | "low" | "ult" | "hidden" | 0;

export type TypeChatItem = {
  id?: string;

  // pregunta principal
  q: string;
  // respuesta principal
  a: string;
  // input del usuario
  i?: string;

  // variantes para mejorar matching semántico
  aliases?: string[];

  // respuesta corta
  shortAnswer?: string;

  // categoría
  category?: string;

  // tags para búsqueda
  tags?: string[];

  // prioridad
  priority?: number;

  // keywords manuales
  keywords?: string[];

  // links relacionados
  links?: {
    label: string;
    url: string;
  }[];

  // preguntas relacionadas
  relatedIds?: string[];

  // si está activa
  enabled?: boolean;

  embedding?: number[];
};

// api ---------------------------------
export type TypeAlert = {
  title: string;
  detail: string;
  variant?: string;
};
