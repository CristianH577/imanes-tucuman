import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import type { ClassDBItem, TypeOutletContext } from "../../consts/types";

import { SVG_FORMA } from "../../consts/values";
import { DB_IMGS } from "../../consts/dbs";

import ImageCustom from "../../components/ImageCustom";
import ButtonAddCart from "../../components/ButtonAddCart";
import PriceLabel from "../../components/PriceLabel";

import { SVGViewGridAdd } from "../../assets/svgs/svgsIcons";
import { Divider } from "@mui/material";

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
    <section className="w-full grid grid-cols-[repeat(auto-fit,_minmax(150px,_180px))] gap-4 lg:gap-6 justify-center">
      {items.map((item: ClassDBItem) => {
        const id = String(item.id);
        const item_imgs = id in DB_IMGS ? DB_IMGS[id] : DB_IMGS[0];
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
            <a
              href={`#buscar/${item.id}`}
              title={item.label}
              className="flex flex-col h-full"
            >
              <div className="h-[150px] shadow-small rounded-lg p-2 flex items-center justify-center">
                {SvgForma ? (
                  <SvgForma className="h-full w-full max-w-[150px]" />
                ) : (
                  <ImageCustom
                    alt={`Imagen de ${item.label}`}
                    className="object-contain h-full"
                    classes={{ wrapper: "h-full w-full max-w-[150px]" }}
                    src={
                      srcs.find(([path, _]) =>
                        path.includes(`/${item.id}/${preview.src}`)
                      )?.[1] || undefined
                    }
                  />
                )}
              </div>

              <div className="p-2 flex-1 flex flex-col justify-between">
                <p>
                  <span className="text-second self-start text-neutral-400 capitalize line-clamp-1">
                    {item.categorie} {item?.subcategorie || ""}
                  </span>

                  <b className="line-clamp-2 text-start">{item.label}</b>
                  {item?.noStock ? (
                    <b className="text-danger">Sin Stock</b>
                  ) : null}
                </p>

                <PriceLabel
                  itemData={item}
                  className="self-end place-self-end justify-self-end end-0 content-end place-content-end items-end justify-items-end end"
                  classNames={{
                    price:
                      "font-semibold text-tert text-custom2-10 dark:text-custom1",
                  }}
                />
              </div>
            </a>

            <Divider variant="middle" className="mb-2 bg-neutral-500/50" />

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
