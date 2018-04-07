/**
 * @author alchymy
 */

/* 

Note 1.

Do not include the script tag inside xx.js files
In this case the Application environment is for Full screen browser version (not mobile device)

Note that the html Comment 'tags' at the start and end of this file are added inside the script tag for older browsers which may not cope with code
in the body of the html page, however this may not matter when code is loaded inside head tag and newer browsers may not
require these comment tags at all anyway. The two back slash characters stop the closing comment
'tag' being processed when the comment encloses JavaScript, again this may only matter when code is in the body of a HTML page.

To be consistent this comment standard is used within all JavaScript tags in this project,
although they may all be removed eventually if they do not cause browser issues, to simplify coding, 
unless intended to contain actual notes like this.

Note 2.
20130422 - found that HTML Validator from W3C may give errors if the start and end comment tags are ommitted inside script tags

*/


    var APP_ENV = "PDA";   // Options are FULL or PDA
    // h4 tags removed from within APP_VERSION to avoid 'line feed'
	var APP_VERSION = "v1.044_20180406";
    var JQUERY_VERSION = "JQuery 3.2.1";	
    var JQUERY_MIGRATE_VERSION = "JQuery Migrate 3.0.0";
    var JQUERY_TOOLS_VERSION = "JQuery Tools v1.2.7";
    var JQUERY_UI_VERSION = "JQuery UI 1.12.1";
    var LOCATION_LONGITUDE = 0;
    var MATHJAX_VERSION = "MathJax v2.7.3";
	

// jquery common formating for astrolab pages jquery dialog and other setup

	$(function() {
		
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
	
