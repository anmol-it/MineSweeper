let getTable = document.querySelector("#highScore"),
    tableString = "<tr><th>Name</th><th>Score</th>";
var firebaseConfig = {
    apiKey: "AIzaSyDjZ_O-RKdF6jmTWOJp3aoxDeTmZn8ud80",
    authDomain: "mine-sweeper-dadf6.firebaseapp.com",
    databaseURL: "https://mine-sweeper-dadf6.firebaseio.com",
    projectId: "mine-sweeper-dadf6",
    storageBucket: "",
    messagingSenderId: "263603291618",
    appId: "1:263603291618:web:85e6f2d23be97202"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



database = firebase.database();
var ref = database.ref('scores');
ref.on('value', gotData, errData);

let nameArray = [],
    scoreArray = [];

function gotData(data) {
    //console.log(data.val());

    var scores = data.val();
    var keys = Object.keys(scores);
    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var getName = scores[k].name;
        var getScores = scores[k].score;
        nameArray.push(getName);
        scoreArray.push(getScores);



        tableString += "<tr>";
        for (let j = 0; j < 2; j++) {
            tableString += "<td></td>";
        }
        tableString += "</tr>"
    }
    getTable.innerHTML = tableString;
    let tdArray = document.querySelectorAll("td");
    let x = 0;

    nameArray.forEach(function (value) {
        tdArray[x].innerHTML = value;
        x += 2;
    });
    let y = 1;
    scoreArray.forEach(function (value) {
        tdArray[y].innerHTML = value;
        y += 2;

    });
    let max = scoreArray[0],
        result = 0;

    for (let i = 0; i < keys.length; i++) {

        if (scoreArray[i] >= max) {
            max = scoreArray[i];
            result = i;


        }


    }
    document.querySelector("#display").innerHTML = "The Highest Scoring person is " + nameArray[result] + " with highest ever score of " + max;
    document.querySelector("#goBack").onclick = function () {
        window.history.back(2); //used history object 10 point
    }




}









function errData(err) {
    console.log("Error!!!");
    console.log(err);

}