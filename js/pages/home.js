define(['jquery', 'velocity', 'velocity-ui'], function($, velocity){
    'use strict';
    
    var self = {
        init: function(){
            // console.log('home.js running');
			$("#tagline").velocity('transition.slideUpIn', 1500);

			if ($(window).width() > 1024) {
				require(['skrollr'], function(skrollr){
				    var s = skrollr.init();
				});
			}
	
			$(window).resize(function() {

				if ($(window).width() > 1024) {
					require(['skrollr'], function(skrollr){
					    var s = skrollr.init();
					});
				}
			});
            
            $(document).ready(function() {
                $('.hover').bind('touchstart touchend', function(e) { 
                    e.preventDefault();
                    $(this).toggleClass('hover_effect');
                });

            });

		//Home page title fade in - edit the numbers to change the distance from top the fade in happens
					
					var appearAnchor = $("#section3").offset().top;
					var appearAnchor1 = appearAnchor -500;
					var appearAnchor2 = appearAnchor1 +150;
					var appearAnchor3 = appearAnchor2 +150;
					var anchor1 = false;
					var anchor2 = false;
					var anchor3 = false;
					var fadein = false;
		
					var $element1 = $("#title3-1"),
					$element2 = $("#title3-2"),
					$element3 = $("#title3-3");
		
					$(window).scroll(function() {
						if ($(window).scrollTop() > screen.availHeight && !fadein){ //fade in menu after scroll
								$('.home-menu').fadeIn(1000);
								fadein = true;
							}
		
					if($(window).scrollTop() > appearAnchor1 && $(window).scrollTop() < appearAnchor2 && !anchor1) {
					anchor1 = true; //set anchor to true so this doesn't fire more then once.
							$element1.velocity( "transition.fadeIn", 2000 );
					}
		
					if($(window).scrollTop() > appearAnchor2 && $(window).scrollTop() < appearAnchor3 && !anchor2) {
						anchor2 = true;
								$element2.velocity( "transition.fadeIn", 2000 );
		
		
						if (!anchor1){
									$element1.velocity( "transition.fadeIn", 2000 );
									anchor1 = true;
						}
					}
		
					if($(window).scrollTop() > appearAnchor3 && !anchor3 ) {
						anchor3 = true;
								$element3.velocity( "transition.fadeIn", 2000 );
								if (!anchor1){
									$element1.velocity( "transition.fadeIn", 2000 );
									anchor1 = true;
						}
						if (!anchor2){
									$element2.velocity( "transition.fadeIn", 2000 );
									anchor2 = true;
						}
		
					}
					});

        }
    };

    return self;
});