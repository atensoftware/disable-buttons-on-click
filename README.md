# Disable Buttons On Click - Javascript Include File

Greatly improve your website's user interface (UI) experience with this light-weight, 
open-source Javascript library to  disable a set of buttons when one button in the set is clicked.

## Key Benefits

* Prevent duplicate form submisions via doubled post
* Prevent double-clicks from submitting a form twice
* Prevent user from clicking other buttons on the form while another one is processing
* Display to the user that the website is processing
* Display to the user which button they clicked
* Allow other elements of the page, such as links and scrolling, to continue to be functional

## Key UI Features

* Disable all or a subset of buttons on the page
* Automatically shows a wait icon on the clicked button
* Zero layout shift

## Key Developer Features

* Declarative syntax
* Production-tested code
* Single Javascript file with no dependencies
* Include via jsDelivr CDN
* Free and open-source
* High performance
  
## Problem statement

Consider a web page with multiple buttons using standard `<BUTTON>` elements.  When the user clicks one of the submit buttons, frequently, the page does not respond immediately.  When this happens, the user may do any of the following, causing the problems noted:

* Click the submit button again, repeatedly - This can cause duplicate submission of the form
* Click a different submit button - The first submission may not be processed before the second one
* Switch to a different window and then switch back - The user may not remember which button they clicked, or if they had clicked a button
* Accidentally double-click the submit button

## Typical solutions, and their drawbacks

* Animated icons (e.g. spinners) - On low-power devices, animations consume CPU cyles and drain battery.  On low bandwidth remote desktop sessions, animations cause very poor performance for no substantial benefit.
* Replace button with 'wait' icon - Causes layout shift (poor user experience).
* Full-page overlay - User can not open any links in new windows or tabs.  User can not scroll the page to view content below the fold.  User can not read the page content because it is obscured. Effectively kills multi-tasking.
* Disable all buttons on the page - Common, non-submitting buttons like Reset, Copy to Clipboard, and Hide/Show become non-functional, for no reason.
* Disable the clicked button only - Other submit buttons can still be clicked, causing sequencing issues.

## Solution provided by this script

* Show a static, non-animated wait icon in the background of the button, auto-sized to the button (absolute zero layout shift)
* Only designated buttons are disabled, not the whole page, allowing user to continue multi-tasking
* Three-step implementation using declarative-syntax

## How to use

1. Include the script in `<HEAD>` section of the page (or all pages in your site):
   ```html
   <script src="https://cdn.jsdelivr.net/gh/atensoftware/disable-buttons-on-click@latest/disable-buttons-on-click.js"></script>
   ```
1. On the page with the `<BUTTON>` tags, call `InitializeDisableButtons` when the page loads to set up the buttons.
   - Plain Javascript:
     ```javascript
     document.addEventListener('DOMContentLoaded', function () {
       DisableButtonsOnClick.utils.InitializeDisableButtons();
     });
     ```
   - Using jQuery:
     ```javascript
     $(document).ready(function() {
       DisableButtonsOnClick.utils.InitializeDisableButtons();
     });
     ```
3. Assign the `DisableOnClick` class to the buttons that should be disabled on click.  Examples:
   ```html
   <!-- Just assign the class to the existing buttons -->
   <button type="submit" class="DisableOnClick">Any markup here</button>
   <button type="button" class="DisableOnClick" onclick="DoSomething();">Any markup here</button>

   <!-- 'reset' buttons do not trigger the disabling logic -->
   <button type="reset" class="DisableOnClick">Reset</button>

   <!-- Example of 'Cancel' button, to allow user to stop waiting and re-enable the buttons -->
   <button type="button" onclick="location.reload();">Cancel</button>
   ```

Just three steps, as promised.

## Advanced usage

### Customize icon image

To customize the icon image, set the `DISABLE_BUTTONS_WAIT_IMAGE_URL` property *before* calling `InitializeDisableButtons`. 

Any image format can be used, but SVG is recommended for best scaling to the size of the button.

You can set the property after calling `InitializeDisableButtons`, but you will see a rendering delay 
unless you preload the image too.

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // Use an orange hourglass instead of the default clock icon
  DisableButtonsOnClick.utils.DISABLE_BUTTONS_WAIT_IMAGE_URL = "https://icongr.am/octicons/hourglass.svg?color=ff8000";
  DisableButtonsOnClick.utils.InitializeDisableButtons();
});
```

### Defining the selector for `<INPUT>` tags

*coming soon*

### Multiple sets of buttons on the page

*coming soon*

*coming soon*
