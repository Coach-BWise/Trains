// Initialize Firebase
// not sure how to hide this from git and still have it work when deployed (would love a tutorial)
//----------------------------------------------------------------
var config = {
    apiKey: "AIzaSyDiXGX0sG4j9x4T3TvsWjTVNhvLma4rD0U",
    authDomain: "trains-62036.firebaseapp.com",
    databaseURL: "https://trains-62036.firebaseio.com",
    projectId: "trains-62036",
    storageBucket: "trains-62036.appspot.com",
    messagingSenderId: "270238660377",
    appId: "1:270238660377:web:39d898f1dbfac9ed01f788"
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
    
        database.ref().push({
            trainName: trainName,
            destination: destination,
            initialTime: initialTime,
            frequency: frequency,
            nextTrain: nextTrain,
            minutesTillTrain: minutesTillTrain
        });
        
    })

    database.ref().on("child_added", function(snapshot) {
       
        var trainRow = "<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency+ "</td><td>" + snapshot.val().nextTrain + "</td><td>" + snapshot.val().minutesTillTrain + "</td></tr>";
        $('#schedule').append(trainRow);
        
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
})

