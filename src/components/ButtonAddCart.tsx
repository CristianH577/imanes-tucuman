import { Button } from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

type TypeButtonAddCart = {
  inCart: boolean;
  handleAdd?: () => void;
  className?: string;
};

export default function ButtonAddCart({
  inCart = false,
  handleAdd,
  className = "",
  ...props
}: TypeButtonAddCart) {
  return (
    <Button
      variant="outlined"
      size="small"
      color={inCart ? "success" : "secondary"}
      title={inCart ? "Quitar del carrito" : "Agregar al carrito"}
      className={`group shadow-md ${
        inCart
          ? "hover:text-white hover:border-danger hover:bg-danger"
          : "hover:bg-[--variant-containedBg] hover:text-white"
      }${className ? " " + className : ""}`}
      onClick={handleAdd && handleAdd}
      sx={{
        minWidth: 0,
        borderRadius: "0.5rem",
      }}
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
