const colors = ["green", "red", "silver", "gray", "white", "maroon","purple", "fuchsia", "lime", "olive", "navy", "blue", "teal", "aqua"];
const btn = document.getElementById("btn");

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}

function myFunction() {
  const randomNumber = getRandomNumber();
  document.body.style.backgroundColor = colors[randomNumber];
  document.getElementById("color").innerHTML = colors[randomNumber];
}