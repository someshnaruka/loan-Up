//jshint esversion:6
require("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const cors=require('cors');
const mongoose=require("mongoose");
const MongoStore = require('connect-mongo');
const jwt=require("jsonwebtoken");
const app=express();
const passport=require("passport");
const session=require("express-session");
const findOrCreate=require("mongoose-findorcreate");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
app.use(cors({
    origin:process.env.FRONTEND,
    credentials: true,
}));
app.use(express.json());

const PORT=process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.set("trust proxy", 1);
app.use(
    session({
      name:"google",
      secret: process.env.KEY,
      resave: false,
      saveUninitialized: false, //to inplemnt login sessions,reduce storage size
      store: MongoStore.create({mongoUrl: process.env.MONGODB_URL,
      collectionName:"sessions",
      ttl: 1 * 24 * 60 * 60,
      autoRemove: 'native'}),
      cookie: { maxAge: 24 * 60 * 60 * 1000,
         },
    })
  );
app.use(passport.initialize());
app.use(passport.session());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  
}
const UserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:{
        type:String,
        unique:[true,"Email already Exists"],
    },
    profilePic:String,
    googleId: String,
  });

  
  UserSchema.plugin(findOrCreate);
  const User=mongoose.model("User",UserSchema);

  const RecordSchema=new mongoose.Schema({
    creator:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:"User",
    },
    recordId:Number,
    company_Name:String,
    estdyear:String,
    provider:String,
    loanAmount:Number,
    sheet:Array,

  
  });

  const Record=mongoose.model("Record",RecordSchema);
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ClIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.REACT_APP_SERVER_DOMAIN}/auth/google/callback`,
    scope:["profile","email"]
  },
  async function(accessToken, refreshToken, profile, cb) {
    await User.findOrCreate({ googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        username: profile.emails[0].value,
        profilePic: profile.photos[0].value, },function (err, user) {
          return cb(err, user);
        })
  }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user.id);
    });
  });
  
  passport.deserializeUser(function (id, cb) {
    User.findById(id)
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  });
  
app.get("/",(req,res)=>{
res.send("Server running ")
})
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect:process.env.FRONTEND,
      successRedirect: process.env.FRONTEND,
      failureMessage: "Error loging in try again",
    })
  );
app.get("/auth/user",(req,res)=>{
    console.log(req.user);
    if(req.user)
    {
        console.log(req.user);
        res.send({message:"logged in",result:req.user,alert:true})
    }
})

  app.get("/logout", function (req, res) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
        res.send({message:"Loged Out successfully ", alert:true})
        
     
    });
   
  });


  app.post("/loanRecord",(req,res)=>{
console.log(req.body);

const result={
  creator:req.body.id,
  recordId:req.body.recordId,
  company_Name:req.body.name,
  estdyear:req.body.estdyear,
  provider:req.body.provider,
  loanAmount:req.body.loanAmount,
  sheet:req.body.record,
}

const newData= new Record(result);
 newData.save().then(()=>{
  Record.findOne({recordId:req.body.recordId})
.then((data)=>{
  console.log(data,"SingleBalance");
  res.send({result:data,message:"Balance Sheet Created",alert:true})
}) }).catch((err)=>{
  console.log(err);
 })

  });

  app.get("/applications",(req,res)=>{
    console.log(req.user);
      Record.find({}).populate("creator").then((data)=>{
        res.send({result:data,alert:true})
      }).catch((err)=>{
        console.log(err);
      })
   
    
  });

  app.post("/decision",(req,res)=>{
    console.log(req.body,"decsion value");
    const {sheet}=req.body;
    console.log(sheet,"sheet");
    const totalProfit=sheet.reduce((acc,obj)=>{
      return acc+Number(obj.profitOrLoss);
  },0);
  const totalAssest=Math.floor((sheet.reduce((acc,obj)=>{
      return acc+Number(obj.assetsValue);
  },0))/12);
  console.log(totalAssest,"assest");
console.log(totalProfit,"profit")

const decsion={
  name:req.body.company_Name,
  estdyear:req.body.estdyear,
  AnnualProfit:totalProfit,
  loanAmount:req.body.loanAmount
}
if(totalAssest>req.body.loanAmount)
{
  res.send({result:{...decsion,preAssessment:100},alert:true});
}
else if (totalProfit>0){
  res.send({result:{...decsion,preAssessment:60},alert:true});
}
else{
  res.send({result:{...decsion,preAssessment:20},alert:true});
}
}
  )
app.listen(PORT,()=>{
    console.log("Server running on port 8080");
})