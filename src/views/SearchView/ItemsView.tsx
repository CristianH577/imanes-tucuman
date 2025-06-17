import { useOutletContext } from "react-router";

import type { ClassDBItem, TypeOutletContext } from "../../consts/types";

import { SVG_FORMA } from "../../consts/values";

import ImageCustom from "../../components/ImageCustom";
import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";

import { SVGViewGridAdd } from "../../assets/svgs/svgsIcons";

type TypeItemsViewProps = {
  items: ClassDBItem[];
  showMoreItems: () => void;
  totalItems: number;
};

const images_all = import.meta.glob(
  "../../assets/items/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
  }
);
const srcs = Object.entries(images_all).map(
  ([_, module]) => (module as { default: string }).default
);

export default function ItemsView({
  items,
  showMoreItems,
  totalItems = 0,
}: TypeItemsViewProps) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  return (
    <section className="w-full grid xs:grid-cols-[repeat(auto-fit,_minmax(160px,_180px))] sm:grid-cols-[repeat(auto-fit,_minmax(200px,_250px))] gap-2 sm:gap-4 md:gap-10 justify-center">
      {items.map((item: ClassDBItem) => {
        const preview = item.imgs_data.preview;
        const SvgForma =
          preview.type === "svg" && preview.src
            ? SVG_FORMA?.[preview.src as keyof typeof SVG_FORMA]
            : false;

        return (
          <div key={item.id} className="relative">
            <ButtonAddCart
              inCart={item.id in cart}
              itemData={item}
              handleAdd={context.cart.add}
              className="absolute top-2 z-20 right-2"
            />

            <a href={`#search/${item.id}`} title="Ver el producto">
              <div className="hover:scale-105 transition-transform bg-content1 rounded-lg shadow-md">
                {SvgForma ? (
                  <div className="shadow-small rounded-lg p-4 self-center h-[150px] w-full">
                    <SvgForma className="h-full w-full" />
                  </div>
                ) : (
                  <ImageCustom
                    alt={`Imagen de ${item.label}`}
                    className="w-full object-contain p-4 h-[150px] rounded-lg shadow-small"
                    src={srcs.find((src) =>
                      src.includes(item.imgs_data.preview.src)
                    )}
                  />
                )}

                <div className="p-2">
                  <p className="text-second self-start text-neutral-400 capitalize line-clamp-1">
                    {item.categorie} {item?.subcategorie || ""}
                  </p>
                  <b className="line-clamp-1 text-start">{item.label}</b>
                  {item?.noStock ? (
                    <b className="text-danger">Sin Stock</b>
                  ) : null}

                  <PriceLabel
                    itemData={item}
                    classNames={{
                      price:
                        "font-semibold text-tert text-custom2 dark:text-custom1",
                    }}
                  />
                </div>
              </div>
            </a>
          </div>
        );
      })}

      {items.length < totalItems && (
        <div
          className="hover:scale-105 transition-transform rounded-lg cursor-pointer shadow-md bg-warning h-fit w-fit self-center place-self-center"
          onClick={showMoreItems}
        >
          <div className="shadow-md rounded-lg p-4 self-center h-[100px]">
            <SVGViewGridAdd className="h-full w-full" />
          </div>

          <div className="flex- flex items-center justify-center p-3 dark:drop-shadow-[0_0_3px_black] text-tert">
            <b>Cargar Mas</b>
          </div>
        </div>
      )}
    </section>
  );
}
