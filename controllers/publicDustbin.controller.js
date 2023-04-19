import qr from "qrcode"
let data = {
    "longitude" : "23.2599° N",
    "latitude" : "77.4126° E",
    "id" : 1
};

let stJson = JSON.stringify(data);
// qr.toString(stJson,{type:"terminal"},function(err,code){
//     if(err) return console.log("error");
//     console.log(code);
// })

qr.toDataURL(stJson,function(err,code){
    if(err) return console.log(err);
    console.log(code);
})