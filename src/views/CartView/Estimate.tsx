import { Select, SelectItem } from "@heroui/select";
import { Checkbox, Divider, FormControl, FormLabel } from "@mui/material";

import Logo from "../../components/Logo";
import List from "./List";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";

import {
  SVGLogoGalicia,
  SVGLogoPaypal,
  SVGMercadoLibre,
} from "../../assets/svgs/svgsIcons";

interface InterfaceEstimateProps {
  downloading: boolean;
  entrega: TypeEntrega;
  setEntrega: (obj: TypeEntrega) => void;
}

type TypeEntrega = { value: string; label: string; following: boolean };

const conditions_items = {
  retiro: {
    label: "Voy a retirar",
    description_item: "Quiero pasar a retirar",
    description_select: "Debe coordinar cuando quiera pasar.",
  },
  coordinar: {
    label: "Quiero coordinar",
    description_item: "Quiero saber cuando se hagan entregas en el centro",
    description_select: "",
  },
  cadete: {
    label: "Mando a buscarlo",
    description_item: "Quiero enviar a que lo busquen",
    description_select:
      "Si es un Uber, se transfiere el pago antes de entregar.",
  },
  envio: {
    label: "Envío",
    description_item: "Quiero que me lo envíen",
    description_select: "Se transfiere el envío antes y se paga en la entrega.",
  },
  envio_uber: {
    label: "Envío: Uber",
    description_item: "Quiero que me lo envíen por Uber",
    description_select: "Se transfiere el pago + envío antes.",
  },
  envio_online: {
    label: "Envío: Tienda Online",
    description_item: "Quiero intermediar con Mercado Libre",
    description_select:
      "Puede comprar y arreglar por medio de ML(se pagan comisiones).",
  },
  envio_encomienda: {
    label: "Envío: Encomienda",
    description_item: "Quiero arreglar un envío por correo",
    description_select: "",
  },
};

export default function Estimate({
  downloading = false,
  entrega = { value: "retiro", label: "", following: false },
  setEntrega,
}: InterfaceEstimateProps) {
  return (
    <div
      id="presupuesto"
      className={`flex flex-col gap-2 ${downloading ? "w-fit py-4" : ""}`}
    >
      <Logo id="presupuesto_logo" className="max-w-44 my-2" />

      <section className="flex flex-col items-center gap-2">
        <FormControl className="flex-row items-center ">
          <Checkbox
            checked={entrega.following}
            color="warning"
            onChange={(e) =>
              setEntrega({ ...entrega, following: e.target.checked })
            }
          />
          <FormLabel className="font-semibold">Sigo las redes</FormLabel>
        </FormControl>

        <Select
          name="shipping"
          size="sm"
          label="Entrega"
          className="max-w-xs dark:text-white"
          classNames={{
            listbox: "dark:text-white",
            trigger: "border-2 border-custom1",
            popoverContent: "border-2 border-custom1",
            description: "text-neutral-400 !text-second",
          }}
          selectedKeys={[entrega.value]}
          onSelectionChange={(e) => {
            const val = e.currentKey || "retiro";
            const entrega_: TypeEntrega = { ...entrega };
            entrega_.value = val;
            entrega_.label =
              conditions_items?.[val as keyof typeof conditions_items]?.label;

            setEntrega(entrega_);
          }}
          description={
            conditions_items?.[entrega.value as keyof typeof conditions_items]
              ?.description_select
          }
        >
          {Object.entries(conditions_items).map(([key, obj]) => (
            <SelectItem key={key} description={obj?.description_item}>
              {obj?.label}
            </SelectItem>
          ))}
        </Select>
      </section>

      <List downloading={downloading} following={entrega.following} />

      <section className="flex flex-col items-center gap-2 text-neutral-400 text-center">
        <div className="w-full flex flex-wrap items-center justify-center gap-3">
          <PaymentsIcon className="h-6 w-fit" />
          <AccountBalanceIcon className="h-6 w-fit" />
          <SVGLogoGalicia className="h-6 w-fit" />
          <SVGMercadoLibre className="h-6 w-fit" />
          <SVGLogoPaypal className="h-5 w-fit" />
        </div>

        <Divider className="w-2/3 bg-neutral-500/50" />

        <p>Gracias por su compra.</p>
        {downloading && <p>{downloading}</p>}
      </section>
    </div>
  );
}
