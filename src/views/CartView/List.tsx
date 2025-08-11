import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import { DB_ALL } from "../../consts/dbs";
import { OBJ_SHAPES } from "../../consts/values";
import type { ClassDBItem } from "../../consts/classes";

import type { TypeIcon, TypeOutletContext } from "../../consts/types";

import { scrollStyle } from "../../libs/tvs";
import {
  cartItemsComparator,
  handlePriceData,
  searchImgs,
  toPercentageFormat,
  toPriceFormat,
} from "../../libs/functions";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { CircularProgress } from "@mui/material";

import ImageCustom from "../../components/ImageCustom";
import PriceLabel from "../../components/PriceLabel";

import DeleteIcon from "@mui/icons-material/Delete";

const cols = [
  {
    id: "img",
    label: "",
    disabledSort: true,
  },
  {
    id: "categorie",
    label: "Categoria",
  },
  {
    id: "label",
    label: "Nombre",
  },
  {
    id: "qtt",
    label: "Cantidad",
    isNumeric: true,
    disabledSort: true,
  },
  {
    id: "price",
    label: "Precio",
    isNumeric: true,
  },
  {
    id: "subtotal",
    label: "Subtotal",
    isNumeric: true,
    disabledSort: true,
  },
];

const totalDefault = {
  total: 0,
  base: 0,
  percentage: 0,
};

const itemsPerView = 10;

export default function List({ downloading = false, following = false }) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ClassDBItem[]>([]);
  const [orderBy, setOrderBy] = useState<string>("price-asc");
  const [totalVisibleItems, setTotalVisibleItems] = useState(itemsPerView);
  const [total, setTotal] = useState({ ...totalDefault });
  const visibleItems = items.slice(0, totalVisibleItems);

  const searchItems = async () => {
    setLoading(true);

    let items_ = DB_ALL.filter((item) => item.id in cart);
    items_ = JSON.parse(JSON.stringify(items_));

    const databaseImgs_ = await searchImgs(
      items_,
      context.db.value,
      "thumbnails"
    );
    context.db.set(databaseImgs_);

    items_.map(
      (item) =>
        (item.price_data = handlePriceData(
          item.price_data,
          following && item.categorie[0] === "imanes",
          cart[item.id]
        ))
    );

    setItems(items_);
    setLoading(false);
  };

  const makeCell = (col: string, row: ClassDBItem) => {
    const val = row[col as keyof ClassDBItem];
    const val_str = typeof val === "string" ? val : "-";

    switch (col) {
      case "label":
        return (
          <a
            href={"#buscar/" + row.id}
            title="Ver producto"
            className="max-xs:whitespace-normal hover:underline"
          >
            {row.label}
          </a>
        );

      case "img":
        const imgsData = context.db.value[row.id];
        let SvgForma: boolean | TypeIcon = false;

        if (imgsData.haveSvg && row.forma) {
          const form_data = OBJ_SHAPES[row.forma[0] as keyof typeof OBJ_SHAPES];
          if (form_data && form_data.icon) SvgForma = form_data.icon;

          if (
            row.forma[1] &&
            form_data.subs &&
            row.forma[1] in form_data.subs
          ) {
            const sub_form_data = form_data.subs[row.forma[1]];
            if (sub_form_data.icon) SvgForma = sub_form_data.icon;
          }
        }
        return SvgForma ? (
          <SvgForma className="w-[50px] h-fit self-center" />
        ) : (
          <ImageCustom
            alt={`Imagen de ${row.label}`}
            className="object-contain w-[50px] min-w-[50px]"
            src={imgsData.thumbnails && imgsData.thumbnails[0]}
          />
        );
      case "categorie":
        return <span className="capitalize">{row.categorie.join(" > ")}</span>;
      case "qtt":
        return (
          <div className="flex justify-end gap-2">
            <Input
              name={String(row.id)}
              aria-label="Cantidad"
              type="number"
              size="sm"
              className="min-w-24 max-w-32"
              classNames={{
                inputWrapper:
                  "border-b-2 border-custom1 bg-transparent rounded-none",
                input: "text-prima",
              }}
              startContent="x"
              endContent={row?.price_data?.salesUnit || "u"}
              min={0}
              defaultValue={String(cart[row.id]) || ""}
              onBlur={(e) => handleQttBlur(e, row.id)}
              onKeyDown={(e) => handleKeyDown(e, row.id)}
            />

            <Button
              isIconOnly
              size="sm"
              color="danger"
              variant="ghost"
              className={`${downloading ? " hidden" : ""}`}
              title="Quitar del carrito"
              onPress={() => handleDelete(row.id)}
            >
              <DeleteIcon className="h-5 w-fit" />
            </Button>
          </div>
        );

      case "price":
        return <PriceLabel itemData={row} />;
      case "subtotal":
        const use = row.price_data.usePrice;
        const price = row.price_data.prices[use];
        return toPriceFormat(Number(price) * cart[row.id]);

      default:
        return val_str;
    }
  };

  const handlePriceQtt = (target: HTMLInputElement, id: number) => {
    const qtt = Number(target.value);

    const itemData = items.find((item) => item.id === id);

    if (itemData) {
      const cart_ = structuredClone(cart);
      itemData.price_data = handlePriceData(
        itemData.price_data,
        following && itemData.categorie[0] === "imanes",
        qtt
      );
      context.cart.set({ ...cart_, [id]: qtt });
    }
  };
  const handleQttBlur = (e: React.FocusEvent<HTMLInputElement>, id: number) => {
    handlePriceQtt(e.target, id);
  };
  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      handlePriceQtt(target, id);
    }
  };

  const handleDelete = (id: number) => {
    context.cart.add(id, 0);
  };
  const getTotal = () => {
    if (items.length > 0) {
      let total_ = structuredClone(totalDefault);

      items.forEach((item) => {
        const use = item.price_data.usePrice;
        const price = item.price_data.prices[use];
        const base = item.price_data.prices.base;
        const qtt = cart[item.id];

        total_.total += Number(price) * qtt;
        total_.base += base * qtt;
      });

      total_.percentage = (total_.base - total_.total) / total_.base;

      setTotal(total_);
    }
  };

  const showMore = () => {
    const total_ = totalVisibleItems + itemsPerView;
    setTotalVisibleItems(total_);
  };

  const handleSortCol = (e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    const col = e.currentTarget.dataset?.column || "price";
    let order = "desc";
    if (orderBy.includes("desc")) order = "asc";

    setOrderBy(col + "-" + order);
  };

  const sortItems = () => {
    if (orderBy) {
      const [col, order] = orderBy.split("-");
      const items_ = items.sort(cartItemsComparator(col, order));

      setItems(items_);
    }
  };

  useEffect(() => {
    searchItems();
  }, [cart]);

  useEffect(() => {
    getTotal();
  }, [items]);

  useEffect(sortItems, [orderBy]);

  useEffect(() => {
    if (downloading) setTotalVisibleItems(items.length);
  }, [downloading]);

  if (loading) {
    return <CircularProgress className="place-self-center m-6" />;
  }

  if (Object.keys(cart).length < 1) {
    return (
      <b className="text-center text-xl p-4">Sin artículos para mostrar.</b>
    );
  }

  return (
    <>
      <span className="text-neutral-400 self-center">
        Total: {items.length}
      </span>

      <motion.section
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: 0.1,
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className={`w-full px-4 ${scrollStyle}`}
        style={{
          overflowX: downloading ? "visible" : "auto",
          maxWidth: downloading ? "none" : "90vw",
          paddingBottom: downloading ? "0" : "0.5rem",
        }}
      >
        <table className="w-full sm:min-w-[750px]">
          <thead className="border-b-3">
            <tr>
              {cols.map((col) => (
                <th
                  key={col.id}
                  className={`p-2 whitespace-nowrap${
                    col?.disabledSort ? "" : " cursor-pointer hover:opacity-80"
                  }`}
                  style={{ textAlign: col?.isNumeric ? "end" : "start" }}
                  data-column={col.id}
                  onClick={col?.disabledSort ? undefined : handleSortCol}
                >
                  {col.label}
                  {!col?.disabledSort && orderBy.includes(col.id)
                    ? orderBy.includes("desc")
                      ? " 🡡"
                      : " 🡣"
                    : null}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleItems.map((row) => (
              <motion.tr
                key={row.id}
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                className="even:text-custom2-10 dark:even:text-custom1 group hover:bg-secondary/30"
              >
                {cols.map((col) => (
                  <td
                    key={col.id + "-" + row.id}
                    className="p-2 group-hover:font-semibold whitespace-nowrap"
                    style={{ textAlign: col?.isNumeric ? "end" : "start" }}
                  >
                    {makeCell(col.id, row)}
                  </td>
                ))}
              </motion.tr>
            ))}

            <tr>
              <td>
                {totalVisibleItems < items.length && (
                  <Button
                    className="bg-custom1-2 text-custom2 font-bold hover:scale-105"
                    title="Mostrar mas"
                    onPress={() => showMore()}
                  >
                    Siguientes
                  </Button>
                )}
              </td>
              <td colSpan={4}></td>
            </tr>
          </tbody>
        </table>
      </motion.section>

      {items.length > 0 && (
        <section className="self-end font-semibold px-4 text-end">
          {total?.percentage > 0 && (
            <div>
              <b className="text-danger">
                -{toPercentageFormat(total?.percentage)}
              </b>{" "}
              <span className="text-neutral-400 line-through">
                {toPriceFormat(total?.base)}
              </span>
            </div>
          )}

          <span className="text-custom1">
            Total {toPriceFormat(total?.total)}
          </span>
        </section>
      )}
    </>
  );
}
