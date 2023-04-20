import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// import "../assets/css/location.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

export default function MapExample() {
  const mapElement = useRef();
  const [maps, setMap] = useState({});
  const [latitude, setLatitude] = useState(23.30778);
  const [longitude, setLongitude] = useState(77.33058);

  useEffect(() => {
    // console.log(maps);
    let map = tt.map({
      key: "JvwENzHAF5n4IBpXvVkLLoXRmv0vGGGr",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 9,
    });
    setMap(map);
   
    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -35],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "You are here"
      );
      const element = document.createElement("div");
      element.className = "marker";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
      marker.on("dragend", () => {
        const lnglat = marker.getLngLat();
        console.log(lnglat);
        setLongitude(lnglat.lng);
        setLatitude(lnglat.lat);
      });
      marker.setPopup(popup).togglePopup();
    };

    addMarker();
    console.log(map);

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <>
      <div className="Map">
        <div
          style={{ width: "100%", height: "100vh" }}
          className="map d-flex flex-direction-row mt-3"
          ref={mapElement}
        ></div>
        <div></div>
      </div>
    </>
  );
}
