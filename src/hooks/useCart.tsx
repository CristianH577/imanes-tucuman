import { useEffect, useState } from "react";

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
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return { value: cart, set: setCart, add: addToCart };
}
