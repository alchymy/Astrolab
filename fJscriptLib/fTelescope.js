
/*

The ALTScopeObj.js file contains Telescope calculation functions
The JavaScript format to use a function under 'cTSCope' is as per the example below

 x = telescope.FRatio(f, a) 

in an application page.

'telescope' is effectively an 'object' with methods listed within the { } and separated by ',' until the last
method.

*/


var telescope = {

	calcFRatio: function(focalLen, aperture) {
		return focalLen / aperture;
	},

	calcFocalLen: function(fRatio, aperture) {
		return fRatio * aperture;
	},

	calcAperture: function(fRatio, focalLen) {
		return focalLen / fRatio;
	},

	calcWavelengthAiry: function(airyDiam, apertureAiry) {
		return airyDiam * apertureAiry / 1.22;
	},

	calcApertureAiry: function(airyDiam, wavelengthAiry) {
		return wavelengthAiry * 1.22 / airyDiam;
	},

	calcAiryDiam: function(apertureAiry, wavelengthAiry) {
		return wavelengthAiry * 1.22 / apertureAiry;
	},

	calcTeleFocalLenMag: function(EPFocalLen, mag) {
		return EPFocalLen * mag;
	},

	calcEPFocalLenMag: function(teleFocalLen, mag) {
		return teleFocalLen / mag;
	},

	calcMagnification: function(teleFocalLen, EPFocalLen) {
		return teleFocalLen / EPFocalLen;
	}
};

