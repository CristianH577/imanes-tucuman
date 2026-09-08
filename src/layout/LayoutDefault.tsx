import { lazy, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";

import { LINKS_SITES } from "../consts/siteConfig.tsx";

import type { TypeDatabaseImg } from "../consts/types.tsx";
import type { ClassDBItem } from "../consts/classes.tsx";

import { scrollToTop } from "../libs/functions.tsx";
import { useCart } from "../hooks/useCart.tsx";

import Footer from "./Footer.tsx";
import SuspenseCustom from "../components/SuspenseCustom.tsx";
import BannerEncuesta from "./BannerEncuesta.tsx";

const NavbarCustom = lazy(() => import("./NavbarCustom.tsx"));
const ModalComparativeMagnet = lazy(
  () => import("./ModalComparativeMagnet.tsx")
);

export default function LayoutDefault() {
  const cart = useCart();
  const extractorRef = useRef(null);
  const { pathname } = useLocation();

  const [magnetData, setMagnetData] = useState<ClassDBItem | false>(false);
  const [databaseImgs, setDatabaseImgs] = useState<TypeDatabaseImg>({});

  useEffect(scrollToTop, [pathname]);

  // useEffect(() => {
  //   const params = searchParamsToObj(search);

  //   if ("view" in params) {
  //     const moveScroll = setTimeout(() => {
  //       const element = document.querySelector("#" + params.view);

  //       if (element) element.scrollIntoView({ block: "nearest" });
  //     }, 1000);
  //     return () => clearTimeout(moveScroll);
  //   }
  // }, [search]);

  return (
    <div
      id="app"
      className="text-black bg-content2 dark:text-white font-[menulis] grid grid-rows-[auto_1fr_auto_auto] grid-cols-1 h-[100dvh] max-xs:break-all overflow-x-hidden overflow-y-auto scroll-smooth sm:scrollbar scrollbar-thumb-custom1 scrollbar-track-custom2-10 scrollbar-w-3 scrollbar-h-3 hover:scrollbar-thumb-custom1-6"
    >
      <SuspenseCustom classFall="sticky min-h-[64px] bg-black/50 inset-0 z-50">
        <NavbarCustom
          cartLength={Object.keys(cart.value).length}
          links={LINKS_SITES}
        />
      </SuspenseCustom>

      <main className="pb-12 px-1 xs:px-2 sm:px-4 lg:px-8">
        <SuspenseCustom classFall="min-h-[80dvh]">
          <Outlet
            context={{
              cart: cart,
              setMagnetData: setMagnetData,
              db: { value: databaseImgs, set: setDatabaseImgs },
              extractorRef: extractorRef,
            }}
          />
        </SuspenseCustom>
      </main>

      <BannerEncuesta
        form={LINKS_SITES["form_encuesta-20250109"]}
        googlemaps={LINKS_SITES.googlemaps}
      />

      <Footer whatsapp={LINKS_SITES.whatsapp} fotos={LINKS_SITES.fotos} />

      {magnetData && (
        <SuspenseCustom classFall="absolute h-screen bg-black/50 inset-0 z-50">
          <ModalComparativeMagnet
            magnetData={magnetData}
            onClose={() => setMagnetData(false)}
          />
        </SuspenseCustom>
      )}
    </div>
  );
}
