import { Divider, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Select } from "@mui/material";

import Logo from "../../components/Logo";
import CartList from "./CartList";

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
  const condition =
    conditions_items?.[entrega.value as keyof typeof conditions_items];

  return (
    <div
      id="presupuesto"
      className={`flex flex-col gap-4 ${downloading ? "w-fit p-4" : ""}`}
    >
      <Logo id="presupuesto_logo" className="max-w-44 my-2" />

      <FormControl className="w-full max-w-xs self-center">
        <InputLabel id="shipping-select-label">Entrega</InputLabel>
        <Select
          labelId="shipping-select-label"
          id="shipping-select"
          label="Entrega"
          variant="outlined"
          color="warning"
          className="font-[menulis] bg-content1"
          slotProps={{
            notchedOutline: {
              className: "border-2 border-customSwitch/80 rounded-lg",
            },
          }}
          MenuProps={{
            slotProps: {
              paper: {
                className:
                  "border-2 border-customSwitch/80 rounded-lg mt-1 bg-background",
              },
            },
          }}
          value={entrega.value}
          onChange={(e) => {
            const val = e.target.value ? String(e.target.value) : "retiro";
            const entrega_: TypeEntrega = { ...entrega };
            entrega_.value = val;
            entrega_.label = condition?.label;

            setEntrega(entrega_);
          }}
        >
          <MenuItem className="italic font-[menulis] text-neutral-500 dark:text-neutral-300">
            Seleccione
          </MenuItem>

          {Object.entries(conditions_items).map(([key, obj]) => (
            <MenuItem
              key={key}
              value={key}
              className="flex flex-col items-start max-w-xs font-[menulis] "
            >
              <b>{obj?.label}</b>
              {obj?.description_item && (
                <p className="text-xs whitespace-normal text-neutral-500 dark:text-neutral-300">
                  {obj?.description_item}
                </p>
              )}
            </MenuItem>
          ))}
        </Select>

        {condition?.description_select && (
          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
            {condition?.description_select}
          </p>
        )}
      </FormControl>

      <CartList downloading={downloading} following={entrega.following} />

      <section className="flex flex-col items-center gap-2 text-neutral-500 text-center">
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
