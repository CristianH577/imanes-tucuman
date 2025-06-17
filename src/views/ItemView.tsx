import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";

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
    <div className="w-full max-w-[700px] lg:max-w-[1000px] mt-4">
      <section className="lg:flex gap-4">
        <article className="w-full">
          <h1 className="text-4xl font-bold">{itemData?.label}</h1>

          <Divider />
          <ImagesSection
            imgsData={itemData.imgs_data}
            onComparate={() => context.setMagnetData(itemData)}
            isComparable={
              itemData?.categorie === "imanes" &&
              itemData?.subcategorie !== undefined &&
              ["neodimio", "arrastre", "ferrita"].includes(
                itemData?.subcategorie
              )
            }
          />
        </article>

        <article>
          <Divider className="lg:hidden" />
          <TableItemPrices itemData={itemData} />
        </article>
      </section>

      <Divider className="mt-4" />

      <section className="flex flex- flex-wrap gap-2 xs:gap-4 sm:gap-8 prose dark:prose-invert">
        {itemData?.measures ? (
          <article>
            <h3 className="text-tertiary">Medidas</h3>

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
        ) : null}

        {itemData?.caracteristicas ? (
          <article>
            <h3 className="text-tertiary">Caracteristicas</h3>

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
        ) : null}

        {itemData?.info ? (
          <article>
            <h3 className="text-tertiary">Especificaciones</h3>

            <ol className="list-none ps-0">
              {Object.entries(itemData.info).map(([key, value]) => (
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
        ) : null}
      </section>

      {itemData?.description ? (
        <section className="prose dark:prose-invert">
          <Divider className="my-4" />
          <h3 className="text-tertiary">Descripcion</h3>
          <p>{itemData.description}.</p>
          <Divider className="my-4" />
        </section>
      ) : null}
    </div>
  );
}
