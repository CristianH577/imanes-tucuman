import { Button } from "@heroui/button";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

type TypeButtonAddCart = {
  inCart: boolean;
  handleAdd?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function ButtonAddCart({
  inCart = false,
  handleAdd,
  className = "",
  size = "md",
  ...props
}: TypeButtonAddCart) {
  return (
    <Button
      isIconOnly
      size={size}
      color={inCart ? "success" : "secondary"}
      title={inCart ? "Quitar del carrito" : "Agregar al carrito"}
      className={`group shadow-md ${inCart ? "hover:bg-danger" : ""}${
        className ? " " + className : ""
      }`}
      onPress={handleAdd && handleAdd}
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
