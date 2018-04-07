/*

This .js file contains Magnitude calculation functions.

The JavaScript format to use a function under 'magnitude' is as per the example below

 x = magnitude.calcVisualMag (distance, absoluteMag) 

in an application page.

'magnitude' is effectively an 'object' with methods listed within the { } and separated by ',' until the last
method.

This file requires fConstVar.js to be loaded first so global constants are available.

*/

var magnitude = {

   calcApparentAngle: function (distance, absoluteMag) {
      distance /= GC_LY_TO_PC;

      var mag = absoluteMag - 5 + (5 * Math.log10(distance));
      return mag;
   },
   
  calcDistance: function (visualMag, absoluteMag) {
      var distance = Math.pow(10, (visualMag - absoluteMag + 5) / 5);
     distance *= GC_PC_TO_LY;

   },
   
  calcAbsoluteMagLY: function (distanceLY, visualMag) {

      distance = distanceLY / GC_LY_TO_PC;   // Convert LY to parsecs

      var mag = visualMag + 5 - (5 * Math.log10(distance));
      return mag;
   },
   
  calcAbsoluteMagPc: function (distancePc, visualMag) {

      var mag = visualMag + 5 - (5 * Math.log10(distance));
      return mag;
   },

  calcBrightMag: function (dimMag, ratio) {
      var magDiff = 2.5 * Math.log10(ratio);

      return dimMag - magDiff;
   },

  calcDimMag: function (ratio, brightMag) {
      var magDiff = 2.5 * Math.log10(ratio);

      return brightMag + magDiff;
   },

  calcBrightnessRatio: function (dimMag, brightMag) {
      var x = 0.4 * (dimMag - brightMag);
      var ratio = Math.pow(10, x);
      return ratio;
   },

  calcCombinedMag: function (mags) {
      var x = 0;
      for (var i = 0; i < mags.length; i++) {
         x += Math.pow(10, (-0.4 * mags[i]));
      }
      var combinedMag = -2.5 * Math.log10(x);
      return combinedMag;
   }

};

