// Source: https://github.com/atensoftware/disable-buttons-on-click
var DisableButtonsOnClick = DisableButtonsOnClick || {};
DisableButtonsOnClick.utils = {
	// Define the wait image URL
	DISABLE_BUTTONS_WAIT_IMAGE_URL: "https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/clock.svg",

	// Attach event listeners to each button on the page that matches the selector
	InitializeDisableButtons: function (selectors) {
		if (selectors == null) {
			selectors = 'button.DisableOnClick';
		}

		// Get all buttons
		var buttonNodeList = document.querySelectorAll(selectors);

		// Loop through each button
		buttonNodeList.forEach(buttonNode => {
			// Do not attach a click handler to reset buttons.
			// These can be disabled, but do not disable anything
			if (buttonNode.tagName === 'BUTTON'
				&& buttonNode.type === 'reset') {
				return;
			}

			// Add onclick event listener
			buttonNode.addEventListener('click', function (event) {
				DisableButtonsOnClick.utils.DisableButtonsOnPage(selectors, event);
			});
		});

		// Preload the background image to avoid rendering delay
		if (buttonNodeList.length > 0) {
			// Create a new Image object
			var img = new Image();

			// Set the src attribute to the image URL
			img.src = DisableButtonsOnClick.utils.DISABLE_BUTTONS_WAIT_IMAGE_URL;
		}
	},

	// Handle the button click by marking all the buttons matching the selector as disabled,
	//  and showing a wait icon on the clicked button.
	DisableButtonsOnPage: function (selectors, event) {
		// Get all buttons
		var buttonNodeList = document.querySelectorAll(selectors, event);

		// Loop through each button
		buttonNodeList.forEach(buttonNode => {
			// Disable the button
			buttonNode.disabled = true;

			// Set disabled class
			buttonNode.classList.add("btn-disabled");

			// Only the clicked button gets the wait icon
			if (event.target == buttonNode) {
				// Wrap button contents in a span
				buttonNode.innerHTML = '<span style="opacity: 0.4;">' + buttonNode.innerHTML + '</span>';

				// Display the background spinner image
				buttonNode.style.backgroundImage = "url('" + DisableButtonsOnClick.utils.DISABLE_BUTTONS_WAIT_IMAGE_URL + "')";
				buttonNode.style.backgroundSize = "auto 90%";
				buttonNode.style.backgroundRepeat = "no-repeat";
				buttonNode.style.backgroundPosition = "center";
			}
		});

		// Since the submit buttons are disabled, they will no trigger a form submit
		// So manually submit the form instead if it is the event target
		if (event.target.tagName === 'BUTTON' && event.target.type === 'submit') {
			event.target.form.submit();
		}
	}
};
