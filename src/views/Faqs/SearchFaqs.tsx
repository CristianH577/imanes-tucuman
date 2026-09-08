import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { FAQ_DATA } from "../../consts/faqs";

import { searchParamsToObj, toPlainText } from "../../libs/functions";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import InputSearch from "../../components/InputSearch";
import LinkCustom from "../../components/LinkCustom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SearchFaqs() {
  const { search } = useLocation();

  const [items, setItems] = useState(FAQ_DATA);
  const [inputText, setInputText] = useState("");

  const handleSearch = (text?: string) => {
    const text_search = text || inputText || "";
    const text_search_formated = toPlainText(text_search);

    const items_ = FAQ_DATA.filter((item) => {
      const text = [
        item.q,
        item.shortAnswer,
        item.a,
        // item.category,

        ...(item.tags || []),
        ...(item.keywords || []),
        ...(item.links || []).map((link) => [link.label, link.url].join(" ")),
      ]
        .filter(Boolean)
        .join("\n");

      const bool = toPlainText(text).includes(text_search_formated);
      return bool;
    });

    setItems(items_);
  };

  useEffect(() => {
    if (search) {
      const params = searchParamsToObj(search);

      if (params.search) {
        setInputText(params.search);
        handleSearch(params.search);
      }
    }
  }, [search]);

  return (
    <>
      <InputSearch
        value={inputText}
        setValue={setInputText}
        handleSearch={() => handleSearch()}
        className="w-full max-w-lg"
      />

      {items.length < 1 ? (
        <b>Sin resultados</b>
      ) : (
        <section className="font-sans">
          {items
            .sort((a, b) => a.q.localeCompare(b.q))
            .map((item, idx) => (
              <Accordion
                key={idx}
                className="w-full bg-content1 dark:bg-content2 hover:bg-custom1-5/20 dark:hover:bg-custom2-10/20"
              >
                <AccordionSummary
                  id={"panel-header " + idx}
                  aria-controls={"panel-content " + idx}
                  expandIcon={<ExpandMoreIcon />}
                  className="font-bold"
                >
                  ¿{item.q}?
                </AccordionSummary>

                <AccordionDetails className="prose dark:prose-invert text-current whitespace-pre-line">
                  {item.a.split("\n").map((t, j) => (
                    <p key={j} className="indent-2">
                      {t}
                    </p>
                  ))}
                  {item.links && (
                    <ol className="list-none">
                      {item.links.map((link, j) => (
                        <li key={j}>
                          <LinkCustom
                            href={link.url}
                            title={"Ir a " + link.label}
                            isExternal
                          >
                            {link.label}
                          </LinkCustom>
                        </li>
                      ))}
                    </ol>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
        </section>
      )}
    </>
  );
}
