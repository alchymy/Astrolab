(function(){
	
	
	/*
	 * Create the jQuery slideshow plugin.
	 * This allows you to do the following:
	 * 	- $('div.js-slideshowy').slideshow();
	 */
	$.fn.slideshow = function(settings){
  	return this.each(function(){
			new Slideshow(this, settings);
		});
  };
	
	
	
	/*
	 * Class: Slideshow
	 * 
	 */
	function Slideshow(slideshowContainer, settings){
		this.initialise(slideshowContainer, settings);	
	};
	
	// Class definition
	Slideshow.prototype = {
		
		// Properties
		
		// imageViewer properties
		imageViewer: null,
		imageViewerCurrentImage: null,
		imageViewerNextImage: null,
		
		
		// controlPanel properties
		controlPanel: null,
		controlPanelNext: null,
		controlPanelPrevious: null,
		controlPanelPlayPause: null,
		controlPanelViewThumbnails: null,
		
		
		// thumbnailViewer
		thumbnailViewer: null,
		thumbnailViewerThumbnails: null,
		thumbnailAnchorList: null,
		
		
		// General properties
		slideshowContainer: null,
		loadingLayer: null,
		
		currentImageIndex: null,
		userRequestedImageIndex: null, // Set when a commmand from the control panel is called
		fullSizeImageCache: null,
		isSlideshowPaused: null,
		slideshowTimeout: null,
		
		settings: null,
		// End Properties
		
		
		/*
		 * Function: initialise
		 * The main purpose of this function is to create
		 * all the necessary components that make up the slideshow,
		 * load all the full size images from the server
		 * and kick start the slide show.
		 */
		initialise: function(slideshowContainer, settings){
			
			var self = this;
			
			// Ensure that the container tag is a 'div' HTML element
			if (slideshowContainer.tagName != 'DIV'){
				throw 'Image Gallery - Invalid container element'; 	
			}
			
			// Set default settings
			self.settings = {
				crossFadeSpeed: 1500,	// 1.5 second
				slideShowSpeed: 2500	// 2.5 seconds
			}
			
			// Merge default settings with custom items using jQuery "extend()" function
			$.extend(self.settings, settings)
			
			
			// Store the slideshow container e.g. <div class="js-slideshow"></div> 
			// as a jQuery object. This is so we can resuse the object throughout our class
			// without having to requery the DOM
			self.slideshowContainer = $(slideshowContainer);
			
			
			// Create the loading layer
			self.loadingLayer = $('<div class="loading-layer"></div>');
			self.loadingLayer
					.css('opacity', 0.60)
					.appendTo(self.slideshowContainer);
			
			
			// Create the image viewer.
			// The image viewer contains two divs - 
			//	- imageViewerCurrentImage - the current image displayed
			//	- imageViewerNextImage - the next image to be faded in
			self.imageViewer = $('<div class="image-viewer"></div>');
			
			self.imageViewerCurrentImage = $('<div class="image-viewer-current-image"></div>');
			self.imageViewerCurrentImage.appendTo(self.imageViewer);
			self.imageViewerNextImage = $('<div class="image-viewer-next-image"></div>');
			self.imageViewerNextImage.appendTo(self.imageViewer);
			
			self.imageViewer.appendTo(self.slideshowContainer);
			
			
			// Create the thumbnail viewer and append the current thumbnails
			// to the thumbnail viewer
			self.thumbnailViewer = $('<div class="thumbnail-viewer"></div>');
			
			var thumbnailsUnorderedList = $('ul', self.slideshowContainer);
			thumbnailsUnorderedList
				.remove()
				.appendTo(self.thumbnailViewer)
				.show();
				
			// Append the thumbnail viewer to the slideshow
			self.thumbnailViewer
				.css('opacity', 0.85)
				.appendTo(self.slideshowContainer)
				.hide();
			
			
			// Create the control panel
			self.controlPanel = $('<div class="control-panel"></div>');
			self.controlPanel.css('opacity', 0.75);
			
			// Create the 'Previous' control panel button
			self.controlPanelPrevious = $('<div class="previous"></div>');
			self.controlPanelPrevious.appendTo(self.controlPanel);
			
			// Create the 'Play/Pause' control panel button
			self.controlPanelPlayPause = $('<div class="play"></div>');
			self.controlPanelPlayPause.appendTo(self.controlPanel);
			
			// Create the 'Next' control panel button
			self.controlPanelNext = $('<div class="next"></div>');
			self.controlPanelNext.appendTo(self.controlPanel);
	
			// Create the 'View Thumbnails' control panel button
			self.controlPanelViewThumbnails = $('<div class="view-thumbnails"></div>');
			self.controlPanelViewThumbnails.appendTo(self.controlPanel);
			
			// Add the control panel to the slideshow
			self.controlPanel.appendTo(self.slideshowContainer).hide();
			self.hideControlPanel();
			
			
			// Store a reference to all the thumnbnail anchor tags.
			self.thumbnailAnchorList = $('a', self.thumbnailViewer);
			
			// Create an empty image cache
			self.fullSizeImageCache = [];
			
			
			// By default, the slideshow is not paused
			self.isSlideshowPaused = false;
			
			// Set the starting image index
			self.currentImageIndex = 0;
			
			
			// Preload the all the full size images.
			// When the images have been loaded, 
			// attach event handlers so the user can interact
			// with the slideshow and then show the first image.
			self.loadFullSizeImages(
				function(){
					self.attachEventHandlers();
					self.hideLoadingLayer();
					self.showImage(self.currentImageIndex);
				}
			);
		
		},
		
		
		/*
		 * Function: attachEventHandlers
		 * Attach event handlers to the slideshow.
		 * These allow the user to interact with the slideshow.
		 */
		attachEventHandlers: function(){
			
			var self = this;
			
			// Set up the mouse over and mouse out events on the slideshow
			// When the mouse moves over, we will show the control panel
			// When the mouse moves out, we will hide the control panel
			self.slideshowContainer.hover(
				
				// Mouse over
				function(){
					self.showControlPanel();
				},
				
				// Mouse out
				function(){
					self.hideControlPanel();	
				}
				
			);
			
			
			// On click of "Next" show next image
			self.controlPanelNext.click(function(){
				// Show next image
				self.showImage(self.currentImageIndex+1, true);
			});
				
				
			// On click of "Previous" show next image
			self.controlPanelPrevious.click(function(){
				// Show previous image
				self.showImage(self.currentImageIndex-1, true);
			});
			
			
			// On toggle of  "Play/Pause" 
			self.controlPanelPlayPause.toggle(
			
				// Pause
				function(){
					// Pause slideshow
					self.controlPanelPlayPause.addClass('paused');
					self.isSlideshowPaused = true;
					self.stopSlideshow();
				},
				
				// Play
				function(){
					// Resume slideshow
					self.controlPanelPlayPause.removeClass('paused');
					self.isSlideshowPaused = false;
					self.showImage(self.currentImageIndex+1);
				}
			);
			
			
			// Toggle 'show/hide' thumbnails
			self.controlPanelViewThumbnails.toggle(
			
				// Show thumbnails
				function(){
					self.showThumbnails();	
				},
				
				// Hide thumbnails
				function(){
					self.hideThumbnails();
				}
			);
			
			
			// Hide the thumbnails if the user clicks on the image viewer
			self.imageViewer.click(function(){
				self.hideThumbnails();
			});
			
			
			// On click of a thumbnail
			$('a', self.thumbnailViewer).click(function(){
				
				// Find out the index number of the clicked thumbnail
				var thumbnailIndexClicked = $.inArray(this, self.thumbnailAnchorList);
				
				// Request to show the clicked thumbnail
				self.showImage(thumbnailIndexClicked, true);
				
				// return false to prevent the anchor
				// element firing it's default event
				// i.e. to display the full size image as a new 'page'
				return false;
				
			});
			
		},
		
		
			
		/*
		 * Function: showControlPanel
		 * Show the control panel
		 */
		showControlPanel: function(){
			
			var self = this;
			
			if (self.controlPanel.css('display') != 'none'){
				// The controlPanel is already visible
				return;
			}
			
			self.controlPanel
				.hide()
				.fadeIn('fast');
			
		},
		
		
		
		/*
		 * Function hideControlPanel
		 * Hide the control panel
		 */
		hideControlPanel: function(){
			
			var self = this;
			
			if (self.controlPanel.css('display') == 'none'){
				// The controlPanel is already hidden
				return;
			}
			
			self.controlPanel
				.show()
				.fadeOut('fast');

		},
		
		
		
		/*
		 * Function: showThumbnails
		 * Shows the thumbnails
		 */
		showThumbnails: function(){
			
			var self = this;	
			self.controlPanelViewThumbnails.addClass('hide-thumbnails');
			self.thumbnailViewer.show();
			
		},
		
		
		
		/*
		 * Function: hideThumbnails
		 * Hides the thumbnails
		 */
		hideThumbnails: function(){
			
			var self = this;
			self.controlPanelViewThumbnails.removeClass('hide-thumbnails');
			self.thumbnailViewer.hide();
			
		},
		
		
		
		/*
		 * Function: showLoadingLayer
		 * Show the Loading Layer
		 */
		showLoadingLayer: function(){
			
			var self = this;
			self.loadingLayer.show();
			
		},
		
		
		
		/*
		 * Function: hideLoadingLayer
		 * Hide the Loading Layer
		 */
		hideLoadingLayer: function(){
			
			var self = this;
			self.loadingLayer.hide();
			
		},
		
		
		
		/*
		 * Function: stopSlideshow
		 * Stops the slide show
		 */
		stopSlideshow: function(){
			
			var self = this;
			window.clearTimeout(self.slideshowTimeout);
			
		},
		
		
		
		/*
		 * Function: startSlideshow
		 * Start the slide show
		 */
		startSlideshow: function(){
			
			var self = this;
			
			var timeoutSpeed, startingImageIndex
			
			if (self.userRequestedImageIndex == null){
				// The user has not specifically requested an image to view
				timeoutSpeed = self.settings.slideShowSpeed;
				startingImageIndex = self.currentImageIndex+1;
			}
			else{
				// The user has requested a specific image to view
				timeoutSpeed = 0; // Show immediately
				startingImageIndex = self.userRequestedImageIndex;
				self.userRequestedImageIndex = null;
			}
		
			self.slideshowTimeout = window.setTimeout(
				function(){
					self.showImage(startingImageIndex);
				}, 
				timeoutSpeed
			);
			
		},
								
	
	
		/*
		 * Function: showImage
		 * Shows an image given an index number. 
		 * This is the core function for the slideshow.
		 */
		showImage: function(imageIndexToShow, chosenByUser){
			
			var self = this;
			
			if (chosenByUser){
				if (self.imageViewerNextImage.is(':animated')){
					self.userRequestedImageIndex = imageIndexToShow;
					return;
				}
			}
			
			// Stop the slide show. 
			// This will be restarted once the requested
			// image to has been loaded and faded in.
			self.stopSlideshow();
		
			// Array boundary checks
			if (imageIndexToShow >= self.thumbnailAnchorList.length){
				imageIndexToShow = 0;
			}
			else if (imageIndexToShow < 0){
				imageIndexToShow = self.thumbnailAnchorList.length - 1;
			}
			
			// Store a reference to the current image index
			self.currentImageIndex = imageIndexToShow;
			
					
			// Add the requested image to the imageViewerNextImage div.
			// This image will be faded in over the top of the current image
			self.imageViewerNextImage
				.empty()
				.hide()
				.append(self.fullSizeImageCache[self.currentImageIndex])
				.fadeIn(
					self.settings.crossFadeSpeed,
					function(){
						self.nextImageFadedIn();
					}
				);
		},
		
		
		/*
		 * Function: nextImageFadedIn
		 */
		nextImageFadedIn: function(){
			
			var self = this;
		
			// Swap the contents of imageViewerCurrentImage div with 
			// imageViewerNextImage div when the fade in has ended.
			// This frees up imageViewerNextImage ready to fade in 
			// any new image.
			self.imageViewerNextImage.empty().hide();
			self.imageViewerCurrentImage
				.empty()
				.append(self.fullSizeImageCache[self.currentImageIndex])
				.show();
			
			// Restart the slideshow
			if (!self.isSlideshowPaused){
				self.startSlideshow();	
			}
							
		},
		
		
		
		/*
		 * Function: loadFullSizeImages
		 * Loads full size images into the cache.
		 * When all have been loaded, call the function
		 * specified by the "callback" parameter.
		 */
		loadFullSizeImages: function(callback){
			
			var self = this;
			
			// Pause for 3/4s of a second to prevent the loading layer
			// flickering if the images load too fast.
			setTimeout(
				function(){
					
					var imageLoader = new ImagePreloader();
					
					// Build up an array of image urls to load.
					// This is required by the ImagePreloadeer.
					var imageUrls = [];
					for (var i=0, anchorElement; anchorElement = self.thumbnailAnchorList[i]; i++){
						imageUrls.push(anchorElement.href);
					}
					
					imageLoader.initialise(
						imageUrls, 
						
						function(images, totalLoaded, totalErrored, totalAborted){
							
							// Store all loaded images into the cache.
							for (var i=0, image; image = images[i]; i++){
								self.fullSizeImageCache.push(image);
							}
							
							// If a callback has been passed, then call that function.
							if (callback != null){
								callback.call(self);
							}
						
						}
					);
					
				},
				750
			);
			
		}
		
	}
	
	
})();