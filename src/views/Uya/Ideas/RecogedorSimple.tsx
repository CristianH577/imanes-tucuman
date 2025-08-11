import { Divider } from "@mui/material";

import ImageCustom from "../../../components/ImageCustom";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import img_1 from "../../../assets/uya/ideas/recogedor_simple/1.webp";
import img_2 from "../../../assets/uya/ideas/recogedor_simple/2.webp";
import img_3 from "../../../assets/uya/ideas/recogedor_simple/3.webp";
import img_4 from "../../../assets/uya/ideas/recogedor_simple/4.webp";

export default function RecogedorSimple() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex flex-col items-center gap-6">
        <ImageCustom
          src={img_2}
          className="object-contain drop-shadow-custom w-full"
          height={300}
          alt="Recogedor comercial simple"
        />

        <span className="flex flex-col items-center gap-4">
          <p>
            Solo colocando un imán en la punta de una varilla de metal puede
            tener un recogedor rígido para clavos, alambres, etc.
          </p>

          <ArrowDownwardIcon className="h-10 w-fit" />
        </span>

        <ImageCustom
          src={img_1}
          className="object-contain drop-shadow-customv w-full"
          height={300}
          alt="Tubo de metal con un iman en la punta"
        />
      </div>

      <Divider className="sm:hidden" />

      <div className="flex flex-col items-center gap-6">
        <ImageCustom
          src={img_3}
          className="object-contain drop-shadow-custom w-full"
          height={300}
          alt="Recogedor comercial flexible"
        />

        <span className="flex flex-col items-center gap-4">
          <p>
            Introduciendo uno o varios imanes en una bolsa de tela y atándola a
            una cuerda se puede hacer un recogedor flexible para levantar.
          </p>

          <ArrowDownwardIcon className="h-10 w-fit" />
        </span>

        <ImageCustom
          src={img_4}
          className="object-contain drop-shadow-custom w-full"
          height={400}
          alt="Cuerda, iman y bolsa de tela"
        />
      </div>
    </div>
  );
}
