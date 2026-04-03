import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

import { SVGMercadoLibre } from "../../assets/svgs/svgsIcons";

const comissions = ["Comisión", "Imp. Provinciales", "Imp. Nacionales"];

const lista_pago = [
  {
    icon: PaymentsIcon,
    title: "Efectivo",
  },
  {
    icon: AccountBalanceOutlinedIcon,
    title: "Transferencia",
  },
  {
    icon: CreditCardIcon,
    title: "Débito",
    comissions: true,
  },
  {
    icon: CreditCardIcon,
    title: "Crédito",
    comissions: true,
  },
  {
    icon: SVGMercadoLibre,
    title: "Mercado Libre",
    comissions: true,
  },
];

export default function Pagos() {
  return (
    <article>
      <ol className="list-none ps-0">
        {lista_pago.map((item, i) => (
          <li key={i}>
            <div className="flex items-center gap-2">
              <item.icon className="h-6 w-fit" />

              <span>
                <strong>{item?.title} </strong>
                {item?.comissions ? comissions.join(" - ") : null}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <p className="font-size-secondary text-neutral-400">
        Los valores pueden variar.
      </p>
    </article>
  );
}
