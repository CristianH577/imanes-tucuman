import { useEffect, useState } from "react";

import type { TypeCart } from "../consts/types";

const STORAGE_KEY = "cart:v1.0";

const inizializete = (): TypeCart => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return {};
};

export function useCart() {
  const [cart, setCart] = useState<TypeCart>(() => inizializete());

  const addToCart = (id: number, qtt: number) => {
    setCart((prev) => {
      const next = structuredClone(prev);

      if (qtt) {
        next[id] = qtt;
      } else {
        delete next[id];
      }

      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  return { value: cart, set: setCart, add: addToCart };
}
