//------------------------------------------------------------------------------
// Supply an array of images urls to preload and a callback function.
// Will pass a new array of image objects, total loaded, total errored 
// and total aborted to the callback function.
// eg.
// var imageLoader = new ImagePreloader();
// imageLoader.initialise(
//  	new Array("image1.gif", "image2.gif"), 
//  	function(images, totalLoaded, totalErrored, totalAborted){
//			alert(totalLoaded);
//		}
// );
//------------------------------------------------------------------------------
function ImagePreloader(){};
ImagePreloader.prototype = {
	
	callBack: null,
	images: null,
	totalImagesLoaded: 0,
	totalImagesErrored: 0,
	totalImagesAborted: 0,
	totalImagesProcessed: 0,
	
	initialise: function(imageUrls, callBack){
		var ref = this;
		
		// store the call-back
		ref.callBack = callBack;

		// initialise internal state.
		ref.totalImagesLoaded = 0;
		ref.totalImagesErrored = 0;
		ref.totalImagesAborted = 0;
		ref.totalImagesProcessed = 0;
		ref.images = new Array();

		// record the number of images.
		ref.totalImagesToLoad = imageUrls.length;

		// for each image, call preload()
		for ( var i = 0; i < imageUrls.length; i++ ){
			ref.preload(imageUrls[i]);
		}   
	},
	
	preload: function(imageUrl)
	{
		var ref = this;
		
		// create new Image object and add to array
		var imageObj = new Image;
		ref.images.push(imageObj);

		// set up event handlers for the Image object
		imageObj.loaded = false; imageObj.onload = function(){ref.onImageLoad(imageObj);};
		imageObj.errored = false; imageObj.onerror = function(){ref.onImageError(imageObj);};
		imageObj.aborted = false; imageObj.onabort = function(){ref.onImageAbort(imageObj);};
		 
 		// assign the .src property of the Image object
		imageObj.src = imageUrl;
	},
	
	onComplete: function()
	{
		var ref = this;
		ref.totalImagesProcessed++;
		if (ref.totalImagesProcessed == ref.totalImagesToLoad){
			if (typeof ref.callBack == "function"){
				ref.callBack(ref.images, ref.totalImagesLoaded, ref.totalImagesErrored, ref.totalImagesAborted);
			}
		}
	},
	
	onImageLoad: function(imageObj){
		var ref = this;
		imageObj.loaded = true;
		ref.totalImagesLoaded++;
		ref.onComplete();
	},
	
	onImageError: function(imageObj){
		var ref = this;
		imageObj.errored = true;
		ref.totalImagesErrored++;
		ref.onComplete();
	},
	
	onImageAbort: function(imageObj){
		var ref = this;
		imageObj.aborted = true;
		ref.totalImagesAborted++;
		ref.onComplete();
	}
};