var text = ["Hola", "Konnichiwa", "Annyeong", "Hallo", "Namastē", "Kaixo", "Ciao", "Yassas", "Zdraveite", "Hafa adai", "Salve", "God dag", "Kamusta"];
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