import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats(props) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="No. of active Vans"
                  statTitle={props.data.users ? props.data.users.length :0}
                  // statArrow="up"
                  // statPercent="3.48"
                  // statPercentColor="text-emerald-500"
                  // statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />

              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="No. of public dustbin"
                  statTitle={props.data.dustbin ? props.data.dustbin.length :0}
                  // statArrow="down"
                  // statPercent="3.48"
                  // statPercentColor="text-red-500"
                  // statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Request pending"
                  statTitle={props.data.pending ? props.data.pending.length :0}
                  // statArrow="down"
                  // statPercent="1.10"
                  // statPercentColor="text-orange-500"
                  // statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Request completed"
                  statTitle={props.data.accepted ? props.data.accepted.length :0}
                  // statArrow="up"
                  // statPercent="12"
                  // statPercentColor="text-emerald-500"
                  // statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
