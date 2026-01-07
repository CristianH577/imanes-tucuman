import type { TypeIcon, TypeObjectGeneral, TypeSalesUnit } from "./types";
import type { OBJ_MEASURES } from "./values";

export class ClassPriceData {
  usePrice: string = "base";
  prices: {
    base: number;
    [key: string]: number | undefined;
  } = { base: 0 };
  discountsPercentages?: {
    [key: string]: number;
  } = {};
  pricesQtts?: {
    [key: number]: number | undefined;
  } = {};
  update?: string = "";
  salesUnit?: TypeSalesUnit;
  salesDecimal?: number[];
}

export class ClassDBItem {
  hidden?: boolean = false;
  noStock?: boolean;
  id: number = 0;
  label: string = "";
  categorie: string[] = [];
  forma?: string[] = [];
  especificaciones?: TypeObjectGeneral = {};
  caracteristicas?: string[] = [];
  description?: string;
  priceData: ClassPriceData = new ClassPriceData();
  measures?: { [k in keyof typeof OBJ_MEASURES]?: number };
  isComparable?: boolean;
  links?: { [key: string]: string };
  tags?: string[];
  qtt?: number;
}

export class ClassMagnetGraphData {
  id: string = "magnet";
  forma: string[] = ["redondo"];
  label: string = "Imán";
  alto: number = 3;
  largo: number = 10;
  ancho: number = 0;
  radios: number[] = [0, 0, 0];
  svg?: false | TypeIcon;
}

export class ClassDBItem2 {
  stock?: boolean;
  id_item: number = 0;
  label: string = "";
  categorie: string[] = [];
  forma?: string[] = [];
  especificaciones?: { [key: string]: number | string };
  caracteristicas?: string[] = [];
  description?: string;
  priceData: ClassPriceData = new ClassPriceData();
  measures?: { [k in keyof typeof OBJ_MEASURES]?: number };
  isComparable?: boolean;
  links?: { [key: string]: string };
  tags?: string[];
}
