import { Button } from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import type { TypeIcon } from "../../consts/types";

interface IntfProps {
  ref?: React.Ref<HTMLButtonElement>;
  Icon?: TypeIcon;
  className?: string;
  title?: string;
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
      className={
        "absolute z-10 opacity-0 sm:opacity-100 hover:bg-[--variant-containedBg] hover:text-white" +
        (className ? " " + className : "")
      }
      title={title}
      sx={{ borderRadius: "100%", px: 0.5 }}
    >
      <Icon className="h-12 w-fit" />
    </Button>
  );
}
