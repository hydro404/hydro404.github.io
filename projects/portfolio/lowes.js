var text = ["Hola", "Konnichiwa", "Annyeong", "Hallo", "Namastē", "Marhaba", "Grüß Gott", "Namaskar", "Zdraveite", "Hafa adai", "Dobro Jutro", "God dag"];
var counter = 0;
var inst = setInterval(change, 500);

function change() {
document.getElementById("app").innerHTML = text[counter];
counter++;
if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
}
}


function play() {
    var audio = document.getElementById("audio");
    audio.play();
}

