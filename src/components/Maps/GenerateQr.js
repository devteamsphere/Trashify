import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
// import './App.css';
import "../../assets/styles/map.css";
import DataListInput from "react-datalist-input";
// import useGeolocation from 'react-hook-geolocation';
import PlaceFinder from "./PlaceFinder";
import {addDustbin} from "../../service/user.api";





const GenerateQR = () => {
  // const { latitude: initialLatitude, longitude: initialLongitude } =
  //   useGeolocation();
  // console.log(initialLatitude, initialLongitude);
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(/*initialLongitude ||*/ 77.361903);
  const [latitude, setLatitude] = useState(/*initialLatitude ||*/ 23.312126);
  const [geoLocation, setGeoLocation] = useState({});
  // const [geoError, setGeoError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const[address, setAddress] = useState("");


 const handleSubmit = async()=>{
  const res = await addDustbin({
    "latitude": latitude,
    "longitude": longitude,
    "address": address,
  });
  console.log(res);
  if(res.status === 200){
    alert("Dustbin Added Successfully");
  } else {
    alert("Something went wrong");
  }

 }

   

  const changeHandler = (e) => {
    setQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  async function onSearchChange(query) {
    console.log(query);
    if (query.length > 0) {
      let placeFinder = new PlaceFinder("RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb");
      let results = await placeFinder.getNearbyPlaces(
        query,
        latitude,
        longitude
      );
      let temp =[...results];
      setSearchResults(temp);
      // setLatitude(results[0].position.lat);
      // setLongitude(results[0].position.lon);
      console.log(results);
    }
  }
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
    element.className = "marker-delivery";
    new tt.Marker({ element: element }).setLngLat(lngLat).addTo(map);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
  }, []);

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
        "This is you!"
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

 

  return (
    <>
      {map && (
        <div className="aap m-10 mt-28">
          <div ref={mapElement} className="map" />
          <div className="search-bar m-20 p-5">
            <h1>Where to?</h1>
            {/* <input
              type="text"
              id="longitude"
              className="longitude"
              placeholder="Put in Longitude"
              onChange={(e) => setLongitude(e.target.value)}
            />
            <input
              type="text"
              id="latitude"
              className="latitude"
              placeholder="Put in Latitude"
              onChange={(e) => setLatitude(e.target.value)}
            /> */}

            {/* {searchResults.length>0 &&
                searchResults.map((result) => (
                   <option value={result.address.freeformAddress}>
                    {result.address.freeformAddress}
                  </option>
                ))} */}
            <div className="m-5 p-3">
              <input
                type="text"
                className="form-control m-5 z-20"
                onChange={changeHandler}
                placeholder="Address"
                list="slist"
                name="owner_id"
                onSelect={(e)=>{
                  let text = e.target.value;
                  const arr = text.split(" ");
                  if(arr.length>2){
                  
                  const lat = arr[arr.length-2];
                  const lon = arr[arr.length-1];
                  setLatitude(lat);
                  setLongitude(lon);
                  setAddress(text);
                  }



                }}
              />
             
              <datalist id="slist" >
               
                  {searchResults.length> 0 && searchResults.map(( result,index) => {
                    console.log("result", result);
                    return ( <option key={index} value={result.address ? result.address.freeformAddress +" "+ result.position.lat +" "+ result.position.lon  : ""}>
                      {result.address ? result.address.freeformAddress : ""}
                    </option>)
                  })
                  }
              </datalist>
            </div>

            <button onClick={() => {handleSubmit()}}>Add Dustbin</button>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateQR;
