import { Button } from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

const designs = {
  empty: {
    titleBtn: "Agregar al carrito",
    classBtn: "hover:bg-[--variant-containedBg] hover:text-white",
  },
  same: {
    titleBtn: "Quitar del carrito",
    classBtn: "hover:text-white hover:border-danger hover:bg-danger",
  },
  change: {
    titleBtn: "Cambiar cantidad",
    classBtn:
      "hover:text-violet-600 hover:border-violet-600 hover:bg-violet-300",
  },
};

type TypeButtonAddCart = {
  handleAdd?: () => void;
  className?: string;
  qttCart?: number;
  qtt?: number;
};

export default function ButtonAddCart({
  handleAdd,
  className = "",
  qttCart = 0,
  qtt = 0,
  ...props
}: TypeButtonAddCart) {
  const state = !qttCart ? "empty" : qttCart === qtt ? "same" : "change";

  const design = designs[state];

  return (
    <Button
      variant="outlined"
      size="small"
      color={qtt === qttCart ? "success" : "warning"}
      title={design.titleBtn}
      data-state={state}
      className={
        "group shadow-md " +
        design.classBtn +
        (className ? " " + className : "")
      }
      onClick={handleAdd && handleAdd}
      sx={{
        minWidth: 0,
        borderRadius: "0.5rem",
      }}
      {...props}
    >
      {qttCart ? (
        <>
          <ShoppingCartOutlinedIcon className="group-hover:hidden" />
          {state === "same" ? (
            <RemoveShoppingCartIcon className="hidden group-hover:block" />
          ) : (
            <ShoppingCartCheckoutOutlinedIcon className="hidden group-hover:block" />
          )}
        </>
      ) : (
        <AddShoppingCartIcon />
      )}
    </Button>
  );
}
