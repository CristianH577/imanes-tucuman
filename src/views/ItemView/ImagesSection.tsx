import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { OBJ_SHAPES } from "../../consts/values";
import type { TypeIcon, TypeItemImgs } from "../../consts/types";
import { scrollStyle } from "../../libs/tvs";

import { Button } from "@heroui/button";
import { CircularProgress, Modal } from "@mui/material";

import ImageCustom from "../../components/ImageCustom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import type { Swiper as TypeSwiper } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

interface TypeImagesSectionProps {
  loading?: boolean;
  forma?: string[];
  imgsData: TypeItemImgs;
}

export default function ImagesSection({
  loading = false,
  forma,
  imgsData = { imgs: [] },
}: TypeImagesSectionProps) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [openFullImgs, setOpenFullImgs] = useState<boolean>(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<TypeSwiper | null>(null);

  let SvgForma: boolean | TypeIcon = false;
  if (imgsData?.haveSvg && forma) {
    const form_data = OBJ_SHAPES[forma[0] as keyof typeof OBJ_SHAPES];
    if (form_data && form_data.icon) SvgForma = form_data.icon;

    if (forma[1] && form_data.subs && forma[1] in form_data.subs) {
      const sub_form_data = form_data.subs[forma[1]];
      if (sub_form_data.icon) SvgForma = sub_form_data.icon;
    }
  }
  const showSlider = SvgForma
    ? imgsData.imgs && imgsData.imgs?.length >= 1
    : imgsData.imgs && imgsData.imgs?.length > 1;

  if (loading) {
    return (
      <section className="flex justify-center items-center p-2 sm:p-4 h-[300px]">
        <CircularProgress />
      </section>
    );
  }

  if (!imgsData.imgs) {
    return (
      <section className="flex justify-center p-2 gap-2 sm:p-4">
        {SvgForma ? (
          <SvgForma className="h-[300px] max-w-[300px]" />
        ) : (
          <ImageCustom
            className="drop-shadow-md drop-shadow-black h-[300px] max-w-[300px]"
            width={300}
          />
        )}
      </section>
    );
  }

  return (
    <section className="ImageSection flex flex-col items-center justify-center p-2 gap-2 sm:p-4 relative">
      {showSlider && imgsData.thumbnails && (
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          modules={[Thumbs]}
          className={
            "w-full max-w-[90vw] p-2 grid grid-flow-col auto-cols-[50px] overflow-auto " +
            scrollStyle
          }
          onSwiper={setThumbsSwiper}
        >
          {SvgForma && (
            <SwiperSlide className="cursor-pointer rounded-medium hover:scale-95 hover:opacity-100 opacity-70 overflow-hidden bg-content4 h-[50px] [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-custom2 dark:[&.swiper-slide-thumb-active]:border-custom1 p-1">
              <SvgForma className="w-full h-full" />
            </SwiperSlide>
          )}
          {imgsData.thumbnails.map((img, i) => (
            <SwiperSlide
              key={i}
              className="cursor-pointer rounded-medium hover:scale-95 hover:opacity-100 opacity-70 overflow-hidden bg-content4 h-[50px] [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-custom2 dark:[&.swiper-slide-thumb-active]:border-custom1"
            >
              <ImageCustom
                src={img}
                alt={`Miniatura ${i}`}
                className="object-contain h-full"
                classes={{ wrapper: "h-full" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <motion.article
        className="relative w-full flex items-center"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate="visible"
      >
        {imgsData.full?.length && (
          <Button
            color="primary"
            isIconOnly
            title="Agrandar"
            className="absolute top-0 right-0 z-20"
            onPress={() => setOpenFullImgs(true)}
          >
            <FullscreenIcon className="h-9 w-fit" />
          </Button>
        )}

        <Swiper
          className="w-full h-[350px] flex items-center py-4 px-2 xs:px-4 select-none "
          slidesPerView={1}
          spaceBetween={100}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop={showSlider}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {SvgForma && (
            <SwiperSlide className="w-full flex items-center justify-center">
              <SvgForma className="w-full h-fit max-h-[300px] max-w-[300px]" />
            </SwiperSlide>
          )}
          {imgsData.imgs.map((img, i) => (
            <SwiperSlide key={i} className="w-full relative">
              <ImageCustom
                src={img}
                alt="Imagen seleccionada"
                className="object-contain drop-shadow-md drop-shadow-black w-full h-full max-h-[300px] max-w-[300px]"
                classes={{ wrapper: "h-full place-self-center" }}
                width={300}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Button
          ref={prevRef}
          isIconOnly
          variant="ghost"
          radius="full"
          size="lg"
          color="warning"
          className={
            "absolute z-10 opacity-0 sm:opacity-100" +
            (!showSlider ? " hidden" : "")
          }
          title="Mostrar imagen anterior"
        >
          <KeyboardArrowLeftIcon className="h-12 w-fit" />
        </Button>

        <Button
          ref={nextRef}
          isIconOnly
          variant="ghost"
          radius="full"
          size="lg"
          color="warning"
          className={
            "absolute z-10 right-0 opacity-0 sm:opacity-100" +
            (!showSlider ? " hidden" : "")
          }
          title="Mostrar imagen siguiente"
        >
          <KeyboardArrowRightIcon className="h-12 w-fit" />
        </Button>
      </motion.article>

      {openFullImgs && (
        <Modal
          open={openFullImgs}
          onClose={() => setOpenFullImgs(false)}
          classes={{
            backdrop: "bg-background/90",
          }}
        >
          <motion.div className="h-full p-2 sm:p-4">
            <Button
              color="primary"
              isIconOnly
              title="Cerrar"
              className="absolute top-4 right-4 z-10"
              onPress={() => setOpenFullImgs(false)}
            >
              <FullscreenExitIcon className="h-9 w-fit" />
            </Button>

            <Swiper
              className="h-full"
              slidesPerView={1}
              spaceBetween={100}
              modules={[Navigation, Thumbs]}
              navigation
              loop={imgsData.full && imgsData.full.length > 1}
            >
              {imgsData.full &&
                imgsData.full.map((img, i) => (
                  <SwiperSlide
                    key={i}
                    className="h-full overflow-y-auto flex items-center p-2 sm:p-4"
                  >
                    <ImageCustom
                      src={img}
                      alt={"Imagen completa " + (i + 1)}
                      className="w-full max-w-max cursor-pointer"
                      classes={{ wrapper: "m-auto" }}
                      style={{
                        filter:
                          "drop-shadow(0 0 4px hsl(var(--heroui-foreground)))",
                      }}
                      title="Cerrar"
                      onClick={() => setOpenFullImgs(false)}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </motion.div>
        </Modal>
      )}
    </section>
  );
}
