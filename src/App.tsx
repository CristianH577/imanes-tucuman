import { lazy, type LazyExoticComponent } from "react";

import { NAV_ITEMS } from "./consts/siteConfig";

import type { TypeRoute } from "./consts/types.tsx";

import { Route, Routes } from "react-router";

import LayoutDefault from "./layout/LayoutDefault";
import NotFound from "./layout/NotFound";
import ViewDefault from "./layout/ViewDefault.tsx";
// import SearchView from "./views/SearchView.tsx";
// import ItemView from "./views/ItemView.tsx";
// import Imanes from "./views/Imanes.tsx";
// import CartView from "./views/CartView.tsx";
// import Faqs from "./views/Faqs.tsx";
// import UyA from "./views/Uya.tsx";
// import Home from "./views/Home.tsx";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const Home = lazy(() => import("./views/Home"));
const SearchView = lazy(() => import("./views/SearchView"));
const ItemView = lazy(() => import("./views/ItemView"));
const Imanes = lazy(() => import("./views/Imanes"));
const CartView = lazy(() => import("./views/CartView"));
const Faqs = lazy(() => import("./views/Faqs"));
const UyA = lazy(() => import("./views/Uya.tsx"));

let NAV_ITEMS_: TypeRoute[] = [...NAV_ITEMS]
const routesComponent: Record<
  string,
  LazyExoticComponent<() => React.JSX.Element>
> = {
  search_view: SearchView,
  viewItem: ItemView,
  imanes: Imanes,
  cart: CartView,
  faqs: Faqs,
  uya: UyA,
};

// if (import.meta.env.DEV) {
//   const Admin = lazy(() => import("../dev-only/views/Admin.tsx"))
//   routesComponent.admin = Admin;
//   const admin_nav: TypeRoute = {
//     id: "admin",
//     href: "admin",
//     label: "Admin",
//     title: "Admin",
//     icon: AdminPanelSettingsIcon
//   }
//   NAV_ITEMS_.push(admin_nav)
// }

function App() {
  return (
    <Routes>
      <Route path="" element={<LayoutDefault key="LayoutDefault" />}>
        <Route index element={<Home key="Home" />} />

        {NAV_ITEMS_.map((route: TypeRoute) => {
          if (route.id in routesComponent) {
            const Component = routesComponent[route.id];

            if (Component) {
              return (
                <Route
                  key={route.id}
                  path={route.href}
                  element={
                    <ViewDefault title={route?.title || undefined}>
                      <Component key={route.id} />
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
              className="justify-center"
            >
              <NotFound key="NotFound" />
            </ViewDefault>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
