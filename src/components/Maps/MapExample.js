// import { useEffect, useState, useRef } from "react";
// import * as tt from "@tomtom-international/web-sdk-maps";
// // import "../assets/css/location.css";
// import "@tomtom-international/web-sdk-maps/dist/maps.css";

// export default function MapExample() {
//   const mapElement = useRef();
//   const [maps, setMap] = useState({});
//   const [latitude, setLatitude] = useState(23.30778);
//   const [longitude, setLongitude] = useState(77.33058);

//   useEffect(() => {
//     // console.log(maps);
//     let map = tt.map({
//       key: "JvwENzHAF5n4IBpXvVkLLoXRmv0vGGGr",
//       container: mapElement.current,
//       stylesVisibility: {
//         trafficIncidents: true,
//         trafficFlow: true,
//       },
//       center: [longitude, latitude],
//       zoom: 9,
//     });
//     setMap(map);
   
//     const addMarker = () => {
//       const popupOffset = {
//         bottom: [0, -35],
//       };
//       const popup = new tt.Popup({ offset: popupOffset }).setHTML(
//         "You are here"
//       );
//       const element = document.createElement("div");
//       element.className = "marker";
//       const marker = new tt.Marker({
//         draggable: true,
//         element: element,
//       })
//         .setLngLat([longitude, latitude])
//         .addTo(map);
//       marker.on("dragend", () => {
//         const lnglat = marker.getLngLat();
//         console.log(lnglat);
//         setLongitude(lnglat.lng);
//         setLatitude(lnglat.lat);
//       });
//       marker.setPopup(popup).togglePopup();
//     };

//     addMarker();
//     console.log(map);

//     return () => map.remove();
//   }, [longitude, latitude]);

//   return (
//     <>
//       <div className="Map">
//         <div
//           style={{ width: "100%", height: "100vh" }}
//           className="map d-flex flex-direction-row mt-3"
//           ref={mapElement}
//         ></div>
//         <div></div>
//       </div>
//     </>
//   );
// }




import { useEffect, useRef, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
// import './App.css';
import '../../assets/styles/map.css'
// import useGeolocation from 'react-hook-geolocation';

const MapExample = () => {
  // const { latitude: initialLatitude, longitude: initialLongitude } =
  //   useGeolocation();
  // console.log(initialLatitude, initialLongitude);
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(/*initialLongitude ||*/ 77.361903);
  const [latitude, setLatitude] = useState(/*initialLatitude ||*/ 23.312126);

  const convertToPoints = lngLat => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route');
      map.removeSource('route');
    }
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson,
      },
      paint: {
        'line-color': '#4a90e2',
        'line-width': 4,
      },
    });
  };

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div');
    element.className = 'marker-delivery';
    new tt.Marker({ element: element }).setLngLat(lngLat).addTo(map);
  };

  useEffect(() => {
    
    


    
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("Longitude is :", position.coords.longitude);
  

        
      });
    } else {
      console.log("Not Available");
    }
    
  
  
  }, [])

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
      zoom: 14,
    });
    setMap(map);

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        'This is you!'
      );
      const element = document.createElement('div');
      element.className = 'marker';

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
        console.log(longitude,latitude);
      });
      marker.setPopup(popup).togglePopup();
    };
    addMarker();

    const sortDestinations = locations => {
      const pointsForDestinations = locations.map(destination =>
        convertToPoints(destination)
      );
      const callParameters = {
        key: "RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb",
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      };

      return new Promise((resolve, _reject) => {
        ttapi.services.matrixRouting(callParameters).then(matrixAPIResults => {
          const results = matrixAPIResults.matrix[0];
          const resultsArray = results.map((result, index) => {
            return {
              location: locations[index],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            };
          });
          resultsArray.sort((a, b) => a.drivingtime - b.drivingtime);
          const sortedLocations = resultsArray.map(result => result.location);
          resolve(sortedLocations);
        });
      });
    };

    const recalculateRoutes = () => {
      sortDestinations(destinations).then(sorted => {
        sorted.unshift(origin);

        ttapi.services
          .calculateRoute({
            key: "RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb",
            locations: sorted,
          })
          .then(routeData => {
            const geoJson = routeData.toGeoJson();
            drawRoute(geoJson, map);
          });
      });
    };

    map.on('click', e => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
      recalculateRoutes();
    });

    return () => map.remove();
  }, [longitude, latitude]);
  return (
    <>
      {map && (
        <div className="app">
          <div ref={mapElement} className="map" />
          <div className="search-bar">
            <h1>Where to?</h1>
            <input
              type="text"
              id="longitude"
              className="longitude"
              placeholder="Put in Longitude"
              onChange={e => setLongitude(e.target.value)}
            />
            <input
              type="text"
              id="latitude"
              className="latitude"
              placeholder="Put in Latitude"
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MapExample;