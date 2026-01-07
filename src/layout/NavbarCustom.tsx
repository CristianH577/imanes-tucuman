import { lazy, useState } from "react";
import { motion } from "framer-motion";

import { NAV_ITEMS } from "../consts/siteConfig";

import { Link, useNavigate } from "react-router";

import { IconButton, Badge } from "@mui/material";

import Logo from "../components/Logo";
import Redes from "../components/Redes";
import SuspenseCustom from "../components/SuspenseCustom";
import MenuConfigs from "./NavbarCustom/MenuConfigs";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import InputSearch from "../components/InputSearch";

const MenuMovilDrawer = lazy(() => import("./NavbarCustom/MenuMovilDrawer"));

const listNavItems = ["imanes", "uya", "faqs"];

const MotionLinkRouter = motion.create(Link);

function NavbarCustom({ cartLength = 0, links = { whatsapp: "#" } }) {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleSearch = () => {
    let href = "buscar?orderBy=price-asc";
    if (inputText) href += "&text=" + inputText;
    navigate(href);
    setInputText("");
  };

  return (
    <nav className="sticky top-0 left-0 z-50 w-full backdrop-blur-md">
      <div className="xs:p-2 flex items-center xs:gap-4 justify-between md:justify-around w-full max-w-[1200px] h-16 place-self-center sm:p-4">
        <section className="flex gap-1 items-center">
          <IconButton
            color="inherit"
            className="md:!hidden hover:text-violet-500 text-custom2 dark:text-custom1 dark:hover:text-violet-500 bg-transparent"
            title="Abrir menú"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="h-full flex flex-col justify-center items-center">
              <MenuOpenIcon className="h-10 w-fit xs:h-8" />
              <span className="hidden xs:block text-xs font-bold">MENU</span>
            </div>
          </IconButton>

          <Logo
            id="navbar_logo"
            href="#"
            title="Ir al inicio"
            className="hover:scale-105 transition-transform hidden xs:flex"
            classNames={{
              svgA: "h-full w-auto max-h-[36px]",
            }}
            // @ts-ignore
            onClick={() => setIsMenuOpen(false)}
          />
        </section>

        <motion.ul
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          className="hidden md:flex gap-4 font-semibold"
        >
          {listNavItems.map((id) => {
            const li = NAV_ITEMS.find((item) => item.id === id);
            if (li)
              return (
                <li
                  key={li.id}
                  className="hover:scale-105 transition-transform"
                >
                  <MotionLinkRouter
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    to={li.href + (li?.search || "")}
                    className="text-[medium] capitalize text-custom2 dark:text-custom1 hover:text-secondary dark:hover:text-secondary-700"
                    title={"Ir a " + (li.title || li.label)}
                  >
                    {li.label}
                  </MotionLinkRouter>
                </li>
              );
          })}
        </motion.ul>

        <section className="flex items-center gap-1">
          <Redes
            className="hidden lg:flex items-center"
            classNames={{
              link: "text-neutral-400 hover:text-custom2 dark:hover:text-custom1",
              icon: "h-6 w-fit",
            }}
            slice={2}
          />

          <IconButton
            component="a"
            href="#buscar"
            title="Buscar"
            className="sm:hidden"
          >
            <ContentPasteSearchOutlinedIcon
              className="text-custom2 dark:text-custom1 h-9 w-fit"
              data-active={cartLength > 0}
            />
          </IconButton>

          <InputSearch
            className="max-sm:hidden mx-1"
            value={inputText}
            setValue={setInputText}
            handleSearch={handleSearch}
          />

          <MenuConfigs />

          <IconButton component="a" href="#cart" title="Carrito">
            <Badge
              badgeContent={cartLength > 9 ? "+9" : cartLength}
              color="warning"
            >
              <ShoppingCartIcon
                className="text-neutral-500 data-[active=true]:text-custom1"
                data-active={cartLength > 0}
              />
            </Badge>
          </IconButton>

          <IconButton
            component="a"
            href={links.whatsapp}
            target="_blank"
            title="Consulte por Whatsapp"
            className="hidden xs:flex"
          >
            <WhatsAppIcon className="text-success" />
          </IconButton>
        </section>

        {isMenuOpen && (
          <SuspenseCustom classFall="absolute w-20 h-full bg-black/50 inset-0">
            <MenuMovilDrawer
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
              NAV_ITEMS={NAV_ITEMS}
            />
          </SuspenseCustom>
        )}
      </div>
    </nav>
  );
}

export default NavbarCustom;
