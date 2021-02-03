// used global variable
let rows = 10,
    cols = 10,
    getDiv = document.querySelector("#masterDiv"), //used builtibn method for document
    mineArray = [],
    numbersArray = [],
    randomNumber = 0,
    mines = 10,
    scores = 0,
    topLeft = -(cols + 1),
    top1 = -cols,
    topRight = -(cols - 1),
    left = cols - (cols + 1),
    right = cols - (cols - 1),
    bottomLeft = cols - 1,
    bottom = cols,
    bottomRight = cols + 1,
    //Array declarations.3
    // used an array
    middleArray = [topLeft, top1, topRight, left, right, bottomLeft, bottom, bottomRight],
    topLeftArray = [right, bottom, bottomRight],
    leftSideArray = [top1, topRight, right, bottom, bottomRight],
    bottomLeftArray = [top1, topRight, right],
    topRightArray = [left, bottomLeft, bottom],
    rightSideArray = [topLeft, top1, left, bottomLeft, bottom],
    bottomRightArray = [topLeft, top1, left],
    topSideArray = [left, right, bottomLeft, bottom, bottomRight],
    bottomSideArray = [topLeft, top1, topRight, left, right],
    check;
//used an object with parameter
let getName = localStorage.getItem("hani"), //used local/session storage
    sound1 = document.querySelector("#myAudio2"),
    sound2 = document.querySelector("#myAudio3"),
    sound3 = document.querySelector("#myAudio4");


let _cells;

function onSubmit() {
    //used 3rd party API
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


    // used local variable
    //used object
    var database = firebase.database();
    //used object using dot notation
    var ref = database.ref('scores');
    //create using object literal
    var data = {
        name: getName,
        score: scores

    }
    ref.push(data);
}



function generateMines() {

    //generate array with numbers 0 through rows*cols

    //for mines count, splice a random index out of the above array, store that in mineArray

    // USED A FOR LOOP

    for (let i = 1; i <= rows * cols; i++) {

        numbersArray.push(i);

    }

    for (let j = 0; j < mines; j++) {

        let mineIndex = Math.floor(Math.random() * numbersArray.length); //used builtin method for math
        mineArray.push(numbersArray[mineIndex]);
        numbersArray.splice(mineIndex, 1);
        //console.log(mineArray);
    }
    console.log(mineArray);

}


function buildGrid() {
    for (let i = 1; i <= rows * cols; i++) {
        //let isMine = mineA5rray.index

        //used innerHTMl property
        getDiv.innerHTML += "<div class='me' data-index=" + i + " data-mine = " + (mineArray.indexOf(i) >= 0 ? 'true' : 'false') + "> </div>";

    }
    getDiv.style.gridTemplateRows = "repeat(" + rows + ",1fr)";
    getDiv.style.gridTemplateColumns = "repeat(" + cols + ",1fr)";
    getDiv.style["grid-gap"] = "5px";

    //USED querySelectorAll
    _cells = document.querySelectorAll('.me');

}

function revealMines() {
    for (let i = 0; i < rows * cols; i++) {
        // used getAttribute() method
        if (_cells[i].getAttribute("data-mine") == "true") {
            _cells[i].innerHTML = "<span class='bomb'>&#128163;</span>";

        }
    }

}
// acustom function using parameter
function cellCheck(index) {
    if (!index) return;



    console.log("INDEX " + index);

    //used if statement
    if (_cells[index - 1].getAttribute("data-mine") == "true") {
        sound2.play();
        revealMines();
        onSubmit();
        setTimeout(loseAction, 1000);
    } else {
        sound1.play();
        scores++;

        let array, mineCount = 0;
        //let cellValue = parseInt(x.getAttribute("data-index")),
        //used logical AND
        //used logical NOT
        if (index == 1) array = topLeftArray;
        else if (index <= cols && index != cols) array = topSideArray;
        else if (index == (rows * cols) - (cols - 1)) array = bottomSideArray;
        else if ((index - 1) % cols == 0 && index != (rows * cols) - (cols - 1)) array = leftSideArray;
        else if (index == cols) array = topRightArray;
        else if (index == rows * cols) array = bottomRightArray;
        else if (index != rows * cols && index != cols && index % cols == 0) array = rightSideArray;
        else if (index != (rows * cols) - (cols - 1) && index != rows * cols && index > (rows * cols) - (cols - 1)) array = bottomSideArray;
        else array = middleArray;

        //array = array.reverse();

        //array.push(0);
        console.log("ARR: " + array);

        /* for(let i=0;i<array.length;i++) {
                 let exact = index+array[i];
              if(_cells[exact-1].getAttribute("data-mine")=="true") {
                 mineCount++;
             }
         }*/
        // used IIFE
        array.forEach(function (value) {
            let exact = index + value;

            if (_cells[exact - 1].getAttribute("data-mine") == "true") {
                mineCount++;
            }


            // cellCheck(index+value);
        });
        _cells[index - 1].innerHTML = mineCount;


        //
        //return mineCount;
        if (mineCount == 0) {
            array.forEach(function (value) {
                let exact = index + value;
                console.log("exact :", exact);
                if (_cells[exact - 1].innerHTML == " ") {

                    cellCheck(exact);
                }
            });


        }
        isLevelCompleted();

    }



}
// a custom function
function isLevelCompleted() {
    let complete = true;
    for (let i = 0; i < rows * cols; i++) {
        if ((_cells[i].getAttribute("data-mine") == "false" && _cells[i].innerHTML == " ")) {
            complete = false;

        }
    }
    if (complete) {
        sound3.play();

        revealMines();
        onSubmit();
        setTimeout(winAction, 1000);
    }
}



function startGame() {

    //used click event
    getDiv.onclick = function (e) {

        //access object using dote notation
        let result = cellCheck(parseInt(e.target.getAttribute('data-index')));
        // e.target.innerHTML = result >= 0 ? result : "<span //class='bomb'>&#128163;</span>" ;
    }


    generateMines();
    buildGrid();
    rightClick();
}


startGame();


function rightClick() {
    for (let i = 0; i < rows * cols; i++) {
        _cells[i].oncontextmenu = function (e) {
            e.preventDefault();
            _cells[i].innerHTML = "&#x1f6a9;";
        }
    }
}

function loseAction() {
    let action = confirm("Game is Over.you Scored \n" + scores + "\n click ok to play again or cancel to exit");

    // used if else statement

    if (action == true) {
        setTimeout(location.reload(1000));
    } else {
        //used builtin window properrty
        window.location.href = "index.html";
    }

}

function winAction() {
    let action = confirm("you won. you scored \n" + scores + "\nclick ok to play again or cancel to exit");
    if (action == true) {
        setTimeout(location.reload(1000));
    } else {
        window.location.href = "index.html";
    }

}