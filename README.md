# disable-buttons-on-click
Javascript to disable a set of buttons on a web page when one button in the set is clicked.  Shows a wait icon on the clicked button.

## Problem statement

Consider a web page with multiple buttons using standard <BUTTON> elements.  When the user clicks one of the submit buttons, frequently, the page does not respond immediately.  When this happens, the user may do any of the following, causing the problems noted:

* Click the submit button again, repeatedly - This can cause duplicate submission of the form
* Click a different submit button - The first submission may not be processed before the second one.
* Switch to a different window and then switch back - The user may not remember which button they clicked, or if they had clicked a button

## Typical solutions, and their drawbacks

* Animated icons (e.g. spinners) - On low-power devices, animations consume CPU cyles and drain battery.  On low bandwidth remote desktop sessions, animations cause very poor performance for no substantial benefit.
* Replace button with 'wait' icon - Causes layout shift (poor user experience)
* Full-page overlay - User can not open any links in new windows or tabs.  User can not scroll the page to view content below the fold.  User can not read the page content because it is obscured.

** Solution provided by this script

