import React from "react"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
//@ts-ignore
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

// https://dev.classmethod.jp/articles/tried-react-leaflet-with-nextjs/
const Map = () => {
  return (
    <MapContainer
      center={[36.0, 138.0]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        <Marker position={[36.0, 138.0]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[36.0, 138.2]} />
        <Marker position={[36.1, 138.1]} />
        <Marker position={[36.2, 137.9]} />
      </MarkerClusterGroup>;

    </MapContainer>
  )
}

export default Map
