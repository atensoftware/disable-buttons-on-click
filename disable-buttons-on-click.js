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
			if (buttonNode.tagName === 'BUTTON' && buttonNode.type === 'reset')
			{
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

		// Get element to which the event handler is attached (always a button).
		// NOTE: This is not necessarily the same as the 'clicked' element,
		//    which could be a child element of the button.
		let clickedButton = event.currentTarget;

		// If a submit button was clicked, and the form is not valid, do nothing
		//  except report the validity
		if (clickedButton.tagName === 'BUTTON' && clickedButton.type === 'submit')
		{
			let formToSubmit = clickedButton.form;
			// Return if the form is invalid
			if (formToSubmit.checkValidity() == false)
			{
				// Report validity if supported
				if(typeof formToSubmit.reportValidity === 'function')
				{
					formToSubmit.reportValidity();
				}
				return;
			}
		}
		
		// Loop through each button
		buttonNodeList.forEach(buttonNode => {
			// Disable the button
			buttonNode.disabled = true;

			// Set disabled class
			buttonNode.classList.add("btn-disabled");

			// Only the clicked button gets the wait icon
			if (clickedButton == buttonNode)
			{
				// Wrap button contents in a span
				buttonNode.innerHTML = '<span style="opacity: 0.4;">' + buttonNode.innerHTML + '</span>';

				// Display the background spinner image
				buttonNode.style.backgroundImage = "url('" + DisableButtonsOnClick.utils.DISABLE_BUTTONS_WAIT_IMAGE_URL + "')";
				buttonNode.style.backgroundSize = "auto 90%";
				buttonNode.style.backgroundRepeat = "no-repeat";
				buttonNode.style.backgroundPosition = "center";
			}
		});

		// Since the submit buttons are disabled, they will not trigger a form submit
		// So manually submit the form instead if it is the event target
		if (clickedButton.tagName === 'BUTTON' && clickedButton.type === 'submit')
		{
			let formToSubmit = clickedButton.form;
			// Submit the form if it is valid, support 'required' attributes
			if (formToSubmit.checkValidity() == true)
			{
				// If the disabled button has a name/value, copy it into
				// a hidden field so it gets submitted with the form
				// This is not needed for any other buttons of any type
				// with a name assigned.
				if(clickedButton.getAttribute("name"))
				{
					const hiddenInput = document.createElement("input");
					hiddenInput.type = "hidden";
					hiddenInput.name = clickedButton.getAttribute("name");
					hiddenInput.value = clickedButton.getAttribute("value");
					formToSubmit.appendChild(hiddenInput);
				}

				formToSubmit.submit();
			}
		}
	}
};
