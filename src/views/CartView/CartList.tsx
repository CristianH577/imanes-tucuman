import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import { m } from "framer-motion";

import { DB_ALL } from "../../consts/dbs";
import { OBJ_SHAPES } from "../../consts/values";
import type { ClassDBItem } from "../../consts/classes";
import {
  COLS_CART,
  FILTERS_CART_DEF,
  TOTAL_CART_DEF,
} from "../../consts/values_cart";

import type { TypeCart, TypeIcon, TypeOutletContext } from "../../consts/types";

import { scrollStyle } from "../../libs/tvs";
import {
  cartItemsComparator,
  handlePriceData,
  toPriceFormat,
} from "../../libs/functions";
import { searchImgs } from "../../libs/functions_db";

import { Button, Input, Skeleton } from "@mui/material";

import ImageCustom from "../../components/ImageCustom";
import LabelPrice from "../../components/LabelPrice";
import LabelTotalCart from "./LabelTotalCart";

import DeleteIcon from "@mui/icons-material/Delete";

export default function CartList({ downloading = false }) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;
  const cartAuxDef = structuredClone(cart);
  const loadingRef = useRef(true);

  const [items, setItems] = useState<ClassDBItem[]>([]);
  const [total, setTotal] = useState(TOTAL_CART_DEF);
  const [filters, setFilters] = useState(FILTERS_CART_DEF);
  const [cartAux, setCartAux] = useState<TypeCart>(cartAuxDef); // Manejo de los inputs de cantidad
  const totalVisibleItems = downloading
    ? items.length
    : filters.itemsPerView * filters.page;

  const searchItems = async () => {
    loadingRef.current = true;

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
        (item.priceData = handlePriceData(item.priceData, cart[item.id]))
    );

    if (filters.orderBy) {
      const [col, order] = filters.orderBy.split("-");
      items_ = items_.sort(cartItemsComparator(col, order));
    }

    setItems(items_);
    getTotal(items_);
    loadingRef.current = false;
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
              placeholder="Cantidad"
              type="number"
              size="small"
              color="warning"
              className="w-20 text-prima text-current"
              startAdornment="x"
              endAdornment={
                <span className="px-1 text-xs">{row?.priceData?.salesUnit || "U"}</span>
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
              onBlur={(e) =>
                handlePriceQtt(e.target as HTMLInputElement, row.id)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePriceQtt(e.target as HTMLInputElement, row.id);
                }
              }}
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
        return <LabelPrice itemData={row} />;
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

      itemData.priceData = handlePriceData(itemData.priceData, qtt);
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
      qtt > 0 &&
      qtt < 1 &&
      !itemData?.priceData?.salesDecimal?.includes(qtt)
    ) {
      qtt = 1;
    }

    setCartAux({ ...cart, [id]: qtt });
  };

  const handleDelete = (id: number) => context.cart.add(id, 0);
  const getTotal = (array: ClassDBItem[] = []) => {
    let total_ = structuredClone(TOTAL_CART_DEF);

    array.forEach((item) => {
      const use = item.priceData.usePrice;
      const price = item.priceData.prices[use];
      const base = item.priceData.prices.base;
      const qtt = cart[item.id];

      total_.total += Number(price) * qtt;
      total_.base += base * qtt;
    });

    setTotal(total_);
  };

  const showMore = () => {
    setFilters((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  };

  const handleSortCol = (e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    const col = e.currentTarget.dataset?.column || "price";
    let order = "desc";
    const filters_ = structuredClone(filters);
    if (filters_.orderBy.includes("desc")) order = "asc";
    filters_.orderBy = col + "-" + order;
    setFilters(filters_);
  };

  useEffect(() => {
    searchItems();
  }, [cart, filters]);

  if (loadingRef.current) {
    return <Skeleton width="100%" height={64} />;
  }

  if (items.length < 1) {
    return (
      <b className="text-center text-xl p-4">Sin artículos para mostrar.</b>
    );
  }

  return (
    <>
      <m.section
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
        className={`w-full sm:px-4 lg:overflow-x-hidden ${scrollStyle}`}
        style={{
          overflowX: downloading ? "visible" : "auto",
          maxWidth: downloading ? "none" : "90vw",
          paddingBottom: downloading ? "0" : "0.5rem",
        }}
      >
        <table className="w-full sm:min-w-[640px]">
          <thead className="border-b-4 border-neutral-300">
            <tr>
              {COLS_CART.map((col) => (
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
                  {!col?.disabledSort && filters.orderBy.includes(col.id)
                    ? filters.orderBy.includes("desc")
                      ? " 🡡"
                      : " 🡣"
                    : null}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.slice(0, totalVisibleItems).map((row) => (
              <m.tr
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
                {COLS_CART.map((col) => (
                  <td
                    key={col.id + "-" + row.id}
                    className="px-3 py-2 sm:px-1 whitespace-nowrap"
                    style={{ textAlign: col?.isNumeric ? "end" : "start" }}
                  >
                    {makeCell(col.id, row)}
                  </td>
                ))}
              </m.tr>
            ))}
          </tbody>
        </table>
      </m.section>

      {totalVisibleItems < items.length && (
        <Button
          color="warning"
          variant="contained"
          className="text-tert hover:scale-[1.02] transition-transform shadow-sm"
          title="Mostrar mas"
          onClick={showMore}
          sx={{
            width: "100%",
          }}
        >
          ▼
        </Button>
      )}

      <LabelTotalCart total={total} articulos={items.length} />
    </>
  );
}
