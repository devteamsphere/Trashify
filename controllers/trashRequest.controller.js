import trashRequest from "../models/trashRequest.js";

export const newtrashRequest = async (req, res) => {
    try {


        let data = {
            "longitude": req.body.longitude,
            "latitude": req.body.latitude,
            "dustbinId": req.body.dustbinId,
            "status": req.body.status,
            "requestType": req.body.requestType,
            "description": req.body.description,
            "imgUrl": req.body.imgUrl,
            "userId": req.body.userId

        };

        const newTrashRequest = new trashRequest(data);

        const newRequest = await newTrashRequest.save();
        res.status(200).json(newRequest);
    } catch (err) {
        return serverErrorResponse(res, error.message);
    }

};



