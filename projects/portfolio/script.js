

function clickedAbout() {
    

    if (window.matchMedia("(max-width: 768px)").matches) {
        document.getElementById("lowes").innerHTML = 
        "<div style='min-height: calc(100vh - 9rem); display: grid; place-items: center;'><button disabled type='button' class='lbutton lbutton--loading' onclick='this.classList.toggle('lbutton--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button></div>"
    
        setTimeout(function(){
        window.location.href = './about.html';
        }, 2000);
    }

    else {
        document.getElementById("lowes").innerHTML = 
        "<div style='min-height: calc(100vh - 9rem); display: grid; place-items: center;'><button disabled type='button' class='lbutton lbutton--loading' onclick='this.classList.toggle('lbutton--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button></div>"
    
        setTimeout(function(){
        window.location.href = './about.html';
        }, 2000);
    }
    
}

function clickedIndex() {

    if (window.matchMedia("(height <= 800px)").matches) {
        document.getElementById("lowes").innerHTML = 
        "<div style='min-height: calc(100vh - 11rem); display: grid; place-items: center;'><button disabled type='button' class='lbutton lbutton--loading' onclick='this.classList.toggle('lbutton--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button></div>"
        
        setTimeout(function(){
        window.location.href = './index.html';
            }, 2000);
    }
    
    else if (window.matchMedia("(max-width: 768px)").matches) {
        document.getElementById("lowes").innerHTML = 
        "<div style='min-height: calc(100vh - 11rem); display: grid; place-items: center;'><button disabled type='button' class='lbutton lbutton--loading' onclick='this.classList.toggle('lbutton--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button></div>"
        
        setTimeout(function(){
        window.location.href = './index.html';
            }, 2000);
    }

    else {
        document.getElementById("lowes").innerHTML = 
        "<div style='min-height: calc(100vh - 9rem); display: grid; place-items: center;'><button disabled type='button' class='lbutton lbutton--loading' onclick='this.classList.toggle('lbutton--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button></div>"
        setTimeout(function(){
            window.location.href = './index.html';
                }, 2000);
        }
}