VirtualSky
==========

A browser-based planetarium that can be [customized and embedded in web pages](http://lcogt.net/virtualsky/embed/custom.html). Some [live versions](http://lcogt.net/virtualsky/) and [full-window](http://lcogt.net/virtualsky/embed/index.html?projection=stereo).

Usage
-----
    <head>

    <!--[if lt IE 9]><script src="excanvas.js" type="text/javascript"></script><![endif]-->
    <script src="jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="virtualsky.js" type="text/javascript"></script>
    <script type="text/javascript">
    <!--
        $(document).ready(function(){
            planetarium = $.virtualsky({id:'starmap',projection:'polar'}); // Assumes you want to draw this to a <div> with the id 'starmapper'
        });
    // -->
    </script>

    </head>
    <body>
    
        <div id="starmap" style="width:944x;height:400px;"></div>
    
    </body>

Options
--------
The following options can be specified (defaults in brackets):
  * `id` ('starmap') - The ID for the HTML element where you want the sky inserted
  * `projection` (`polar`)
    * Polar - `polar`
    * Stereographic - `stereo` - with a fixed horizon
    * Lambert - `lambert` - with a fixed horizon
    * Equirectangular - `equirectangular`
    * Mollweide - `mollweide`
    * Plane chart - `planechart`
    * Orthographic - `ortho`
    * Fish-eye - `fisheye`
  * `width` (500) - Set the width of the sky unless you've set the width of the element
  * `height` (250) - Set the height of the sky unless you've set the height of the element
  * `planets` - either an object containing an array of planets or a JSON file
  * `magnitude` (5) - the magnitude limit of displayed stars
  * `longitude` (53.0) - the longitude of the observer
  * `latitude` (-2.5) - the latitude of the observer
  * `clock` (now) - a Javascript Date() object with the starting date/time
  * `background` ('rgba(0,0,0,0)') - the background colour
  * `az` (180) - an azimuthal offset with 0 = north and 90 = east
  * `negative` (false) - invert the default colours i.e. to black on white
  * `sky_gradient` (true) - reduce the brightness of stars near the horizon
  * `cardinalpoints` (true) - show/hide the N/E/S/W labels
  * `constellations` (false) - show/hide the constellation lines
  * `constellationlabels` (false) - show/hide the constellation labels
  * `showplanets` (true) - show/hide the planets
  * `showplanetlabels` (true) - show/hide the planets
  * `showstarlabels` (false) - show/hide the planets
  * `showorbits` (false) - show/hide the orbits of the planets
  * `showdate` (true) - show/hide the date and time
  * `showposition` (true) - show/hide the latitude and longitude
  * `ground` (false) - show/hide the local ground (for full sky projections)
  * `keyboard` (true) - allow keyboard controls
  * `mouse` (true) - allow mouse controls
  * `gridlines_az` (false) - show/hide the azimuth/elevation grid lines
  * `gridlines_eq` (false) - show/hide the RA/Dec grid lines
  * `gridstep` (30) - the size of the grid step when showing grid lines</li>


Author
------
Stuart Lowe works for the [Las Cumbres Observatory Global Telescope](http://lcogt.net/). LCOGT is a private operating foundation, building a global network of telescopes for professional research and citizen investigations.
