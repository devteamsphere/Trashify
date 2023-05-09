import trashRequest from "../models/trashRequest.js";
import { serverErrorResponse, successResponse } from "../utils/response.js";
import axios from "axios";
import User from "../models/User.js";

export const newtrashRequest = async (req, res) => {
  try {
    const findRequest = await trashRequest.findOne({
      dustbinId: req.body.dustbinId,
    });
    if (findRequest) {
      return res.status(400).json({ message: "Request Already Exist" });
    }

    let data = {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      dustbinId: req.body.dustbinId,
      status: req.body.status,
      requestType: req.body.requestType,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      userId: req.body.userId,
      address: req.body.address,
    };

    const newTrashRequest = new trashRequest(data);

    const newRequest = await newTrashRequest.save();
    console.log(newRequest);
    return successResponse(
      res,
      newRequest,
      "Trash request created successfully.."
    );
  } catch (error) {
    return serverErrorResponse(res, error.message);
  }
};

export const getAllTrashRequest = async (req, res) => {
  try {
    let response = await trashRequest.find({});
    return successResponse(
      res,
      response,
      "Trash request fetched successfully.."
    );
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

const checkAvailabilityDriver = async (id) => {
  const driver = await User.findById(id);
  console.log(driver);
  if (driver.driverStatus == "available") {
    return [[], true, null];
  } else {
    const dustbin = await trashRequest.find({
      status: "allocated",
      driverId: id,
    });
    console.log(dustbin)
    if (dustbin.length > 0) {
      return [dustbin, false, null];
    }
  }
};

export const calculateDistance = async (req, res) => {
  try {
    const id = req.body.id;
    const [stop, go, err] = await checkAvailabilityDriver(id);
    console.log(stop);
    let dustbins;
    if (err !== null) {
      return serverErrorResponse(res, err);
    } else if (stop.length > 0) {
      console.log(stop);
      dustbins = stop;
    } else {
      dustbins = await trashRequest.find({
        status: "pending",
        requestType: "public",
      });
    }
    let destination = [];
    let tempDest = [];


    if (dustbins.length === 0) {
      return res.status(400).json({ message: "No pending request found" });
    }
    if (dustbins.length > 0) {
      dustbins.map((dustbin) => {
        destination.push({
          point: {
            latitude: parseFloat(dustbin.latitude),
            longitude: parseFloat(dustbin.longitude),
          },
        });

        tempDest.push({
          _id: dustbin._id,
          latitude: dustbin.latitude,
          longitude: dustbin.longitude,
          dustbinId: dustbin.dustbinId,
          description: dustbin.description,
          address: dustbin.address,
          createdAt: dustbin.createdAt,
          userId: dustbin.userId,
        });
      });
    }
    console.log(destination);
    let origin = [];
    // for (let i = 0; i < destination.length; i++) {

    // }
    origin.push({
      point: {
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
      },
    });

    let callParameters = {
      origins: origin,
      destinations: destination,
    };

    // https://api.tomtom.com/search/2/poiSearch/309/2C,%20Saket%20Nagar%20Road,%20Neha%20Nursery%20School,%20Habib%20Ganj%20Saket%20Nagar%20Bhopal,%20Saket%20Nagar%20Sector%202C,%20Bhopal%20462024,%20Madhya%20Pradesh%2023.213581%2077.458349.json?limit=5&lat=23.2423424&lon=77.4242304&radius=10000&key=RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb
    let calcDistance = {};
    const distance = await axios
      .post(
        "https://api.tomtom.com/routing/matrix/2?key=RzroMgvAOXlpkqRJbX6AUdNu5UX7DMqb",
        callParameters
      )
      .then((res) => {
        console.log(res.data);
        calcDistance = res.data;
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Error in calculating distance" });
      });

    console.log(distance);

    // sort calcDistance on the basis of lengthInMeters
    calcDistance.data.map((loc, index) => {
      tempDest[index].distance = loc.routeSummary.lengthInMeters;
      tempDest[index].drivingTime = loc.routeSummary.travelTimeInSeconds;
    });

    tempDest.sort((a, b) => {
      return a.distance - b.distance;
    });

    if (tempDest.length > 5) {
      tempDest = tempDest.slice(0, 5);
    }

    Promise.all(
      tempDest.map(async (dustbin) => {
        const dustbinData = await trashRequest.findOne({
          _id: dustbin._id,
        });
        dustbinData.status = "allocated";
        dustbinData.driverId = id;
        await dustbinData.save();
      })
    );
    const driver = await User.findByIdAndUpdate(id, {
      driverStatus: "busy",
    });

    return successResponse(res, tempDest, "Distance calculated successfully..");
  } catch (error) {
    return serverErrorResponse(res, error.message);
  }
};

export const pendingRequest = async (req, res) => {
  try {
    let pendingRequests = await trashRequest.find({status:"pending"});
    
    return successResponse(res,pendingRequests,"le bhai dhruv")
  } catch (error) {
    return serverErrorResponse(res,error.message)
  }
};

