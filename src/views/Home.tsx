import { lazy } from "react";

import SuspenseCustom from "../components/SuspenseCustom";
import TitleCustom from "../components/TitleCustom";

import Opiniones from "./Home/Opiniones";
import Formas from "./Home/Formas";
import AdvertisementsOwn from "./Home/AdvertisementsOwn";

// import { Image } from "@heroui/react";
// import img1 from "../assets/home/Hero/1280/1.webp";
// import img2 from "../assets/home/Hero/1280/2.webp";
// import img3 from "../assets/home/Hero/1280/3.webp";
// import unk from "../assets/layout/unknow-img.webp";

const Hero = lazy(() => import("./Home/Hero"));

const sections = [
  {
    id: "opiniones",
    label: "Opiniones",
    content: <Opiniones />,
    className: "",
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

// {[img1, img2, "img3"].map((src, i) => (
//   <div
//     key={i}
//     className="w-full h-screen flex items-center justify-center"
//   >
//     <Image
//       src={src}
//       loading="lazy"
//       width={300}
//       height={300}
//       alt="imagen"
//       // fallbackSrc={unk}
//       className="w-full h-fit"
//       classNames={{
//         wrapper: "w-full dark:bg-content-2",
//       }}
//     />
//   </div>
// ))}
export default function Home() {
  return (
    <>
      <SuspenseCustom classFall="w-screen h-[150vh]">
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
