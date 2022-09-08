function clickedSimple() {
            
    document.getElementById("lowes").innerHTML = 
    "<button disabled type='button' class='button button--loading' onclick='this.classList.toggle('button--loading')'><span class='button__text'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button>"
    setTimeout(function(){
    window.location.href = './simple.html';
    }, 2000);
}