import { motion } from "framer-motion";
import { scrollToBottom, scrollToTop } from "../libs/functions";

import Logo from "../components/Logo";
import Redes from "../components/Redes";
import ImageCustom from "../components/ImageCustom";
import LinkCustom from "../components/LinkCustom";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RoomIcon from "@mui/icons-material/Room";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import qr from "../assets/footer/wp.webp";
import {
  SVGArrowBigDownLine,
  SVGArrowBigUpLine,
} from "../assets/svgs/svgsIcons";
import { Button, ButtonGroup, Divider, Link } from "@heroui/react";

function Footer({ whatsapp = "#", fotos = "#" }) {
  const info_items = [
    {
      icon: RoomIcon,
      text: <>9 de julio 4900, S.M. de Tucumán, Tucumán</>,
      subtext: (
        <span className="font-size-secondary text-neutral-400">
          No es local. Solo retiro.
        </span>
      ),
    },
    {
      icon: CalendarTodayIcon,
      text: (
        <>
          Lunes a Sábados(
          <LinkCustom
            href={
              whatsapp +
              "&text=Hola. Quiero consultar por los horarios de atención."
            }
            title="Consultar horarios por Whatsapp"
            isExternal
            custom1
            startIcon={<WhatsAppIcon className="h-5 w-fit" />}
          >
            Consultar
          </LinkCustom>
          )
        </>
      ),
    },
    { text: "Esta empresa sigue el principio de imputación de Menger." },
  ];

  const sections = [
    { label: "Fotos", href: fotos, isExternal: true },
    { label: "Ubicacion", href: "#faqs?view=ubicacion" },
    { label: "Opiniones", href: "#?view=opiniones" },
    { label: "Consideraciones", href: "#faqs" },
  ];

  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-custom2-4 to-custom2 text-white w-full flex flex-col items-center px-2 py-4 gap-4 shadow-inner shadow-black/50 pt-16 sm:pt-12 max-sm:pb-14"
    >
      <ButtonGroup className="absolute bottom-2 right-6 z-20">
        <Button
          isIconOnly
          title="Ir abajo"
          color="warning"
          variant="ghost"
          onPress={scrollToBottom}
        >
          <SVGArrowBigDownLine className="h-6 w-fit" />
        </Button>

        <Button
          isIconOnly
          title="Ir arriba"
          color="warning"
          variant="ghost"
          onPress={scrollToTop}
        >
          <SVGArrowBigUpLine className="h-6 w-fit" />
        </Button>
      </ButtonGroup>

      <Logo id="footer_logo" className="w-fit max-h-64 place-self-center" />

      <Redes
        className="py-4 px-2 gap-6"
        classNames={{
          link: "text-neutral-300 hover:text-custom1",
          icon: "h-10 w-fit",
        }}
      />

      <Divider className="self-center w-4/6 bg-neutral-500/80" />

      <div className="flex flex-col items-center gap-4 md:flex-row-reverse">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <Button
            as={Link}
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="Ir al chat de Whatsapp"
            className="w- h-full shadow-md shadow-black hover:scale-105 border-3 border-neutral-500 rounded-xl from-custom1 to-custom1-6 p-0 bg-gradient-to-t"
          >
            <ImageCustom
              src={qr}
              alt="QR del link al chat de Whatsapp"
              width={150}
              height={150}
            />
          </Button>
        </motion.div>

        <motion.div
          className="space-y-4 text-center"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.1,
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
        >
          {info_items.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
            >
              <p className="inline-block">
                {item?.icon && <item.icon className="h-5 w-fit me-1" />}
                {item.text}
              </p>
              {item?.subtext && <p>{item.subtext}</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Divider className="self-center w-3/5 bg-neutral-500/80" />

      <div className="flex flex-wrap justify-evenly gap-4 font-size-secondary">
        {sections.map((section) => (
          <LinkCustom
            key={section.label}
            href={section.href}
            target={section.isExternal ? undefined : "_self"}
            className="text-neutral-400"
            isExternal={section.isExternal || undefined}
            title={"Ir a " + section.label}
          >
            {section.label}
          </LinkCustom>
        ))}
      </div>

      <Divider className="self-center w-5/6 bg-neutral-500/80" />

      <p className="text-neutral-500 text-center">
        2024 - Diseñado por{" "}
        <Link
          href="https://github.com/CristianH577"
          target="_blank"
          rel="noopener noreferrer"
          title="Ir al perfil de Github"
          className="text-inherit hover:underline"
        >
          <span className="font-mono">©</span>
          VerdeAve
          <OpenInNewIcon className="h-4 w-fit" />
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
