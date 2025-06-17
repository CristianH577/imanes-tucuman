import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import type {
  ClassDBItem,
  TypeMeasures,
  TypeObjectGeneral,
} from "../consts/types";

import { scrollStyle } from "../libs/tvs";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

import ImageCustom from "../components/ImageCustom";

import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import tapa_img from "../assets/imanes/tapa.webp";

import plano from "../assets/formas/plano.webp";
import boton from "../assets/formas/boton.webp";
import cilindro from "../assets/formas/cilindro.webp";
import arandela from "../assets/formas/arandela.webp";
import cuadrado from "../assets/formas/cuadrado.webp";
import plancha from "../assets/formas/plancha.webp";
import ladrillo from "../assets/formas/ladrillo.webp";
import cuadrado_fresado from "../assets/formas/cuadrado-fresado.webp";
import esfera from "../assets/formas/esfera.webp";
import de_arrastre from "../assets/formas/de_arrastre.webp";

interface TypeModalComparativeMagnetProps {
  magnetData: ClassDBItem | false;
  onClose: () => void;
}
class ClassItemGraphData {
  id: string = "";
  forma: string = "redondo";
  label: string = "";
  img_data?: TypeObjectGeneral;
  alto: number = 0;
  largo: number = 0;
  ancho: number = 0;
  radios: number[] = [0, 0, 0];
}
type TypeSvgData = {
  radios?: number[];
  sizes?: number[];
};

const imgs = {
  plano: plano,
  boton: boton,
  cilindro: cilindro,
  arandela: arandela,
  cuadrado: cuadrado,
  plancha: plancha,
  ladrillo: ladrillo,
  cuadrado_fresado: cuadrado_fresado,
  esfera: esfera,
  de_arrastre: de_arrastre,
};

const tapa: ClassItemGraphData = {
  id: "tapa",
  label: "30x13mm",
  forma: "redondo",
  largo: 30,
  alto: 13,
  ancho: 0,
  radios: [15],
  img_data: { src: tapa_img, alt: "Tapa plástica común" },
};

const views = [
  { label: "Superior", id: "sup" },
  { label: "Frontal", id: "front" },
  { label: "Lateral", id: "lat" },
];

export default function ModalComparativeMagnet({
  magnetData,
  onClose = () => {},
}: TypeModalComparativeMagnetProps) {
  const constraintsRef = useRef(null);

  const [magnet, setMagnet] = useState<ClassItemGraphData>(
    new ClassItemGraphData()
  );
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    onClose();
  };
  const MakeMagnet = () => {
    if (magnetData && magnetData?.measures) {
      const forma = magnetData?.info?.forma;
      const measures = magnetData.measures;

      if (!forma) return undefined;

      const magnet_ = new ClassItemGraphData();
      magnet_.label = magnetData.label;
      magnet_.forma = forma;

      let img = "";

      const alto = measures.alto;
      const largo = measures?.largo || 0;
      const ancho = measures?.ancho || 0;
      magnet_.alto = alto;

      switch (forma) {
        case "redondo":
          const radio = largo / 2;
          magnet_.radios = [radio];

          if (magnetData?.subcategorie === "arrastre") {
            img = "de_arrastre";
          } else if (alto < radio) {
            img = "plano";
          } else if (alto >= radio * 1.4) {
            img = "cilindro";
          } else {
            img = "boton";
          }
          break;
        case "redondo fresado":
          const radios = ["largo", "diametro superior", "diametro inferior"];
          magnet_.radios = radios.reduce((prev: number[], val) => {
            const num = measures[val as keyof TypeMeasures] || 0;
            const r = num / 2;
            prev.push(r);
            return prev;
          }, []);

          img = "arandela";
          break;
        case "cuadrado":
          magnet_.ancho = ancho;
          magnet_.largo = largo;

          if (ancho / 2 <= largo) {
            img = "cuadrado";
          } else {
            if (alto <= 3) {
              img = "plancha";
            } else {
              img = "ladrillo";
            }
          }
          break;
        case "cuadrado fresado":
          magnet_.ancho = measures.ancho || 0;
          magnet_.largo = measures.largo;
          magnet_.alto = measures.alto;

          magnet_.radios = ["diametro superior", "diametro inferior"].reduce(
            (prev: number[], val) => {
              const num = measures[val as keyof TypeMeasures] || 0;
              const r = num / 2;
              prev.push(r);
              return prev;
            },
            []
          );

          img = "cuadrado-fresado";
          break;

        default:
          break;
      }

      if (img) img = imgs[img as keyof typeof imgs];
      magnet_.img_data = { src: img, alt: "Referencia de forma del iman" };

      setMagnet(magnet_);
      setOpenModal(true);
    }
  };
  const MakeSvgView = (view: string, item: ClassItemGraphData) => {
    let fix_w = 0;
    let fix_h = 0;
    let content = [];
    let w = 0;
    let h = 0;
    let obj: TypeSvgData = {};
    const radio = item.radios ? item.radios[0] : 0;
    const radios = item.radios ? item.radios : [0, 0, 0];
    const ancho = item?.ancho || 0;

    switch (view) {
      case "sup":
        switch (item.forma) {
          case "de_arrastre":
          case "redondo":
            obj.radios = item.radios;
            break;
          case "cuadrado":
            obj.sizes = [item?.largo, ancho];
            break;
          case "redondo fresado":
            obj.radios = item.radios;
            break;
          case "cuadrado fresado":
            obj.sizes = [item.largo, ancho];
            obj.radios = item.radios;
            break;

          default:
            break;
        }
        break;
      case "front":
        switch (item?.forma) {
          case "de_arrastre":
          case "redondo":
            obj.sizes = [radio * 2, item?.alto];
            break;
          case "cuadrado":
            obj.sizes = [item?.largo, item?.alto];
            break;
          case "redondo fresado":
            obj.sizes = [radio * 2, item?.alto];
            break;
          case "cuadrado fresado":
            obj.sizes = [item?.largo, item?.alto];
            break;

          default:
            break;
        }
        break;
      case "lat":
        switch (item?.forma) {
          case "de_arrastre":
          case "redondo":
            obj.sizes = [radio * 2, item?.alto];
            break;
          case "cuadrado":
            obj.sizes = [ancho, item?.alto];
            break;
          case "redondo fresado":
            obj.sizes = [radio * 2, item?.alto];
            break;
          case "cuadrado fresado":
            obj.sizes = [ancho, item?.alto];
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    if (obj?.sizes) {
      w = obj?.sizes[0];
      h = obj?.sizes[1];
      content.push(
        <rect
          key={`${view}`}
          x="0"
          y="0"
          width={obj?.sizes[0]}
          height={obj?.sizes[1]}
          rx=".2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      );
    }
    if (obj.radios) {
      const d = obj.radios[0] * 2;
      if (d > w) {
        fix_w = 0.2;
        w = d;
      }
      if (d > h) {
        fix_h = 0.2;
        h = d;
      }
      obj.radios.forEach((item) => {
        content.push(<circle key={item} cx="50%" cy="50%" r={item} />);
      });
    }

    if (item?.forma === "redondo fresado" && ["front", "lat"].includes(view)) {
      content.push([
        <polygon
          key={`${view}_l`}
          points={`${radios[0] - radios[1]},0 ${radios[0] - radios[2]},${
            item?.alto
          }`}
          fill="none"
          stroke="black"
          strokeDasharray="1"
          strokeWidth={0.2}
        />,

        <polygon
          key={`${view}_r`}
          points={`${radios[0] + radios[1]},0 ${radios[0] + radios[2]},${
            item?.alto
          }`}
          fill="none"
          stroke="black"
          strokeDasharray="1"
          strokeWidth={0.2}
        />,
      ]);
    } else if (item?.forma === "cuadrado fresado") {
      let mitad = 0;
      if (view === "front") {
        mitad = item?.largo / 2;
      } else if (view === "lat") {
        mitad = Number(item.ancho) / 2;
      }

      if (mitad) {
        content.push([
          <polygon
            key={`${view}_l`}
            points={`${mitad - radios[0]},0 ${mitad - radios[1]},${item?.alto}`}
            fill="none"
            stroke="black"
            strokeDasharray="1"
            strokeWidth={0.2}
          />,
          <polygon
            key={`${view}_r`}
            points={`${mitad + radios[0]},0 ${mitad + radios[1]},${item?.alto}`}
            fill="none"
            stroke="black"
            strokeDasharray="1"
            strokeWidth={0.2}
          />,
        ]);
      }
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${w}mm`}
        height={`${h}mm`}
        viewBox={`0 0 ${w + fix_w} ${h + fix_h}`}
        stroke={radios.length > 1 ? "black" : "none"}
        strokeWidth={0.2}
        className={`${item?.id === "tapa" ? "fill-custom1-5" : "fill-custom1"}`}
      >
        {content}
      </svg>
    );
  };

  const handleResetView = () => setCount(count + 1);

  useEffect(() => {
    const handleResetView = () => {
      setCount(count + 1);
    };
    window.addEventListener("resize", handleResetView);
    return () => window.removeEventListener("resize", handleResetView);
    // eslint-disable-next-line
  }, []);

  useEffect(MakeMagnet, [magnetData]);

  return (
    <Modal
      isOpen={openModal}
      placement="top-center"
      className="text-foreground max-w-3xl"
      onClose={handleClose}
      classNames={{
        wrapper: scrollStyle,
      }}
    >
      <ModalContent className="!my-auto max-sm:max-w-none max-sm:mx-0 max-sm:mb-0 max-sm:rounded-none overflow-y-auto self-start max-sm:min-h-full sm:border-3 sm:border-custom1-3">
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Comparar tamaños</ModalHeader>

            <ModalBody className="overflow-hidden max-sm:px-2">
              <p className="max-sm:text-center">
                La comparación es con una tapa plástica común de botella.
                <br />
                Asegúrese de que el circulo amarillo tenga 30mm de diámetro con
                una regla. Si no los tiene ajuste el zoom de la pantalla hasta
                que lo tenga.
              </p>

              <p className="font-size-secondary text-neutral-400 text-center">
                Las imágenes y esquemas son solo a modo ilustrativo y pueden no
                coincidir con la realidad.
              </p>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[tapa, magnet].map((e, i) => (
                  <article key={i} className="flex flex-col items-center">
                    <p className="max-w-[250px] text-2xl font-semibold">
                      {e.label}
                    </p>

                    <div className="rounded-lg p-4 sm:h-full select-none flex items-center justify-center place-self-center">
                      <ImageCustom
                        src={e?.img_data?.src}
                        width={150}
                        className="w-full max-w-[150px]"
                        alt={e?.img_data?.alt || ""}
                        // @ts-ignore
                        style={{
                          filter: "drop-shadow(2px 4px 6px black)",
                        }}
                      />
                    </div>
                  </article>
                ))}
              </section>

              <h2 className="text-center text-xl font-semibold">Vistas</h2>

              {magnet && (
                <section
                  ref={constraintsRef}
                  key={count}
                  className={`flex flex-col items-center gap-6 sm:flex-row text-center pt-2 pb-6 px-4 rounded-lg relative overflow-y-hidden overflow-x-auto shadow-medium border-3 border-neutral-400 ${scrollStyle}`}
                >
                  <Button
                    variant="light"
                    onPress={handleResetView}
                    isIconOnly
                    className="text-xl absolute top-2 left-2"
                    title="Acomodar vista"
                  >
                    <RestartAltOutlinedIcon />
                  </Button>

                  {views.map((view) => (
                    <article
                      key={view.id}
                      className="flex flex-col gap-4 w-full"
                    >
                      <p>{view.label}</p>

                      <div className="flex flex-col items-start xs:items-center gap-8 w-full">
                        {[tapa, magnet].map((item, i) => (
                          <motion.span
                            key={i}
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
                            {MakeSvgView(view.id, item)}
                          </motion.span>
                        ))}
                      </div>
                    </article>
                  ))}
                </section>
              )}

              <p className="max-sm:text-center text-neutral-400 font-size-secondary">
                Los tamaños son aproximados y pueden tener errores de medidas.
                <br />
                Puede arrastrar los iconos para sobreponerlos.
              </p>
            </ModalBody>

            <ModalFooter className="items-center ">
              <Button
                variant="light"
                onPress={onClose}
                isIconOnly
                title="Cerrar vista"
              >
                <ArrowBackOutlinedIcon className="text-3xl" />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
