import type { ClassDBItem, ClassPriceData } from "../consts/classes";
import { DB_ALL } from "../consts/dbs";
import type {
  TypeDatabaseImg,
  TypeFiltersValues,
  TypeItemImgs,
  TypeItemImgsArray,
  TypeObjectGeneral,
  TypeTableFormItem,
} from "../consts/types";
import { toPng } from "html-to-image";

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

export function cartItemsComparator(col: string, order: string) {
  return function (a: ClassDBItem, b: ClassDBItem) {
    let type = "text";
    if (["price", "id", "qtt", "subtotal"].includes(col)) type = "number";

    let val_a = a?.[col as keyof ClassDBItem] || "";
    let val_b = b?.[col as keyof ClassDBItem] || "";

    if (type === "text" && val_a === "") {
      val_a = a.especificaciones?.[col] || "";
      val_b = b.especificaciones?.[col] || "";
    }

    let bool = 0;
    if (type === "number") {
      if (col === "price") {
        const usePrice_a = a.priceData.usePrice;
        const usePrice_b = b.priceData.usePrice;
        val_a = a.priceData.prices[usePrice_a] || "";
        val_b = b.priceData.prices[usePrice_b] || "";
      }
      bool = Number(val_a) - Number(val_b);
    } else {
      bool = String(val_a).localeCompare(String(val_b));
    }

    if (order === "desc") return -bool;
    return bool;
  };
}

export const handlePriceData = (
  priceData: ClassPriceData,
  following = false,
  qtt = 1
) => {
  const pricesQtts = priceData?.pricesQtts;
  const price_following = priceData.prices?.following;

  if (!priceData.discountsPercentages) {
    priceData.discountsPercentages = {};
  }

  if (following && !price_following) {
    let discount = 0.1;
    const price = priceData.prices.base;
    if (price > 12000) discount = 0.05;
    priceData.prices.following = price * (1 - discount);
    priceData.discountsPercentages.following = discount;
  }

  if (pricesQtts) {
    let price_qtt = 0;
    const qtts = Object.keys(pricesQtts)
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = 0; i < qtts.length; i++) {
      const umin = qtts[i];

      if (qtt >= umin) {
        price_qtt = pricesQtts[umin] || 0;
      } else {
        break;
      }
    }

    const base = priceData.prices.base;
    priceData.prices.qtt = price_qtt;

    priceData.discountsPercentages.qtt = (base - price_qtt) / base;
  }

  // if (priceData.prices.discount && !priceData.discountsPercentages.discount) {
  //   const percentageDiscount =
  //     (priceData.prices.discount - priceData.prices.base) /
  //     priceData.prices.base;

  //   priceData.discountsPercentages.discount = percentageDiscount;
  // }

  let use = "base";
  const prices = priceData.prices;
  for (const key in prices) {
    if (key === "following" && !following) {
    } else {
      if (prices[key] && prices[key] < (prices[use] || 0)) use = key;
    }
  }
  if (qtt < 1 && use === "base" && prices.qtt && prices.qtt > prices.base) {
    use = "qtt";
  }
  priceData.usePrice = use;

  return priceData;
};

export const filterDbForms = (table: TypeTableFormItem) => {
  const items: ClassDBItem[] = DB_ALL.filter((item) => {
    let flag =
      !item.hidden &&
      item.categorie[0] === "imanes" &&
      item.categorie[1] === "neodimio";

    if (flag && item.forma) {
      flag = item.forma[0] === table.form;
      if (table.exclude) {
        flag = flag && !table.exclude.includes(item.forma[1]);
      }
      if (table.include) {
        flag = flag && table.include.includes(item.forma[1]);
      }
    }

    return flag;
  });

  items.sort((a, b) => {
    return (
      (a?.measures?.largo ?? 0) - (b?.measures?.largo ?? 0) ||
      (a?.measures?.ancho ?? 0) - (b?.measures?.ancho ?? 0) ||
      (a?.measures?.alto ?? 0) - (b?.measures?.alto ?? 0)
    );
  });

  return items;
};

export const getHrefSearch = (filtersValues: TypeFiltersValues) => {
  let href = "";
  const add = [];
  for (const key in filtersValues) {
    if (!["apply", "page"].includes(key)) {
      const val = filtersValues[key as keyof TypeFiltersValues];
      if (Array.isArray(val)) {
        if (val.length) add.push([key, val]);
      } else {
        if (val) add.push([key, val]);
      }
    }
  }

  if (add.length > 0) {
    add.forEach((e, i) => {
      href += i === 0 ? "?" : "&";
      href += e[0] + "=" + e[1];
    });
  }

  return href;
};

export const searchImgs = async (
  items: ClassDBItem[] = [],
  databaseImgsCurrent: TypeDatabaseImg = {},
  toFind: TypeItemImgsArray | "preview" | "all" = "preview"
) => {
  const images_all = import.meta.glob(
    "../assets/items/**/*.{png,jpg,jpeg,svg,webp}",
    {
      eager: true,
      import: "default",
    }
  );
  const srcs = Object.entries(images_all) as string[][];

  const databaseImgs_: TypeDatabaseImg = {};

  items.forEach((item) => {
    let imgData: TypeItemImgs = {};

    const current = databaseImgs_[item.id];
    if (current) imgData = current;

    if (!imgData.haveSvg) {
      if (
        item.categorie[0] === "imanes" &&
        ["neodimio", "ferrita", "arrastre"].includes(item.categorie[1])
      )
        imgData.haveSvg = true;
    }

    if (["preview", "all"].includes(toFind)) {
      if (!imgData.preview) {
        const src_find = srcs.find(([path, _]) =>
          path.includes(`/${item.id}/preview`)
        );
        if (src_find?.length) imgData.preview = src_find[1];
      }
    }

    if (toFind !== "preview") {
      let getImgs: TypeItemImgsArray[] = [];

      if (toFind === "all") {
        getImgs = ["imgs", "thumbnails", "full"];
      } else {
        getImgs = [toFind];
      }

      getImgs.forEach((cat) => {
        if (!imgData[cat as keyof TypeItemImgs]) {
          const cat_ = cat === "imgs" ? "320" : cat;
          const imgs = srcs.filter(([path, _]) =>
            path.includes(`/${item.id}/${cat_}`)
          );
          if (imgs.length)
            // @ts-ignore
            imgData[cat as keyof TypeItemImgs] = imgs.map((src) => src[1]);
        }
      });
    }

    databaseImgs_[item.id] = imgData;
  });

  return { ...databaseImgsCurrent, ...databaseImgs_ };
};

export const toPlainText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const capitalizeText = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getCurrentDate = () => {
  const fechaActual = new Date();

  const año = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaActual.getDate()).padStart(2, "0");

  const horas = String(fechaActual.getHours()).padStart(2, "0");
  const minutos = String(fechaActual.getMinutes()).padStart(2, "0");

  return `${año}/${mes}/${dia}-${horas}:${minutos}`;
};

export const downloadContentToImg = async (
  id: string,
  withDate = false,
  setLoading?: (bool: boolean) => void,
  label?: string
) => {
  setLoading && setLoading(true);
  setTimeout(() => {
    const ref = document.querySelector("#" + id);
    const bg = document.body.classList.contains("dark") ? "black" : "white";
    if (ref) {
      const date = getCurrentDate();

      const configs = {
        backgroundColor: bg,
        pixelRatio: 2,
      };

      setTimeout(async () => {
        try {
          // @ts-ignore
          const dataUrl = await toPng(ref, configs);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = (label || id) + (withDate ? "-" + date : "") + ".png";
          link.click();
        } catch (error) {
          console.error("Error al generar la imagen:", error);
          alert("Error al generar la imagen.");
        }
        setLoading && setLoading(false);
      }, 200);
    }
  }, 500);
};

export const searchParamsToObj = (urlSearch: string) => {
  const params = new URLSearchParams(urlSearch);
  const params_obj: TypeObjectGeneral = {};
  Array.from(params.entries()).map(
    ([k, v]) => (params_obj[k] = v.replace(/%/g, " "))
  );

  return params_obj;
};
