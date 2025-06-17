import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { SVG_FORMA } from "../../consts/values";

import type {
  ClassDBItem,
  TypeOrderBy,
  TypeOutletContext,
} from "../../consts/types";

import { scrollStyle } from "../../libs/tvs";
import {
  cartItemsComparator,
  handlePriceData,
  toPercentageFormat,
  toPriceFormat,
} from "../../libs/functions";

import { Button, Input, Spinner, type PressEvent } from "@heroui/react";

import ImageCustom from "../../components/ImageCustom";
import PriceLabel from "../../components/PriceLabel";

import DeleteIcon from "@mui/icons-material/Delete";

const images_all = import.meta.glob(
  "../../assets/items/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
  }
);
const srcs = Object.entries(images_all).map(
  ([_, module]) => (module as { default: string }).default
);

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

export default function List({ downloading = false }) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<TypeOrderBy>({
    col: "label",
    order: "asc",
  });
  const [items, setItems] = useState(Object.values(cart));
  const [totalVisibleItems, setTotalVisibleItems] = useState(itemsPerView);
  const [total, setTotal] = useState({ ...totalDefault });
  const visibleItems = items.slice(0, totalVisibleItems);

  const makeCell = (col: string, row: ClassDBItem) => {
    const val = row[col as keyof ClassDBItem];
    const val_str = typeof val === "string" ? val : "-";

    switch (col) {
      case "img":
        const src = row.imgs_data.preview.src;
        const SvgForma =
          row.imgs_data.preview.type === "svg" && src
            ? SVG_FORMA?.[src as keyof typeof SVG_FORMA]
            : false;
        return SvgForma ? (
          <SvgForma className="w-[50px] h-fit self-center" />
        ) : (
          <ImageCustom
            alt={`Imagen de ${row.label}`}
            className="object-contain w-[50px] min-w-[50px]"
            src={srcs.find((src) =>
              src.includes(row.imgs_data.preview.thumbnails)
            )}
          />
        );
      case "categorie":
        return (
          <span className="capitalize">
            {val_str} {row?.subcategorie}
          </span>
        );
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
              value={String(row?.qtt) || ""}
              data-id={row.id}
              onChange={handleQtt}
              onBlur={handleQttBlur}
            />

            <Button
              isIconOnly
              size="sm"
              color="danger"
              variant="ghost"
              className={`${downloading ? " hidden" : ""}`}
              title="Quitar del carrito"
              data-id={row.id}
              onPress={handleDelete}
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
        return toPriceFormat(Number(price) * Number(row.qtt));

      default:
        return val_str;
    }
  };

  const handleQtt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = Number(e.target.dataset.id);
    const cart_ = structuredClone(cart);
    cart_[id].qtt = Number(value);
    context.cart.set(cart_);
  };
  const handleQttBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const id = Number(e.target.dataset.id);
    const qtt = Number(e.target?.value);
    const cart_ = structuredClone(cart);
    const itemData = cart_[id];
    itemData.qtt = qtt;

    itemData.price_data = handlePriceData(itemData);

    cart_[id] = itemData;

    context.cart.set(cart_);
  };

  const handleDelete = (e: PressEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset?.id);
    const cart_ = { ...cart };
    const itemData = cart_[id];
    itemData.qtt = 0;
    context.cart.add(itemData);
  };
  const getTotal = () => {
    if (cart && Object.values(cart).length > 0) {
      let total_ = structuredClone(totalDefault);

      Object.values(cart).forEach((item) => {
        const use = item.price_data.usePrice;
        const price = item.price_data.prices[use];
        const base = item.price_data.prices.base;
        const qtt = Number(item?.qtt);

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
    let order: "asc" | "desc" = "desc";
    if (orderBy.order === "desc") order = "asc";

    const orderBy_ = { col: col, order: order };

    setOrderBy(orderBy_);
  };

  useEffect(() => {
    setLoading(true);

    const items_ = items.map((item) => {
      item.price_data = handlePriceData(item);
      return item;
    });

    setItems(items_);
    setLoading(false);
  }, []);

  useEffect(() => {
    getTotal();
    setItems(Object.values(cart));
  }, [cart]);

  useEffect(() => {
    if (downloading) setTotalVisibleItems(items.length);
  }, [downloading]);

  useEffect(() => {
    const sortItems = async () => {
      setLoading(true);
      if (orderBy) {
        const items_ = items.sort(
          cartItemsComparator(orderBy.col, orderBy.order)
        );

        setItems(items_);
      }
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };

    sortItems();
  }, [orderBy]);

  if (cart && Object.keys(cart).length < 1) {
    return (
      <b className="text-center text-xl p-4">Sin artículos para mostrar.</b>
    );
  }

  if (loading) {
    return <Spinner color="secondary" />;
  }

  return (
    <>
      <span className="text-neutral-400 self-center">
        Total: {items.length}
      </span>

      <section
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
                  {!col?.disabledSort && orderBy.col === col.id
                    ? orderBy.order === "desc"
                      ? " 🡡"
                      : " 🡣"
                    : null}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleItems.map((row) => (
              <tr
                key={row.id}
                className="even:text-custom2-10 dark:even:text-custom1 group hover:bg-secondary/30"
              >
                {cols.map((col) => (
                  <td
                    key={col.id + "-" + row.id}
                    className="p-2 group-hover:font-semibold"
                    style={{ textAlign: col?.isNumeric ? "end" : "start" }}
                  >
                    {makeCell(col.id, row)}
                  </td>
                ))}
              </tr>
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
      </section>

      {Object.keys(cart).length > 0 && (
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
