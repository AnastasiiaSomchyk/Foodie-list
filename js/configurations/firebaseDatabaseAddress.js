"use strict";
const firebase = require("firebase");



 const FIREBASE_CONFIGURATION = {
    apiKey: "AIzaSyBRncYp9k2CF3W5e9YiY3X19J242uCnOR0",
    authDomain: "foodie-list.firebaseapp.com",
    databaseURL: "https://foodie-list.firebaseio.com",
    projectId: "foodie-list",
    storageBucket: "foodie-list.appspot.com",
    messagingSenderId: "559918514425"
  };
  
  const firebaseDatabase = firebase.initializeApp(FIREBASE_CONFIGURATION);

  module.exports = {
      firebaseDatabase:firebaseDatabase
  };

