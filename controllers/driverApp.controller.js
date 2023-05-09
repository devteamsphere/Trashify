import trashRequest from "../models/trashRequest.js";
import User from "../models/User.js";
import { serverErrorResponse, successResponse } from "../utils/response.js";

export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await User.find({ userType: "driver" });
        console.log(drivers);
        return successResponse(res, drivers, "Drivers fetched successfully..");
    } catch (error) {
        return serverErrorResponse(res, error.message);
    }
};


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
        const updatedriverCredits = await User.findOneAndUpdate(
            { _id: driverId },
            {
                $inc: {
                    credits: 40,
                }
            }
        )

        const checkDriver = await trashRequest.aggregate([
            {
                $match: {
                    driverId: driverId,
                    $or: [{ status: "accepted" }, { status: "allocated" }],
                },
            },
        ]);

        if (checkDriver.length == 0) {
            console.log("heel0..");
            const updateDriver = await User.findOneAndUpdate(
                { _id: driverId },
                { driverStatus: "available" },
                {
                    new: true,
                }
            );
            return successResponse(res, updateDriver, "Driver is available now..");
        }

        console.log(updateUserAndCredit);
        console.log(updatedriverCredits)
        return successResponse(res, update, "Driver updated successfully..");
    } catch (error) {
        return res.send(error);
    }
};

console.log("bhai push ho ja")