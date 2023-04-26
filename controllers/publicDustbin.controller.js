import qr from "qrcode"
import publicDustbin from "../models/publicDustbin.js"
import { createDustbinRequest } from "../repository/dustin.repository.js";
import {
    serverErrorResponse,
    successResponse,
  } from "../utils/response.js";
export const dustbin = async (req, res) => {
    try {


        let data = {
            "longitude": req.body.longitude,
            "latitude": req.body.latitude,
            "id": 1
        };

        let stJson = JSON.stringify(data);
        let imgCode = "";
        qr.toDataURL(stJson, async function (err, code) {
            if (err) return console.log(err);
            // console.log(code);
            const newDustbin = new publicDustbin({
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                id: req.body.id,
                imgURL: code
            });
            await newDustbin.save();
        })

        return res.status(200).json({message:"ho gaya create tera bhai"});
    } catch (error) {
        return res.send(error)
    }
};
export const generatePickupRequest = async (req, res) => {
    try {


        let data = {
            "longitude": req.body.longitude,
            "latitude": req.body.latitude,
            "id": 1,
            "dustbinStatus":req.body.dustbinStatus
        };

        let [err, newRequestGenerated] = await createDustbinRequest(req.body);
        if (err) {
            console.log(`Error in create user route: ${err.message}`);
            return serverErrorResponse(res, err.message);
          }
          console.log(newRequestGenerated);
          return successResponse(res, newRequestGenerated, "Request created successfully");
    } catch (error) {
        // return res.send(error)
        return serverErrorResponse(res, error.message);
    }
};


