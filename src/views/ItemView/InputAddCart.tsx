import { Button, OutlinedInput } from "@mui/material";

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
    classBtn: "hover:bg-violet-500",
  },
};

type TypeButtonAddCart = {
  handleAdd?: () => void;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  qttCart?: number;
  // salesUnit?: string;
};

export default function InputAddCart({
  value = "",
  className = "",
  onChange,
  onBlur,
  placeholder = "Cantidad",
  handleAdd,
  qttCart = 0,
  // salesUnit = "U",
}: TypeButtonAddCart) {
  const state = !qttCart
    ? "empty"
    : qttCart === Number(value)
    ? "same"
    : "change";

  const design = designs[state];

  return (
    <div>
      <OutlinedInput
        name="input-qtt"
        type="number"
        placeholder={placeholder}
        title={placeholder}
        className={
          "p-0 rounded-lg bg-content1 max-w-40" +
          (className ? " " + className : "")
        }
        color={qttCart ? "success" : "warning"}
        classes={{
          notchedOutline:
            "border-2 rounded-lg " +
            (qttCart
              ? "border-emerald-500"
              : "border-custom1--9 dark:border-custom1-2"),
          input: "ps-3 py-3",
        }}
        // sx={{ py: 1 }}
        inputProps={{
          min: 0,
          "aria-label": "cantidad",
        }}
        endAdornment={
          <Button
            variant="contained"
            onClick={handleAdd && handleAdd}
            sx={{
              height: "-webkit-fill-available",
              minWidth: 0,
            }}
            color={qttCart ? "success" : "warning"}
            title={design.titleBtn}
            className={
              "rounded-s-none rounded-lg shadow-none group ms-2 " +
              design.classBtn +
              (className ? " " + className : "")
            }
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
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <p className="text-xs text-neutralSwitch mt-1 text-center font-bold">
        En carrito: {qttCart}
        {/* {salesUnit} */}
      </p>
    </div>
  );
}
