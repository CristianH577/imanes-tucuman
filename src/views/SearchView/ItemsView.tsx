import { useOutletContext } from "react-router";
import { m } from "framer-motion";

import type {
  TypeDatabaseImg,
  TypeIcon,
  TypeOutletContext,
} from "../../consts/types";
import type { ClassDBItem } from "../../consts/classes";

import { OBJ_SHAPES } from "../../consts/values";

import ImageCustom from "../../components/ImageCustom";
import ButtonAddCart from "../../components/ButtonAddCart";
import LabelPrice from "../../components/LabelPrice";
import LabelStockData from "../../components/LabelStockData";
// import ButtonsStoreOnline from "../../components/ButtonsStoreOnline";

import { CircularProgress, Divider } from "@mui/material";

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
    scale: 1.05,
  },
};

export default function ItemsView({
  items,
  loading = false,
  databaseImgs,
}: IntfProps) {
  const context: TypeOutletContext = useOutletContext();
  const cart = context.cart.value;

  if (loading)
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  if (items.length < 1)
    return (
      <div className="flex justify-center">
        <span className="font-semibold text-xl">Sin resultados</span>
      </div>
    );

  return (
    <section className="w-full grid grid-cols-[repeat(auto-fit,_minmax(150px,_180px))] gap-4 lg:gap-6 justify-center">
      {items.map((item: ClassDBItem) => {
        const imgsData = databaseImgs?.[item.id] || {};
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
          <m.article
            key={item.id}
            variants={variants_card}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-content1 rounded-lg shadow-md flex flex-col gap-2 font-bold pb-2"
          >
            <a
              href={`#buscar/${item.id}`}
              title={"Ver " + item.label}
              className="flex flex-col h-full gap-1"
            >
              {/* imagen */}
              <div className="h-[150px] shadow-small rounded-lg flex items-center justify-center p-2">
                {SvgForma ? (
                  <SvgForma className="h-full w-full max-w-[150px]" />
                ) : (
                  <ImageCustom
                    alt={`Imagen de ${item.label}`}
                    className="object-contain w-full h-full"
                    classes={{ wrapper: "h-full max-w-[150px]" }}
                    src={imgsData.preview}
                  />
                )}
              </div>

              {/* contenido */}
              <div className="text-second flex-1 flex flex-col justify-between gap-0.5 px-2">
                <div>
                  <b className="self-start text-neutralSwitch capitalize line-clamp-1">
                    {item.categorie[0]}{" "}
                    {item.categorie[1] ? " > " + item.categorie[1] : ""}
                  </b>
                  <b className="line-clamp-2 text-start">{item.label}</b>
                </div>

                <LabelStockData
                  stock={item.stock}
                  className="text-center mt-auto"
                />

                <LabelPrice
                  itemData={item}
                  className="self-end"
                  classNames={{
                    price: "text-custom2-10 dark:text-custom1",
                  }}
                />
              </div>
            </a>

            <Divider variant="middle" className="bg-neutral-500/50" />

            <div className="flex flex-wrap gap-2 justify-center">
              {/* {item.links && <ButtonsStoreOnline links={item.links} />} */}

              <ButtonAddCart
                qtt={1}
                qttCart={context.cart.value[item.id]}
                handleAdd={() => {
                  let qtt = 1;
                  if (item.id in cart) qtt = 0;
                  context.cart.add(item.id, qtt);
                }}
                className="self-center"
              />
            </div>
          </m.article>
        );
      })}
    </section>
  );
}
