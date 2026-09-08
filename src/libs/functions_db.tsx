import type { ClassDBItem } from "../consts/classes";
import type {
  TypeDatabaseImg,
  TypeItemImgs,
  TypeItemImgsArray,
} from "../consts/types";

export const searchImgs = async (
  items: ClassDBItem[] = [],
  databaseImgsCurrent: TypeDatabaseImg = {},
  toFind: TypeItemImgsArray | "preview" | "all" = "preview"
) => {
  const images_all = import.meta.glob(
    "../assets/items/**/*.{png,jpg,jpeg,svg,webp}",
    {
      eager: true,
      import: "default",
    }
  );
  const srcs = Object.entries(images_all) as string[][];

  const databaseImgs_: TypeDatabaseImg = structuredClone(databaseImgsCurrent);

  items.forEach((item) => {
    let imgData: TypeItemImgs = databaseImgs_?.[item.id] || {};

    if (!imgData.haveSvg) {
      if (
        item.categorie[0] === "imanes" &&
        ["neodimio", "ferrita", "arrastre"].includes(item.categorie[1])
      )
        imgData.haveSvg = true;
    }

    // preview
    if (["preview", "all"].includes(toFind)) {
      if (!imgData.preview) {
        const src_find = srcs.find(([path, _]) =>
          path.includes(`/${item.id}/preview`)
        );
        if (src_find?.length) imgData.preview = src_find[1];
      }
    }

    if (toFind !== "preview") {
      let getImgs: TypeItemImgsArray[] = ["imgs", "thumbnails", "full"];

      if (toFind !== "all") getImgs = [toFind];

      getImgs.forEach((cat) => {
        if (!imgData[cat as keyof TypeItemImgs]) {
          const cat_ = cat === "imgs" ? "320" : cat;
          const imgs = srcs.filter(([path, _]) =>
            path.includes(`/${item.id}/${cat_}`)
          );
          if (imgs.length)
            // @ts-ignore
            imgData[cat as keyof TypeItemImgs] = imgs.map((src) => src[1]);
        }
      });
    }

    databaseImgs_[item.id] = imgData;
  });

  return databaseImgs_;
};
