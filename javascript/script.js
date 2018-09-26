// Initialize Firebase
var config = {
    apiKey: "AIzaSyDoVQ8C3nC95AApaovGICSCT1Xv0Fc3URI",
    authDomain: "gt-bootcamp-fde51.firebaseapp.com",
    databaseURL: "https://gt-bootcamp-fde51.firebaseio.com",
    projectId: "gt-bootcamp-fde51",
    storageBucket: "gt-bootcamp-fde51.appspot.com",
    messagingSenderId: "633219952698"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainDir = database.ref("/trains");

var trainName = "";
var trainDest = "";
var initDepart = "";
var depFreq;
var nextTime = "";
var minAway;

window.onload = function () {
    $(`button`).on(`click`, function () {
        trainName = $(`#train-name`).val();
        trainDest = $(`#train-destination`).val();
        initDepart = $(`#initial-departure`).val();
        depFreq = $(`#departure-freq`).val();
        nextTime = "";
        // minAway = moment(`hh:mm`).diff(moment(initDepart, `HH:mm`).subtract(1,`years`), `minutes`) % depFreq;

        console.log(trainName);
        console.log(trainDest);
        console.log(initDepart);
        console.log(depFreq);
        console.log(minAway);


        database.ref("/trains").push({
            Train_Name: trainName,
            Train_Destination: trainDest,
            Initial_Departure: initDepart,
            Departure_Frequency: depFreq,
            Next_Arrival: nextTime,
            // Minutes_Away: minAway,
        });
    });
};

database.ref("/trains").on("child_added", function (childSnapshot) {
    $(`tbody`).append(
        `
        <tr>
            <td>${childSnapshot.val().Train_Name}</td>
            <td>${childSnapshot.val().Train_Destination}</td>
            <td>${childSnapshot.val().Departure_Frequency}</td>
            <td>${childSnapshot.val().Next_Arrival}</td>
            // <td>${childSnapshot.val().Minutes_Away}</td>
        </tr>
        `
    );
});