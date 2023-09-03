const admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
var serviceAccount = require("./serviceAccountKey.json");
const { model } = require("mongoose");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports=admin;