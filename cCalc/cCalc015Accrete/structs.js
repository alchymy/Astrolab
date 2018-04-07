

// typedef struct dust_bands_record  *dust_pointer;

var dust_bands_record = {
    inner_edge:0,
    outer_edge:0,
    dust_present:0,
    gas_present:0,
    dust_pointer  next_band:0;
};

// typedef struct planets_record  *planet_pointer;

var planets_record = {
    a:0,			/* semi-major axis of the orbit (in AU)*/
    e:0,			/* eccentricity of the orbit	     */
    mass:0,		/* mass (in solar masses)	     */
    gas_giant:0,		/* TRUE if the planet is a gas giant */
    orbit_zone:0,             /* the 'zone' of the planet          */
    radius:0,		/* equatorial radius (in km)	     */
    density:0,		/* density (in g/cc)		     */
    orbital_period:0,	/* length of the local year (days)   */
    day:0,			/* length of the local day (hours)   */
    int resonant_period;	/* TRUE if in resonant rotation   */
    int axial_tilt;		/* units of degrees		     */
    double escape_velocity;	/* units of cm/sec		     */
    double surface_accel;	/* units of cm/sec2		     */
    double surface_grav;	/* units of Earth gravities	     */
    double rms_velocity;	/* units of cm/sec		     */
    double molecule_weight;	/* smallest molecular weight retained*/
    double volatile_gas_inventory;
    double surface_pressure;	/* units of millibars (mb)	     */
    int greenhouse_effect;	/* runaway greenhouse effect?	*/
    double boil_point;		/* the boiling point of water (Kelvin)*/
    double albedo;		/* albedo of the planet		     */
    double surface_temp;	/* surface temperature in Kelvin     */
    double hydrosphere;		/* fraction of surface covered	     */
    double cloud_cover;		/* fraction of surface covered	     */
    double ice_cover;		/* fraction of surface covered	     */
    planet_pointer first_moon;
    planet_pointer next_planet;
} planets;


/* global variables from main. */
var anum;
// var planet_pointer planet_head;
var stellar_mass_ratio, stellar_luminosity_ratio, main_seq_life;
var age, r_ecosphere, r_greenhouse, radians_per_rotation;
var spin_resonance;

