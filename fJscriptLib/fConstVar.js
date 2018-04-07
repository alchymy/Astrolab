// Astrophysical, Maths and Physical global constants for inclusion in code.
// This list contains those instances most commonly used and they may also be used in objects elsewhere.
// These should match constant names used in any programming language used in the lab and the list will be a standard.
// They are all prefixed by "GC_" for global constant, the advantage here is any change in values is passed on.

// ASTROPHYSICAL CONSTANTS


var GC_AU = 1.49597870700E+11;          // Astronomical Unit in m as fixed by IAU Aug 2012
var GC_GALNPOLERA = 192.25;             // Galactic North Pole RA Epoch 1950.0
var GC_GALNPOLEDECL = 27.4;             // Galactic North Pole Decl Epoch 1950.0 
var GC_GALPLANEASCNODE = 33;            // Galactic Plane Asc Node (l)Epoch 1950.0
var GC_JANSKY = 1E-26;                  // Jansky constant
var GC_PC = 3.086E16;                   // Parsec in m   
var GC_KPC = 3.08568024696e21;          // KiloParsec in m
var GC_LY = 9.46053E+15;                // Light year in m
var GC_EARTH_YEAR = 31557600;           // Year in seconds
var GC_EARTH_MASS = 5.976E24;           // Kg        
var GC_EARTH_RADIUS = 6.3781363E6;           // radius Earth in m
var GC_EARTHSIDEREALYEAR = 3.15581450E+07;   // Earth Sidereal Year (s)
var GC_MOONMASS = 7.35E+22;             //Lunar mass (kg)
var GC_MOONRADIUS = 1738000.0;          //Lunar radius (m)
var GC_MOONDISTANCE = 384400000.0;      //Lunar distance to Earth (m)
var GC_MOONORBITALPERIOD = 27.322;      //Orbital Period (days)
var GC_MOONORBITALECC = 0.054900;       //Orbital Eccentricity 
var GC_MOONORBITALINC = 5.145396;       //Orbital Inclination
var GC_MOONMEANEPOCHLONG = 318.351648;  //Longitude at epoch 1990
var GC_MOONMEANPERILONG = 36.340410;    //perihelion
var GC_MOONSMA = 384401;                //Semi major axis (km)
var GC_MOONASCNODE = 318.351648;        //ascending node
var GC_MOONANGDIAM = 0.5181;            //Degrees at 1a
var GC_MOONPARALLAX = 0.9507;           //At 1a
var GC_MOONVMAG =  0.0;                 //At 1a  
var	GC_SUN_RADIUS = 695990000.0;        //Solar radius (m)
var GC_SUN_LUMINOSITY = 3.826E+26;      //Solar luminosity (J/s)
var GC_SUN_ANGDIAMETER = 0.533128;      //Angular diameter at 1AU (deg)   
var GC_SUN_MASS = 1.9889E30;            // Kg


// MATHS CONSTANTS


var GC_E = 2.718281828459;
var GC_LOGE = 0.4342944819033;
var GC_PI = 3.1415926535898;

// PHYSICAL CONSTANTS


var GC_B = 1.672621777E-27;             // Boltzmanns const???
var GC_C = 2.99792458e8;                // Speed of Light m/s        
var GC_G = 6.67384e-11;                 // Gravitational constant N m2 kg-2 / m3 kg-1 s-2
var GC_GAE = 9.80665;                   // Acceleration due to gravity on Earth m s2
var GC_RH = 13.60569253;                // Rydberg constant (energy units) eV
var GC_MH = 1.67E-27;                   // Mass of hydrogen atom kg
var GC_AN = 6.02214129E23;              // Avogadro's number molÒ1
var GC_K = 1.3806488E-23;               // BoltzmannÌs constant J KÒ1         		
var GC_MP = 1.672621777E-27;            // Proton mass kg
var GC_MN = 1.674927351E-27;            // Neutron mass kg
var GC_ME = 9.10938291E-31;             // Rest mass electron kg
var GC_AMU = 1.660538921e-27;           // (unified) atomic mass unit kg
var GC_EV = 1.602176565e-19;            // Electron Volt J
var GC_H = 6.62606957e-34;              // Planck constant J.s
var GC_RYD = 10973731.568539;           // Rydberg constant m^-1
var GC_SIGMA_SB = 5.670373e-8;          // Stefan-Boltzmann constant J/m^2/K^4/s
var GC_ALPHA = 7.2973525698e-3;         // Fine Structure constant
var GC_R = 8.3144621;                   // Universal Gas constant J/mol/K
var GC_HBAR = 1.054571726e-34;          // Reduced Planck constant J.s
var	GC_E = 1.602176565e-19;             // Electron charge C
var GC_MICRO0 = 4E-7;                   // Permeability of free space µ0  H mÒ1
var GC_E0 = 8.854E12;                   // Permittivity of free space  F m-1
var GC_ATM = 1.01325E5;                 // Standard Atmospheric Pressure on Earth 1 atm  N mÒ2 (Pa)          
   
// CONVERSIONS

var GC_EARTH_RADII_TO_KM = 6371;    // x Earth Radii by mean constant = km
var GC_KM_TO_MILES = 0.621371192;   // x km by constant
var GC_PC_TO_LY = 3.261633;         // parsec x PC_TO_LY = lightyear
var GC_LY_TO_PC = 3.261633          // LY / LY_TO_PC = Parsec
var GC_GCM3_KGM3 = 1000;            // x gcm3 by 1000
var GC_J_TO_eV = 6.242e+18;         // x J to Electron Volts 