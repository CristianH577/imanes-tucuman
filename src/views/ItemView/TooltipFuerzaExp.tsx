import { useState } from "react";

import { IconButton, Tooltip } from "@mui/material";

import HelpIcon from "@mui/icons-material/Help";

export default function TooltipFuerzaExp({ exp }: { exp?: boolean }) {
  const [open, setOpen] = useState(false);

  const title = exp
    ? "La fuerza experimental esta medida mediante la adhesión magnética de un peso al imán que a su vez esta adherido a una placa de metal de casi 10mm en un sentido vertical."
    : "Es es bajo buenas condiciones. Más info. en FAQs.";

  return (
    <Tooltip
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={title}
      classes={{ popper: "max-w-44 p-2 text-center" }}
    >
      <IconButton color="inherit" size="small" onClick={() => setOpen(!open)}>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
}
