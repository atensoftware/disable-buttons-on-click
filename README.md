# -- DRAFT --

# disable-buttons-on-click
Javascript to disable a set of buttons on a web page when one button in the set is clicked.  Shows a wait icon on the clicked button.

## Problem statement

Consider a web page with multiple buttons using standard `<BUTTON>` elements.  When the user clicks one of the submit buttons, frequently, the page does not respond immediately.  When this happens, the user may do any of the following, causing the problems noted:

* Click the submit button again, repeatedly - This can cause duplicate submission of the form
* Click a different submit button - The first submission may not be processed before the second one
* Switch to a different window and then switch back - The user may not remember which button they clicked, or if they had clicked a button

## Typical solutions, and their drawbacks

* Animated icons (e.g. spinners) - On low-power devices, animations consume CPU cyles and drain battery.  On low bandwidth remote desktop sessions, animations cause very poor performance for no substantial benefit.
* Replace button with 'wait' icon - Causes layout shift (poor user experience).
* Full-page overlay - User can not open any links in new windows or tabs.  User can not scroll the page to view content below the fold.  User can not read the page content because it is obscured. Effectively kills multi-tasking.
* Disable all buttons on the page - Common, non-submitting buttons like Reset, Copy to Clipboard, and Hide/Show become non-functional, for no reason.
* Disable the clicked button only - Other submit buttons can still be clicked, causing sequencing issues.

## Solution provided by this script

* Free and open-source
* Single script with no dependencies
* Show a static, non-animated wait icon in the background of the button, auto-sized to the button (absolute zero layout shift)
* Three-step implementation using declarative-syntax
* Only select buttons are disabled, not the whole page, allowing user to continue multi-tasking

## How to use

1. Include the script in `<HEAD>` section of the page: `<script src="disable-buttons-on-click.js">`
   - You can include this script site-wide without performance impact, since it only defines functions and does not run anything.
1. On the page with the `<BUTTON>` tags, call `InitializeDisableButtons` in the onload event to set up the buttons.
   - Plain Javascript in `<HEAD>` tag:
     `document.addEventListener('DOMContentLoaded', function () { DisableButtonsOnClick.utils.InitializeDisableButtons(); });`
   - Using jQuery: `$(document).ready(function() { DisableButtonsOnClick.utils.InitializeDisableButtons(); });`
3. Assign the `DisableOnClick` class to the buttons that should be disabled on click.
   - `<button type="submit" class="DisableOnClick">Any markup here</button>`
   - `<button type="button" onclick="DoSomething();" class="DisableOnClick">Any markup here</button>`
   - `<button type="reset" class="DisableOnClick">Reset</button>` - Note: 'reset' buttons do not trigger the disabling logic

Just three steps, as promised.

## Advanced usage

* Defining the selector for `<INPUT>` tags
* Multiple sets of buttons on the page
