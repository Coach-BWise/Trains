// Initialize Firebase
//----------------------------------------------------------------
var config = {
    apiKey: "AIzaSyCUa3OmzBQAV9MHxQg6Pgl2s5533V5qjEI",
    authDomain: "coder-bay-fee9d.firebaseapp.com",
    databaseURL: "https://coder-bay-fee9d.firebaseio.com",
    storageBucket: "coder-bay-fee9d.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
//----------------------------------------------------------------

$(document).ready(function() {

    $('#submit').on('click', function(e){
        e.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var initialTime = $("#initialTime").val().trim();
        var frequency = parseInt($("#frequency").val().trim());

        // First Time (pushed back 1 year to make sure it comes before current time)
        var initialTimeConverted = moment(initialTime, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // current time - initial time
        var diffTime = moment().diff(moment(initialTimeConverted), "minutes");

        // Time apart (remainder)
        var remainder = diffTime % frequency;

        // Minutes Until Next Train
        var minutesTillTrain = frequency - remainder;

        // Next Train
        var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");

        var trainRow = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency+ "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>";
        $('#schedule').append(trainRow);
    })
})

