import { toPercentageFormat, toPriceFormat } from "../../libs/functions";

export default function LabelTotalCart({
  total = { base: 0, total: 0 },
  articulos = 0,
}) {
  const percentage = (total.base - total.total) / (total.base || 1);
  return (
    <section className="self-center px-4 text-center border-2 border-customSwitch/80 rounded-md py-2">
      {percentage > 0 && (
        <div>
          <b className="text-danger">-{toPercentageFormat(percentage)}</b>{" "}
          <span className="text-neutral-400 line-through">
            {toPriceFormat(total?.base)}
          </span>
        </div>
      )}

      <span className="text-customSwitch">
        Total {toPriceFormat(total?.total)}
      </span>
      <p className="text-neutralSwitch text-second">Articulos: {articulos}</p>
    </section>
  );
}
