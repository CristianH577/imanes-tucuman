import { FORMAS_ENTREGA } from "../../consts/values";

import { Divider, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Select } from "@mui/material";

import Logo from "../../components/Logo";
import CartList from "./CartList";
import ErrorBoundary from "../../components/ErrorBoundary";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";

import {
  SVGLogoGalicia,
  SVGLogoPaypal,
  SVGMercadoLibre,
} from "../../assets/svgs/svgsIcons";

interface InterfaceEstimateProps {
  downloading: boolean;
  entrega: string;
  setEntrega: (str: string) => void;
}

export default function Estimate({
  downloading = false,
  entrega = "retiro",
  setEntrega,
}: InterfaceEstimateProps) {
  const condition =
    FORMAS_ENTREGA?.[entrega as keyof typeof FORMAS_ENTREGA];

  return (
    <div
      id="presupuesto"
      className={`flex flex-col gap-4 bg-content1 font-bold p-4 rounded-md shadow-md${downloading ? " w-fit" : ""
        }`}
    >
      <Logo id="presupuesto_logo" className="max-w-44 my-2" />

      <FormControl className="w-full max-w-xs self-center">
        <InputLabel id="shipping-select-label" sx={{ fontWeight: "unset" }}>
          Entrega
        </InputLabel>
        <Select
          labelId="shipping-select-label"
          id="shipping-select"
          label="Entrega"
          variant="outlined"
          color="warning"
          className="font-[menulis]"
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
          value={entrega}
          onChange={(e) => {
            const val = e.target.value ? String(e.target.value) : "retiro";
            setEntrega(val);
          }}
        >
          <MenuItem className="italic font-[menulis] text-neutral-500 dark:text-neutral-300 font-bold">
            Seleccione
          </MenuItem>

          {Object.entries(FORMAS_ENTREGA).map(([key, obj]) => (
            <MenuItem
              key={key}
              value={key}
              className="flex flex-col items-start max-w-xs font-[menulis]"
            >
              <b className="text-prima">{obj?.label}</b>
              {obj?.description_item && (
                <p className="whitespace-normal neutralSwitch font-bold text-second">
                  {obj?.description_item}
                </p>
              )}
            </MenuItem>
          ))}
        </Select>

        {condition?.description_select && (
          <b className="text-second text-neutral-600 dark:text-neutral-400 mt-1">
            {condition?.description_select}
          </b>
        )}
      </FormControl>

      <ErrorBoundary>
        <CartList downloading={downloading} />
      </ErrorBoundary>

      <section className="flex flex-col items-center gap-2 text-neutral-500 text-center">
        <div className="w-full flex flex-wrap items-center justify-center gap-3">
          <PaymentsIcon className="h-6 w-fit" />
          <AccountBalanceIcon className="h-6 w-fit" />
          <SVGLogoGalicia className="h-6 w-fit" />
          <SVGMercadoLibre className="h-5 w-fit" />
          <SVGLogoPaypal className="h-5 w-fit" />
        </div>

        <Divider className="w-2/3 bg-neutral-500/50" />

        <p>Gracias por su compra.</p>
        {downloading && <p>{downloading}</p>}
      </section>
    </div>
  );
}
