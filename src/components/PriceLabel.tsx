import type { ClassDBItem } from "../consts/types";

import { toPercentageFormat, toPriceFormat } from "../libs/functions";

type TypePriceLabel = {
  itemData: ClassDBItem;
  className?: string;
  classNames?: { discountWrapper?: string; price?: string };
};

export default function PriceLabel({
  itemData,
  className = "",
  classNames = { discountWrapper: "", price: "" },
}: TypePriceLabel) {
  const usePrice = itemData.price_data.usePrice;
  const price = itemData.price_data.prices[usePrice];

  return (
    <div className={`text-end${className ? ` ${className}` : ""}`}>
      {usePrice !== "base" && (
        <div
          className={`whitespace-nowrap${
            classNames?.discountWrapper ? ` ${classNames?.discountWrapper}` : ""
          }`}
        >
          <b className="text-red-700">
            -
            {itemData.price_data.discounts_percentages?.[usePrice] &&
              toPercentageFormat(
                itemData.price_data.discounts_percentages[usePrice]
              )}
          </b>{" "}
          <span className="text-neutral-400 line-through">
            {toPriceFormat(itemData.price_data.prices.base)}
          </span>
        </div>
      )}
      <p className={classNames?.price || undefined}>
        {toPriceFormat(price)}
        {itemData.price_data.salesUnit
          ? "/" + itemData.price_data.salesUnit
          : ""}
      </p>
    </div>
  );
}
