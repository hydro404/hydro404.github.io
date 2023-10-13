
function assignValue(id) {
    event.preventDefault();

    if(id === "javaCalc") {
        document.getElementById('modalTitle').innerHTML = "Java Calculator";
        document.getElementById('modalBody').innerHTML = "The Java Calculator Project is a versatile software application written in Java that provides users with a simple yet powerful calculator that can perform basic arithmetic operations, as well as more advanced functions such as trigonometric and logarithmic operations.";
        document.getElementById('modalImg').src = './img/projects/calculator.png';
        $('#exampleModalCenter').modal('show'); // Show the modal
        document.getElementById('exampleModalCenter').style.zIndex = "9999";
    }

    else if(id === "zoology") {
        document.getElementById('modalTitle').innerHTML = "Interactive Learning System";
        document.getElementById('modalBody').innerHTML = "The web interactive learning system is an online educational platform that offers engaging and interactive content to facilitate effective and immersive learning experiences for students of all ages.";
        document.getElementById('modalImg').src = './img/projects/zoology.png';
        $('#exampleModalCenter').modal('show'); // Show the modal
        document.getElementById('exampleModalCenter').style.zIndex = "9999";
    }

    else if(id === "salesInventory") {
        document.getElementById('modalTitle').innerHTML = "Sales Inventory System";
        document.getElementById('modalBody').innerHTML = "This Sales Inventory System built with Java is a software solution for businesses that uses the Java programming language to create a robust and versatile platform for managing sales and inventory operations efficiently and effectively.";
        document.getElementById('modalImg').src = './img/projects/salesinventory.png';
        $('#exampleModalCenter').modal('show'); // Show the modal
        document.getElementById('exampleModalCenter').style.zIndex = "9999";
    }
    
}