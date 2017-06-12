$(document).ready(function() {




    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCKLnx1F9v_sdLGCD-XV3-J64PfXxXpcQA",
        authDomain: "test-project-d8925.firebaseapp.com",
        databaseURL: "https://test-project-d8925.firebaseio.com",
        projectId: "test-project-d8925",
        storageBucket: "test-project-d8925.appspot.com",
        messagingSenderId: "160520408135"
    };
    firebase.initializeApp(config);

    var database = firebase.database();



    $("#addTravel").on("click", function(event) {
        event.preventDefault();

        // Grabs user input
        var method = $("#inputMethod").val();
        var company = $("#inputComp").val().trim();
        var destination = $("#inputDest").val().trim();
        var initial = $("#inputInit").val();
        var frequency = $("#inputFreq").val().trim();
        var firstTimeConverted = moment(initial, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var arrival = frequency - tRemainder;
        var nextArrival = moment().add(arrival, "minutes");
        var nextArrivalFormatted = moment(nextArrival).format('LLL');
        var timeUntil = moment(nextArrivalFormatted).fromNow();

        // Creates local "temporary" object for holding employee data
        var newTravel = {
            meth: method,
            comp: company,
            dest: destination,
            init: initial,
            freq: frequency,
            next: nextArrivalFormatted,
            time: timeUntil
        };

         // Get a key for a new Post.
        var newPostKey = database.ref().child('itinerary').push().key;

        // Uploads employee data to the database
        var updates = {};
  updates['/itinerary/' + newPostKey] = newTravel;

  return firebase.database().ref().update(updates);


        // Logs everything to console
        console.log(newTravel.meth);
        console.log(newTravel.comp);
        console.log(newTravel.dest);
        console.log(newTravel.init);
        console.log(newTravel.freq);
        console.log(newTravel.next);
        console.log(newTravel.time);



        // Alert
        alert("Itinerary successfully added");

        // Clears all of the text-boxes
        $("#inputComp").val("");
        $("#inputDest").val("");
        $("#inputInit").val("");
        $("#inputFreq").val("");
  });  

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref('itinerary').on("child_added", function(childSnapshot, prevChildKey) {



            console.log(childSnapshot.val());

            // Store everything into a variable.
            var travMeth = childSnapshot.val().meth;
            var travComp = childSnapshot.val().comp;
            var travDest = childSnapshot.val().dest;
            var travFreq = childSnapshot.val().freq;
            var travNext = childSnapshot.val().next;
            var travTime = childSnapshot.val().time;
            



            // Employee Info
            console.log(travMeth);
            console.log(travComp);
            console.log(travDest);
            console.log(travFreq);
            console.log(travNext);
            console.log(travTime);

            // full list of items to the well
            $("#travel-table> tbody").append("<tr><td>" + childSnapshot.val().meth + "</td><td>" + childSnapshot.val().comp + "</td><td>" +
                childSnapshot.val().dest + "</td><td>" + childSnapshot.val().freq + "</td><td>" + childSnapshot.val().next + "</td><td id=fluid'>" + childSnapshot.val().time + "</td></tr>");
            // Handle the errors
        },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });



window.setInterval(function(){
    database.ref('itinerary').on("child_added", function(childSnapshot, prevChildKey) {



            console.log(childSnapshot.val());

            // Store everything into a variable.
            var travMeth = childSnapshot.val().meth;
            var travComp = childSnapshot.val().comp;
            var travDest = childSnapshot.val().dest;
            var travFreq = childSnapshot.val().freq;
            var travNext = childSnapshot.val().next;
            var travTime = childSnapshot.val().time;
            



           
            

        var initial = $(childSnapshot.val().init).val();
        var frequency = $(childSnapshot.val().freq);
        var firstTimeConverted = moment(initial, "hh:mm");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var arrival = frequency - tRemainder;
        var nextArrival = moment().add(arrival, "minutes");
        var nextArrivalFormatted = moment(nextArrival).format('LLL');
        var timeUntil = moment(nextArrivalFormatted).fromNow();

            console.log(travMeth);
            console.log(travComp);
            console.log(travDest);
            console.log(travFreq);
            console.log(travNext);
            console.log(nextArrivalFormatted);
            console.log(travTime);
            console.log(timeUntil);

        },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });



}, 5000);

    

}); //DONT DELETE THIS!!!



