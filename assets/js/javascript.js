$(document).ready(function() {




    // Initializing
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
    
    var getTravel = function (){
        $("#travel-table> tbody").html("");
        
        database.ref('itinerary').orderByChild("time").on("child_added", function(childSnapshot) {
        
        var travMeth = childSnapshot.val().meth;
            var travComp = childSnapshot.val().comp;
            var travDest = childSnapshot.val().dest;
            var travInit = childSnapshot.val().init;
            var travFreq = childSnapshot.val().freq;
        
        var firstTimeConverted = moment(travInit, "hh:mm").subtract(1, "years");
            var currentTime = moment();
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var tRemainder = diffTime % travFreq;
            var arrival = travFreq - tRemainder;
            var nextArrival = moment().add(arrival, "minutes");
            var nextArrivalFormatted = moment(nextArrival).format('LLL');
            var timeUntil = moment(nextArrivalFormatted).fromNow();
        
        $("#travel-table> tbody").append("<tr><td>" + childSnapshot.val().meth + "</td><td>" + childSnapshot.val().comp + "</td><td>" +
                childSnapshot.val().dest + "</td><td>" + childSnapshot.val().freq + "</td><td>" + nextArrivalFormatted + "</td><td id=fluid'>" + timeUntil + "</td></tr>");

            },
            function(errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });
    };


    //click it, bop it, twist it
    $("#addTravel").on("click", function(event) {
        event.preventDefault();

        // get the stuff, math the stuff
        var method = $("#inputMethod").val();
        var company = $("#inputComp").val().trim();
        var destination = $("#inputDest").val().trim();
        var initial = $("#inputInit").val();
        var frequency = $("#inputFreq").val().trim();

        // hold this for a second
        var newTravel = {
            meth: method,
            comp: company,
            dest: destination,
            init: initial,
            freq: frequency

        };

        // put it in da base
        database.ref('itinerary').push(newTravel);


        // Logs (of LINCOLN)
        // console.log(newTravel.meth);
        // console.log(newTravel.comp);
        // console.log(newTravel.dest);
        // console.log(newTravel.init);
        // console.log(newTravel.freq);
        // console.log(newTravel.next);
        // console.log(newTravel.time);

        // Clear-a-box
        $("#inputComp").val("");
        $("#inputDest").val("");
        $("#inputInit").val("");
        $("#inputFreq").val("");
        getTravel();
    });

    // are you watching?
    database.ref('itinerary').on("child_added", function(childSnapshot, prevChildKey) {



            console.log(childSnapshot.val());

            // get it and put it in da variable
            var travMeth = childSnapshot.val().meth;
            var travComp = childSnapshot.val().comp;
            var travDest = childSnapshot.val().dest;
            var travInit = childSnapshot.val().init;
            var travFreq = childSnapshot.val().freq;




            // SHOW ME WHAT YOU GOT!
            console.log(travMeth);
            console.log(travComp);
            console.log(travDest);
            console.log(travFreq);
            console.log(prevChildKey);
            // console.log(travNext);
            // console.log(travTime);
            
            
            var firstTimeConverted = moment(travInit, "hh:mm").subtract(1, "years");
            var currentTime = moment();
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var tRemainder = diffTime % travFreq;
            var arrival = travFreq - tRemainder;
            var nextArrival = moment().add(arrival, "minutes");
            var nextArrivalFormatted = moment(nextArrival).format('LLL');
            var timeUntil = moment(nextArrivalFormatted).fromNow();
            

            // put the lime in the coconut
            $("#travel-table> tbody").append("<tr><td>" + childSnapshot.val().meth + "</td><td>" + childSnapshot.val().comp + "</td><td>" +
                childSnapshot.val().dest + "</td><td>" + childSnapshot.val().freq + "</td><td>" + nextArrivalFormatted + "</td><td id=fluid'>" + timeUntil + "</td></tr>");
            // Does not compute
        },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

// NAILED IT!

    window.setInterval(function() {
        
        getTravel();

    }, 5000);





}); //DONT DELETE THIS!!!
