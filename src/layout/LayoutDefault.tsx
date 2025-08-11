import { lazy, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import { LINKS_SITES } from "../consts/siteConfig.tsx";

import type { TypeDatabaseImg, TypeObjectGeneral } from "../consts/types.tsx";
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
  const { search, pathname } = useLocation();
  const cart = useCart();
  const [magnetData, setMagnetData] = useState<ClassDBItem | false>(false);
  const [databaseImgs, setDatabaseImgs] = useState<TypeDatabaseImg>({});

  useEffect(scrollToTop, [pathname]);

  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const paramsObj: TypeObjectGeneral = {};
      Array.from(params.entries()).map(([k, v]) => (paramsObj[k] = v));

      if ("view" in paramsObj) {
        setTimeout(() => {
          const element = document.querySelector("#" + paramsObj.view);

          if (element) element.scrollIntoView({ block: "nearest" });
        }, 1000);
      }
    }
  }, [search]);

  return (
    <div
      id="app"
      className="text-foreground dark:bg-content2 dark:text-white font-[menulis] flex flex-col justify-between min-h-screen h-[100dvh] max-xs:break-all overflow-x-hidden overflow-y-auto scroll-smooth sm:scrollbar scrollbar-thumb-custom1 scrollbar-track-custom2-10 scrollbar-w-3 scrollbar-h-3 hover:scrollbar-thumb-custom1-6"
    >
      <SuspenseCustom classFall="sticky min-h-[64px] bg-black/50 inset-0 z-50">
        <NavbarCustom
          cartLength={Object.keys(cart.value).length}
          links={LINKS_SITES}
        />
      </SuspenseCustom>

      <main className="pb-12 px-2 sm:px-10 lg:px-12">
        <SuspenseCustom classFall="h-screen">
          <Outlet
            context={{
              cart: cart,
              links: LINKS_SITES,
              setMagnetData: setMagnetData,
              db: { value: databaseImgs, set: setDatabaseImgs },
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
