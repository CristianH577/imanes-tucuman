import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import type { TypeIcon } from "../consts/types";
import { OBJ_SHAPES } from "../consts/values";
import { ClassMagnetGraphData, type ClassDBItem } from "../consts/classes";

import { scrollStyle } from "../libs/tvs";

import { Modal, IconButton } from "@mui/material";

import ImageCustom from "../components/ImageCustom";

import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CloseIcon from "@mui/icons-material/Close";

import tapa_img from "../assets/tapa.webp";

interface InterfaceProps {
  magnetData: ClassDBItem | false;
  onClose: () => void;
}

type TypeSvgData = {
  radios?: number[];
  sizes?: number[];
};

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
  const MakeMagnet = () => {
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

  const MakeSvgView = (view: string, graphData: ClassMagnetGraphData) => {
    let fix_w = 0;
    let fix_h = 0;
    let content = [];
    let w = 0;
    let h = 0;
    let obj: TypeSvgData = {};
    const radio = graphData.radios ? graphData.radios[0] : 0;
    const radios = graphData.radios ? graphData.radios : [0, 0, 0];
    const ancho = graphData?.ancho || 0;

    switch (view) {
      case "sup":
        switch (graphData.forma[0]) {
          case "esfera":
          case "redondo":
            obj.radios = graphData.radios;
            break;
          case "cuadrado":
            obj.sizes = [graphData.largo, graphData.largo];
            break;
          case "rectangular":
            obj.sizes = [graphData.largo, graphData.ancho];
            if (graphData.forma[1] === "fresado") obj.radios = graphData.radios;
            break;
          default:
            break;
        }
        break;
      case "front":
        switch (graphData.forma[0]) {
          case "esfera":
            obj.radios = graphData.radios;
            break;
          case "redondo":
            obj.sizes = [radio * 2, graphData?.alto];
            break;
          case "cuadrado":
            obj.sizes = [graphData.largo, graphData.largo];
            break;
          case "rectangular":
            obj.sizes = [graphData.largo, graphData.alto];
            break;

          default:
            break;
        }
        break;
      case "lat":
        switch (graphData.forma[0]) {
          case "esfera":
            obj.radios = graphData.radios;
            break;
          case "redondo":
            obj.sizes = [radio * 2, graphData.alto];
            if (graphData.forma[1] === "fresado")
              obj.sizes = [radio * 2, graphData.alto];
            break;
          case "cuadrado":
            obj.sizes = [graphData.largo, graphData.alto];
            break;
          case "rectangular":
            obj.sizes = [graphData.ancho, graphData.alto];
            if (graphData.forma[1] === "fresado")
              obj.sizes = [ancho, graphData.alto];
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
      const len = obj.radios.length;
      obj.radios.forEach((item, i) => {
        content.push(
          <circle
            key={"radio" + i}
            cx="50%"
            cy="50%"
            r={item}
            fill={
              graphData.forma[1] === "fresado" && len > 1 && i === len - 1
                ? "background"
                : i === len - 2
                ? "orange"
                : undefined
            }
          />
        );
      });
    }

    if (
      graphData.forma[0] === "redondo" &&
      graphData.forma[1] === "fresado" &&
      ["front", "lat"].includes(view)
    ) {
      content.push([
        <polygon
          key={`${view}_l`}
          points={`${radios[0] - radios[1]},0 ${radios[0] - radios[2]},${
            graphData?.alto
          }`}
          fill="none"
          stroke="black"
          strokeDasharray="1"
          strokeWidth={0.2}
        />,

        <polygon
          key={`${view}_r`}
          points={`${radios[0] + radios[1]},0 ${radios[0] + radios[2]},${
            graphData?.alto
          }`}
          fill="none"
          stroke="black"
          strokeDasharray="1"
          strokeWidth={0.2}
        />,
      ]);
    } else if (
      graphData.forma[0] === "rectangular" &&
      graphData.forma[1] === "fresado"
    ) {
      let mitad = 0;
      if (view === "front") {
        mitad = graphData?.largo / 2;
      } else if (view === "lat") {
        mitad = graphData.ancho / 2;
      }

      if (mitad) {
        content.push([
          <polygon
            key={`${view}_l`}
            points={`${mitad - radios[0]},0 ${mitad - radios[1]},${
              graphData?.alto
            }`}
            fill="none"
            stroke="black"
            strokeDasharray="1"
            strokeWidth={0.2}
          />,
          <polygon
            key={`${view}_r`}
            points={`${mitad + radios[0]},0 ${mitad + radios[1]},${
              graphData?.alto
            }`}
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
        stroke={radios.length > 1 ? "black" : undefined}
        strokeWidth={0.2}
        className={graphData.id === "tapa" ? "fill-custom1-5" : "fill-custom1"}
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
  }, []);

  useEffect(MakeMagnet, [magnetData]);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      className={"sm:p-4 overflow-auto dark:text-white " + scrollStyle}
    >
      <div className="text-foreground max-w-3xl bg-content1 dark:sm:border-2 dark:sm:border-custom1-3 p-2 sm:p-4 sm:rounded-lg space-y-4 m-auto">
        <article className="flex justify-between">
          <h1 className="text-2xl font-bold">Comparar tamaños</h1>

          <IconButton onClick={onClose} title="Cerrar vista" size="small">
            <CloseIcon className="text-2xl" />
          </IconButton>
        </article>

        <p className="max-sm:text-center">
          La comparación es con una tapa plástica común de botella.
          <br />
          Asegúrese de que el circulo amarillo tenga 30mm de diámetro con una
          regla. Si no los tiene ajuste el zoom de la pantalla hasta que lo
          tenga.
        </p>

        <p className="font-size-secondary text-neutral-400 text-center">
          Las imágenes y esquemas son solo a modo ilustrativo y pueden no
          coincidir con la realidad.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[tapa, magnet].map((item) => (
            <article key={item.id} className="flex flex-col items-center">
              <p className="max-w-[250px] text-2xl font-semibold">
                {item.label}
              </p>

              <div className="p-2 sm:h-full flex items-center justify-center place-self-center ">
                {item.id === "tapa" ? (
                  <ImageCustom
                    src={tapa_img}
                    className="w-full max-w-[150px] drop-shadow-custom"
                    alt="Tapa plástica común"
                    width={150}
                    height={100}
                  />
                ) : item.svg ? (
                  <item.svg className="w-full h-[150px] max-w-[150px]" />
                ) : (
                  <ImageCustom
                    className="w-full max-w-[100px]"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </article>
          ))}
        </section>

        <h2 className="text-center text-xl font-semibold">Vistas</h2>

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

        <IconButton onClick={onClose} title="Cerrar vista" size="small">
          <ArrowBackOutlinedIcon className="text-3xl" />
        </IconButton>
      </div>
    </Modal>
  );
}
