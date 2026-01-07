import type { ClassDBItem } from "../consts/classes";

import { toPercentageFormat, toPriceFormat } from "../libs/functions";

type TypePriceLabel = {
  itemData: ClassDBItem;
  className?: string;
  classNames?: { discountWrapper?: string; price?: string };
};

export default function PriceLabel({
  itemData,
  className,
  classNames = { discountWrapper: "", price: "" },
}: TypePriceLabel) {
  const usePrice = itemData.priceData.usePrice;
  const price = itemData.priceData.prices[usePrice];

  return (
    <div className={"text-end" + (className ? " " + className : "")}>
      {usePrice !== "base" && (
        <div
          className={`whitespace-nowrap${
            classNames?.discountWrapper ? ` ${classNames?.discountWrapper}` : ""
          }`}
        >
          {itemData.priceData?.discountsPercentages?.[usePrice] && (
            <b className="text-red-700">
              {toPercentageFormat(
                itemData.priceData.discountsPercentages[usePrice] * -1
              )}
            </b>
          )}{" "}
          <span className="text-neutral-400 line-through">
            {toPriceFormat(itemData.priceData.prices.base)}
          </span>
        </div>
      )}

      <p className={classNames?.price || undefined}>
        {toPriceFormat(price)}
        {itemData.priceData.salesUnit ? "/" + itemData.priceData.salesUnit : ""}
      </p>
    </div>
  );
}
