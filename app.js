const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");

const mongourl="mongodb://127.0.0.1:27017/travels";

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongourl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error)
        {
            let errmsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400, errmsg);
        }
    else{
        next();
    }
}

// app.set("view engine", "ejs"): Sets EJS as the view engine for rendering templates.
// app.set("views", path.join(__dirname, "views")): Configures the directory where EJS templates are stored.
// app.use(express.urlencoded({ extended: true })): Parses URL-encoded form data.
// app.use(methodOverride("_method")): Supports method overriding for HTTP methods like PUT and DELETE.
// app.engine('ejs', ejsMate): Uses ejsMate as the EJS engine to enable additional features.
// app.use(express.static(path.join(__dirname, "/public"))): Serves static files from the public directory.

// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1200,
//         location:"calangute,Goa",
//         country:"india",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sucessfull");
// });
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

app.get("/listings/new",async(req,res)=>{//placing this get request over below get request to check first this then after another
    res.render("listings/new.ejs");
})

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

app.post("/listings",
    validateListing, 
    wrapAsync(async (req, res,next) => {
        // if(!req.body.Listing){
        //     throw new ExpressError(404,"send valid data");
        // } 
        //let result=listingSchema.validate(req.body);
        //console.log(result);
        //if(result.error)
        //{
        //    throw new ExpressError(400,result.error);
        //}
        // if(!newListing.title){
        //     throw new ExpressError(0,)
        // }
        // if(!newListing.description){
        //     throw new ExpressError(0,)
        // }
        // if(!newListing.location){
        //     throw new ExpressError(0,)
        // }
        const newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
        })
);

app.get("/listings/:id/edit",async (req,res) => {
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

app.put("/listings/:id",validateListing,async(req,res) => {
    let {id}=req.params;
     await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
});

app.get("/",(req, res)=>{
    res.send("i am root");
})

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    //res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("server is listining");
});