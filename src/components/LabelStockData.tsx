import type { TypeStockData } from "../consts/types";

interface IntfProps {
  stock?: TypeStockData;
  className?: string;
}

const variants = {
  default: {
    class: "text-red-600 border-red-500/50 bg-red-500/20",
    label: "Sin Stock",
  },
  low: {
    class: "text-yellow-600 border-yellow-500/50 bg-yellow-500/20",
    label: "Poco Stock",
  },
  ult: {
    class: "text-orange-600 border-orange-500/50 bg-orange-500/20",
    label: "Último",
  },
  hidden: {
    class: "hidden",
    label: "Indefinido",
  },
};

export default function LabelStockData({ stock, className }: IntfProps) {
  if (stock !== undefined) {
    const variant =
      typeof stock === "string" && stock in variants
        ? variants[stock]
        : variants.default;
    return (
      <div
        className={
          "font-bold border-2 py-1 px-2 rounded-md " +
          variant.class +
          (className ? " " + className : "")
        }
      >
        {variant.label}
      </div>
    );
  }

  return null;
}
