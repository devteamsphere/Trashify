import trashRequest from "../models/trashRequest.js";
import { serverErrorResponse, successResponse } from "../utils/response.js";

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

export const calculateDistance = async (req, res) => {
  try {

   const destination =[];
    const dustbins = await trashRequest.find({status : "pending"});





    const callParameters = {
      destinations: destination,
      origins: [
        {
          point: {
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
          },
        },
      ],
    };

    const distance  = await axios.post("https://{baseURL}/routing/matrix/{versionNumber}?key=q2yukmABGuRvQD9NhkGAABCOYtIMoHFD", callParameters);

    // return new Promise((resolve, reject) => {
    //   ttapi.services.matrixRouting(callParameters).then((matrixApIResults) => {
    //     const results = matrixApIResults.matrix[0];
    //     console.log(results);
    //     const resultsArray = results.map((result, index) => {
    //       console.log(result);

    //       return {
    //         // location: locations[index],
    //         drivingtime: result.response.routeSummary.travelTimeInSeconds,
    //         drivingdistance: result.response.routeSummary.lengthInMeters,
    //       };
    //     });
        

    //     this.setState({ dandt: resultsArray });
    //     console.log(this.state.dandt);
    //   });
    // });
  } catch (error) {
    return serverErrorResponse(res, error.message);
  }
};
