/**
 * @author alchymy
 */

/* 

Note 1.

Do not include the script tag inside xx.js files
In this case the Application environment is for Full screen browser version (not mobile device)

*/


    var APP_ENV = "PDA";   // Options are FULL or PDA
    // h4 tags removed from within APP_VERSION to avoid 'line feed'
	var APP_VERSION = "v1.070_20180509";
    var JQUERY_VERSION = "JQuery 3.2.1";	
    var JQUERY_MIGRATE_VERSION = "JQuery Migrate 3.0.0";
    var JQUERY_TOOLS_VERSION = "JQuery Tools v1.2.7";
    var JQUERY_UI_VERSION = "JQuery UI 1.12.1";
    var LOCATION_LONGITUDE = 0;
    var MATHJAX_VERSION = "MathJax v2.7.3";
	

// jquery common formating for astrolab pages, jquery dialog and other setup

	$(function() {

		$( "#accordion" ).accordion();
		
		$( "#button" ).button();
	
		$( "#tabs" ).tabs();
		
		$( "#dialog" ).dialog({
			autoOpen: false,
			width: 400,
			buttons: [
				{
					text: "Ok",
					click: function() {
						$( this ).dialog( "close" );
					}
				},
				{
					text: "Cancel",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			]
		});

		// Link to open the dialog
		$( "#dialog-link" ).click(function( event ) {
			$( "#dialog" ).dialog( "open" );
			event.preventDefault();
		});
		
		// Hover states on the static widgets
		$( "#dialog-link, #icons li" ).hover(
			function() {
				$( this ).addClass( "ui-state-hover" );
			},
			function() {
				$( this ).removeClass( "ui-state-hover" );
			}
		);
		
	
		$( function() {
           $( "#datepicker" ).datepicker(
		   {
           dateFormat: "yy-mm-dd",
		   changeMonth: true,
           changeYear: true,
		    }
		   );
        });
		
	});
	
