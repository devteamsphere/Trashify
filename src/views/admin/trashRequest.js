import React from "react";

import CardTrashRequest from "components/Cards/CardTrashRequest";

export default function(){
    return (
        <>
          <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTrashRequest />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
        </>
      );
}
