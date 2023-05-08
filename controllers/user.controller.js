import User from "../models/User.js";
import passwordGenerator from "generate-password";
import { serverErrorResponse, successResponse } from "../utils/response.js";
import trashRequest from "../models/trashRequest.js";

export const updateUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    console.log(updateUser);
    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    return res.status(404).send("error");
  }
};
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User deleted sucsessully");
  } catch (error) {
    return res.status(404).send("error");
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).send("error hai");
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).send("error");
  }
};
export const createDriver = async (req, res) => {
  try {
    let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNo: req.body.contactNo,
      aadhaarCardNo: req.body.aadhaarCardNo,
      userType: "driver",

      address: req.body.address,
      profileImg: req.body.profileImg,
      password: passwordGenerator.generate({
        length: 6,
        numbers: true,
      }),
    };

    const newDriverDetail = new User(data);

    const newDriver = await newDriverDetail.save();
    console.log(newDriver);
    return res.status(200).json(newDriver);
  } catch (error) {
    return serverErrorResponse(res, error.message);
  }
};
export const updateUsercredits = async (req, res) => {
  try {
    console.log(req.query);
    const {userId,amount} = req.query;
    const amt = parseInt(amount);
    console.log(userId)
    console.log(amount)
    const updateUsercredit = await User.findById(userId);
    console.log(updateUsercredit)
    if (updateUsercredit.credits < amt) {
      return serverErrorResponse(res,"amt less");
    }
    const updatedCredits = await User.findOneAndUpdate({ _id: updateUsercredit.id },
      {
        $inc: {
          credits: -amt,
        },
      })
    return successResponse(res,updatedCredits,"Amount deducted");
  } catch (error) {
    return res.send(error);
  }

};


const dashboardInfo = async (req, res) => {
  try {
    const users = await User.find({ userType: "driver" });

    const pending = await trashRequest.aggregate([
      {
        $match: {
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "publicdustbins",
          localField: "dustbinId",
          foreignField: "_id",
          as: "dustbin",
        },
      },
      

    ]);
    const accepted = await trashRequest.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $lookup: {
          from: "publicdustbins",
          localField: "dustbinId",
          foreignField: "_id",
          as: "dustbin",
        },
      },
    ]);


  } catch (error) {
    return serverErrorResponse(res, error.message);
  }
};
