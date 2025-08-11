import { motion } from "framer-motion";

import type { TypeRoute } from "../../consts/types";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";

import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Redes from "../../components/Redes";
import Logo from "../../components/Logo";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type TypeMenuMovilDrawer = {
  isOpen: boolean;
  NAV_ITEMS: TypeRoute[];
  setIsOpen: (bool: React.SetStateAction<boolean>) => void;
};

const MotionList = motion.create(List);
const MotionListItemButton = motion.create(ListItemButton);

export default function MenuMovilDrawer({
  isOpen = false,
  setIsOpen,
  NAV_ITEMS,
}: TypeMenuMovilDrawer) {
  const onClose = () => setIsOpen(false);

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      placement="left"
      className={`max-xs:rounded-none w-full xs:max-w-[255px] ps-[3%]`}
      classNames={{
        wrapper: "max-xs:ms-[3%]",
        closeButton: "text-2xl top-5 end-3",
      }}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: "-3%",
          },
          exit: {
            x: -100,
            opacity: 0,
          },
        },
        transition: {
          duration: 0.2,
        },
      }}
    >
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader>
              <Logo
                id="menu_movil_logo"
                href="#"
                title="Ir al inicio"
                classNames={{
                  svgA: "h-full w-auto max-h-[44px]",
                }}
                onClick={onClose}
              />
            </DrawerHeader>

            <Divider variant="middle" className="bg-neutral-500/50" />

            <DrawerBody className="h-fit px-0">
              <MotionList
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
                animate="visible"
                aria-label="Lista de secciones"
                className="py-0"
              >
                {NAV_ITEMS.map(
                  (item) =>
                    item.id !== "" && (
                      <MotionListItemButton
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, x: -50 },
                          visible: {
                            opacity: 1,
                            x: 0,
                          },
                        }}
                        // @ts-ignore
                        component="a"
                        className="text-custom2 dark:text-custom1 capitalize py-2 hover:shadow-md dark:hover:bg-neutral-500/20"
                        href={`#${item.href}${item?.search || ""}`}
                        title={"Ir a " + (item.title || item.label)}
                        onClick={onClose}
                      >
                        {item?.icon && (
                          <ListItemIcon className="text-inherit">
                            <item.icon className="h-8 w-fit" />
                          </ListItemIcon>
                        )}

                        <ListItemText
                          primary={item.label}
                          classes={{ primary: "text-lg font-semibold" }}
                        />
                      </MotionListItemButton>
                    )
                )}

                <MotionListItemButton
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                    },
                  }}
                  className="text-neutral-400 py-2 hover:shadow-md dark:hover:bg-neutral-500/20 hover:text-foreground "
                  title="Cerrar menú"
                  onClick={onClose}
                >
                  <ListItemIcon className="text-inherit">
                    <ArrowBackIcon className="h-8 w-fit" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Cerrar"
                    classes={{ primary: "text-lg font-semibold" }}
                  />
                </MotionListItemButton>
              </MotionList>

              <Divider variant="middle" className="bg-neutral-500/50" />

              <Redes
                className="px-2 gap-6"
                classNames={{
                  link: "hover:text-custom2 dark:hover:text-custom1",
                  icon: "h-8 w-fit",
                }}
              />
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
