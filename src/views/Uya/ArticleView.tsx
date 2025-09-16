import { title } from "../../libs/tvs";

import SuspenseCustom from "../../components/SuspenseCustom";

export default function ArticleView({ children = <></>, h1 = "", id = "" }) {
  return (
    <article id={id || undefined} className="space-y-4 sm:space-y-8 pt-20">
      <h1
        className={
          "max-xs:break-all " +
          title({ size: "md", color: "custom2", darkColor: "custom1" })
        }
      >
        {h1}
      </h1>

      <SuspenseCustom classFall="min-h-[150dvh]">{children}</SuspenseCustom>
    </article>
  );
}
