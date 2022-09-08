
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const btn = document.getElementById("btn");
  
  function getRandomHex() {
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
    document.getElementById("color").innerHTML = randomColor;
}

const colors = ["green", "red", "silver", "gray", "white", "maroon","purple", "fuchsia", "lime", "olive", "navy", "blue", "teal", "aqua"];

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}

function getRandomSimple() {
  const randomNumber = getRandomNumber();
  document.body.style.backgroundColor = colors[randomNumber];
  document.getElementById("color").innerHTML = colors[randomNumber];
}

function clickedSimple() {
            
    document.getElementById("lowes").innerHTML = 
    "<button disabled type='button' class='button button--loading' onclick='this.classList.toggle('button--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button>"
    setTimeout(function(){
    window.location.href = './simple.html';
    }, 2000);
}

function clickedHex() {
            
    document.getElementById("lowes").innerHTML = 
    "<button disabled type='button' class='button button--loading' onclick='this.classList.toggle('button--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button>"
    setTimeout(function(){
    window.location.href = './hex.html';
    }, 2000);
}

function clickedIndex() {
    lowes = document.getElementById("lowes");     
    lowes.innerHTML = 
    "<button disabled type='button' class='button button--loading' onclick='this.classList.toggle('button--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button>"
    
    setTimeout(function(){
    
    window.location.href = './index.html';
    }, 2000);
    
    lowes.className = 'fadein';
    window.onload = function() {
    document.lowes.className += " loaded";
    }
    
}