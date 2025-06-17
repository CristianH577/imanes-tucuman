import ImageCustom from "../../../components/ImageCustom";
import LinkToFont from "../components/LinkToFont";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import img from "../../../assets/uya/ideas/recogedor.png";
import {
  SVGImanes,
  SVGTapaA,
  SVGTapaB,
  SVGTaponB,
  SVGTope,
  SVGTuboA,
  SVGTuboB,
} from "../../../assets/svgs/svgsRecogedor";

export default function Recogedor() {
  const scale = 3.5;

  const items = [
    {
      desc: "Conseguir 2 tubos de PVC que entre uno dentro de otro casi justo",
      img: (
        <div className="flex gap-4 h-[200px]">
          <SVGTuboA size={6} className="from-slate-400 to-slate-500" />
          <SVGTuboB size={6} className="from-slate-200 to-slate-300" />
        </div>
      ),
    },
    {
      desc: "En el mas chico introducir varios imanes con separadores y poner un tapón",
      img: (
        <div className="flex flex-col items-center gap-2 relative rotate-45 h-[200px]">
          <ArrowDownwardIcon className="absolute top-2 -right-10 text-black h-12 w-fit" />

          <SVGTapaB size={scale} className="from-slate-300 to-slate-400" />
          <SVGTuboB size={scale} className="from-slate-200 to-slate-300" />
          <SVGImanes size={scale - 1} className="from-gray-300 to-gray-500" />
          <SVGTaponB size={scale} />

          <ArrowUpwardIcon className="absolute bottom-12 -right-10 text-black h-12 w-fit" />
        </div>
      ),
    },
    {
      desc: "Al mas grande poner un tapón y una pieza perforada que entre a presión",
      img: (
        <div className="flex flex-col items-center gap-2 relative rotate-45 h-[200px]">
          <SVGTope
            size={scale}
            className="from-yellow-200 to-yellow-500 absolute top-1"
          />
          <SVGTuboA size={scale} className="from-slate-400 to-slate-500" />
          <SVGTapaA size={scale} className="from-slate-500 to-slate-600" />

          <ArrowUpwardIcon className="absolute bottom-2 -right-10 text-black h-14 w-fit" />
        </div>
      ),
    },
    {
      desc: "Introducir el mas chico en el mas grande",
      img: (
        <div className="flex flex-col items-center relative pt-16 rotate-45 h-[200px]">
          <SVGTuboB
            size={scale}
            className="from-slate-200 to-slate-300 absolute top-0"
          />
          <SVGTapaB
            size={scale}
            className="from-slate-300 to-slate-400 absolute top-0"
          />

          <SVGTuboA size={scale} className="from-slate-400 to-slate-500 z-10" />
          <SVGTapaA
            size={scale}
            className="from-slate-500 to-slate-600 absolute bottom-0 z-10"
          />
          <SVGTope
            size={scale}
            className="from-yellow-200 to-yellow-500 absolute top-[4.2rem] z-10"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <ImageCustom
          src={img}
          className="drop-shadow-custom"
          alt="Recogedor magnético comercial con virutas pegadas"
          width={290}
        />

        <ArrowDownwardIcon className="h-12 w-fit" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            {item?.img}

            <p>
              {i + 1}. {item?.desc}.
            </p>
          </div>
        ))}
      </div>

      <LinkToFont
        href="https://www.youtube.com/watch?v=vEklMkmyG3A"
        text="Youtube/PacoRekena"
      />
    </div>
  );
}
