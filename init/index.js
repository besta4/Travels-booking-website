const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing = require("../models/listing.js");

const mongourl="mongodb://127.0.0.1:27017/travels";

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongourl);
}

const initdb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initdb();
