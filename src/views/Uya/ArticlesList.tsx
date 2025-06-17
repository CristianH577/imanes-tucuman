import { Accordion, AccordionItem } from "@heroui/react";

type TypeArticlesListItem = {
  id: string;
  title: string;
  content: React.ReactElement;
};
interface InterfaceArticlesListProps {
  list: TypeArticlesListItem[];
}

export default function ArticlesList({ list }: InterfaceArticlesListProps) {
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
    <Accordion variant="splitted" className="w-full max-w-sm">
      <AccordionItem
        key="articles"
        aria-label="Artículos"
        title="Artículos"
        className="border-3 border-custom1-2"
        classNames={{
          title: "font-bold border-b",
          content: "pt-0 pb-4",
        }}
      >
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
      </AccordionItem>
    </Accordion>
  );
}
