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
  searchImgs,
  searchParamsToObj,
  toPlainText,
} from "../libs/functions";

import { Button, ButtonGroup } from "@mui/material";

import ItemsView from "./SearchView/ItemsView";
import SuspenseCustom from "../components/SuspenseCustom";
import InputSearch from "../components/InputSearch";
import PaginationCustom from "../components/PaginationCustom";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { SVGBroom } from "../assets/svgs/svgsIcons";

const DrawerFilters = lazy(() => import("./SearchView/DrawerFilters"));

const itemsPerView = 16;

export default function SearchView() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const context: TypeOutletContext = useOutletContext();

  const [items, setItems] = useState<ClassDBItem[]>([]);
  const [filtersValues, setFiltersValues] = useState<TypeFiltersValues>(
    FILTERS_VALUES_DEFAULT
  );
  const [visibleItems, setVisibleItems] = useState<ClassDBItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isOpenFiltersDrawer, setIsOpenFiltersDrawer] = useState(false);

  const searhItems = async () => {
    scrollToTop();
    setLoading(true);

    let items_: ClassDBItem[] = [];
    items_ = DB_ALL.filter((item) => !item?.hidden);
    items_ = JSON.parse(JSON.stringify(items_));

    if (filtersValues.categorie.length > 0) {
      filtersValues.categorie.forEach((key, i) => {
        items_ = items_.filter((item) => {
          if (key.includes("other") && !item.categorie[i]) {
            return true;
          }
          return item.categorie.includes(key);
        });
      });
    }

    if (filtersValues.forma.length > 0) {
      filtersValues.forma.forEach((forma) => {
        items_ = items_.filter((item) => {
          return item.forma?.includes(forma);
        });
      });
    }

    if (filtersValues?.priceMin) {
      const min = Number(filtersValues?.priceMin);
      items_ = items_.filter((item) => {
        const usePrice = item.priceData.usePrice;
        const price = item.priceData.prices[usePrice];
        return Number(price) >= min;
      });
    }
    if (filtersValues?.priceMax) {
      const max = Number(filtersValues?.priceMax);
      items_ = items_.filter((item) => {
        const usePrice = item.priceData.usePrice;
        const price = item.priceData.prices[usePrice];
        return Number(price) <= max;
      });
    }

    if (filtersValues?.text) {
      const text_ = toPlainText(filtersValues.text);

      items_ = items_.filter((item) => {
        const item_text = toPlainText(JSON.stringify(item));
        const bool = item_text.includes(text_);
        if (bool) return item;
      });
    }

    if (filtersValues?.stock) {
      items_ = items_.filter((item) => !item?.noStock);
    }
    if (filtersValues?.discount) {
      items_ = items_.filter((item) => item?.priceData.prices?.discount);
    }

    if (filtersValues?.orderBy) {
      const [col, order] = filtersValues.orderBy.split("-");
      items_.sort(cartItemsComparator(col, order));
    }

    const visibleItems_ = items_.slice(
      itemsPerView * (filtersValues.page - 1),
      itemsPerView * filtersValues.page
    );
    const databaseImgs_ = await searchImgs(visibleItems_, context.db.value);

    context.db.set(databaseImgs_);
    setItems(items_);
    setVisibleItems(visibleItems_);
    setLoading(false);
  };

  const handleSearch = () => {
    let href = "?orderBy=price-asc";
    if (inputText) href += "&text=" + inputText;
    navigate(href);
  };

  const handleClean = () => setInputText("");

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
              filters_values_[key] = Boolean(params[key]);
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

    setInputText(filters_values_?.text);
    setFiltersValues(filters_values_);
  }, [search]);

  useEffect(() => {
    searhItems();
  }, [filtersValues]);

  return (
    <>
      <section className="flex flex-col items-center gap-2">
        <article className="flex flex-col gap-2 items-center">
          <InputSearch
            value={inputText}
            className="sm:hidden"
            setValue={setInputText}
            handleSearch={handleSearch}
          />

          <ButtonGroup
            variant="contained"
            sx={{
              "& .MuiButton-root": {
                textTransform: "none",
                fontFamily: "unset",
                fontWeight: "bold",
              },
            }}
          >
            <Button
              component={"a"}
              title="Limpiar filtros"
              color="inherit"
              href="#buscar?orderBy=price-asc"
              className="font-bold"
              startIcon={<SVGBroom className="h-6 w-fit" />}
              onClick={handleClean}
            >
              Limpiar
            </Button>

            <Button
              color={filtersValues?.apply ? "warning" : "inherit"}
              title="Abrir lista de filtros"
              className="font-bold"
              startIcon={<FilterAltIcon className="h-6 w-fit" />}
              onClick={() => setIsOpenFiltersDrawer(true)}
            >
              Filtros
            </Button>
          </ButtonGroup>
        </article>

        <article className="text-center text-neutral-400 font-semibold">
          {filtersValues.text && (
            <p className="max-sm:hidden">Buscando: "{filtersValues.text}"</p>
          )}
          <p>
            Total: {items.length}
            <br />
            <span className="text-second">
              Presione en las tarjetas para ver el articulo.
              <br />
              Los precios pueden variar.
            </span>
          </p>
        </article>
      </section>

      <ItemsView
        items={visibleItems}
        loading={loading}
        databaseImgs={context.db.value}
      />

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

      {isOpenFiltersDrawer && (
        <SuspenseCustom classFall="absolute w-screen min-h-screen top-0 bg-black/50 z-30">
          <DrawerFilters
            isOpen={isOpenFiltersDrawer}
            setIsOpen={setIsOpenFiltersDrawer}
            filtersValues={filtersValues}
          />
        </SuspenseCustom>
      )}
    </>
  );
}
