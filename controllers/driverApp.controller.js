import trashRequest from "../models/trashRequest.js";
export const acceptedRequest = async (req, res) => {
    try {
        console.log(req.params.id);
        const update = await trashRequest.findOneAndUpdate({_id: req.params.id}, {
            status : "accepted",
        });
        console.log(update);
        return res.status(200).json(update);
    } catch (error) {
        return res.send(error);
    }

};


