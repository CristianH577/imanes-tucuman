import { useOutletContext } from "react-router";
import { m } from "framer-motion";

import type {
  TypeDatabaseImg,
  TypeIcon,
  TypeOutletContext,
} from "../../consts/types";
import type { ClassDBItem } from "../../consts/classes";
import { toPriceFormat } from "../../libs/functions";

import { OBJ_SHAPES } from "../../consts/values";

import ImageCustom from "../../components/ImageCustom";
import ButtonAddCart from "../../components/ButtonAddCart";
import LabelPrice from "../../components/LabelPrice";
import LabelStockData from "../../components/LabelStockData";
// import ButtonsStoreOnline from "../../components/ButtonsStoreOnline";

import { Button, Divider, Skeleton } from "@mui/material";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

interface IntfProps {
  items: ClassDBItem[];
  loading?: boolean;
  databaseImgs?: TypeDatabaseImg;
}

const variants_card = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  hover: {
    scale: 1.02,
  },
};

export default function ItemsViewHorizontal({
  items = [],
  loading = false,
  databaseImgs = {},
}: IntfProps) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  return (
    <ol className="w-full grid grid-cols-[repeat(auto-fit,_minmax(150px,_200px))] sm:flex flex-col gap-4 justify-center">
      {loading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <li
            key={"item-loadin-" + i}
            className="bg-content1 rounded-sm shadow-md flex flex-col sm:flex-row gap-2 h-[300px] sm:h-[150px]"
          >
            <Skeleton height={"100%"} width={"100%"} variant="rounded" />
          </li>
        ))
      ) : items.length < 1 ? (
        <m.li
          variants={variants_card}
          initial="hidden"
          animate="visible"
          className="font-semibold text-xl text-center bg-content1 rounded-md p-2"
        >
          Sin resultados
        </m.li>
      ) : (
        items.map((item: ClassDBItem) => {
          const imgsData = databaseImgs[item.id];
          let SvgForma: boolean | TypeIcon = false;

          if (imgsData.haveSvg && item.forma) {
            const form_data =
              OBJ_SHAPES[item.forma[0] as keyof typeof OBJ_SHAPES];
            if (form_data && form_data.icon) SvgForma = form_data.icon;

            if (
              item.forma[1] &&
              form_data.subs &&
              item.forma[1] in form_data.subs
            ) {
              const sub_form_data = form_data.subs[item.forma[1]];
              if (sub_form_data.icon) SvgForma = sub_form_data.icon;
            }
          }

          return (
            <m.li
              key={item.id}
              variants={variants_card}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-content1 rounded-lg shadow-md font-bold flex flex-col justify-between sm:flex-row gap-2"
            >
              <div className="sm:w-[150px] h-[150px] p-2 self-center hover:opacity-50">
                <a href={`#buscar/${item.id}`} title={"Ver " + item.label}>
                  {SvgForma ? (
                    <SvgForma className="h-full w-full" />
                  ) : (
                    <ImageCustom
                      alt={`Imagen de ${item.label}`}
                      className="object-contain w-full h-full"
                      classes={{ wrapper: "h-full" }}
                      src={imgsData.preview}
                    />
                  )}
                </a>
              </div>

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                className="bg-neutral-500/30 hidden sm:block"
              />

              <div className="flex-1 flex flex-col sm:grid sm:grid-cols-6 gap-2 p-2">
                <div className="sm:col-span-3 md:col-span-4 min-[850px]:col-span-3 flex flex-col justify-between gap-1 flex-1">
                  <p>
                    <b className="self-start text-neutral-500 text-second dark:text-neutral-400 capitalize line-clamp-1">
                      {/* {item.categorie[0]}{" "}
                    {item.categorie[1] ? " > " + item.categorie[1] : ""} */}
                      {item.categorie.join(" > ")}
                    </b>
                    <a
                      href={`#buscar/${item.id}`}
                      title={"Ver " + item.label}
                      className="line-clamp-2 text-start max-sm:text-second hover:text-customSwitch hover:underline"
                    >
                      {item.label}
                    </a>
                  </p>

                  <LabelStockData
                    stock={item.stock}
                    className="text-center text-second max-sm:mt-auto"
                  />

                  <LabelPrice
                    itemData={item}
                    className="row-span-2 self-end"
                    classNames={{
                      price: "text-customSwitch",
                      discountWrapper: "text-second",
                    }}
                  />
                </div>

                <div className="hidden overflow-hidden sm:flex sm:col-span-2 md:hidden min-[850px]:flex gap-2">
                  {item.priceData.pricesQtts && (
                    <>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        className="bg-neutral-500/30"
                      />
                      <ul className="text-second self-center flex-1">
                        <li className="px-2 gap-2 grid grid-cols-2">
                          <p className="col-start-2">Precios </p>
                          {/* {item.priceData.salesUnit && <span>x{item.priceData.salesUnit}</span>} */}

                        </li>
                        {Object.entries(item.priceData.pricesQtts).map(
                          ([qtt, price], i) => (
                            <li
                              key={i}
                              className={
                                "px-2 gap-2 grid grid-cols-2" +
                                (qtt === "1" || i > 5 ? " hidden" : "")
                              }
                            >
                              <span className="text-end">x{qtt}</span>
                              <span className="col-span-">
                                {toPriceFormat(price)}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </div>

                <div className="flex md:col-span-2 md:col-start-5 min-[850px]:col-span-1 min-[850px]:col-start-auto">
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    className="bg-neutral-500/30 hidden sm:block"
                  />

                  <div className="flex sm:flex-col gap-2 items-center justify-center p-2 flex-1">
                    <ButtonAddCart
                      qtt={1}
                      qttCart={item.id in cart ? 1 : 0}
                      handleAdd={() => {
                        const qtt = item.id in cart ? 0 : 1;
                        context.cart.add(item.id, qtt);
                      }}
                    />

                    {/* {item.links && <ButtonsStoreOnline links={item.links} />} */}

                    <Button
                      variant="outlined"
                      size="small"
                      color="info"
                      component="a"
                      href={`#buscar/${item.id}`}
                      title={"Ver " + item.label}
                      className="hover:bg-sky-200 dark:hover:bg-sky-900"
                      sx={{
                        minWidth: 0,
                        borderRadius: "0.5rem",
                      }}
                    >
                      <ArrowCircleRightIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </m.li>
          );
        })
      )}
    </ol>
  );
}
