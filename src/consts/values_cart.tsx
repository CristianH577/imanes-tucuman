export const COLS_CART = [
  {
    id: "img",
    label: "",
    disabledSort: true,
  },
  {
    id: "label",
    label: "Nombre",
  },
  {
    id: "qtt",
    label: "Cantidad",
    isNumeric: true,
    disabledSort: true,
  },
  {
    id: "price",
    label: "Precio",
    isNumeric: true,
  },
  {
    id: "subtotal",
    label: "Subtotal",
    isNumeric: true,
    disabledSort: true,
  },
];

export const TOTAL_CART_DEF = {
  total: 0,
  base: 0,
};

export const FILTERS_CART_DEF = {
  page: 1,
  itemsPerView: 10,
  orderBy: "price-asc",
};
