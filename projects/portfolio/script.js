

function clickedAbout() {
            
    document.getElementById("lowes").innerHTML = 
    "<div style='min-height: calc(100vh - 15rem); display: grid; place-items: center;'><button disabled type='button' class='lbutton lbutton--loading' onclick='this.classList.toggle('lbutton--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button></div>"
    
    setTimeout(function(){
    window.location.href = './about.html';
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
    document.getElementById("lowes").innerHTML = 
    "<div style='min-height: calc(100vh - 15rem); display: grid; place-items: center;'><button disabled type='button' class='lbutton lbutton--loading' onclick='this.classList.toggle('lbutton--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button></div>"
    
    setTimeout(function(){
    
    window.location.href = './index.html';
    }, 2000);
    
}