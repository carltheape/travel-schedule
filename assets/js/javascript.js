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


    //click it, bop it, twist it
    $("#addTravel").on("click", function(event) {
        event.preventDefault();

        // get the stuff, math the stuff
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

        // hold this for a second
        var newTravel = {
            meth: method,
            comp: company,
            dest: destination,
            init: initial,
            freq: frequency,
            next: nextArrivalFormatted,
            time: timeUntil
        };

        // put it in da base
        database.ref('itinerary').push(newTravel);


        // Logs (of LINCOLN)
        console.log(newTravel.meth);
        console.log(newTravel.comp);
        console.log(newTravel.dest);
        console.log(newTravel.init);
        console.log(newTravel.freq);
        console.log(newTravel.next);
        console.log(newTravel.time);



        // OMG!!
        alert("Itinerary successfully added");

        // Clear-a-box
        $("#inputComp").val("");
        $("#inputDest").val("");
        $("#inputInit").val("");
        $("#inputFreq").val("");
    });

    // are you watching?
    database.ref('itinerary').on("child_added", function(childSnapshot, prevChildKey) {



            console.log(childSnapshot.val());

            // get it and put it in da variable
            var travMeth = childSnapshot.val().meth;
            var travComp = childSnapshot.val().comp;
            var travDest = childSnapshot.val().dest;
            var travFreq = childSnapshot.val().freq;
            var travNext = childSnapshot.val().next;
            var travTime = childSnapshot.val().time;
            var travInit = childSnapshot.val().init;




            // SHOW ME WHAT YOU GOT!
            console.log(travMeth);
            console.log(travComp);
            console.log(travDest);
            console.log(travFreq);
            console.log(travNext);
            console.log(travTime);

            // put the lime in the coconut
            $("#travel-table> tbody").append("<tr><td>" + childSnapshot.val().meth + "</td><td>" + childSnapshot.val().comp + "</td><td>" +
                childSnapshot.val().dest + "</td><td>" + childSnapshot.val().freq + "</td><td>" + childSnapshot.val().next + "</td><td id=fluid'>" + childSnapshot.val().time + "</td></tr>");
            // Does not compute
        },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    //sweet Jesus I spent way too much time trying to get the update working...

    //If you are able to show me the correct code in you comments of my project I would really appreciate it!!!

    // window.setInterval(function() {
    //     database.ref('itinerary').orderByChild("time").on("child_added", function(childSnapshot) {



    //             console.log(childSnapshot.val());

    //             // Store everything into a variable.
    //             var travMeth = childSnapshot.val().meth;
    //             var travComp = childSnapshot.val().comp;
    //             var travDest = childSnapshot.val().dest;
    //             var travFreq = childSnapshot.val().freq;
    //             var travNext = childSnapshot.val().next;
    //             var travTime = childSnapshot.val().time;







    //             var initial = $(childSnapshot.val().init);
    //             var frequency = $(childSnapshot.val().freq);
    //             var firstTimeConverted = moment(initial, "hh:mm");
    //             var currentTime = moment();
    //             var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //             var tRemainder = diffTime % frequency;
    //             var arrival = frequency - tRemainder;
    //             var nextArrival = moment().add(arrival, "minutes");
    //             var nextArrivalFormatted = moment(nextArrival).format('LLL');
    //             var timeUntil = moment(childSnapshot.val().next).fromNow();
    //             console.log(childSnapshot.key);
    //             console.log(travMeth);
    //             console.log(travComp);
    //             console.log(travDest);
    //             console.log(travFreq);
    //             console.log(travNext);
    //             console.log(travTime);
    //             console.log(timeUntil);
    //             var newTravel = {
    //         meth: travMeth,
    //         comp: travComp,
    //         dest: travDest,
    //         init: initial,
    //         freq: frequency,
    //         next: nextArrivalFormatted,
    //         time: timeUntil
    //     };

    //     var playersRef = firebase.database().ref("itinerary/" + childSnapshot.key);
    //     playersRef.set({
    //         meth: travMeth,
    //         comp: travComp,
    //         dest: travDest,
    //         init: initial,
    //         freq: frequency,
    //         next: nextArrivalFormatted,
    //         time: timeUntil
    //         });



    //         },
    //         function(errorObject) {
    //             console.log("Errors handled: " + errorObject.code);
    //         });



    // }, 5000);





}); //DONT DELETE THIS!!!
