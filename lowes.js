
function lowes(){
var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Hello there.')
    .pauseFor(2500)
    .deleteAll()
    .typeString('I love you Jamaica')
    .pauseFor(2500)
    .deleteChars(7)
    .typeString('<strong>so much!</strong>')
    .pauseFor(1500)
    .deleteAll()
    .typeString(':*')
    .pauseFor(1500)
    .start();
}