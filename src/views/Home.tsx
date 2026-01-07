import { lazy } from "react";

import SuspenseCustom from "../components/SuspenseCustom";
import TitleCustom from "../components/TitleCustom";

import Opiniones from "./Home/Opiniones";
import Formas from "./Home/Formas";
import AdvertisementsOwn from "./Home/AdvertisementsOwn";

const Hero = lazy(() => import("./Home/Hero"));

const sections = [
  {
    id: "opiniones",
    label: "Opiniones",
    content: <Opiniones />,
  },
  {
    id: "formas",
    label: "Formas",
    content: <Formas />,
  },
  {
    label: "variedades",
    content: <AdvertisementsOwn />,
    className: "2xl:max-w-[1500px]",
  },
];
export default function Home() {
  return (
    <>
      <SuspenseCustom classFall="w-screen h-[150dvh]">
        <Hero />
      </SuspenseCustom>

      {sections.map((section, i) => (
        <div
          key={i}
          id={section?.id || undefined}
          className={`w-full max-w-[1200px] flex flex-col items-center gap-4 place-self-center pt-16${
            section?.className ? " " + section?.className : ""
          }`}
        >
          <TitleCustom title={section?.label} />
          {section.content}
        </div>
      ))}
    </>
  );
}
