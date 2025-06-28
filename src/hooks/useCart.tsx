import { useEffect, useState } from "react";

import { VERSION_CURRENT } from "../consts/siteConfig";

import type { ClassDBItem, TypeCartValue } from "../consts/types";

const itemCartData_default = { id: 0, qtt: 0 };

export function useCart() {
  const [cart, setCart] = useState<TypeCartValue | {}>({});

  const addToCart = (itemData: ClassDBItem) => {
    const cart_ = { ...cart };
    const item_ = { ...itemCartData_default, ...itemData };
    const id = itemData.id;

    if (item_.qtt) {
      cart_[id] = item_;
    } else {
      if (id in cart_) delete cart_[id];
    }

    setCart(cart_);
  };

  useEffect(() => {
    const version = localStorage.getItem("version");
    const saved = localStorage.getItem("cart");
    if (version === VERSION_CURRENT) {
      if (saved) setCart(JSON.parse(saved));
    } else {
      if (saved) localStorage.removeItem("cart");
      setCart({});
      localStorage.setItem("version", VERSION_CURRENT);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return { value: cart, set: setCart, add: addToCart };
}
