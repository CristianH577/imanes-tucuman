import { m } from "framer-motion";

import { Button } from "@mui/material";
import { scrollStyle } from "../libs/tvs";

type TypeProps = {
  ariaLAbel?: string;
  tabs: string[];
  tabSelected?: number;
  setTabSelected?: (i: number) => any;
  className?: string;
};

export default function TabsWrapper({
  ariaLAbel = "",
  tabSelected = 0,
  tabs = [],
  setTabSelected,
  className,
}: TypeProps) {
  return (
    <article
      className={
        "overflow-x-auto bg-gradient-to-t from-custom2 to-custom2-10 rounded-lg px-2 py-1 shadow-md " +
        scrollStyle +
        (className ? " " + className : "")
      }
    >
      <m.ul
        role="tabs-wrapper"
        aria-label={ariaLAbel}
        className="flex w-fit relative gap-2"
      >
        {tabs.map((tab, i) => (
          <li key={i}>
            <Button
              color="inherit"
              size="small"
              role="tab"
              data-selected={i === tabSelected}
              className="whitespace-nowrap font-semibold data-[selected=true]:text-shadow-md data-[selected=true]:text-custom2 text-shadow-black/30 text-white"
              title={"Ver " + tab}
              onClick={() => setTabSelected && setTabSelected(i)}
            >
              {tabSelected === i && (
                <m.div
                  layoutId="highlight-imanes"
                  className="absolute right-0 bottom-0 rounded-lg w-full h-full bg-gradient-to-t from-custom1 to-custom1-3"
                />
              )}
              <span className="z-10 capitalize">{tab}</span>
            </Button>
          </li>
        ))}
      </m.ul>
    </article>
  );
}
