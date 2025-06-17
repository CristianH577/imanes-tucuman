import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

import { SVGMercadoLibre } from "../../assets/svgs/svgsIcons";

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
    title: "Debito",
    commission: "3.25",
    percentage_total: "17.25",
  },
  {
    icon: CreditCardIcon,
    title: "Credito - 1 Pago",
    commission: "6.5",
    percentage_total: "20.5",
  },
  {
    icon: StorefrontIcon,
    title: "Mercado Shops",
    commission: "4.8",
    percentage_total: "18.8",
  },
  {
    icon: SVGMercadoLibre,
    title: "Mercado Libre",
    commission: "14.5",
    percentage_total: "28.5",
    content: (
      <ol className="list-disc">
        <li>
          Hasta $15.000: <b className="text-custom1">+$1000</b>
        </li>
        <li>
          Hasta $25.000: <b className="text-custom1">+$2000</b>
        </li>
        <li>
          Hasta $33.000: <b className="text-custom1">+$2400</b>
        </li>
      </ol>
    ),
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
                {item?.commission ? (
                  <>
                    {item?.commission}%(Comisión) +IVA+IIBB =
                    <b className="text-custom1"> +{item.percentage_total}%</b>
                  </>
                ) : null}
              </span>
            </div>

            {item?.content}
          </li>
        ))}
      </ol>

      <p className="font-size-secondary text-neutral-400">
        Los valores pueden variar.
      </p>
    </article>
  );
}
