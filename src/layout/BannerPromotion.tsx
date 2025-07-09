import { LINKS_SITES } from "../consts/siteConfig";

export default function BannerPromotion() {
  return (
    <section
      className="bg-gradient-to-t from-[#57BCE6] via- via-% to-[#57BCE6] text-white  "
      style={{
        textShadow: "1px 1px 1px rgba(0,0,0,.6)",
      }}
    >
      <div className="overflow-x-auto text-center backdrop-blur-sm p-2">
        <div>
          <h2 className="text-yellow-300 text-xl">
            <b>PROMOCIÓN INDEPENDENCIA</b>
          </h2>
          <p>
            <b>5-10% de descuento</b> en todas las medidas de{" "}
            <b>imanes por unidad</b> solo <b>siguiendo</b> la pagina de{" "}
            <b>
              <a
                href={LINKS_SITES.facebook}
                title="Ir a Facebook"
                className="hover:underline"
              >
                Facebook
              </a>
            </b>{" "}
            o{" "}
            <b>
              <a
                href={LINKS_SITES.instagram}
                title="Ir a Instagram"
                className="hover:underline"
              >
                Instagram
              </a>
            </b>
            .
          </p>

          <p>Valido desde el 8/7 la 15/7 del 2025.</p>
        </div>
      </div>
    </section>
  );
}
