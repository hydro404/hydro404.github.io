document.getElementById('input-submit').addEventListener('click', function(e) {
	const email = "trishafrancine.belgica@bicol-u.edu.ph";
	const emailSender = document.getElementById('input-email').value;
	const subject = document.getElementById('input-subject').value;
	const message = document.getElementById('input-message').value;
	const mailtoString = `mailto:${email}?subject=${subject}&body=From: ${emailSender}%0A%0A${message}`;
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	
	if (emailSender !== "" && subject !== "" && message !== "") {
		if(emailRegex.test(emailSender)){
			e.preventDefault();
			window.open(mailtoString);
		}
	}
	
});
