// import { useRef } from "react";
import { motion } from "framer-motion";

import type { TypeItemImgs } from "../../consts/types";

import { Modal, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

// import ButtonSlider from "./ButtonSlider";
import ImageCustom from "../../components/ImageCustom";

import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
  // const prevButtonRef = useRef(null);
  // const nextButtonRef = useRef(null);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        backgroundColor: "rgba(0,0,0,.2)",
      }}
    >
      <motion.div className="relative h-full p-2 sm:p-4 flex items-center">
        <Button
          variant="contained"
          color="primary"
          title="Cerrar"
          className="absolute top-4 right-4 z-10"
          onClick={() => setOpen(false)}
          sx={{ minWidth: 0, px: 1, borderRadius: 2 }}
        >
          <FullscreenExitIcon className="h-9 w-fit" />
        </Button>

        <Swiper
          className="h-full"
          slidesPerView={1}
          spaceBetween={100}
          modules={[Navigation]}
          navigation
          // navigation={{
          //   prevEl: prevButtonRef.current,
          //   nextEl: nextButtonRef.current,
          // }}
          loop={imgsData.full && imgsData.full.length > 1}
        >
          {imgsData.full &&
            imgsData.full.map((img, i) => (
              <SwiperSlide
                key={i}
                className="h-full overflow-y-auto flex items-center cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <ImageCustom
                  src={img}
                  alt={"Imagen completa " + (i + 1)}
                  className="w-full max-w-max select-none"
                  classes={{ wrapper: "m-auto" }}
                  style={{
                    filter:
                      "drop-shadow(0 0 4px hsl(var(--heroui-foreground)))",
                  }}
                  title="Cerrar"
                />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* <ButtonSlider ref={prevButtonRef} />
        <ButtonSlider
          ref={nextButtonRef}
          Icon={KeyboardArrowRightIcon}
          className="right-4"
          title="Mostrar imagen siguiente"
        /> */}
      </motion.div>
    </Modal>
  );
}
