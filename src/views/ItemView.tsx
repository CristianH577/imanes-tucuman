import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { searchImgs } from "../libs/functions";

import { DB_ALL } from "../consts/dbs";
import { OBJ_MEASURES } from "../consts/values";
import type { TypeOutletContext } from "../consts/types";
import { ClassDBItem } from "../consts/classes";

import { CircularProgress, Divider } from "@mui/material";
import TableItemPrices from "./ItemView/TableItemPrices";
import NotFound from "../layout/NotFound";
import TooltipFuerzaExp from "./ItemView/TooltipFuerzaExp";
import ImagesSection from "./ItemView/ImagesSection";

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
      className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-[1000px]"
    >
      <ImagesSection
        loading={loading}
        forma={itemData.forma}
        imgsData={context.db.value[itemData.id]}
      />

      <TableItemPrices itemData={itemData} />

      {(itemData?.measures ||
        itemData?.especificaciones ||
        itemData?.caracteristicas) && (
        <motion.section
          variants={{
            hidden: { opacity: 0, x: 200 },
            visible: { opacity: 1, x: 0 },
          }}
          className="col-span-full prose dark:prose-invert max-w-none"
        >
          <Divider className="mb-4" />
          <h3 className="font-bold text-tertiary">Caracteristicas</h3>

          <ol className="sm:grid grid-flow-col gap-6 w-fit list-none list-inside">
            {itemData.measures &&
              Object.entries(itemData.measures).map(([id, value]) => {
                const item_data = OBJ_MEASURES[id as keyof typeof OBJ_MEASURES];
                return (
                  <li key={id}>
                    <b className="capitalize italic">
                      {item_data.label ?? id}:{" "}
                    </b>
                    {value}
                    {item_data.measure}{" "}
                    {id === "fuerzaExp" && <TooltipFuerzaExp exp />}
                    {id === "fuerza" && <TooltipFuerzaExp />}
                  </li>
                );
              })}

            {itemData.especificaciones &&
              Object.entries(itemData.especificaciones).map(([key, value]) => (
                <li key={key}>
                  <b className="capitalize italic">
                    {key.replace(/_/g, " ")}:{" "}
                  </b>
                  {value}
                </li>
              ))}

            {itemData.caracteristicas &&
              itemData.caracteristicas.map((caract) => (
                <li key={caract} className="capitalize break-words italic">
                  <b>{caract}</b>
                </li>
              ))}
          </ol>
        </motion.section>
      )}

      {itemData?.description && (
        <motion.section
          variants={{
            hidden: { opacity: 0, x: 200 },
            visible: { opacity: 1, x: 0 },
          }}
          className="col-span-full prose dark:prose-invert max-w-none"
        >
          <Divider className="mb-4" />
          <h3>Descripcion</h3>
          <p className="ps-6">{itemData.description}.</p>
        </motion.section>
      )}
    </motion.div>
  );
}
