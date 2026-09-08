import type { ClassDBItem } from "../consts/classes";

import { toPercentageFormat, toPriceFormat } from "../libs/functions";

type TypeLabelPrice = {
  itemData: ClassDBItem;
  className?: string;
  classNames?: { discountWrapper?: string; price?: string };
};

export default function LabelPrice({
  itemData,
  className,
  classNames = { discountWrapper: "", price: "" },
}: TypeLabelPrice) {
  const use_price = itemData.priceData.usePrice;
  const price = itemData.priceData.prices[use_price] || 0;
  const price_base = itemData.priceData.prices.base;
  const discounts_percentage = (price - price_base) / price_base;

  return (
    <div
      className={"text-end font-semibold" + (className ? " " + className : "")}
    >
      {use_price !== "base" && (
        <p
          className={`whitespace-nowrap${classNames?.discountWrapper ? ` ${classNames?.discountWrapper}` : ""
            }`}
        >
          {discounts_percentage && (
            <span className="text-danger">
              {discounts_percentage > 0 && "+"}
              {toPercentageFormat(discounts_percentage)}
            </span>
          )}{" "}
          <span className="text-neutral-400 line-through">
            {toPriceFormat(itemData.priceData.prices.base)}
          </span>
        </p>
      )}

      <p className={classNames?.price || undefined}>
        {toPriceFormat(price)}
        <span className="text-second">{itemData.priceData.salesUnit ? "/" + itemData.priceData.salesUnit : ""}</span>
      </p>
    </div>
  );
}
