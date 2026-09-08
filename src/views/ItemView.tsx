import { Link, useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { m } from "framer-motion";

import { searchImgs } from "../libs/functions_db";

import { DB_ALL } from "../consts/dbs";
import { OBJ_MEASURES } from "../consts/values";
import type { TypeOutletContext } from "../consts/types";
import { ClassDBItem } from "../consts/classes";

import { Breadcrumbs, Divider, Skeleton } from "@mui/material";

import TableItemPrices from "./ItemView/TableItemPrices";
import NotFound from "../layout/NotFound";
import TooltipFuerzaExp from "../components/TooltipFuerzaExp";
import ImagesSection from "./ItemView/ImagesSection";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function ItemView() {
  const context: TypeOutletContext = useOutletContext();
  const { id } = useParams();

  const [itemData, setItemData] = useState<ClassDBItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const searchData = async () => {
    if (id) {
      const items_filter = DB_ALL.filter((item) => item.id === Number(id));
      const item_ = structuredClone(items_filter[0]);

      if (item_) {
        const databaseImgs_ = await searchImgs(
          [item_],
          context.db.value,
          "all"
        );
        context.db.set(databaseImgs_);
      }

      setItemData(item_);
    }

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    searchData();
  }, [id]);

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height="80dvh" />;
  }

  if (itemData) {
    return (
      <m.div
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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] min-h-[80dvh]"
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="categorias"
          className="col-span-full"
        >
          {itemData.categorie.map((cat, i) => (
            <Link
              key={cat}
              className="capitalize hover:text-custom1"
              to={
                "/buscar?orderBy=price-asc&categorie=" +
                itemData.categorie.slice(0, i + 1).join(",")
              }
            >
              {cat}
            </Link>
          ))}
        </Breadcrumbs>

        <ImagesSection
          loading={loading}
          forma={itemData.forma}
          imgsData={context.db.value[itemData.id]}
        />

        <TableItemPrices itemData={itemData} />

        {(itemData?.measures ||
          itemData?.especificaciones ||
          itemData?.caracteristicas) && (
          <>
            <Divider className="col-span-full" />
            <m.section
              variants={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 },
              }}
              className="col-span-full prose dark:prose-invert max-w-none"
            >
              <h3 className="font-semibold text-tertiary">Caracteristicas</h3>

              <ol className="list-none xs:flex flex-wrap gap-x-4 bg-content1 py-1 px-4 rounded-md font-sans">
                {itemData.measures &&
                  Object.entries(itemData.measures).map(([id, value]) => {
                    const item_data =
                      OBJ_MEASURES[id as keyof typeof OBJ_MEASURES];
                    return (
                      <li key={id}>
                        <b className="capitalize italic">
                          {item_data.label ?? id}:{" "}
                        </b>
                        {id === "fuerzaExp" && "≈"}
                        {value}
                        {item_data.measure}{" "}
                        {id === "fuerzaExp" && <TooltipFuerzaExp exp />}
                        {id === "fuerza" && <TooltipFuerzaExp />}
                      </li>
                    );
                  })}

                {itemData.especificaciones &&
                  Object.entries(itemData.especificaciones).map(
                    ([key, value]) => (
                      <li key={key}>
                        <b className="capitalize italic">
                          {key.replace(/_/g, " ")}:{" "}
                        </b>
                        {value}
                      </li>
                    )
                  )}

                {itemData.caracteristicas &&
                  itemData.caracteristicas.map((caract) => (
                    <li key={caract} className="capitalize italic break-words">
                      <b>{caract}</b>
                    </li>
                  ))}
              </ol>
            </m.section>
          </>
        )}

        {itemData?.description && (
          <>
            <Divider className="col-span-full" />
            <m.section
              variants={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 },
              }}
              className="col-span-full prose dark:prose-invert max-w-none"
            >
              <h3>Descripcion</h3>
              <p className="px-4 py-2 whitespace-pre-line bg-content1 rounded-md font-sans">
                {itemData.description}.
              </p>
            </m.section>
          </>
        )}
      </m.div>
    );
  }

  return <NotFound />;
}
