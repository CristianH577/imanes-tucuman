import LinkCustom from "../components/LinkCustom";

import RoomIcon from "@mui/icons-material/Room";
import DescriptionIcon from "@mui/icons-material/Description";

export default function BannerEncuesta({ form = "#", googlemaps = "#" }) {
  return (
    <div className="text-center font-semibold bg-custom2-10 p-4 inline-block text-white text-tert">
      Para mejorar, lo invitamos a realizar una breve{" "}
      <LinkCustom
        href={form}
        title="Ir a la encuesta"
        startIcon={<DescriptionIcon className="h-5 w-fit" />}
        isExternal
        custom1
      >
        Encuesta
      </LinkCustom>{" "}
      sobre el sitio o a dejar una reseña publica en{" "}
      <LinkCustom
        href={googlemaps}
        title="Ir a Google Maps"
        startIcon={<RoomIcon className="h-5 w-fit" />}
        isExternal
        custom1
      >
        Google Maps
      </LinkCustom>
      .
    </div>
  );
}
