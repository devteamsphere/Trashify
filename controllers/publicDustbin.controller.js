import qr from "qrcode";
import publicDustbin from "../models/publicDustbin.js";
import { serverErrorResponse, successResponse } from "../utils/response.js";
export const dustbin = async (req, res) => {
  try {
    let data = {
      longitude: req.body.longitude,
      latitude: req.body.latitude,

      address: req.body.address,
    };

    let stJson = JSON.stringify(data);
    let imgCode = "";
    qr.toDataURL(stJson, async function (err, code) {
      if (err) return console.log(err);
      // console.log(code);
      const newDustbin = new publicDustbin({
        longitude: req.body.longitude,
        latitude: req.body.latitude,

        imgURL: code,
        address: req.body.address,
      });
      await newDustbin.save();
    });

    return res.status(200).json({ message: "Dustbin Created Successfully" });
  } catch (error) {
    return res.send(error);
  }
};

export const getDustbin = async (req, res) => {
  try {
    let response = await publicDustbin.find({});
    
    return res.status(200).json({ data: response });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
