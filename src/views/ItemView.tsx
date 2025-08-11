import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { searchImgs } from "../libs/functions";

import { DB_ALL } from "../consts/dbs";
import { OBJ_MEASURES } from "../consts/values";
import type { TypeOutletContext } from "../consts/types";
import { ClassDBItem } from "../consts/classes";

import { CircularProgress, Divider } from "@mui/material";
import { Button } from "@heroui/button";

import TableItemPrices from "./ItemView/TableItemPrices";
import NotFound from "../layout/NotFound";
import TooltipFuerzaExp from "./ItemView/TooltipFuerzaExp";
import ImagesSection from "./ItemView/ImagesSection";

import CompareIcon from "@mui/icons-material/Compare";

export default function ItemView() {
  const context: TypeOutletContext = useOutletContext();
  const { id } = useParams();

  const [itemData, setItemData] = useState<ClassDBItem>(new ClassDBItem());
  const [loading, setLoading] = useState(false);

  const searchData = async () => {
    setLoading(true);
    if (id) {
      const items_filter = DB_ALL.filter((item) => item.id === Number(id));
      const item_ = structuredClone(items_filter[0]);

      const databaseImgs_ = await searchImgs([item_], context.db.value, "all");
      context.db.set(databaseImgs_);

      setItemData(item_);
    }

    setLoading(false);
  };

  useEffect(() => {
    searchData();
  }, [id]);

  if (loading) {
    return <CircularProgress color="secondary" />;
  } else if (Object.keys(itemData)?.length < 1) {
    return <NotFound />;
  }

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={
        "w-full max-w-[700px] lg:w-f lg:max-w-none mt-4 lg:grid gap-2 " +
        (itemData?.price_data?.prices_qtts
          ? "grid-cols-[minmax(0,1fr)_minmax(150px,465px)]"
          : "grid-cols-[minmax(0,1fr)_minmax(150px,260px)]")
      }
    >
      <motion.section
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="flex gap-2">
          {itemData.isComparable && (
            <Button
              color="secondary"
              isIconOnly
              title="Mostrar referencia de tamaño"
              onPress={() => context.setMagnetData(itemData)}
            >
              <CompareIcon className="h-7 w-fit" />
            </Button>
          )}
          <h1 className="text-4xl font-bold pb-2">{itemData?.label}</h1>
        </div>

        <Divider className="bg-neutral-500/50" />
        <ImagesSection
          loading={loading}
          forma={itemData.forma}
          imgsData={context.db.value[itemData.id]}
        />
      </motion.section>

      <motion.section
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        className="overflow-hidden"
      >
        <Divider className="bg-neutral-500/50 lg:hidden" />
        <TableItemPrices itemData={itemData} />
      </motion.section>

      <Divider className="bg-neutral-500/50 col-span-full mt-2 mb-4 md:mt-0" />

      <motion.section
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        className="flex flex-wrap gap-6 lg:col-span-full"
      >
        {itemData?.measures && (
          <article>
            <h3 className="font-bold">Medidas</h3>

            <ol className="space-y-1">
              {Object.entries(itemData.measures).map(([id, value]) => {
                const item_data = OBJ_MEASURES[id as keyof typeof OBJ_MEASURES];
                return (
                  <li key={id}>
                    <span className="capitalize italic">
                      {item_data.label ?? id}:{" "}
                    </span>
                    {value}
                    {item_data.measure}
                  </li>
                );
              })}
            </ol>
          </article>
        )}

        {itemData?.especificaciones && (
          <article>
            <h3 className="font-bold">Especificaciones</h3>

            <ol className="space-y-1">
              {Object.entries(itemData.especificaciones).map(([key, value]) => (
                <li key={key}>
                  <span className="capitalize italic">
                    {key.replace(/_/g, " ")}:{" "}
                  </span>
                  {value}
                  {key === "fuerza_experimental" ? <TooltipFuerzaExp /> : null}
                </li>
              ))}
            </ol>
          </article>
        )}

        {itemData?.caracteristicas && (
          <article>
            <h3 className="font-bold">Caracteristicas</h3>

            <ol className="space-y-1">
              {itemData.caracteristicas &&
                itemData.caracteristicas.map((caract) => (
                  <li key={caract} className="capitalize break-words italic">
                    {caract}
                  </li>
                ))}
            </ol>
          </article>
        )}
      </motion.section>

      <motion.section
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        className="prose dark:prose-invert lg:col-span-full"
      >
        {itemData?.description && (
          <>
            <Divider className="bg-neutral-500/50 my-4" />
            <h3 className="text-tertiary">Descripcion</h3>
            <p>{itemData.description}.</p>
            <Divider className="bg-neutral-500/50 my-4" />
          </>
        )}
      </motion.section>
    </motion.div>
  );
}
