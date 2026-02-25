import ML from "../assets/layout/ml.webp";

import { Button } from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface IntfProps {
  links: { [key: string]: string };
  complete?: boolean;
}

export default function StoreOnlineButtons({ links, complete }: IntfProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {(links.both || links?.ML) && (
        <Button
          component={"a"}
          variant="outlined"
          className="hover:bg-[#fee701] text-blue-900 dark:text-[#fee701] dark:hover:text-blue-900 shadow-sm space-x-0.5 border-blue-900/50 dark:border-[#fee701]/50 bg-content1"
          href={
            links.both
              ? "https://www.mercadolibre.com.ar/" + links.both
              : links.ML
          }
          title="Ir a Mercado Libre"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            minWidth: "0",
            textTransform: "none",
            borderRadius: "0.5rem",
            // borderColor: "#fee701",
            padding: complete ? "" : "0.2rem",
          }}
          size={complete ? "medium" : "small"}
        >
          <img src={ML} />
          {complete ? (
            <>
              <b>MercadoLibre</b> <OpenInNewIcon />
            </>
          ) : (
            ""
          )}
        </Button>
      )}

      {/* {(links.both || links?.MS) && (
        <Button
          component={"a"}
          variant="outlined"
          className="hover:bg-[#e82d88] text-[#e82d88] hover:text-white shadow-sm space-x-0.5 border-[#e82d88]/50 bg-content1"
          href={
            links.both
              ? "https://imanestucuman.mercadoshops.com.ar/" + links.both
              : links.MS
          }
          title="Ir a Mercado Shops"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            minWidth: "0",
            textTransform: "none",
            borderRadius: "0.5rem",
            padding: complete ? "" : "0.2rem",
          }}
          size={complete ? "medium" : "small"}
        >
          <img src={MS} />
          {complete ? (
            <>
              <b>MercadoShops</b> <OpenInNewIcon />
            </>
          ) : (
            ""
          )}
        </Button>
      )} */}
    </div>
  );
}
