// import TabsCustom from "../components/TabsCustom";
import SearchFaqs from "./Faqs/SearchFaqs";
// import FAQChat from "./Faqs/FAQChat";
// import ComponentTest from "./Faqs/ComponentTest";
// import { lazy } from "react";

// const SearchFaqs = lazy(() => import("./Faqs/SearchFaqs"));
// const FAQChat = lazy(() => import("./Faqs/FAQChat"));

export default function Faqs() {
  // const tabs = [
  //   {
  //     label: "Busqueda",
  //     content: <SearchFaqs key="SearchFaqs" />,
  //   },
  //   {
  //     label: "Chat",
  //     content: <FAQChat key="FAQChat" />,
  //   },
  // ];

  return (
    <>
      <section className="xs:max-w-[80%] text-center">
        <b>
          Cualquier duda que no se responda en esta sección puede consultarla
          por las{" "}
          <button
            title="Ir a redes"
            className="font-bold text-custom1 hover:underline cursor-pointer"
            onClick={() => {
              const e = document.querySelector("#footer");
              if (e) e.scrollIntoView();
            }}
          >
            redes
          </button>
          .
        </b>
      </section>

      <SearchFaqs key="SearchFaqs" />

      {/* <ComponentTest /> */}

      {/* <TabsCustom
        ariaLAbel="Panel de preguntas"
        tabs={tabs}
        className="max-w-lg"
        classes={{
          tabsWrapper: "xs:place-self-center",
        }}
      /> */}
    </>
  );
}
