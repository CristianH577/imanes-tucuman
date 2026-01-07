import "./MapUbication.css";
import { Fragment } from "react";

import { renderToStaticMarkup } from "react-dom/server";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { divIcon, type LatLngExpression } from "leaflet";

import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type TypeEntrance = {
  color: string;
  className: string;
  label: string;
  positions: LatLngExpression[];
};

const entrances: TypeEntrance[] = [
  {
    color: "rgba(255,0,0,.5)",
    className: "text-red-600 hover:text-red-500",
    label: "Entrada por Gbor. Barbieri",
    positions: [
      [-26.8789, -65.2254],
      [-26.8798, -65.22058875379908],
      [-26.8843, -65.22214],
      [-26.8864, -65.22322],
    ],
  },
  {
    color: "rgba(0,0,255,.5)",
    className: "text-blue-600 hover:text-blue-500",
    label: "Entrada por Gaspar Lasalle",
    positions: [
      [-26.8845, -65.22816128030537],
      [-26.8864, -65.22322],
      // [-26.886881394247986, -65.22367662501989],
      // [-26.889341522050035, -65.22508852597979],
      [-26.88938, -65.22485],
      [-26.88945, -65.2247],
    ],
  },
  {
    color: "rgba(0,255,0,.5)",
    className: "text-green-600 hover:text-green-500",
    label: "Entrada por ruta 38",
    positions: [
      [-26.893, -65.22139693068809],
      [-26.8933, -65.2229],
      [-26.8926, -65.2236],
      [-26.892, -65.222],
      [-26.8903, -65.2253],
      [-26.88938, -65.22485],
    ],
  },
];

export default function MapUbication() {
  const getIcon = (
    iconDesign = <ArrowDownwardOutlinedIcon className="h-[50px] w-fit" />
  ) => {
    const iconMarkup = renderToStaticMarkup(iconDesign);
    const customMarketIcon = divIcon({
      html: iconMarkup,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -30],
      className: "",
    });
    return customMarketIcon;
  };

  return (
    <section id="ubicacion" className="w-full drop-shadow-custom">
      <MapContainer
        center={[-26.887, -65.2247]}
        zoom={16}
        className="w-full max-w-[600px] h-[400px] place-self-center rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <Marker
          position={[-26.88945, -65.2247]}
          icon={getIcon(
            <LocationOnIcon
              className="h-[50px] w-fit text-custom1 hover:text-custom1-3"
              style={{
                filter: "drop-shadow(1px 2px 2px black)",
              }}
            />
          )}
        >
          <Popup>No es local. Solo retiro.</Popup>
        </Marker>

        {entrances.map((entrance, i) => (
          <Fragment key={i}>
            <Marker
              // className="Popup"

              position={entrance.positions[0]}
              icon={getIcon(
                <ArrowDownwardOutlinedIcon
                  className={"h-[50px] w-fit " + entrance.className}
                />
              )}
            >
              <Popup className="bg-danger">{entrance.label}.</Popup>
            </Marker>

            <Polyline
              pathOptions={{ color: entrance.color }}
              positions={entrance.positions}
            />
          </Fragment>
        ))}
      </MapContainer>
    </section>
  );
}
