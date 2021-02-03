let a1 = document.querySelector("#myAudio");

function playAudio() {


    a1.play();

}




document.querySelector("#name").onmousedown = function () {
    playAudio();
}
document.querySelector("#btn1").onclick = function () {

    let data1 = "";
    data1 = document.getElementById("name").value;
    localStorage.setItem("hani", data1);


}

document.querySelector("#highScore").onclick = function () {
    window.location.href = "high-scores.html"; //acess builtin for window
}