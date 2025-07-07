import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type TypeArticlesListItem = {
  id: string;
  title: string;
  content: React.ReactElement;
};
interface Props {
  list: TypeArticlesListItem[];
}

export default function ArticlesList({ list }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const id = target.dataset?.id;

    if (id) {
      const article = document.querySelector("#" + id);
      if (article) {
        article.scrollIntoView();
      } else {
        setTimeout(() => {
          // @ts-ignore
          if (article) article.scrollIntoView();
        }, 500);
      }
    }
  };

  return (
    <Accordion
      className="w-full max-w-sm border-3 border-custom1-2 bg-content1 text-foreground shadow-none rounded-lg"
      title="Ver artículos"
    >
      <AccordionSummary
        id="panel-header"
        aria-controls="panel-content"
        expandIcon={<ExpandMoreIcon className="text-foreground" />}
        className="font-semibold"
      >
        Artículos
      </AccordionSummary>

      <AccordionDetails>
        <ul className="list-disc list-inside text-start space-y-2">
          {list.map((item, i: number) => (
            <li
              key={i}
              className="hover:text-custom1 cursor-pointer hover:font-semibold"
              data-id={item?.id}
              onClick={handleClick}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}
