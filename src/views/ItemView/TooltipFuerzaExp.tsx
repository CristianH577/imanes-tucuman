import { useState } from "react";

import { IconButton, Tooltip } from "@mui/material";

import HelpIcon from "@mui/icons-material/Help";

export default function TooltipFuerzaExp({ exp }: { exp?: boolean }) {
  const [open, setOpen] = useState(false);

  const title = exp
    ? "Medida adhiriendo el imán magnéticamente a una placa metálica fija y a su vez otra placa con un peso, en sentido vertical y con placas de ~10mm de grosor."
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
