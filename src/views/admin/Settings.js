import React,{useEffect,useState} from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export default function Settings() {
const [user,setUser] = useState({});
 useEffect(() => {
   
  let userDetails = JSON.parse(localStorage.getItem('user'));
  setUser(userDetails);
   
 }, [])
 


  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings user={user}/>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile user={user}/>
        </div>
      </div>
    </>
  );
}
