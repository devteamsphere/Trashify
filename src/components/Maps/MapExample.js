import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
// import './App.css';
// import "../../assets/styles/map.css";
// import DataListInput from "react-datalist-input";
// import useGeolocation from 'react-hook-geolocation';
import PlaceFinder from "./PlaceFinder";
import { addDustbin } from "../../service/user.api";
import '../../assets/styles/styles.css';

const GenerateQR = (props) => {
  // const { latitude: initialLatitude, longitude: initialLongitude } =
  //   useGeolocation();
  // console.log(initialLatitude, initialLongitude);
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(/*initialLongitude ||*/ 77.4126);
  const [latitude, setLatitude] = useState(/*initialLatitude ||*/ 23.2599);
  const [geoLocation, setGeoLocation] = useState({});
  // const [geoError, setGeoError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [address, setAddress] = useState("");






  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const drawRoute = (geoJson, map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJson,
      },
      paint: {
        "line-color": "#4a90e2",
        "line-width": 4,
      },
    });
  };

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement("div");
    element.className = "marker-deliverys";
    new tt.Marker({ element: element }).setLngLat([77.44516, 23.5998]).addTo(map);
  };

  useEffect(() => {
    console.log(props)
    console.log(props.data.dustbin);


  }, []);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     console.log("Available");
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       console.log(position);
  //       console.log("Latitude is :", position.coords.latitude);
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //     });
  //   } else {
  //     console.log("Not Available");
  //   }
  // }, []);

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    };
    const destinations = [];
    let map = tt.map({
      key: "RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 10,
    });
    setMap(map);

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "This is you!"
      );
      const element = document.createElement("div");
      element.className = "markers";

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
        console.log(longitude, latitude);
      });
      marker.setPopup(popup).togglePopup();
    };
    addMarker();

   



    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) =>
        convertToPoints(destination)
      );
      const callParameters = {
        key: "RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb",
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      };

      return new Promise((resolve, _reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            const resultsArray = results.map((result, index) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              };
            });
            resultsArray.sort((a, b) => a.drivingtime - b.drivingtime);
            const sortedLocations = resultsArray.map(
              (result) => result.location
            );
            resolve(sortedLocations);
          });
      });
    };

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin);

        ttapi.services
          .calculateRoute({
            key: "RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb",
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson();
            drawRoute(geoJson, map);
          });
      });
    };

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
      recalculateRoutes();
    });

    return () => map.remove();
  }, [longitude, latitude]);

  useEffect(() => {
    if (props.data.users) {
      console.log(props.data.users)
      props.data.users.length > 0 && props.data.users.map((dustbin) => {
        if (dustbin.userType == "driver") {
          const element = document.createElement("div");
          element.className = "Dmarker";
          new tt.Marker({ element: element })
            .setLngLat([parseFloat(dustbin.longitude), parseFloat(dustbin.latitude)])
            .addTo(map);
        }
      });
    }

    if (props.data.dustbin) {
      console.log(props.data.dustbin)
      props.data.dustbin.length > 0 && props.data.dustbin.map((dustbin) => {
       
          const element = document.createElement("div");
          element.className = "marker-deliverys";
          new tt.Marker({ element: element })
            .setLngLat([parseFloat(dustbin.longitude), parseFloat(dustbin.latitude)])
            .addTo(map);
        
      });
    }
  }, [props.data.dustbin])
  

  return (
    <>
      <div>
        {map && (
          <div className="master" style={{ backgroundColor: "#fff" }}>


            <div ref={mapElement} className="child" />
          </div>
        )}
      </div>
    </>
  );
};

export default GenerateQR;
