import type { ClassDBItem } from "../consts/types";

import { Button } from "@heroui/react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

type TypeButtonAddCart = {
  itemData: ClassDBItem;
  inCart: boolean;
  handleAdd: (data: ClassDBItem) => void;
  className?: string;
};

export default function ButtonAddCart({
  itemData,
  inCart = false,
  handleAdd,
  className = "",
  ...props
}: TypeButtonAddCart) {
  if (inCart) {
    itemData.qtt = 0;
  } else {
    if (!itemData?.qtt) itemData.qtt = 1;
  }

  return (
    <Button
      isIconOnly
      color={inCart ? "success" : "secondary"}
      title={inCart ? "Quitar del carrito" : "Agregar al carrito"}
      className={`group shadow-md ${inCart ? "hover:bg-danger" : ""}${
        className ? " " + className : ""
      }`}
      onPress={() => handleAdd(itemData)}
      {...props}
    >
      {inCart ? (
        <>
          <ShoppingCartIcon className="group-hover:hidden" />
          <RemoveShoppingCartIcon className="hidden group-hover:block" />
        </>
      ) : (
        <AddShoppingCartIcon />
      )}
    </Button>
  );
}
