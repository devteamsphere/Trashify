import React, { useEffect, useState } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import HeaderStats from "components/Headers/HeaderStats";
import { dashboardInfo } from "../../service/user.api";
import Map from "components/Maps/MapExample"
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  const [values, setValues] = useState({});

  useEffect(() => {
    const ini = async () => {

      const [err, data] = await dashboardInfo();
      console.log(data);
      setValues(data);
    }
    ini();
  }, []);


  return (
    <>
      <HeaderStats data={values}/>
      <div className="flex flex-wrap">
        <div className="w-full -mt-15 xl:mb-0 px-4">
       
        <Map data={values}/>
        </div>
       
      </div>
      
    </>
  );
}
