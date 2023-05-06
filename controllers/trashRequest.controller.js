import trashRequest from "../models/trashRequest.js";
import { serverErrorResponse, successResponse } from "../utils/response.js";

export const newtrashRequest = async (req, res) => {
  try {


   const findRequest = await trashRequest.findOne({dustbinId : req.body.dustbinId});
    if(findRequest){
        return res.status(400).json({message : "Request Already Exist"});
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
      address:req.body.address
    };

    const newTrashRequest = new trashRequest(data);

    const newRequest = await newTrashRequest.save();
    console.log(newRequest);
    return successResponse(res, newRequest, "Trash request created successfully..")
  } catch (error) {
    return serverErrorResponse(res, error.message);
  }
};
