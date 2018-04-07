
/*
NOTES: The Difference Between Arrays and Objects in JavaScript
==============================================================

In JavaScript, objects use named indexes.

In JavaScript arrays are a special kind of objects, that use numbered indexes (i.e. an array is a special variable, which can hold more than one value at a time).  You refer to an array element by referring to the index number.

Syntax:  var array-name = [item1, item2, ...]; 
      
Array Example – data is enclosed in square brackets separated by comma’s

var rockyPlanets  =  [“Mercury”, “Venus”, “Earth”, “Mars”];

index starts from zero, i.e. index is 0, 1, 2, 3 to refer to each planet, so

var planet = rockyPlanet[0] ;  // results in planet = “Mercury”

For the Object Example – data is enclosed in curly brackets in pairs format ‘name:data’, separated by comma’s

var rockyPlanets = { planetName:”Mercury”, rocky;”Y”};

here the object index is a name e.g. ‘planetName’

so var planet = rockyPlanets[“planetName”];  // results in planet = “Mercury”

We can also combine both methods to create an array of objects with each object in curly brackets, items separated by comma's

var rockyPlanets = [
    {"planetName":"Mercury", "rocky":"Y"},
    {"planetName":"Venus", "rocky":"Y"},
    {"planetName":"Earth","rocky": "N"},
    {"planetName":"Jupiter","rocky": "N"}
];

to access data we use an index, which again starts from zero.

var planet = rockyPlanets[0].planetName + “ is rocky “ + rockyPlanets[0].rocky

This format can used for varying values of x and y rather than a list of unrelated values.  The spectra data example below could also be saved in a file, using this format, with file extension '.json' to become a data file that can be loaded in a page in the same way as a '.js' file using '<script src=""></script>'.

var H_spectra = [

{w:3970.07,i:8},
{w:4101.74,i:15},
{w:4340.47,i:30},
{w:4861.33,i:80},
{w:6562.72,i:120},
{w:6562.85,i:180}

];

It is also possible to create objects within objects as below , so solarSystem.MOON and solarSystem.SUN can have the same or different properties at different levels, accessed via dot notation.
 
The object format can contain properties and methods, the 'array' of properties in this case are actually different items.

var solarSystem = {

   
// Solar system objects

MOON: {
        RADIUS: { value:1738000.0 }
      },

 SUN: {
        RADIUS: { value:6.96E8 },
        Luminosity: {value:3.826E+26 },     
        EFF_T_SUN: { value:5770 }               
      }
};


This fConstantsObj.js file contains Global constant variables used in all calculation code (Note: do not include the script tag in xx.js files).
Java standard for naming constants is ALL_CAPS with words separated by _ character.

The object format below is for defining a direct instance of an object - in this case constant 'objects' for use in
other Astrolab pages. When the .js file is loaded in a page the values can be refered to as per the examples 
below.
 
var CONST = { } 

is an example of an object literal, it will contain a comma separated list of property specifications
enclosed in curly braces.  Each property specification in an object literal consists of a property name followed by a 
colon and the property value, e.g.

var SPEED_OF_LIGHT = { value: 2.99792458e8, error:0, desc:"Speed of Light", units:"m/s",  origin:"2010 CODATA"};

We have not stuck to the strict constant naming format within the object for each property, but we will try and 
use the Java standard naming within apps so example for a constant for proton mass read from our 'PCONST' object:

var PROTON_MASS = CONST.mp.value  // can declare at start of code as a global variable

This makes the name more readable and rather than typing "CONST.mp.value" all through the code, but
the final result should be the same.

To simplify matters further we have provided predefined variables for some constants to simplify inclusion in code.

The full properties of each constant are available from the constant objects.
 
*/

// AC_ astrophysical, MC_ maths and PC_ physical global constants for inclusion direct in code 

var AC_AU = 149597870700;

var MC_PI = 3.1415926535898;
var MC_E = 2.718281828459;
var MC_LOGE = 0.4342944819033;

var PC_C = 2.99792458e8;
var PC_G = 6.67384e-11;

// Constants objects with properties

// PHYSICAL CONSTANTS - as PCONST object with properties
var PCONST = {
		       AU: { value:149597870700, error:0, desc:"AU in m as fixed by IAU Aug 2012",  units:"m", origin:"" },
		        C: { value: 2.99792458e8, error:0, desc:"Speed of Light", units:"m/s",  origin:""},          
		        G: { value:6.67384e-11, error:8.0e-15, desc:"Gravitational constant", units:"N m2 kg–2 / m3 kg-1 s-2", origin:"" },
	            g: { value:9.80665, error:0, desc:"Acceleration due to gravity on Earth", units:"m s–2" },
		       RH: { value:13.60569253, error:0, desc:"Rydberg constant (energy units)", units:"eV" },
		       mH: { value:1.67E-27, error:0, desc:"Mass of hydrogen atom", units:"kg" },  
		       LY: { value:9.46053E+15, error:0, desc:"Light year", units:"m" },
               NA: { value:6.02214129E23, error:2.7e-30, desc:"Avogadro's number", units:"mol–1" },
                k: { value:1.3806488E-23, error:1.3e-29, desc:"Boltzmann’s constant", units:"J K–1" },         		
       galNPoleRA: { value:192.25, error:0, desc:"Galactic North Pole RA Epoch 1950.0" },
     galNPoleDecl: { value:27.4, error:0, desc:"Galactic North Pole Decl Epoch 1950.0" },
  galPlaneAscNode: { value:33, error:0, desc:"Galactic Plane Asc Node (l)Epoch 1950.0" },
               mp: { value:1.672621777E-27, error:0, desc:"Proton mass", units:"kg" },
               mn: { value:1.674927351E-27, error:0, desc:"Neutron mass", units:"kg" },
               me: { value:9.10938291E-31, error:0, desc:"Rest mass electron", units:"kg" }, 
               pc: { value:3.086E16, error:-1, desc:"Parsec", units:"m", origin:""},
              kpc: { value:3.08568024696e21, error:-1, desc:"KiloParsec", units:"m", origin:"" },
           JANSKY: { value:1E-26, error:0, units:"", desc:"Jansky constant", origin:"" },
               ly: { value:9.463e15, error:-1, desc:"Lightyear", units:"m", origin:"" },
              amu: { value:1.660538921e-27, error:7.3e-35, desc:"(unified) atomic mass unit", units:"kg", origin:"" },
               eV: { value:1.602176565e-19, error:3.5e-27, desc:"Electron Volt", units:"J" },
                h: { value:6.62606957e-34, error:2.9e-41, desc:"Planck constant", units:"J.s" },
              Ryd: { value:10973731.568539, error:0.000055, desc:"Rydberg constant", units:"m^-1" },
         sigma_sb: { value:5.670373e-8, error:2.1e-13, desc:"Stefan-Boltzmann constant", units:"J/m^2/K^4/s" },
            alpha: { value:7.2973525698e-3, error:2.4e-12, desc:"Fine Structure constant", units:"" },
                R: { value:8.3144621, error:0.0000075, desc:"Gas constant", units:"J/mol/K" },
             hbar: { value:1.054571726e-34, error:4.7e-42, desc:"Reduced Planck constant", units:"J.s" },
	            e: { value:1.602176565e-19, error:3.5e-27, desc:"Electron charge", units:"C" },
              m_e: { value:9.10938291e-31, error:4.0e-38, desc:"Electron mass", units:"kg" },
	          m_p: { value:1.672621777e-27, error:7.4e-35, desc:'Proton mass', units:"kg" },
    	      m_n: { value:1.674927351e-27, error:7.4e-35, desc:'Neutron mass', units:"kg" }
         
/*
Constants yet to be set up

Permeability of free space µ0   4p 10–7  H m–1   
Permittivity of free space e0   8.854 10–12  F m-1   
Charge on electron  e    1.602 176 565 x 10-19  C 3 
Planck's constant  h   6.626 069 57 x 10–34   J s 3 
Atomic mass constant mu   1.660 538 921 x 10–27  kg 3 
Universal gas constant  R   8.314  J K–1 mol–1   
Stefan–Boltzmann constant  s  PCONST_SB 5.670 373 x 10-8 W m–2 K-4 3 
Standard Atmospheric Pressure on Earth   1 atm   1.013 25 x 105  N m–2 (Pa) 

*/    
};

// ASTROPHYSICAL CONSTANTS

var ACONST = {
		       AU: { value:149597870700, error:0, desc:"AU in m as fixed by IAU Aug 2012",  units:"m", origin:"" }, 
     RADIUS_EARTH: { value:6.3781363E6},
         MASS_SUN: { value:1.9889E30},          // Kg
       MASS_EARTH: { value:5.976E24}         // Kg
};
	 
// CONVERSIONS

var  CONV = {
     
     PC_TO_LY: 3.261633,             // parsec x PC_TO_LY = lightyear
     EARTH_RADII_TO_KM: 6371,     // x Earth Radii by mean constant = km
     KM_TO_MILES: 0.621371192    // x km by constant
     };
	 
   
// MATHS CONSTANTS

var MCONST = {
	
           PI: { value:3.1415926535898 },
            E: { value:2.718281828459 },
         LOGE: { value:0.4342944819033 }
         };

// TO BE REVIEWED

/*
		YEAR: { value:31557600, error:0, desc:"Year in seconds", units:"", origin:"" },

      SUN: {
  
		         RADIUS: 6.96E8,            //Solar radius (m)
		         luminosity: 3.826E+26,     //Solar luminosity (J/s)
             angDiameter: 0.533128,     //Angular diameter at 1AU (deg)   
             LUMIN_SUN: 3.862E26,
             EFF_T_SUN: 5770            // Effective Temp Sun
        
      },

      MOON: {
		          mass: 7.35E+22,             //Lunar mass (kg)
		          radius: 1738000.0,          //Lunar radius (m)
              distance: 384400000.0,      //Lunar distance to Earth (m)
	       	    orbitalPeriod: 27.322,      //Orbital Period (days)
		          orbitalEcc: 0.054900,       //Orbital Eccentricity 
		   orbitalIncl: 5.145396,      //Orbital Inclination
         meanEpochLong: 318.351648,  //Longitude at epoch 1990
			meanPeriLong: 36.340410,    //perihelion
			SMA: 384401,                //Semi major axis (km)
			ascNode: 318.351648,        //ascending node
			angDiam: 0.5181,            //Degrees at 1a
			parallax: 0.9507,           //At 1a
			VMag: 0.0                   //At 1a
      },
*/	  
	  



