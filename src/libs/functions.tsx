import { DB_ALL } from "../consts/dbs";
import type { ClassDBItem } from "../consts/types";

export const scrollToTop = () => {
  const app = document.querySelector("#app");
  if (app) app.scrollTo(0, 0);
};
export const scrollToBottom = () => {
  const footer = document.querySelector("#footer");
  if (footer) footer.scrollIntoView();
};

export const toPriceFormat = (price: number = 0) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
export const toPercentageFormat = (num = 0) => {
  return new Intl.NumberFormat("es-AR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export function cartItemsComparator(col: string, order: "asc" | "desc") {
  return function (a: ClassDBItem, b: ClassDBItem) {
    let type = "text";
    if (["price", "id", "qtt", "subtotal"].includes(col)) type = "number";

    let val_a = a?.[col as keyof ClassDBItem] || "";
    let val_b = b?.[col as keyof ClassDBItem] || "";

    if (type === "text" && val_a === "") {
      val_a = a.info?.[col] || "";
      val_b = b.info?.[col] || "";
    }

    let bool = 0;
    if (type === "number") {
      if (col === "price") {
        const use_a = a?.price_data?.usePrice;
        const use_b = b?.price_data?.usePrice;

        val_a = a?.price_data?.prices?.[use_a] || "";
        val_b = b?.price_data?.prices?.[use_b] || "";
      }
      bool = Number(val_a) - Number(val_b);
    } else {
      bool = String(val_a).localeCompare(String(val_b));
    }

    if (order === "desc") return -bool;
    return bool;
  };
}

export const handlePriceData = (itemData: ClassDBItem) => {
  const price_data = itemData?.price_data;
  const prices_qtts = price_data?.prices_qtts;

  if (prices_qtts) {
    let price_qtt = 0;

    for (const umin in prices_qtts) {
      if (umin !== "1") {
        if (Number(itemData?.qtt) >= Number(umin)) {
          price_qtt = prices_qtts[umin] || 0;
        } else {
          break;
        }
      }
    }

    const base = price_data.prices.base;
    price_data.prices.qtt = price_qtt;

    if (!price_data.discounts_percentages) {
      price_data.discounts_percentages = {};
    }
    price_data.discounts_percentages.qtt = (base - price_qtt) / base;

    let use = "base";
    const prices = price_data.prices;
    for (const key in prices) {
      if (prices[key] && prices[key] < (prices[use] || 0)) use = key;
    }
    price_data.usePrice = use;
  }

  return price_data;
};

export const filterDbForms = (form = "redondo") => {
  const items: ClassDBItem[] = DB_ALL.filter(
    (item) =>
      item.categorie === "imanes" &&
      item.subcategorie === "neodimio" &&
      item.info?.forma === form
  );

  items.sort((a, b) => {
    return (
      (a?.measures?.largo ?? 0) - (b?.measures?.largo ?? 0) ||
      (a?.measures?.ancho ?? 0) - (b?.measures?.ancho ?? 0) ||
      (a?.measures?.alto ?? 0) - (b?.measures?.alto ?? 0)
    );
  });

  return items;
};
