import { LINKS_SITES } from "../../consts/siteConfig";

import { title1 } from "../../libs/tvs";

import ImageCustom from "../../components/ImageCustom";
import LinkCustom from "../../components/LinkCustom";

import FacebookIcon from "@mui/icons-material/Facebook";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import DescriptionIcon from "@mui/icons-material/Description";

import imgOpinions from "../../assets/home/people-text-baloon.webp";

export default function Opiniones() {
  const linksObj = [
    {
      href: LINKS_SITES.googlemaps,
      className: "text-emerald-500",
      label: "Google Maps",
      icon: <LocationPinIcon />,
    },
    {
      href: LINKS_SITES.facebook,
      className: "text-blue-500",
      label: "Facebook",
      icon: <FacebookIcon />,
    },
    {
      href: LINKS_SITES["form_encuesta-20250109"],
      className: "text-secondary",
      label: "Encuesta",
      icon: <DescriptionIcon />,
    },
  ];

  return (
    <section className="flex flex-col items-center md:flex-row gap-4 md:gap-8 w-full max-w-[900px] bg-content1 font-bold p-2 rounded-md shadow-md xs:p-4">
      <ImageCustom
        src={imgOpinions}
        alt="Imagen de opiniones"
        width={300}
        height={240}
        className="xs:max-w-none rounded-lg"
        classes={{ wrapper: "md:w-full" }}
      />

      <article className="text-center prose dark:prose-invert">
        <h2 className={title1({ color: "custom2", darkColor: "custom1" })}>
          ¡Su opinión es importante para nosotros!
        </h2>
        <div>⭐⭐⭐⭐⭐</div>

        <p>
          Ayúdenos a mejorar y ofrecerle la mejor experiencia posible. Dedique
          solo un minuto para dejar su reseña, compartir su opinión o completar
          nuestra breve encuesta.
        </p>

        <ol className="list-none text-start">
          <li>✅ Su opinion nos ayuda a crecer</li>
          <li>✅ Mejoramos gracias a usted</li>
          <li>✅ Es rápido y sencillo</li>
        </ol>

        <p>
          Haga clic en cualquiera de los enlaces a continuación y cuéntanos su
          experiencia. Lo leemos con atención! 📢💬
        </p>

        <ol className="list-none ps-0">
          {linksObj.map((link) => (
            <li key={link.label}>
              <LinkCustom
                href={link.href}
                className={"text-tert no-underline font-bold " + link.className}
                title={`Ir a ${link.label}`}
                isExternal
                startIcon={link.icon}
              >
                {link.label}
              </LinkCustom>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}
