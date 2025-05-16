define(['jquery','modules/agent'], function($, agent){
    'use strict';
    // var preload = require('modules/pre-loader');
    // var agent = require('modules/agent');
    var images = [];
    var slideshowCount=0;
    var next = false;
    var back = false;
    var bgtransition = false;

    var self = {
        init: function(){
            // console.log('product.js runningg');
            var Mobile = agent.isMobile();
            var Tablet = agent.isTablet();

            // console.log("agent.isMobile() is ", Mobile); 
            // console.log("agent.isTablet() is ", Tablet); 


            if (!Mobile){ // overlook this............
                //preload the slideshow images
                // console.log("not mobile, so preload..");
                require(['modules/pre-loader'], function(preLoader){
                  new preLoader([ 
                    "assets/newphotos/pasture.jpg",
                    "assets/newphotos/nugent4.jpg",
                    "assets/newphotos/mackelvie2.jpg",
                    "assets/newphotos/atomic.jpg",
                    "assets/newphotos/rockhouse2.jpg",
                    "assets/newphotos/nugent3.jpg",
                    "assets/newphotos/nuffield.jpg",
                    "assets/newphotos/roost.jpg"], 
                    {
                     onProgress: function(src, element, index){
                         if (element){
                             // console.log|('loaded ' + src);
                             // gets optional reference to element you can use: 
                             // document.appendChild(element); 
                         }
                         else {
                             // console.log('failed ' + src);
                         }
                  
                         // output some stats 
                         var donePercent = Math.floor((100 / this.queue.length) * this.completed.length);
                         // console.log(donePercent + '% completed', this.completed.length + this.errors.length + ' / ' + this.queue.length + ' done');
                     },
                     onComplete: function(loaded, errors){
                         // console.log('cache primed with:', loaded);
                         errors && errors.length && console.log('the following images failed to preload:', errors);
                     }

                  });
                });
             }

            $(".nextArrow").click(function(){ 
              console.log("nextarrowclick");
                var $this = $(this),
                  slideshowParent = $this.closest('.product-slideshow');
                  if (!bgtransition){
                  next = true;
                  back = false;
                  self.bgslideshow(slideshowParent);
                };
            });
          
            $(".backArrow").click(function(){ 
              var $this = $(this),
                  slideshowParent = $this.closest('.product-slideshow');
                if (!bgtransition){
                back = true;
                next = false;
                self.bgslideshow(slideshowParent);
                // console.log(" back, slideshowCount = ", slideshowCount);
              };
            });


          
            $(".technicalTitle").click(function(){ 
              $(this).next(".downloadInfo" ).slideToggle( "slow" );
              $(this).find(".arr-down" ).toggleClass('flipper');
              $(this).find(".arrowContainer" ).toggleClass('mover');
            });

        },

        bgslideshow: function(parent){

              bgtransition = true;
              var $slides = $(parent).closest('[data-slides]'),
              images = $slides.data('slides'),
              count = images.length;
          
              if(slideshowCount>=count-1 && next){ //catch next and over image.count
                  slideshowCount=0;
                }
              else if (slideshowCount < count && next){
                  slideshowCount++;
                };
            
              if(slideshowCount<=0 && back){ //catch back and less < 0
                  slideshowCount=count-1;
                }
              else if (slideshowCount >= 0 && back){
                  slideshowCount--;
                };
            $slides.css('background-image', 'url("' + images[slideshowCount] + '")');
            
            setTimeout(function(){bgtransition = false;}, 750 );

        } //end of bgslideshow 
    };

    return self;
});