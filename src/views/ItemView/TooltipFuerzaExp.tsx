import { useState } from "react";

import { Button, Tooltip } from "@heroui/react";

import HelpIcon from "@mui/icons-material/Help";

export default function TooltipFuerzaExp() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      isOpen={open}
      onOpenChange={setOpen}
      content="La fuerza experimental esta medida mediante la adhesión
      magnética de un peso al imán que a su vez esta adherido a una
      placa de metal de casi 10mm en un sentido vertical."
      className="dark:text-white max-w-44 p-2 text-center border-3 border-custom1-3"
      title="Este es un tooltip"
      shadow="md"
    >
      <Button
        isIconOnly
        // @ts-ignore
        variant=""
        size="sm"
        onPress={() => setOpen(!open)}
      >
        <HelpIcon />
      </Button>
    </Tooltip>
  );
}
