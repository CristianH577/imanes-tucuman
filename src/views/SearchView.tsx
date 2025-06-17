import { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import type {
  ClassDBItem,
  TypeFiltersValues,
  TypeObjectGeneral,
} from "../consts/types";

import { DB_ALL } from "../consts/dbs";
import { FILTERS_VALUES_DEFAULT } from "../consts/siteConfig";

import { cartItemsComparator } from "../libs/functions";

import { Button, ButtonGroup, Link, Spinner } from "@heroui/react";

import ItemsView from "./SearchView/ItemsView";
import SuspenseCustom from "../components/SuspenseCustom";
import InputSearch from "../components/InputSearch";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { SVGBroom } from "../assets/svgs/svgsIcons";

const DrawerFilters = lazy(() => import("./SearchView/DrawerFilters"));

const itemsPerView = 15;

export default function SearchView() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState<ClassDBItem[]>([]);
  const [filtersValues, setFiltersValues] = useState<TypeFiltersValues>(
    FILTERS_VALUES_DEFAULT
  );
  const [visibleItems, setVisibleItems] = useState<ClassDBItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isOpenFiltersDrawer, setIsOpenFiltersDrawer] = useState(false);

  const searhItems = () => {
    setLoading(true);
    let items_: ClassDBItem[] = structuredClone(DB_ALL);

    items_ = items_.filter((item) => !item?.hidden);

    if (filtersValues?.categorie) {
      items_ = items_.filter((item) => {
        const categorie = filtersValues.categorie;
        if (categorie === "otros") {
          return item.categorie === categorie || !item?.categorie;
        } else {
          return item.categorie === categorie;
        }
      });
    }

    if (filtersValues?.subcategorie) {
      items_ = items_.filter((item) => {
        return item.subcategorie === filtersValues.subcategorie;
      });
    }

    ["forma"].forEach((filterKey) => {
      const val = filtersValues?.[filterKey as keyof TypeFiltersValues];
      if (val) {
        const filter_value = String(val).toLowerCase().replace(/_/g, " ");
        items_ = items_.filter(
          (item) =>
            item?.info &&
            filterKey in item.info &&
            String(item.info[filterKey as keyof typeof item.info])
              .toLowerCase()
              .includes(filter_value)
        );
      }
    });

    if (filtersValues?.priceMin) {
      const min = Number(filtersValues?.priceMin);
      items_ = items_.filter((item) => {
        const usePrice = item.price_data.usePrice;
        // @ts-ignore
        const price = item.price_data.prices[usePrice];
        return Number(price) >= min;
      });
    }
    if (filtersValues?.priceMax) {
      const max = Number(filtersValues?.priceMax);
      items_ = items_.filter((item) => {
        const usePrice = item.price_data.usePrice;
        // @ts-ignore
        const price = item.price_data.prices[usePrice];
        return Number(price) <= max;
      });
    }

    if (filtersValues?.text) {
      const text_ = filtersValues.text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      items_ = items_.filter((item) =>
        JSON.stringify(item)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(text_.toLowerCase())
      );
    }

    if (filtersValues?.orderBy) {
      items_.sort(
        cartItemsComparator(
          filtersValues.orderBy.col,
          filtersValues.orderBy.order
        )
      );
    }

    setItems(items_);
    setVisibleItems(items_.slice(0, itemsPerView * filtersValues.page));
    setLoading(false);
  };

  const handleSearch = () => {
    let href = "?orderBy=price-asc";
    if (inputText) {
      href += "&text=" + inputText;
    }
    navigate(href);
  };
  const handleClean = () => setInputText("");

  const showMoreItems = () => {
    let href = "";
    if (search) {
      href += search + "&";
    } else {
      href += "?";
    }
    href += "page=" + (Number(filtersValues.page) + 1);
    navigate(href);
  };

  useEffect(() => {
    const filters_values_ = structuredClone(FILTERS_VALUES_DEFAULT);

    if (search) {
      const params = new URLSearchParams(search);
      const paramsObj: TypeObjectGeneral = {};
      Array.from(params.entries()).map(
        ([k, v]) => (paramsObj[k] = v.replace(/%/g, " "))
      );

      Object.keys(paramsObj).forEach((key) => {
        if (filters_values_.hasOwnProperty(key)) {
          // @ts-ignore
          filters_values_[key] = paramsObj[key];
          filters_values_.apply = true;
        }
      });

      const text = filters_values_?.text;
      if (text) setInputText(text);
    }

    setFiltersValues(filters_values_);
  }, [search]);

  useEffect(searhItems, [filtersValues]);

  return (
    <>
      <section className="flex flex-col items-center gap-2">
        <article className="flex flex-col gap-2 items-center xs:flex-row">
          <InputSearch
            value={inputText}
            setValue={setInputText}
            handleSearch={handleSearch}
          />

          <ButtonGroup>
            <Button
              isIconOnly
              as={Link}
              title="Limpiar filtros"
              href="#search?orderBy=price-asc"
              onPress={handleClean}
            >
              <SVGBroom className="h-6 w-fit" />
            </Button>

            <Button
              isIconOnly
              color={filtersValues?.apply ? "warning" : "default"}
              title="Abrir lista de filtros"
              onPress={() => setIsOpenFiltersDrawer(true)}
            >
              <FilterAltIcon className="h-6 w-fit" />
            </Button>
          </ButtonGroup>
        </article>

        <article className="text-center text-neutral-400">
          <span>Total: {items.length}</span>
          <br />
          <span className="text-second">Los precios pueden variar.</span>
        </article>

        <SuspenseCustom classFall="absolute w-screen min-h-[100dvh] bg-black/50 z-30">
          <DrawerFilters
            isOpen={isOpenFiltersDrawer}
            setIsOpen={setIsOpenFiltersDrawer}
            filtersValues={filtersValues}
          />
        </SuspenseCustom>
      </section>

      {items.length < 1 ? (
        <b>Sin Resultados</b>
      ) : loading ? (
        <Spinner color="secondary" />
      ) : (
        <ItemsView
          items={visibleItems}
          showMoreItems={showMoreItems}
          totalItems={items.length}
        />
      )}
    </>
  );
}
