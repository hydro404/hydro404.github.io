function myFunction() {
    var user = document.querySelector('input[name="Username"]').value;
    var msg = document.querySelector('textarea[name="Message"]').value;
    
    if(user){
        if(msg){
            
            var token = "5419783959:AAGslCXq1N3T1aRQi9apkVGpz9KdZXAdYjQ";

            console.log(msg);

            const params = new URLSearchParams({
                chat_id: "-769046544",
                text: msg,
            });

            msg.replace("%0A", "%0D%0A");

            var url = 'https://api.telegram.org/bot'+ token+ '/sendMessage?' + params.toString() + "%0D%0A %0D%0A" +  "- " + user;
            

            var oReq = new XMLHttpRequest();
            oReq.open("GET", url, true);
            oReq.send();
        }
        else{
            //ECHO ENTER A MESSAGE
        }
    }
    else{
        //modal.style.display = "none";
    }
}; 

    