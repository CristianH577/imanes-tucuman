import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { DB_ALL } from "../consts/dbs";
import { MEASURES_MEASURES } from "../consts/values";

import { ClassDBItem, type TypeOutletContext } from "../consts/types";

import { Divider, Spinner } from "@heroui/react";

import TableItemPrices from "./ItemView/TableItemPrices";
import NotFound from "../layout/NotFound";
import ImagesSection from "./ItemView/ImagesSection";
import TooltipFuerzaExp from "./ItemView/TooltipFuerzaExp";

export default function ItemView() {
  const context: TypeOutletContext = useOutletContext();
  const { id } = useParams();

  const [itemData, setItemData] = useState<ClassDBItem>(new ClassDBItem());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      const items_filter = DB_ALL.filter((item) => item.id === Number(id));
      const item_ = structuredClone(items_filter[0]);

      setItemData(item_);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner color="secondary" />;
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
        "w-full max-w-[700px] lg:max-w-[1000px] mt-4 lg:grid gap-2 " +
        (itemData?.price_data?.prices_qtts
          ? "grid-cols-[minmax(0,1fr)_minmax(150px,350px)]"
          : "grid-cols-[minmax(0,1fr)_minmax(150px,260px)]")
      }
    >
      <motion.section
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <h1 className="text-4xl font-bold pb-2">{itemData?.label}</h1>

        <Divider />
        <ImagesSection
          id={itemData.id}
          onComparate={() => context.setMagnetData(itemData)}
          isComparable={itemData.isComparable ?? false}
        />
      </motion.section>

      <motion.section
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        className="overflow-hidden"
      >
        <Divider className="lg:hidden" />
        <TableItemPrices itemData={itemData} />
      </motion.section>

      <Divider className="col-span-full mt-2 mb-4 md:mt-0" />

      <motion.section
        variants={{
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
        }}
        className="flex flex-wrap gap-4 prose dark:prose-invert lg:col-span-full"
      >
        {itemData?.measures && (
          <article>
            <h3 className="text-tertiary mt-0">Medidas</h3>

            <ol className="list-none ps-0">
              {Object.entries(itemData.measures).map(([key, value]) => {
                return (
                  <li key={key}>
                    <span className="capitalize italic">{key}: </span>
                    {value}
                    {MEASURES_MEASURES?.[key as keyof typeof MEASURES_MEASURES]}
                  </li>
                );
              })}
            </ol>
          </article>
        )}

        {itemData?.caracteristicas && (
          <article>
            <h3 className="text-tertiary mt-0">Caracteristicas</h3>

            <ol className="list-none ps-0 flex flex-wrap gap-4">
              {itemData.caracteristicas &&
                itemData.caracteristicas.map((caract) => (
                  <li
                    key={caract}
                    className="capitalize break-words italic font-bold"
                  >
                    {caract}
                  </li>
                ))}
            </ol>
          </article>
        )}

        {itemData?.especificaciones && (
          <article>
            <h3 className="text-tertiary mt-0">Especificaciones</h3>

            <ol className="list-none ps-0">
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
            <Divider className="my-4" />
            <h3 className="text-tertiary">Descripcion</h3>
            <p>{itemData.description}.</p>
            <Divider className="my-4" />
          </>
        )}
      </motion.section>
    </motion.div>
  );
}
