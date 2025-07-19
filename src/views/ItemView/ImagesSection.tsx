import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { DB_IMGS } from "../../consts/dbs";

import { scrollStyle } from "../../libs/tvs";

import { Button, ButtonGroup } from "@heroui/button";
import { Modal } from "@mui/material";

import ImageCustom from "../../components/ImageCustom";

import CompareIcon from "@mui/icons-material/Compare";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

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
  const imgsData = id in DB_IMGS ? DB_IMGS[id] : DB_IMGS[0];
  const [selectedImg, setSelectedImg] = useState<string | undefined>(
    imgsData.imgs ? imgsData.imgs[0] : undefined
  );
  const [fullImg, setFullImg] = useState<string | undefined>(undefined);

  const handleButtons = (num: number) => {
    if (imgsData.imgs) {
      let idx_ = imgsData.imgs.findIndex((e) => e === selectedImg) || 0;
      idx_ = idx_ + num;

      const max = imgsData.imgs?.length || 0;
      if (idx_ < 0) {
        idx_ = max - 1;
      } else if (idx_ >= max) {
        idx_ = 0;
      }

      setSelectedImg(imgsData.imgs[idx_]);
    }
  };

  useEffect(() => {
    if (imgsData.imgs) {
      setSelectedImg(imgsData.imgs[0]);
    }
  }, [imgsData]);

  return (
    <section className="flex flex-col items-center justify-center p-2 gap-2 sm:p-4 relative">
      {imgsData?.imgs && imgsData.imgs?.length > 1 && (
        <motion.article
          variants={{
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
          {imgsData.imgs.map((img, i) => (
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
              data-selected={selectedImg === img}
              onClick={() => setSelectedImg(img)}
            >
              <ImageCustom
                alt={`Miniatura ${i}`}
                className="object-contain h-full"
                classes={{ wrapper: "h-full" }}
                src={
                  srcs.find(([path, _]) =>
                    path.includes(`/${id}/thumbnails/${img}`)
                  )?.[1] || undefined
                }
              />
            </motion.div>
          ))}
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
        className="w-screen sm:w-full h-[350px] flex items-center py-4 px-2 xs:px-4 relative"
      >
        {imgsData?.imgs && imgsData?.imgs?.length > 1 && (
          <>
            <Button
              isIconOnly
              variant="ghost"
              radius="full"
              size="lg"
              color="primary"
              className="absolute z-[11] dark:text-custom1 opacity-0 max-sm:hover:opacity-100 sm:opacity-100"
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
              color="primary"
              className="absolute right-2 z-[11] dark:text-custom1 opacity-0 max-sm:hover:opacity-100 sm:opacity-100"
              title="Mostrar imagen siguiente"
              onPress={() => handleButtons(1)}
            >
              <KeyboardArrowRightIcon className="h-12 w-full" />
            </Button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImg}
            className="w-full"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                x: 0,
              },
              exit: { opacity: 0, x: -50 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ImageCustom
              src={
                srcs.find(([path, _]) =>
                  path.includes(`/${id}/320/${selectedImg}`)
                )?.[1] || undefined
              }
              alt="Imagen seleccionada"
              className="object-contain drop-shadow-md drop-shadow-black h-full max-h-[300px] max-w-[300px]"
              classes={{ wrapper: "h-full place-self-center" }}
              width={300}
            />
          </motion.div>
        </AnimatePresence>
      </motion.article>

      <ButtonGroup className="absolute bottom-3 right-2 z-10 drop-shadow-md drop-shadow-black">
        {imgsData.full && imgsData.full.includes(selectedImg || "") && (
          <Button
            color="primary"
            isIconOnly
            title="Agrandar"
            onPress={() => setFullImg(selectedImg)}
          >
            <FullscreenIcon className="h-9 w-fit" />
          </Button>
        )}

        {isComparable && (
          <Button
            color="secondary"
            isIconOnly
            title="Mostrar referencia de tamaño"
            onPress={onComparate}
          >
            <CompareIcon className="h-7 w-fit" />
          </Button>
        )}
      </ButtonGroup>

      {fullImg !== undefined && (
        <Modal
          open={fullImg !== undefined}
          onClose={() => setFullImg(undefined)}
          classes={{
            backdrop: "bg-background/90",
          }}
        >
          <motion.div
            className={
              "h-full p-4 flex items-center cursor-pointer overflow-auto " +
              scrollStyle
            }
            title="Cerrar"
            onClick={() => setFullImg(undefined)}
          >
            <Button
              color="primary"
              isIconOnly
              title="Cerrar"
              className="absolute top-3 right-4"
              onPress={() => setFullImg(undefined)}
            >
              <FullscreenExitIcon className="h-9 w-fit" />
            </Button>

            <ImageCustom
              src={
                srcs.find(([path, _]) =>
                  path.includes(`/${id}/full/${fullImg}`)
                )?.[1] || undefined
              }
              width={900}
              height={900}
              alt="Imagen completa"
              className="!w-auto max-w-none drop-shadow-md drop-shadow-black"
              classes={{
                wrapper: "m-auto",
              }}
            />
          </motion.div>
        </Modal>
      )}
    </section>
  );
}
