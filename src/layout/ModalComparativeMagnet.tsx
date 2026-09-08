import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

import type { TypeIcon } from "../consts/types";
import { OBJ_SHAPES } from "../consts/values";
import { ClassMagnetGraphData, type ClassDBItem } from "../consts/classes";

import { scrollStyle } from "../libs/tvs";

import { Modal, IconButton, Divider } from "@mui/material";

import ImageCustom from "../components/ImageCustom";

import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import CloseIcon from "@mui/icons-material/Close";

import tapa_img from "../assets/tapa.webp";
import { makeSvgView } from "../libs/functions_comparative";

interface InterfaceProps {
  magnetData: ClassDBItem | false;
  onClose: () => void;
}

const tapa: ClassMagnetGraphData = {
  id: "tapa",
  label: "30x13mm",
  forma: ["redondo"],
  largo: 30,
  alto: 13,
  ancho: 0,
  radios: [15],
};

const views = [
  { label: "Superior", id: "sup" },
  { label: "Frontal", id: "front" },
  { label: "Lateral", id: "lat" },
];

export default function ModalComparativeMagnet({
  magnetData,
  onClose = () => {},
}: InterfaceProps) {
  const constraintsRef = useRef(null);

  const [magnet, setMagnet] = useState<ClassMagnetGraphData>(
    new ClassMagnetGraphData()
  );
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    onClose();
  };
  const makeMagnet = () => {
    if (magnetData && magnetData?.measures) {
      const forma = magnetData.forma;
      const measures = magnetData.measures;

      if (!forma) return undefined;

      // SVG
      let SvgForma: false | TypeIcon = false;
      const form_data = OBJ_SHAPES[forma[0] as keyof typeof OBJ_SHAPES];
      if (form_data && form_data.icon) SvgForma = form_data.icon;

      if (forma[1] && form_data.subs && forma[1] in form_data.subs) {
        const sub_form_data = form_data.subs[forma[1]];
        if (sub_form_data.icon) SvgForma = sub_form_data.icon;
      }
      // ----------------------------

      const magnet_ = new ClassMagnetGraphData();
      magnet_.label = magnetData.label;
      magnet_.forma = forma;
      magnet_.svg = SvgForma;

      const alto = measures.alto || 0;
      const largo = measures.largo || 0;
      const ancho = measures.ancho || 0;
      magnet_.alto = alto || 0;

      switch (forma[0]) {
        case "esfera":
          magnet_.radios = [largo, largo, largo];
          break;
        case "redondo":
          if (forma[1] === "fresado") {
            const radios = ["largo", "diametroSup", "diametroInf"];
            magnet_.radios = radios.reduce((prev: number[], val) => {
              const num = measures[val] || 0;
              const r = num / 2;
              prev.push(r);
              return prev;
            }, []);
          } else {
            const radio = largo / 2;
            magnet_.radios = [radio];
          }
          break;
        case "cuadrado":
          magnet_.largo = largo;
          break;
        case "rectangular":
          magnet_.ancho = ancho;
          magnet_.largo = largo;
          if (forma[1] === "fresado") {
            magnet_.radios = ["diametroSup", "diametroInf"].reduce(
              (prev: number[], val) => {
                const num = measures[val] || 0;
                const r = num / 2;
                prev.push(r);
                return prev;
              },
              []
            );
          }
          break;

        default:
          break;
      }

      setMagnet(magnet_);
      setOpenModal(true);
    }
  };

  const handleResetView = () => setCount((prev) => prev + 1);

  useEffect(() => {
    const handleResetView = () => {
      setCount((prev) => prev + 1);
    };
    window.addEventListener("resize", handleResetView);
    return () => window.removeEventListener("resize", handleResetView);
  }, []);

  useEffect(makeMagnet, [magnetData]);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      className={"sm:p-4 overflow-auto dark:text-white " + scrollStyle}
    >
      <div className="text-foreground max-w-3xl bg-content1 dark:sm:border-2 dark:sm:border-custom1-3 p-2 sm:p-4 pb-6 sm:rounded-lg space-y-4 m-auto">
        <header className="flex justify-between">
          <h1 className="text-2xl font-semibold font-[menulis]">
            Comparar tamaños
          </h1>

          <IconButton onClick={onClose} title="Cerrar vista" size="small">
            <CloseIcon className="text-2xl" />
          </IconButton>
        </header>

        <Divider />

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[tapa, magnet].map((item) => (
            <article key={item.id} className="flex flex-col items-center">
              <h2 className="line-clamp-1 text-xl font-semibold font-[menulis]">
                {item.label}
              </h2>

              <div className="p-2 sm:h-[150px] flex items-center justify-center place-self-center ">
                {item.id === "tapa" ? (
                  <ImageCustom
                    src={tapa_img}
                    className="w-full max-w-[150px] drop-shadow-custom"
                    alt="Tapa plástica común"
                    width={150}
                    height={150}
                  />
                ) : item.svg ? (
                  <item.svg className="w-full max-w-[150px]" />
                ) : (
                  <ImageCustom
                    className="max-w-[150px]"
                    width={150}
                    height={150}
                  />
                )}
              </div>
            </article>
          ))}
        </section>

        <p className="max-sm:text-center prose dark:prose-invert max-w-none">
          La comparación es con una tapa plástica común de botella.
          <br />
          Asegúrese de que el circulo amarillo tenga 30mm de diámetro con una
          regla, si no los tiene ajuste el zoom de la pantalla hasta que lo
          tenga.
        </p>

        {/* <h2 className="text-center text-xl font-semibold font-[menulis]">
          Vistas
        </h2> */}

        {magnet && (
          <section
            ref={constraintsRef}
            key={count}
            className={`flex flex-col items-center gap-6 sm:flex-row text-center pt-2 pb-6 px-4 rounded-lg relative overflow-y-hidden overflow-x-auto shadow-medium border-2 border-neutral-400 ${scrollStyle}`}
          >
            <IconButton
              onClick={handleResetView}
              className="text-xl absolute top-2 left-2"
              title="Acomodar vista"
              size="small"
            >
              <RestartAltOutlinedIcon />
            </IconButton>

            {views.map((view) => (
              <article key={view.id} className="flex flex-col gap-4 w-full">
                <p>{view.label}</p>

                <div className="flex flex-col items-start xs:items-center gap-8 w-full">
                  {[tapa, magnet].map((item, i) => (
                    <m.span
                      key={item.id}
                      drag
                      dragConstraints={constraintsRef}
                      whileDrag={{
                        zIndex: 20,
                        filter: "drop-shadow(0px 0px 1px black)",
                      }}
                      className={`flex items-center h-full cursor-pointer ${
                        i > 0 ? "z-10" : ""
                      }`}
                      style={{
                        filter: "drop-shadow(0px 0px 1px black)",
                      }}
                    >
                      {makeSvgView(view.id, item)}
                    </m.span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        <p className="max-sm:text-center text-second prose dark:prose-invert max-w-none">
          Las imágenes y esquemas son solo a modo ilustrativo y pueden no
          coincidir con la realidad.
          <br />
          Los tamaños son aproximados y pueden tener errores de medidas.
          <br />
          Puede arrastrar los iconos para sobreponerlos.
        </p>
      </div>
    </Modal>
  );
}
