import type { TypeIcon } from "../../consts/types";

import { Button } from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface IntfProps {
  ref?: React.Ref<HTMLButtonElement>;
  Icon?: TypeIcon;
  className?: string;
  title?: string;
  hiddeMovil?: boolean;
}

export default function ButtonSlider({
  ref,
  Icon = KeyboardArrowLeftIcon,
  className,
  title = "Mostrar imagen anterior",
}: IntfProps) {
  return (
    <Button
      ref={ref}
      variant="outlined"
      color="warning"
      size="small"
      className={
        "absolute z-10 hover:bg-[--variant-containedBg] hover:text-white sm:rounded-full max-sm:h-full max-h-[50vh] opacity-0 sm:opacity-100 border-0" +
        (className ? " " + className : "")
      }
      title={title}
      sx={{ p: 0.5, minWidth: 0, minHeight: 0 }}
    >
      <Icon className="h-8 w-fit" />
    </Button>
  );
}
