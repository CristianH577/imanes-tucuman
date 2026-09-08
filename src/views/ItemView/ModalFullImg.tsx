import { useRef, useState } from "react";
import { m } from "framer-motion";

import type { TypeItemImgs } from "../../consts/types";

import { Modal, Button, ButtonGroup } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

import ImageCustom from "../../components/ImageCustom";

import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface IntfProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  imgsData: TypeItemImgs;
}

export default function ModalFullImg({
  open = false,
  setOpen,
  imgsData,
}: IntfProps) {
  const prevButtonFullRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonFullRef = useRef<HTMLButtonElement | null>(null);
  const total_imgs = imgsData.imgs?.length || 0;
  const loopAllow = total_imgs > 1;

  const [zoom, setZoom] = useState<boolean>(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        backgroundColor: "rgba(0,0,0,.2)",
      }}
    >
      <m.div className="relative h-full flex items-center">
        <Button
          variant="contained"
          color="info"
          title="Cerrar vista completa de imagen"
          className="absolute top-4 right-4 z-10 p-0.5 rounded-md min-w-0"
          onClick={() => setOpen(false)}
        >
          <FullscreenExitIcon className="h-9 w-fit" />
        </Button>

        <ButtonGroup
          variant="contained"
          color="warning"
          size="small"
          className="absolute top-4 left-4 z-10 rounded-md"
        >
          <Button
            ref={prevButtonFullRef}
            title="Mostrar imagen anterior"
            className="p-0.5"
          >
            <KeyboardArrowLeftIcon className="h-9 w-fit" />
          </Button>
          <Button
            ref={nextButtonFullRef}
            title="Mostrar imagen siguiente"
            className="p-0.5"
          >
            <KeyboardArrowRightIcon className="h-9 w-fit" />
          </Button>
        </ButtonGroup>

        <Swiper
          slidesPerView={1}
          spaceBetween={100}
          modules={[Navigation]}
          // navigation
          navigation={{
            prevEl: prevButtonFullRef.current,
            nextEl: nextButtonFullRef.current,
          }}
          allowTouchMove={false}
          loop={loopAllow}
          rewind
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevButtonFullRef.current;
                swiper.params.navigation.nextEl = nextButtonFullRef.current;
              }

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
        >
          {imgsData.full?.map((img, i) => (
            <SwiperSlide
              key={"img-full-" + i}
              className="flex justify-center self-center"
            >
              <button
                className="overflow-auto w- h- max-h-screen"
                style={{ cursor: zoom ? "zoom-out" : "zoom-in" }}
                onClick={() => setZoom((prev) => !prev)}
              >
                <ImageCustom
                  src={img}
                  alt={"Imagen completa " + (i + 1)}
                  className="select-none relative z-10 p-2 sm:p-6"
                  classes={{ wrapper: zoom ? "pt-20 pb-10" : "" }}
                  // @ts-ignore
                  style={{
                    filter:
                      "drop-shadow(0 0 4px hsl(var(--heroui-foreground)))",
                    width: zoom ? "auto" : "100%",
                    height: zoom ? "auto" : "",
                    maxWidth: zoom ? "none" : "",
                    maxHeight: zoom ? "none" : "100vh",
                    paddingTop: zoom ? "20px !important" : "",
                  }}
                  title="Cerrar"
                />
              </button>

              <span className="absolute right-4 bottom-6 bg-neutral-500/50 px-2 rounded-md font-bold text-prima text-white z-10">
                {i + 1} / {total_imgs}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute w-full h-full cursor-pointer"
          onClick={() => setOpen(false)}
        ></button>
      </m.div>
    </Modal>
  );
}
