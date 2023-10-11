(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event) {
			event.preventDefault();
			var $this = $(this);
			if( $('body').hasClass('menu-show') ) {
				$('body').removeClass('menu-show');
				$('#colorlib-main-nav > .js-colorlib-nav-toggle').removeClass('show');
			} else {
				$('body').addClass('menu-show');
				setTimeout(function(){
					$('#colorlib-main-nav > .js-colorlib-nav-toggle').addClass('show');
				}, 900);
			}
		})
	};
	burgerMenu();


})(jQuery);

const tabMapping = {
    "tab1": "projects",
    "tab2": "favorites",
    "tab3": "archives"
};

const radioButtons = document.querySelectorAll('input[type="radio"][name="tabset"]');

radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            // Loop through each key-value pair in the mapping
            for (let [tabId, contentId] of Object.entries(tabMapping)) {
                const contentElement = document.getElementById(contentId);
                
                // Show the content section corresponding to the checked radio button, hide others
                if (tabId === this.id) {
                    contentElement.classList.add('show');
                } else {
                    contentElement.classList.remove('show');
                }
            }
        }
    });
});

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
