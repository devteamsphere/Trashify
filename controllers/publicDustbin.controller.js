import qr from "qrcode"
import publicDustbin from "../models/publicDustbin.js"

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

