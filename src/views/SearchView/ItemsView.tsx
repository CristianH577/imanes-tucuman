import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import type { ClassDBItem, TypeOutletContext } from "../../consts/types";

import { SVG_FORMA } from "../../consts/values";
import { DB_IMGS } from "../../consts/dbs";

import ImageCustom from "../../components/ImageCustom";
import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";

import { SVGViewGridAdd } from "../../assets/svgs/svgsIcons";
import { Divider } from "@heroui/react";

type TypeItemsViewProps = {
  items: ClassDBItem[];
  showMoreItems: () => void;
  totalItems: number;
};

const images_all = import.meta.glob(
  "../../assets/items/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
    import: "default",
  }
);
const srcs = Object.entries(images_all) as string[][];

const variants_card = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  hover: {
    scale: 1.05,
  },
};

export default function ItemsView({
  items = [],
  showMoreItems,
  totalItems = 0,
}: TypeItemsViewProps) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  return (
    <section className="w-full grid grid-cols-[repeat(auto-fit,_minmax(150px,_180px))] gap-4 md:gap-6 lg:gap-8 justify-center">
      {items.map((item: ClassDBItem) => {
        const item_imgs = DB_IMGS[String(item.id) as keyof typeof DB_IMGS];
        const preview = item_imgs.preview;

        const SvgForma =
          preview.type === "svg" && preview.src
            ? SVG_FORMA?.[preview.src as keyof typeof SVG_FORMA]
            : false;

        return (
          <motion.div
            key={item.id}
            variants={variants_card}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-content1 rounded-lg shadow-md flex flex-col pb-2"
          >
            {/* <ButtonAddCart
              inCart={item.id in cart}
              itemData={item}
              handleAdd={context.cart.add}
              className="absolute top-2 z-20 right-2 opacity-30"
            /> */}

            <a
              href={`#buscar/${item.id}`}
              title={item.label}
              className="h-full"
            >
              <div className="h-[150px] shadow-small rounded-lg p-2 flex items-center justify-center">
                {SvgForma ? (
                  <SvgForma className="h-full w-full" />
                ) : (
                  <ImageCustom
                    alt={`Imagen de ${item.label}`}
                    className="object-contain h-full"
                    src={
                      srcs.find(([_, path]) =>
                        path.includes(`/${item.id}/${preview.src}`)
                      )?.[1] || ""
                    }
                  />
                )}
              </div>

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
            </a>

            <Divider className="mb-2 w-4/5 self-center" />

            <ButtonAddCart
              inCart={item.id in cart}
              itemData={item}
              handleAdd={context.cart.add}
              className="self-center"
            />
          </motion.div>
        );
      })}

      {items.length < totalItems && (
        <motion.div
          variants={variants_card}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="rounded-lg cursor-pointer shadow-md bg-warning h-fit w-fit self-center place-self-center"
          onClick={showMoreItems}
        >
          <div className="shadow-md rounded-lg p-4 self-center h-[100px]">
            <SVGViewGridAdd className="h-full w-full" />
          </div>

          <div className="flex- flex items-center justify-center p-3 dark:drop-shadow-[0_0_3px_black] text-tert">
            <b>Cargar Mas</b>
          </div>
        </motion.div>
      )}
    </section>
  );
}
