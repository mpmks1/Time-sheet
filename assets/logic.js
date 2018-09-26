/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)        


//   Initialize Firebase
var config = {
    apiKey: "AIzaSyDXz6bZaEBrVbrUqVBFDIcGL4f0wohGDC4",
    authDomain: "new-projet-c88a3.firebaseapp.com",
    databaseURL: "https://new-projet-c88a3.firebaseio.com",
    projectId: "new-projet-c88a3",
    storageBucket: "new-projet-c88a3.appspot.com",
    messagingSenderId: "870575462007"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();
    var dateAdded = firebase.database.ServerValue.TIMESTAMP
    var name = $("#employeename").val().trim();
    var role = $("#role").val().trim();
    var start = $("#startdate").val().trim();
    var monthly = $("#monthlyrate").val().trim();
    // monstermath - find date, figure out months worked, create result for total billed

    $("#newEmployee").append("<tr><td>" + name + "</td><td>" + role + "</td><td>" + start + "</td><td>" + monthly + "</td></tr>");
    // clear forms 
    $(".form-control").val("");

    database.ref().push({
        name: name,
        role: role,
        start: start,
        monthly: monthly,
        dateAdded: dateAdded
    });

    // // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot);
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().role);
        console.log(childSnapshot.val().start);
        console.log(childSnapshot.val().monthly);


        $("#newEmployee").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().role + "</td><td>" + childSnapshot.val().start + "</td><td>" + childSnapshot.val().monthly + "</td></tr>")
        // console.log(role);
    });



});

$(document).ready(function() {
    // var d = new Date();
    // var n = d.getTime();
moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
// date ordinal 
// date D



    // - changes HTML - in case you get more than one update 
    database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {
        // Change the HTML to reflect
        $("#employeename").text(childSnapshot.val().name);
        $("#role").text(childSnapshot.val().role);
        $("#startdate").text(childSnapshot.val().start);
        $("#monthlyrate").text(childSnapshot.val().monthly);

        $("#newEmployee").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().role + "</td><td>" + childSnapshot.val().start + "</td><td>" + childSnapshot.val().monthly + "</td></tr>")

    });
});