import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import { DB_ALL } from "../../consts/dbs";
import { OBJ_SHAPES } from "../../consts/values";
import type { ClassDBItem } from "../../consts/classes";

import type { TypeCart, TypeIcon, TypeOutletContext } from "../../consts/types";

import { scrollStyle } from "../../libs/tvs";
import {
  cartItemsComparator,
  handlePriceData,
  searchImgs,
  toPercentageFormat,
  toPriceFormat,
} from "../../libs/functions";

import { Button, CircularProgress, Input } from "@mui/material";

import ImageCustom from "../../components/ImageCustom";
import PriceLabel from "../../components/PriceLabel";

import DeleteIcon from "@mui/icons-material/Delete";

const cols = [
  {
    id: "img",
    label: "",
    disabledSort: true,
  },
  // {
  //   id: "categorie",
  //   label: "Categoria",
  // },
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

export default function CartList({ downloading = false, following = false }) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ClassDBItem[]>([]);
  const [orderBy, setOrderBy] = useState<string>("price-asc");
  const [totalVisibleItems, setTotalVisibleItems] = useState(itemsPerView);
  const [total, setTotal] = useState({ ...totalDefault });
  const visibleItems = items.slice(0, totalVisibleItems);
  const [cartAux, setCartAux] = useState<TypeCart>(structuredClone(cart));

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
        (item.priceData = handlePriceData(
          item.priceData,
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
          <div>
            <a
              href={"#buscar/" + row.id}
              title="Ver producto"
              className="max-xs:whitespace-normal hover:underline"
            >
              {row.label}
            </a>
            <p className="capitalize text-second text-neutral-500 dark:text-neutral-300">
              {row.categorie.join(" > ")}
            </p>
          </div>
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
          <SvgForma className="w-[50px] h-fit max-h-[50px] self-center" />
        ) : (
          <ImageCustom
            alt={`Imagen de ${row.label}`}
            className="object-contain w-[50px] min-w-[50px] max-h-[50px]"
            src={imgsData.thumbnails && imgsData.thumbnails[0]}
          />
        );
      case "categorie":
        return <span className="capitalize">{row.categorie.join(" > ")}</span>;
      case "qtt":
        const qtt = cartAux[row.id];
        return (
          <div className="flex justify-end gap-2">
            <Input
              name={String(row.id)}
              aria-label="Cantidad"
              type="number"
              size="small"
              color="warning"
              className="w-24 text-prima"
              startAdornment="x"
              endAdornment={
                <span className="px-1">{row?.priceData?.salesUnit || "U"}</span>
              }
              inputProps={{
                min: 0,
                "aria-label": "cantidad",
              }}
              classes={{
                underline: "!border-custom1",
              }}
              sx={{
                "&::before": { borderColor: "rgb(var(--color-customSwitch))" },
              }}
              value={qtt ? String(qtt) : ""}
              onChange={(e) => handleQttChange(e, row.id)}
              onBlur={(e) => handleQttBlur(e, row.id)}
              onKeyDown={(e) => handleKeyDown(e, row.id)}
            />

            <Button
              size="small"
              color="error"
              variant="outlined"
              className={`hover:bg-[--variant-containedBg] hover:text-white${
                downloading ? " hidden" : ""
              }`}
              title="Quitar del carrito"
              onClick={() => handleDelete(row.id)}
              sx={{ minWidth: 0, px: 0.5 }}
            >
              <DeleteIcon className="h-5 w-fit" />
            </Button>
          </div>
        );

      case "price":
        return <PriceLabel itemData={row} />;
      case "subtotal":
        const use = row.priceData.usePrice;
        const price = row.priceData.prices[use];
        return toPriceFormat(Number(price) * cart[row.id]);

      default:
        return val_str;
    }
  };

  const handlePriceQtt = (target: HTMLInputElement, id: number) => {
    const itemData = items.find((item) => item.id === id);

    if (itemData) {
      const qtt = Number(target.value);
      const cart_ = structuredClone(cart);

      itemData.priceData = handlePriceData(
        itemData.priceData,
        following && itemData.categorie[0] === "imanes",
        qtt
      );
      context.cart.set({ ...cart_, [id]: qtt });
    }
  };

  const handleQttChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const itemData = items.find((item) => item.id === id);
    let qtt = Number(e.target.value);

    if (
      itemData &&
      qtt > 0 &&
      qtt < 1 &&
      itemData.priceData.salesDecimal &&
      !itemData.priceData.salesDecimal.includes(qtt)
    ) {
      qtt = 1;
    }

    setCartAux({ ...cart, [id]: qtt });
  };
  const handleQttBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const target = e.target as HTMLInputElement;
    handlePriceQtt(target, id);
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
        const use = item.priceData.usePrice;
        const price = item.priceData.prices[use];
        const base = item.priceData.prices.base;
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
      <span className="text-neutral-400 text-start ps-2 font-semibold self-center">
        Total de artículos: {items.length}
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
        className={`w-full sm:px-4 ${scrollStyle}`}
        style={{
          overflowX: downloading ? "visible" : "auto",
          maxWidth: downloading ? "none" : "90vw",
          paddingBottom: downloading ? "0" : "0.5rem",
        }}
      >
        <table className="w-full sm:min-w-[640px]">
          <thead className="border-b-4 border-neutral-300">
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
                className="even:text-custom2-10 dark:even:text-custom1 group hover:bg-secondary/20"
              >
                {cols.map((col) => (
                  <td
                    key={col.id + "-" + row.id}
                    className="px-3 py-2 sm:px-1 group-hover:font-semibold whitespace-nowrap"
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
                    variant="contained"
                    className="bg-custom1-2 text-custom2 hover:scale-105"
                    title="Mostrar mas"
                    onClick={() => showMore()}
                    sx={{
                      textTransform: "none",
                      borderRadius: 3,
                      fontFamily: "unset",
                      fontWeight: "bold",
                    }}
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
        <section className="self-end font-semibold px-4 text-end border-2 border-customSwitch/80 rounded-md p-2">
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

          <span className="text-customSwitch">
            Total {toPriceFormat(total?.total)}
          </span>
        </section>
      )}
    </>
  );
}
