import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export type TypeObjectGeneral = { [key: string | number]: any | undefined };

export type TypeIcon = OverridableComponent<SvgIconTypeMap>;

export type TypeRoute = {
  id: string;
  label: string;
  href: string;
  icon?: TypeIcon;
  search?: string;
  title?: string;
};

export type TypeCartValue = {
  [key: number]: ClassDBItem;
};
export type TypeOutletContext = {
  cart: {
    value: TypeCartValue;
    set: (itemData: ClassDBItem | {}) => {};
    add: (itemData: ClassDBItem) => {};
  };
  links: { [key: string]: string };
  setMagnetData: (itemData: ClassDBItem) => {};
};

export type TypeFiltersValues = {
  apply: boolean;
  page: number;
  orderBy: string;
  text: string;
  categorie: string;
  subcategorie: string;
  forma: string;
  priceMin?: number;
  priceMax?: number;
};

export type TypeFiltersInput = {
  id: string;
  label: string;
  format: string;
  items?: {
    id: string;
    label: string;
  }[];
};

export type TypeMeasures = {
  largo: number;
  alto: number;
  ancho?: number;
  peso?: number;
  "diametro superior"?: number;
  "diametro inferior"?: number;
};

export type TypeSalesUnit = "u" | "m" | "kg" | string;

export class ClassPriceData {
  usePrice: string = "base";
  prices: {
    base: number;
    [key: string]: number | undefined;
  } = { base: 0 };
  discountsPercentages?: {
    [key: string]: number;
  } = {};
  prices_qtts?: {
    [key: number]: number | undefined;
  } = {};
  update?: string = "";
  salesUnit?: TypeSalesUnit;
}
export type TypeItemImgs = {
  preview: {
    type: "svg" | "img";
    src: string;
  };
  imgs?: string[];
};

export class ClassDBItem {
  hidden?: boolean = false;
  noStock?: boolean;
  id: number = 0;
  label: string = "";
  categorie: string = "";
  subcategorie?: string;
  especificaciones?: TypeObjectGeneral = {};
  caracteristicas?: string[] = [];
  description?: string;
  price_data: ClassPriceData = new ClassPriceData();
  qtt?: number;
  measures?: TypeMeasures;
  isComparable?: boolean;
  fuerza_N?: TypeObjectGeneral;
  links?: { [key: string]: string };
  // imgs_data: ClassImgsData = new ClassImgsData();
}
