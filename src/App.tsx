import { lazy } from "react";

import { NAV_ITEMS } from "./consts/siteConfig";

import type { TypeRoute } from "./consts/types.tsx";

import { Route, Routes } from "react-router";

import LayoutDefault from "./layout/LayoutDefault";
import NotFound from "./layout/NotFound";
import ViewDefault from "./components/ViewDefault.tsx";

const Home = lazy(() => import("./views/Home"));
const SearchView = lazy(() => import("./views/SearchView"));
const ItemView = lazy(() => import("./views/ItemView"));
const Imanes = lazy(() => import("./views/Imanes"));
const CartView = lazy(() => import("./views/CartView"));
const Faqs = lazy(() => import("./views/Faqs"));
const UyA = lazy(() => import("./views/Uya.tsx"));

const routesComponent = {
  search_view: <SearchView />,
  view: <ItemView />,
  imanes: <Imanes />,
  cart: <CartView />,
  faqs: <Faqs />,
  uya: <UyA />,
};

const views = [
  {
    id: "cart",
    href: "cart",
    label: "Carrito",
  },
  {
    id: "view",
    href: "/buscar/:id",
    label: "",
  },
];

function App() {
  return (
    <Routes>
      <Route path="" element={<LayoutDefault />}>
        <Route index element={<Home />} />

        {[...NAV_ITEMS, ...views].map((route: TypeRoute) => {
          if (route.id in routesComponent) {
            return (
              <Route
                key={route.id}
                path={route.href}
                element={
                  <ViewDefault
                    title={
                      route.id !== "search_view"
                        ? route?.title || route?.label || undefined
                        : undefined
                    }
                  >
                    {routesComponent[route.id as keyof typeof routesComponent]}
                  </ViewDefault>
                }
              />
            );
          }

          return null;
        })}

        <Route
          path="*"
          element={
            <ViewDefault
              title="pagina no encontrada"
              className="justify-center h-screen"
            >
              <NotFound />
            </ViewDefault>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
