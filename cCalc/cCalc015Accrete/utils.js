/*----------------------------------------------------------------------*/
/*  This function returns a random real number between the specified    */
/* inner and outer bounds.                                              */
/*----------------------------------------------------------------------*/


function random_number (inner, outer)
{
     var delta = fabs(outer - inner);
     if (inner < outer)
       return (inner + delta * genrand_real3());
     else
       return (outer + delta * genrand_real3());
}


/*----------------------------------------------------------------------*/
/*   This function returns a value within a certain variation of the    */
/*   exact value given it in 'value'.                                   */
/*----------------------------------------------------------------------*/

 
function about (value, variation)
{
  var inner = value - variation;
  return (inner + 2.0 * variation * genrand_real3());
}



function random_eccentricity ()
{
     return(1.0 - pow((double)(genrand_real3()),ECCENTRICITY_COEFF));
}
