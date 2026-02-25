import { IconButton, Drawer } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

type TypeDrawerFilters = {
  isOpen: boolean;
  setIsOpen: (bool: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
};

export default function DrawerFilters({
  isOpen = false,
  setIsOpen,
  children = <></>,
}: TypeDrawerFilters) {
  const onClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      // anchor="right"
      disableScrollLock
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "280px",
        },
      }}
    >
      <div>
        <IconButton
          size="small"
          className="text-neutral-500 dark:text-neutral-400 absolute right-1 top-1"
          title="Cerrar"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        {children}

        <IconButton
          className="absolute bottom-1 left-1"
          title="Cerrar lista de filtros"
          onClick={onClose}
        >
          <ArrowBackIcon className="h-6 w-fit" />
        </IconButton>
      </div>
    </Drawer>
  );
}
