import { lazy, type ReactElement } from "react";

import { NAV_ITEMS } from "./consts/siteConfig";

import type { TypeRoute } from "./consts/types.tsx";

import { Route, Routes } from "react-router";

import LayoutDefault from "./layout/LayoutDefault";
import NotFound from "./layout/NotFound";
import ViewDefault from "./layout/ViewDefault.tsx";

const Home = lazy(() => import("./views/Home"));
const SearchView = lazy(() => import("./views/SearchView"));
const ItemView = lazy(() => import("./views/ItemView"));
const Imanes = lazy(() => import("./views/Imanes"));
const CartView = lazy(() => import("./views/CartView"));
const Faqs = lazy(() => import("./views/Faqs"));
const UyA = lazy(() => import("./views/Uya.tsx"));

const routesComponent: Record<string, ReactElement | null> = {
  search_view: <SearchView />,
  viewItem: <ItemView />,
  imanes: <Imanes />,
  cart: <CartView />,
  faqs: <Faqs />,
  uya: <UyA />,
};

const Admin = import.meta.env.DEV
  ? lazy(() => import("../dev-only/views/Admin.tsx"))
  : () => null;
if (Admin) routesComponent.admin = <Admin />;

function App() {
  return (
    <Routes>
      <Route path="" element={<LayoutDefault />}>
        <Route index element={<Home />} />

        {NAV_ITEMS.map((route: TypeRoute) => {
          if (route.id in routesComponent) {
            const component = routesComponent[route.id];

            if (component) {
              return (
                <Route
                  key={route.id}
                  path={route.href}
                  element={
                    <ViewDefault title={route?.title || undefined}>
                      {component}
                    </ViewDefault>
                  }
                />
              );
            }
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
