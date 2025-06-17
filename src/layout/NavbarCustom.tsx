import { lazy, useState } from "react";

import { NAV_ITEMS } from "../consts/siteConfig";

import { Link as LinkRouter } from "react-router";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  Badge,
} from "@heroui/react";

import Logo from "../components/Logo";
import Redes from "../components/Redes";
import SuspenseCustom from "../components/SuspenseCustom";
import MenuConfigs from "./NavbarCustom/MenuConfigs";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const MenuMovilDrawer = lazy(() => import("./NavbarCustom/MenuMovilDrawer"));

function NavbarCustom({ cartLength = 0, links = { whatsapp: "#" } }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="z-50 bg-transparent fixed top-0 "
      classNames={{
        item: "font-bold",
        wrapper: "max-xs:gap-2 max-xs:px-2",
      }}
    >
      <NavbarContent>
        <li className="h-full hover:text-secondary-700 text-custom2 dark:text-custom1">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            className="md:hidden hover:text-secondary"
            icon={
              <div className="h-full flex flex-col justify-center">
                <MenuOpenIcon className="h-3/5 w-fit xs:h-fit" />
                <span className="hidden xs:block text-xs font-bold">MENU</span>
              </div>
            }
          />
        </li>

        <NavbarItem>
          <NavbarBrand className="hidden xs:block">
            <Logo
              id="navbar_logo"
              href="#"
              title="Ir al inicio"
              className="hover:scale-105 transition-transform"
              classNames={{
                svgA: "h-full w-auto max-h-[36px]",
              }}
              onClick={() => setIsMenuOpen(false)}
            />
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {NAV_ITEMS.map((item) => (
          <NavbarItem
            key={item.id}
            className="hover:scale-105 transition-transform"
          >
            <LinkRouter
              to={item.href + (item?.search || "")}
              className="text-[medium] capitalize text-custom2 dark:text-custom1"
            >
              {item.label}
            </LinkRouter>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-3">
        <NavbarItem className="hidden sm:block md:hidden lg:block">
          <Redes
            className="hidden sm:flex md:hidden lg:flex items-center"
            classNames={{
              link: "text-neutral-400 hover:text-custom2 dark:hover:text-custom1",
              icon: "h-6 w-fit",
            }}
            slice={2}
          />
        </NavbarItem>

        <NavbarItem>
          <MenuConfigs />
        </NavbarItem>

        <NavbarItem>
          <Link
            className="flex items-center overflow-visible hover:scale-105 transition-transform"
            href="#cart"
            title="Carrito"
          >
            <Badge
              content={cartLength > 9 ? "+9" : cartLength}
              isInvisible={cartLength < 1}
              size="sm"
              className="border-custom1-2 bg-custom2-10 text-white"
            >
              <ShoppingCartIcon
                className="text-neutral-500 data-[active=true]:text-custom1 h-6 w-fit"
                data-active={cartLength > 0}
              />
            </Badge>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href={links.whatsapp}
            target="_blank"
            className="flex items-center hover:scale-110 transition-transform"
            title="Consulte por Whatsapp"
          >
            <WhatsAppIcon className="text-success h-6 w-fit" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {isMenuOpen && (
        <SuspenseCustom classFall="absolute w-20 h-full bg-black/50 inset-0">
          <MenuMovilDrawer
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            NAV_ITEMS={NAV_ITEMS}
          />
        </SuspenseCustom>
      )}
    </Navbar>
  );
}

export default NavbarCustom;
