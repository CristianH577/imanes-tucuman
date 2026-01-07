import LinkCustom from "../../components/LinkCustom";

import MapUbication from "./Envios/MapUbication";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MopedIcon from "@mui/icons-material/Moped";
import ApartmentIcon from "@mui/icons-material/Apartment";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import OpenInNewSharpIcon from "@mui/icons-material/OpenInNewSharp";
import AssistantDirectionSharpIcon from "@mui/icons-material/AssistantDirectionSharp";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Envios({
  links = { googlemaps: "#", whatsapp: "#", googlemaps_indicaciones: "#" },
}) {
  const lista_envios = [
    {
      icon: StoreOutlinedIcon,
      title: "Retiro",
      content: (
        <ol className="list-disc">
          <li>
            Puede retirar por 9 de julio 4900, S.M. de Tucumán, Tucumán
            (Consulte Imanes Tucumán en{" "}
            <LinkCustom
              href={links.googlemaps}
              title="Ir a ubicacion en Google Maps"
              endIcon={<LocationOnIcon />}
            >
              Google Maps
            </LinkCustom>
            ). No es local pero puede ver los productos aqui.
          </li>
          <li>
            Horarios: Lunes a Sábados (
            <LinkCustom
              href={
                links.whatsapp +
                "&text=Hola. Quiero consultar por los horarios de atención."
              }
              title="Consultar horarios por Wharsapp"
              endIcon={<WhatsAppIcon />}
            >
              Consultar
            </LinkCustom>
            ).
          </li>
          <li>
            Se recomienda no tomar derecho la 9 de julio, tomar la Av. Jujuy
            hasta la calle Gobernador L. Barbieri o Gaspar Bernardo Lasalle,
            entrar hasta la 9 de julio y seguir por esta. Tambien se puede tomar
            la autopista hasta la ultima bajada antes de los cruces y bajar por
            esta al barrio.{" "}
          </li>
          <li>
            Indicaciones sugeridas de{" "}
            <LinkCustom
              href={links?.googlemaps_indicaciones}
              title="Ir a indicaciones en Google Maps"
              endIcon={<AssistantDirectionSharpIcon />}
            >
              como llegar
            </LinkCustom>
            .
          </li>
        </ol>
      ),
    },
    {
      icon: CalendarTodayIcon,
      title: "Entrega en zona centro",
      content: (
        <p>
          Se puede coordinar en los días de entrega (
          <LinkCustom
            href={
              links?.whatsapp + "&text=Hola. Quiero coordinar para un entrega."
            }
            title="Coordinar por Wharsapp"
            endIcon={<WhatsAppIcon />}
          >
            Consultar
          </LinkCustom>
          ).
        </p>
      ),
    },
    {
      icon: ApartmentIcon,
      title: "Envío a zona centro ($3500)",
      content: (
        <p>
          Deberá efectuar el pago del envío por transferencia antes de
          realizarlo, el resto lo paga en la entrega. (5/9/25)
        </p>
      ),
    },
    {
      icon: MopedIcon,
      title: "Uber",
      content: (
        <p>
          Deberá efectuar el pago del pedido+envío por transferencia.
          <br />
          Si quiere enviar uno deberá solo transferir el pago del pedido antes
          de entregarlo al cadete. La ubicación aparece como Imanes Tucumán.
        </p>
      ),
    },
    {
      icon: LocalShippingOutlinedIcon,
      title: "Encomienda (5/9/25)",
      content: (
        <div>
          <ol className="list-disc">
            <li>A cotizar por empresa, destino, tamaño y peso.</li>
            <li>+$3500 Envío prioritario(opcional).</li>
            <li>
              Correo Argentino(Contrareembolso):
              <br />
              Paga el pedido en sucursal al retirarlo, tiene un recargo del 20%
              al total.
              <br />
              El envio cuesta aprox. +$15000 y debe transferirse antes.
            </li>
            <li>
              Andreani:
              <br />
              Paga el pedido por transferencia y el envio se puede pagar con un
              cupon de pago de la empresa.
              <br />
              Costo aprox. de envio: $7000 a sucursal, $10.000 - $14.000 a
              domicilio.
              <br />
              Puede cotizar en su sitio:{" "}
              <LinkCustom
                href="https://www.andreani.com/?tab=cotizar-envio"
                title="web de Andreani"
                endIcon={<OpenInNewSharpIcon />}
              >
                Consultar
              </LinkCustom>
              .
            </li>
            <li>
              Mercado Libre: Puede gestionar todo por la pagina. Tiene un
              recargo del 20% aprox.
            </li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <article className="pb-4">
      <ol className="list-none ps-0">
        {lista_envios.map((item, i) => (
          <li key={i}>
            <div className="flex items-center gap-2 text-tert">
              <item.icon className="w-7 h-fit" />
              <b>{item?.title}</b>
            </div>

            {item?.content}
          </li>
        ))}
      </ol>

      <MapUbication />
    </article>
  );
}

export default Envios;
