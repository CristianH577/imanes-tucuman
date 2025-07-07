import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { DB_IMGS } from "../../consts/dbs";

import { scrollStyle } from "../../libs/tvs";

import { Button } from "@heroui/button";

import ImageCustom from "../../components/ImageCustom";

import CompareIcon from "@mui/icons-material/Compare";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface TypeImagesSectionProps {
  id: number;
  isComparable: boolean;
  onComparate: () => void;
}

const images_all = import.meta.glob(
  "../../assets/items/**/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
    import: "default",
  }
);
const srcs = Object.entries(images_all) as string[][];

export default function ImagesSection({
  id,
  isComparable = false,
  onComparate = () => {},
}: TypeImagesSectionProps) {
  const imgsData = DB_IMGS[String(id) as keyof typeof DB_IMGS];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleButtons = (num: number) => {
    let idx_ = selectedIndex + num;
    const max = imgsData.imgs?.length || 0;
    if (idx_ < 0) {
      idx_ = max - 1;
    } else if (idx_ >= max) {
      idx_ = 0;
    }
    setSelectedIndex(idx_);
  };

  return (
    <section className="flex flex-col items-center justify-center p-2 gap-2 sm:p-4 relative">
      {imgsData?.imgs && imgsData.imgs?.length > 1 && (
        <motion.article
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className={`w-full max-w-[90vw] p-2 place-self-center grid grid-flow-col auto-cols-[50px] overflow-auto gap-2 ${scrollStyle}`}
        >
          {imgsData.imgs.map((img, i) => {
            const src =
              srcs.find(([path, _]) =>
                path.includes(`/${id}/thumbnails/${img}`)
              )?.[1] || "";

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                  },
                }}
                className="cursor-pointer rounded-medium hover:scale-95 hover:opacity-100 opacity-70 data-[selected=true]:opacity-100 data-[selected=true]:border-2 data-[selected=true]:border-custom1 overflow-hidden bg-content4 h-[50px]"
                data-selected={selectedIndex === i}
                onClick={() => setSelectedIndex(i)}
              >
                <ImageCustom
                  alt={`Miniatura ${i}`}
                  className="object-contain h-full"
                  classes={{ wrapper: "h-full" }}
                  src={src}
                />
              </motion.div>
            );
          })}
        </motion.article>
      )}

      <motion.article
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-screen sm:w-full h-[350px] flex items-center justify-center py-4 xs:px-4 relative"
      >
        {imgsData?.imgs && imgsData?.imgs?.length > 1 && (
          <>
            <Button
              isIconOnly
              variant="ghost"
              radius="full"
              size="lg"
              className="absolute left-0 z-[11] text-custom2 dark:text-custom1 h-full opacity-0 max-sm:hover:opacity-100 sm:opacity-100 sm:h-fit"
              title="Mostrar imagen anterior"
              onPress={() => handleButtons(-1)}
            >
              <KeyboardArrowLeftIcon className="h-12 w-fit" />
            </Button>

            <Button
              isIconOnly
              variant="ghost"
              radius="full"
              size="lg"
              className="absolute right-0 z-[11] text-custom2 dark:text-custom1 h-full opacity-0 max-sm:hover:opacity-100 sm:opacity-100 sm:h-fit"
              title="Mostrar imagen siguiente"
              onPress={() => handleButtons(1)}
            >
              <KeyboardArrowRightIcon className="h-12 w-full" />
            </Button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={imgsData?.imgs?.[selectedIndex]}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                x: 0,
              },
              exit: { opacity: 0, x: -100 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ImageCustom
              src={
                srcs.find(([path, _]) =>
                  path.includes(`/${id}/320/${imgsData?.imgs?.[selectedIndex]}`)
                )?.[1]
              }
              alt="Imagen seleccionada"
              width={300}
              className="object-contain drop-shadow-custom h-full max-h-[300px] max-w-[300px]"
              classes={{ wrapper: "h-full" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* {imgsData?.imgs && imgsData?.imgs?.length > 0 ? (
          imgsData.imgs.map((img, i) => {
            const src =
              srcs.find(([path, _]) =>
                path.includes(`/${id}/320/${img}`)
              )?.[1] || "";

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0, width: 0 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    width: "fit-content",
                    height: "100%",
                  },
                }}
                initial="hidden"
                animate={selectedIndex === i ? "visible" : "hidden"}
              >
                <ImageCustom
                  src={src}
                  alt="Imagen seleccionada"
                  width={300}
                  className="object-contain drop-shadow-custom h-full max-h-[300px] max-w-[300px]"
                  classes={{ wrapper: "h-full" }}
                />
              </motion.div>
            );
          })
        ) : (
          <ImageCustom className="bg-neutral-500/50" />
        )} */}
      </motion.article>

      {isComparable && (
        <Button
          color="secondary"
          isIconOnly
          className="shadow-md absolute bottom-3 right-3 z-10"
          title="Mostrar referencia de tamaño"
          onPress={onComparate}
        >
          <CompareIcon className="h-7 w-fit" />
        </Button>
      )}
    </section>
  );
}
