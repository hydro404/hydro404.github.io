
document.getElementById("login").addEventListener("click", () => {
  var username = document.getElementById("userInput").value;
  var password = document.getElementById("passInput").value;
  console.log(username, password);
  $.post("https://script.google.com/macros/s/AKfycbysKMemMLLIPQj0LwQCaGqlrjqBd62GmjXqVXwyFYK5l-93dPkdeq6WTklM-SWp2wlU/exec",
  {
    username: username,
    password: password
  },
  function(data,status){
    
    if (data == "Status 200"){
        alert('Valid Credentials')
        window.location.href = 'enterReceipt.html'
        
    }
    else{
        alert('Invalid Credentials'+data)
    }
  });
});

