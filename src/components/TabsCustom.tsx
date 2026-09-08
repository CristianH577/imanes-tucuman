import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TabsWrapper from "./TabsWrapper";

interface IntfProps {
  tabs: {
    label: string;
    content: ReactNode;
  }[];
  ariaLAbel?: string;
  className?: string;
  classes?: {
    tabsWrapper?: string;
    contentWrapper?: string;
  };
}

export default function TabsCustom({
  tabs,
  ariaLAbel = "",
  className,
  classes = {},
}: IntfProps) {
  const [tabSelected, setTabSelected] = useState(0);
  const tabs_ =
    tabs.length > 0 ? tabs : [{ label: "Indefinido", content: <></> }];
  const titles = tabs_.map((e) => e.label);

  return (
    <section
      className={"w-full space-y-4" + (className ? " " + className : "")}
    >
      <TabsWrapper
        ariaLAbel={ariaLAbel}
        tabs={titles}
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
        className={classes.tabsWrapper}
      />

      {/* <SuspenseCustom> */}
      {/* <ErrorBoundary> */}
      {/* {tabs.map((tab, i) => (
        <motion.article
          key={i}
          role="tabpanel"
          layoutId="tab-content"
          className={
            "space-y-4" +
            (classes?.contentWrapper ? " " + classes?.contentWrapper : "")
          }
          variants={{
            hidden: {
              x: "100%",
              opacity: 0,
              display: "none",
            },
            visible: { x: 0, opacity: 1, display: "block" },
          }}
          initial="hidden"
          animate={tabSelected === i ? "visible" : "hidden"}
          // style={{ display: tabSelected === i ? "block" : "none" }}
          // exit={tabSelected !== i ? "hidden" : undefined}
          transition={{ duration: 0.3 }}
        >
          {tab.content}
        </motion.article>
      ))} */}
      {/* </ErrorBoundary> */}
      {/* </SuspenseCustom> */}

      <AnimatePresence mode="wait">
        <motion.article
          key={tabSelected}
          role="tabpanel"
          layoutId="tab-content"
          className={
            "space-y-4" +
            (classes?.contentWrapper ? " " + classes?.contentWrapper : "")
          }
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs_[tabSelected].content}
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
