import { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";

import { DB_ALL } from "../consts/dbs";
import { FILTERS_VALUES_DEFAULT } from "../consts/values";

import type { TypeFiltersValues, TypeOutletContext } from "../consts/types";
import type { ClassDBItem } from "../consts/classes";

import {
  cartItemsComparator,
  getHrefSearch,
  scrollToTop,
  searchParamsToObj,
  toPlainText,
} from "../libs/functions";
import { searchImgs } from "../libs/functions_db";

import { Divider } from "@mui/material";

import PaginationCustom from "../components/PaginationCustom";
import ErrorBoundary from "../components/ErrorBoundary";
import SuspenseCustom from "../components/SuspenseCustom.tsx";
import ItemsViewHorizontal from "./SearchView/ItemsViewHorizontal";

const PanelMovile = lazy(() => import("./SearchView/PanelMovile.tsx"));
const Filters = lazy(() => import("./SearchView/AsideFilters.tsx"));

const itemsPerView = 20;

export default function SearchView() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const context: TypeOutletContext = useOutletContext();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ClassDBItem[]>([]);
  const [filtersValues, setFiltersValues] = useState<TypeFiltersValues>(
    FILTERS_VALUES_DEFAULT
  );
  const [visibleItems, setVisibleItems] = useState<ClassDBItem[]>([]);

  const searhItems = async (filters: TypeFiltersValues) => {
    scrollToTop();
    setLoading(true);

    let items_: ClassDBItem[] = [];
    items_ = DB_ALL.filter((item) => item?.stock !== "hidden");
    items_ = JSON.parse(JSON.stringify(items_));

    if (filters.categorie.length > 0) {
      filters.categorie.forEach((key, i) => {
        items_ = items_.filter((item) => {
          if (key.includes("other") && !item.categorie[i]) {
            return true;
          }
          return item.categorie.includes(key);
        });
      });
    }

    if (filters.forma.length > 0) {
      filters.forma.forEach((forma) => {
        items_ = items_.filter((item) => {
          return item.forma?.includes(forma);
        });
      });
    }

    if (filters?.priceMin) {
      const min = Number(filters?.priceMin);
      items_ = items_.filter((item) => {
        const usePrice = item.priceData.usePrice;
        const price = item.priceData.prices[usePrice];
        return Number(price) >= min;
      });
    }
    if (filters?.priceMax) {
      const max = Number(filters?.priceMax);
      items_ = items_.filter((item) => {
        const usePrice = item.priceData.usePrice;
        const price = item.priceData.prices[usePrice];
        return Number(price) <= max;
      });
    }

    if (filters?.text) {
      const text_ = toPlainText(filters.text);

      items_ = items_.filter((item) => {
        const item_text = toPlainText(JSON.stringify(item));
        const bool = item_text.includes(text_);
        if (bool) return item;
      });
    }

    if (filters?.stock) {
      items_ = items_.filter(
        (item) =>
          item?.stock === undefined ||
          !["hidden", 0, "0"].includes(String(item?.stock))
      );
    }
    if (filters?.discount) {
      items_ = items_.filter((item) => item?.priceData.prices?.discount);
    }

    if (filters?.orderBy) {
      const [col, order] = filters.orderBy.split("-");
      items_.sort(cartItemsComparator(col, order));
    }

    const visibleItems_ = items_.slice(
      itemsPerView * (filters.page - 1),
      itemsPerView * filters.page
    );
    const databaseImgs_ = await searchImgs(visibleItems_, context.db.value);

    context.db.set(databaseImgs_);
    setItems(items_);
    setVisibleItems(visibleItems_);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const handleChangePage = (page: number) => {
    let href = getHrefSearch(filtersValues);
    if (href) {
      href += "&";
    } else {
      href += "?";
    }
    href += "page=" + page;
    navigate(href);
  };

  useEffect(() => {
    const filters_values_ = structuredClone(FILTERS_VALUES_DEFAULT);

    if (search) {
      const params = searchParamsToObj(search);

      Object.keys(params).forEach((key) => {
        if (filters_values_.hasOwnProperty(key)) {
          switch (key) {
            case "page":
              filters_values_[key] = Number(params[key]);
              break;
            case "forma":
            case "categorie":
              filters_values_[key] = params[key].split(",");
              break;
            case "stock":
            case "discount":
              filters_values_[key] = Boolean(params[key]) || false;
              break;

            default:
              // @ts-ignore
              filters_values_[key] = params[key];
              break;
          }
          filters_values_.apply = true;
        }
      });
    }

    setFiltersValues(filters_values_);
    searhItems(filters_values_);
  }, [search]);

  return (
    <section className="w-full flex gap-4 justify-center">
      <article className="hidden md:flex max-w-[220px]">
        <SuspenseCustom classFall="min-w-[180px]">
          <ErrorBoundary>
            <Filters filtersValues={filtersValues} />
          </ErrorBoundary>
        </SuspenseCustom>
        <Divider orientation="vertical" />
      </article>

      <article className="w-full space-y-4 max-w-3xl">
        <section className="flex flex-col items-center gap-2">
          <SuspenseCustom>
            <PanelMovile filtersValues={filtersValues} />
          </SuspenseCustom>

          <article className="text-center font-semibold">
            {filtersValues.text && (
              <p className="max-md:hidden">Buscando: "{filtersValues.text}"</p>
            )}
            <p>Total: {items.length}</p>
            <p className="text-second text-neutralSwitch">
              PRESIONE la imagen, nombre o flecha para ver mas detalles.
              <br />
              Los precios pueden variar.
            </p>
          </article>
        </section>

        <ErrorBoundary>
          <ItemsViewHorizontal
            items={visibleItems}
            loading={loading}
            databaseImgs={context?.db?.value}
          />
        </ErrorBoundary>

        {items.length > itemsPerView && (
          <PaginationCustom
            totalItems={items.length}
            currentPage={filtersValues.page}
            itemsPerPage={itemsPerView}
            setPage={handleChangePage}
            showJumps
            siblings={1}
            className="mt-4"
            classes={{
              li: "bg-custom1-3 text-custom2 font-semibold data-[disabled=true]:text-neutral-500 data-[disabled=true]:bg-neutral-300/60 data-[active=true]:bg-custom2-10 data-[active=true]:text-custom1-3 hover:bg-custom2-10 hover:text-custom1-3",
            }}
            breakpoints={{
              240: {
                showElipsis: true,
              },
              320: {
                showJumps: true,
              },
              400: {
                siblings: 1,
              },
              500: {
                siblings: 2,
              },
              600: {
                siblings: 3,
              },
              700: {
                siblings: 4,
              },
              800: {
                siblings: 5,
              },
            }}
          />
        )}
      </article>
    </section>
  );
}
