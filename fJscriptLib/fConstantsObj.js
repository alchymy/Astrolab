
// Constants - for objects with properties the format is - "{ {},{} }; "
// not the JSON / array format which is as follows - " [ {},{} ]; "


// ASTROPHYSICAL CONSTANTS (global constant = name: below)

var ACONST = {
               AU: { value:149597870700, error:0, desc:"Astronomical Unit in m as fixed by IAU Aug 2012", units:"m", origin:"" },
       GALNPOLERA: { value:192.25, error:0, desc:"Galactic North Pole RA Epoch 1950.0" },
     GALNPOLEDECL: { value:27.4, error:0, desc:"Galactic North Pole Decl Epoch 1950.0" },
  GALPLANEASCNODE: { value:33, error:0, desc:"Galactic Plane Asc Node (l)Epoch 1950.0" },
           JANSKY: { value:1E-26, error:0, units:"", desc:"Jansky constant", origin:"" },
               PC: { value:3.086E16, error:-1, desc:"Parsec", units:"m", origin:"Kay & Laby"},
              KPC: { value:3.08568024696e21, error:-1, desc:"KiloParsec", units:"m", origin:"" },
               LY: { value:9.46053E+15, error:0, desc:"Light year", units:"m" },
       EARTH_YEAR: { value:31557600, error:0, desc:"Year in seconds", units:"seconds", origin:"" },
       EARTH_MASS: { value:5.976E24, error:0, desc:"", units:"Kg"},             
     EARTH_RADIUS: { value:6.3781363E6, error:0, desc:"Earth Radius", units:"m"},
EARTHSIDEREALYEAR: { value:3.15581450E+07, desc:"Earth Sidereal Year" },
         MOONMASS: { value:7.35E+22, desc:"Lunar mass", units:"kg"},
       MOONRADIUS: { value:1738000.0, desc:"Lunar radius", units:"m"},
     MOONDISTANCE: { value:384400000.0, desc:"Lunar distance to Earth", units:"m"},
MOONORBITALPERIOD: { value:27.322, desc:"Orbital Period", units:"days"},
   MOONORBITALECC: { value:0.054900, desc:"Orbital Eccentricity"},
   MOONORBITALINC: { value:5.145396, desc:"Orbital Inclination"},
MOONMEANEPOCHLONG: { value:318.351648, desc:"Longitude at epoch 1990"},
 MOONMEANPERILONG: { value:36.340410, desc:"perihelion"},
          MOONSMA: { value:384401, desc:"Semi major axis", units:"km"},
      MOONASCNODE: { value:318.351648, desc:"ascending node"},
      MOONANGDIAM: { value:0.5181, desc:"Degrees at 1a"},
     MOONPARALLAX: { value:0.9507, desc:"At 1a"},
         MOONVMAG: { value:0.0, desc:"At 1a"},
       SUN_RADIUS: { value:695990000.0, desc:"Solar radius", units:"m"},
   SUN_LUMINOSITY: { value:3.826E+26, desc:"Solar luminosity", units"J/s"},
  SUN_ANGDIAMETER: { value:0.533128, desc:"Angular diameter at 1AU", units:"deg"},  
         SUN_MASS: { value:1.9889E30, error:0, desc:"Suns mass", units:"Kg"}
};

// MATHS CONSTANTS (global var = MC_xx)

var MCONST = {
                E: { value:2.718281828459 },
             LOGE: { value:0.4342944819033 },
               PI: { value:3.1415926535898, desc:"Pie", units:"none"}
};


// PHYSICAL CONSTANTS - as PCONST object with properties (global var = PC_xx)

var PCONST = {
                C: { value: 2.99792458e8, error:0, desc:"Speed of Light", units:"m/s",  origin:"CODATA"},          
                G: { value:6.67384e-11, error:8.0e-15, desc:"Gravitational constant", units:"N m2 kg-2 / m3 kg-1 s-2", origin:"CODATA" },
              GAE: { value:9.80665, error:0, desc:"Acceleration due to gravity on Earth", units:"m sñ2" },
               RH: { value:13.60569253, error:0, desc:"Rydberg constant (energy units)", units:"eV" },
               HM: { value:1.67E-27, error:0, desc:"Mass of hydrogen atom", units:"kg" },  
               AN: { value:6.02214129E23, error:2.7e-30, desc:"Avogadro's number", units:"/mol" },
                K: { value:1.3806488E-23, error:1.3e-29, desc:"Boltzmannís constant", units:"J Kñ1", origin:"CODATA" },         		
               PM: { value:1.672621777E-27, error:0, desc:"Proton mass", units:"kg" },
               NM: { value:1.674927351E-27, error:0, desc:"Neutron mass", units:"kg" },
               EM: { value:9.10938291E-31, error:0, desc:"Rest mass electron", units:"kg" }, 
              AMU: { value:1.660538921e-27, error:7.3e-35, desc:"(unified) atomic mass unit", units:"kg", origin:"" },
               EV: { value:1.602176565e-19, error:3.5e-27, desc:"Electron Volt", units:"J", origin:"CODATA" },
                H: { value:6.62606957e-34, error:2.9e-41, desc:"Planck constant", units:"J.s", origin:"CODATA" },
              RYD: { value:10973731.568539, error:0.000055, desc:"Rydberg constant", units:"m^-1" },
         SIGMA_SB: { value:5.670373e-8, error:2.1e-13, desc:"Stefan-Boltzmann constant", units:"J/m^2/K^4/s", origin:"CODATA" },
            ALPHA: { value:7.2973525698e-3, error:2.4e-12, desc:"Fine Structure constant", units:"", origin:"CODATA" },
                R: { value:8.3144621, error:0.0000075, desc:"Universal Gas constant", units:"J/mol/K" },
             HBAR: { value:1.054571726e-34, error:4.7e-42, desc:"Reduced Planck constant", units:"J.s", origin""CODATA" },
	            E: { value:1.602176565e-19, error:3.5e-27, desc:"Electron charge", units:"C" },
           MICRO0: { value:4E-7, error:0, desc:"Permeability of free space µ0", units:"H mñ1 " },
               E0: { value:8.854E12, error:0, desc:"Permittivity of free space", units:"F m-1" },
              ATM: { value:1.01325E5, error:0, desc:"Standard Atmospheric Pressure on Earth   1 atm", units:"N mñ2 (Pa)"}             
};

 
// CONVERSIONS

var  CONV = {
     EARTH_RADII_TO_KM: {value:6371},              // x Earth Radii by mean constant = km
           KM_TO_MILES: {value:0.621371192},       // x km by constant
              PC_TO_LY: {value:3.261633},          // parsec x PC_TO_LY = lightyear
			 GCM3_KGM3: {value:1000},              // x gcm3 by 1000
			  J_TO_eV:  {value:6.242e+18}          // x J to Electron Volts 
};
	 
   
/*
		// TIME
		YR = new Constant(31557600,0,'Year','','s');

		// SOLAR QUANTITIES
		L_sun = new Constant(3.839e26,-1,'Solar luminosity','','J/s');
		T_sun = new Constant(5.780e3,-1,'Solar temperature','','K');

*/