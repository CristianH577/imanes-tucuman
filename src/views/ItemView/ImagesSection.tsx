import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { OBJ_SHAPES } from "../../consts/values";
import type { TypeIcon, TypeItemImgs } from "../../consts/types";
import { scrollStyle } from "../../libs/tvs";

import { CircularProgress, Button } from "@mui/material";

import type { Swiper as TypeSwiper } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

import ImageCustom from "../../components/ImageCustom";
import ModalFullImg from "./ModalFullImg";
import ButtonSlider from "./ButtonSlider";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

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
      <section className="flex justify-center p-2 gap-2 sm:p-4 border dark:border-neutral-500 rounded-md shadow-md flex-1">
        {SvgForma ? (
          <SvgForma className="h-[320px] max-w-[320px] w-full" />
        ) : (
          <ImageCustom
            className="drop-shadow-md drop-shadow-black h-[320px] max-w-[320px]"
            width={320}
          />
        )}
      </section>
    );
  }

  return (
    <motion.section
      variants={{
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex flex-col"
    >
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
            <SwiperSlide className="cursor-pointer rounded-md hover:scale-95 hover:opacity-100 opacity-70 overflow-hidden bg-divider/15 h-[50px] [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-custom2 dark:[&.swiper-slide-thumb-active]:border-custom1 p-1">
              <SvgForma className="w-full h-full" />
            </SwiperSlide>
          )}
          {imgsData.thumbnails.map((img, i) => (
            <SwiperSlide
              key={i}
              className="cursor-pointer rounded-md hover:scale-95 hover:opacity-100 opacity-70 overflow-hidden bg-divider/15 h-[50px] [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-custom2 dark:[&.swiper-slide-thumb-active]:border-custom1"
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
        className="relative flex items-center border dark:border-neutral-500 rounded-md px-2 sm:px-4 shadow-md flex-1"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate="visible"
      >
        {imgsData.full?.length && (
          <Button
            variant="contained"
            size="small"
            color="primary"
            title="Agrandar"
            className="absolute top-4 right-4 z-20"
            onClick={() => setOpenFullImgs(true)}
            sx={{ minWidth: 0, px: 1, borderRadius: 2 }}
          >
            <FullscreenIcon className="h-9 w-fit" />
          </Button>
        )}

        <Swiper
          className="w-full h-[350px] flex items-center py-4 px-2 xs:px-4 select-none"
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
                className="object-contain drop-shadow-md drop-shadow-black w-full h-full max-h-[320px] max-w-[320px]"
                classes={{ wrapper: "h-full place-self-center" }}
                width={320}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showSlider && (
          <>
            <ButtonSlider ref={prevRef} />
            <ButtonSlider
              ref={nextRef}
              Icon={KeyboardArrowRightIcon}
              className="right-4"
              title="Mostrar imagen siguiente"
            />
          </>
        )}
      </motion.article>

      <ModalFullImg
        open={openFullImgs}
        setOpen={setOpenFullImgs}
        imgsData={imgsData}
      />
    </motion.section>
  );
}
