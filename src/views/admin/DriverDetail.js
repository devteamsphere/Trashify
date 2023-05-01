import React from "react";

// components

import CardDriverDetail from "components/Cards/CardDriverDetail.js";

export default function DriverDetail() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardDriverDetail />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}