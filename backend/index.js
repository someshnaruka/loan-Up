//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const app = express();
const passport = require("passport");
const session = require("express-session");
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { getAuth } = require("firebase-admin/auth");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
const { initializeApp } = require("firebase-admin/app");
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
// app.set("trust proxy", 1);
// app.use(
//     session({
//       name:"google",
//       secret: process.env.KEY,
//       resave: false,
//       saveUninitialized: false, //to inplemnt login sessions,reduce storage size
//       store: MongoStore.create({mongoUrl: process.env.MONGODB_URL,
//       collectionName:"sessions",
//       ttl: 1 * 24 * 60 * 60,
//       autoRemove: 'native'}),
//       cookie: { maxAge: 24 * 60 * 60 * 1000,
//          },
//     })
//   );
// app.use(passport.initialize());
// app.use(passport.session());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: [true, "Email already Exists"],
    },
    profilePic: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    auth_time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(findOrCreate);
const User = mongoose.model("User", UserSchema);

const RecordSchema = new mongoose.Schema({
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  recordId: Number,
  company_Name: String,
  estdyear: String,
  provider: String,
  loanAmount: Number,
  sheet: Array,
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const Record = mongoose.model("Record", RecordSchema);
//   passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_ClIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: `${process.env.REACT_APP_SERVER_DOMAIN}/auth/google/callback`,
//     scope:["profile","email"]
//   },
//   async function(accessToken, refreshToken, profile, cb) {
//     await User.findOrCreate({ googleId: profile.id,
//         firstName: profile.name.givenName,
//         lastName: profile.name.familyName,
//         username: profile.emails[0].value,
//         profilePic: profile.photos[0].value, },function (err, user) {
//           return cb(err, user);
//         })
//   }
// ));

// passport.serializeUser(function (user, cb) {
//     process.nextTick(function () {
//       return cb(null, user.id);
//     });
//   });

//   passport.deserializeUser(function (id, cb) {
//     User.findById(id)
//       .then((user) => {
//         return cb(null, user);
//       })
//       .catch((err) => {
//         return cb(err);
//       });
//   });

app.get("/", (req, res) => {
  res.send("Server running ");
});
// app.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect:process.env.FRONTEND,
//     successRedirect: process.env.FRONTEND,
//     failureMessage: "Error loging in try again",
//   })
// );

const authToken = (req, res, next) => {
  const admin = require("firebase-admin");
  const serviceAccount = require("./config/serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  next();
};

app.post("/login", async (req, res) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res.send({ status: 500, message: "invalid token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log(token, "token value");
  try {
    const decodevalue = await admin.auth().verifyIdToken(token);
    console.log(decodevalue);

    function updateUser(decodevalue, req, res) {
      const filter = { googleId: decodevalue.user_id };
      const update = { auth_time: decodevalue.auth_time };
      User.findOneAndUpdate(filter, update)
        .then((data) => {
          res.send({
            message: "Logged In Succesfully",
            result: data,
            alert: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }


    if (!decodevalue) {
      res.send({ alert: false, message: "un Authorized User" });
    }
    const userData = await User.findOne({ googleId: decodevalue.user_id });
    console.log(userData);
    if (!userData) {
      const newuser = new User({
        name: decodevalue.name,
        username: decodevalue.email,
        profilePic: decodevalue.picture,
        googleId: decodevalue.user_id,
        email_verified: decodevalue.email_verified,
        auth_time: decodevalue.auth_time,
      });
      newuser
        .save()
        .then((data) => {
          res.send({
            message: "Signed In Succesfully",
            result: data,
            alert: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateUser(decodevalue, req, res);
    }
  } catch {
    
    res.send({ alert: false, message: "token expired" });
  }
});


app.get("/auth/user", async(req, res) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res.send({ status: 500, message: "invalid token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log(token, "token value");
  try {
    const decodevalue = await admin.auth().verifyIdToken(token);
    console.log(decodevalue);

    if (!decodevalue) {
      res.send({ alert: false, message: "un Authorized User" });
    }
    const userData =User.findOne({ googleId: decodevalue.user_id }).then((data)=>{
      if(!data)
      {
        res.send({ alert: false, message: "No user found" });
      }
      else
      {
        res.send({ alert: true, result:data });
      }
    });
    
  } catch {
    res.send({ alert: false, message: "token expired" });
  }
});


app.post("/loanRecord", (req, res) => {
  console.log(req.body);

  const result = {
    creator: req.body.id,
    recordId: req.body.recordId,
    company_Name: req.body.name,
    estdyear: req.body.estdyear,
    provider: req.body.provider,
    loanAmount: req.body.loanAmount,
    sheet: req.body.record,
  };

  const newData = new Record(result);
  newData
    .save()
    .then(() => {
      Record.findOne({ recordId: req.body.recordId }).then((data) => {
        console.log(data, "SingleBalance");
        res.send({
          result: data,
          message: "Balance Sheet Created",
          alert: true,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/applications", (req, res) => {
  Record.find({})
    .populate("creator")
    .then((data) => {
      res.send({ result: data, alert: true });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/decision", (req, res) => {
  console.log(req.body, "decsion value");
  const { sheet } = req.body;
  console.log(sheet, "sheet");
  const totalProfit = sheet.reduce((acc, obj) => {
    return acc + Number(obj.profitOrLoss);
  }, 0);
  const totalAssest = Math.floor(
    sheet.reduce((acc, obj) => {
      return acc + Number(obj.assetsValue);
    }, 0) / 12
  );
  console.log(totalAssest, "assest");
  console.log(totalProfit, "profit");

  const decsion = {
    name: req.body.company_Name,
    estdyear: req.body.estdyear,
    AnnualProfit: totalProfit,
    loanAmount: req.body.loanAmount,
  };
  if (totalAssest > req.body.loanAmount) {
    res.send({ result: { ...decsion, preAssessment: 100 }, alert: true });
  } else if (totalProfit > 0) {
    res.send({ result: { ...decsion, preAssessment: 60 }, alert: true });
  } else {
    res.send({ result: { ...decsion, preAssessment: 20 }, alert: true });
  }
});
app.listen(PORT, () => {
  console.log("Server running on port 8080");
});
