import { motion } from "framer-motion";

import type { TypeRoute } from "../../consts/types";

import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
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
      open={isOpen}
      onClose={onClose}
      disableScrollLock
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "240px",
        },
      }}
    >
      <motion.section
        variants={{
          visible: {
            opacity: 1,
            x: 0,
          },
          hidden: {
            x: -100,
            opacity: 0,
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        <article className="py-4 px-6 flex">
          <Logo
            id="menu_movil_logo"
            href="#"
            title="Ir al inicio"
            classNames={{
              svgA: "h-full w-auto max-h-[44px]",
            }}
            // @ts-ignore
            onClick={onClose}
          />
        </article>

        <Divider variant="middle" className="bg-neutral-500/50" />

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
              !["", "admin", "viewItem"].includes(item.id) && (
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
          className="p-2 gap-6"
          classNames={{
            link: "hover:text-custom2 dark:hover:text-custom1",
            icon: "h-8 w-fit",
          }}
        />
      </motion.section>
    </Drawer>
  );
}
