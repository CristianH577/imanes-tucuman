import { useEffect, useState } from "react";

import type { TypeCart } from "../consts/types";

// const inizializete = () => {
//   const saved = localStorage.getItem("cart");

//   if (saved) return JSON.parse(saved);

//   return {};
// };
const VERSION_CURRENT = "2.3.17";

const inizializete = () => {
  const version = localStorage.getItem("version");
  const saved = localStorage.getItem("cart");

  if (version === VERSION_CURRENT) {
    if (saved) return JSON.parse(saved);
  } else {
    if (saved) localStorage.removeItem("cart");
    localStorage.setItem("version", VERSION_CURRENT);
  }

  return {};
};

export function useCart() {
  const [cart, setCart] = useState<TypeCart>(inizializete());

  const addToCart = (id: number, qtt: number) => {
    const cart_ = structuredClone(cart);

    if (qtt) {
      cart_[id] = qtt;
    } else {
      if (id in cart_) delete cart_[id];
    }

    setCart(cart_);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return { value: cart, set: setCart, add: addToCart };
}
