import { Button } from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { SVGMercadoLibre } from "../assets/svgs/svgsIcons";

interface IntfProps {
  links: { [key: string]: string };
  complete?: boolean;
}

export default function ButtonsStoreOnline({ links, complete }: IntfProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {links?.mercadolibre && (
        <Button
          component={"a"}
          variant="outlined"
          className="hover:bg-[#fee701] text-blue-900 dark:text-[#fee701] dark:hover:text-blue-900 shadow-sm space-x-0.5 border-blue-900/50 dark:border-[#fee701]/50"
          href={
            links.mercadolibre
              ? "https://www.mercadolibre.com.ar/" + links.mercadolibre
              : "#"
          }
          title="Ir a Mercado Libre"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            minWidth: 0,
            textTransform: "none",
            borderRadius: "0.5rem",
            // borderColor: "#fee701",
            padding: complete ? "" : "0.35rem",
          }}
          size={complete ? "medium" : "small"}
        >
          <SVGMercadoLibre className="w-fit h-5" />
          {complete ? (
            <>
              <b>MercadoLibre</b>
              <OpenInNewIcon />
            </>
          ) : (
            ""
          )}
        </Button>
      )}
    </div>
  );
}
