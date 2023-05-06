import trashRequest from "../models/trashRequest.js";
import { serverErrorResponse, successResponse } from "../utils/response.js";

export const newtrashRequest = async (req, res) => {
  try {
    let data = {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      dustbinId: req.body.dustbinId,
      status: req.body.status,
      requestType: req.body.requestType,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      userId: req.body.userId,
    };

    const newTrashRequest = new trashRequest(data);

    const newRequest = await newTrashRequest.save();
    console.log(newRequest);
    return res.status(200).json(newRequest);
  } catch (error) {
    return serverErrorResponse(res, error.message);
  }
};
