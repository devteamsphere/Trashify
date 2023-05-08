import trashRequest from "../models/trashRequest.js";
import User from "../models/User.js";
import { successResponse } from "../utils/response.js";

export const acceptedRequest = async (req, res) => {
  try {
    console.log(req.params.id);
    const update = await trashRequest.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "accepted",
      },
      { new: true }
    );

    return res.status(200).json(update);
  } catch (error) {
    return res.send(error);
  }
};

export const completedRequest = async (req, res) => {
  try {
    console.log(req.params.id);
    const update = await trashRequest.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "completed",
      },
      { new: true }
    );
    console.log(update);
    const trashRequestUserId = update.userId;
    const driverId = update.driverId;
    console.log(trashRequestUserId);
    const updateUserAndCredit = await User.findOneAndUpdate(
      { _id: trashRequestUserId },
      {
        $inc: {
          credits: 10,
        },
      }
    );

    const checkDriver = await trashRequest.aggregate([
      {
        $match: {
          driverId: driverId,
          $or: [{ status: "accepted" }, { status: "allocated" }],
        },
      },
    ]);

    if (checkDriver.length == 0) {
      const updateDriver = await User.findOneAndUpdate(
        { _id: driverId },
        { driverStatus: "available" }
      );
      return successResponse(res, updateDriver, "Driver is available now..");
    }

    console.log(updateUserAndCredit);
    return successResponse(res, update, "Driver updated successfully..");
  } catch (error) {
    return res.send(error);
  }
};
