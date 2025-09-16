import { useState } from "react";

import { IconButton, Tooltip } from "@mui/material";

import HelpIcon from "@mui/icons-material/Help";

export default function TooltipFuerzaExp({ exp }: { exp?: boolean }) {
  const [open, setOpen] = useState(false);

  const title = exp ? "Peso que puede levantar" : "Bajo buenas condiciones";

  return (
    <Tooltip
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={title + ". Más info en FAQs."}
      classes={{ popper: "max-w-44 p-2 text-center" }}
    >
      <IconButton
        color="inherit"
        size="small"
        onClick={() => setOpen(!open)}
        href="#faqs"
        className="!h-6"
      >
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
}
