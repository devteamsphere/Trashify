import User from "../models/User.js";
import passwordGenerator from "generate-password"
import {
  serverErrorResponse,
  successResponse,
} from "../utils/response.js";


export const updateUser = async (req,res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        return res.status(200).json(updateUser);
      } catch (error) {
        return res.status(404).send("error");

      }
}
export const deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted sucsessully");
      }  catch (error) {
        return res.status(404).send("error");

      }
}
export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
      } catch (error) {
        return res.status(404).send("error hai");

    }
}
export const getUsers = async (req,res)=>{
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).send("error");
    }
}
export const createDriver = async (req, res) => {
  try {


      let data = {
          "firstName": req.body.longitude,
          "lastName": req.body.latitude,
          "email": req.body.email,
          "contactNo": req.body.contactNo,
          "aadhaarCardNo": req.body.aadhaarCardNo,
          "userType": req.body.userType,
          "longitude": req.body.longitude,
          "latitude": req.body.latitude,
          "address" : req.body.address,
          "profileImg" : req.body.profileImg,
          "password" :  passwordGenerator.generate({
            length: 6,
            numbers: true
          })

      };

      const newDriverDetail = new User(data);

      const newDriver = await newDriverDetail.save();
      return res.status(200).json(newDriver);
  } catch (error) {
      return serverErrorResponse(res, error.message);
  }

};
