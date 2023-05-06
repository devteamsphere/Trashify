import trashRequest from "../models/trashRequest.js";
import User from "../models/User.js"
export const acceptedRequest = async (req, res) => {
    try {
        console.log(req.params.id);
        const update = await trashRequest.findOneAndUpdate({_id: req.params.id}, {
            status : "accepted",
        });
        console.log(update);
        const trashRequestUserId = update.userId;
        console.log(trashRequestUserId);
        const updateUserAndCredit = await User.findOneAndUpdate({ _id: trashRequestUserId }, {
            $inc: {
                credits: 10
            }
        })
        console.log(updateUserAndCredit)
        return res.status(200).json(update);
    } catch (error) {
        return res.send(error);
    }

};




