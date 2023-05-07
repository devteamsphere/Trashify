import trashRequest from "../models/trashRequest.js";
import User from "../models/User.js"


export const acceptedRequest = async (req, res) => {
    try {
        console.log(req.params.id);
        const update = await trashRequest.findOneAndUpdate({_id: req.params.id}, {
            status : "accepted",
            
        },{new : true});
        
        return res.status(200).json(update);
    } catch (error) {
        return res.send(error);
    }

};


export const completedRequest = async (req, res) => {
    try {
        console.log(req.params.id);
        const update = await trashRequest.findOneAndUpdate({_id: req.params.id}, {
            status : "completed",
        },{new : true});
        console.log(update);
        const trashRequestUserId = update.userId;
        console.log(trashRequestUserId);
        const updateUserAndCredit = await User.findOneAndUpdate({ _id: trashRequestUserId }, {
            $inc: {
                credits: 10
            }
        })

        // const checckDriver = await trash





        console.log(updateUserAndCredit)
        return res.status(200).json(update);
    } catch (error) {
        return res.send(error);
    }

};




