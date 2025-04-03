define(['jquery'], function($){
    'use strict';
    var self = {
        init: function(){

        // console.log('app.js init running');

        var state = window.location.pathname;
         // console.log("app.js init - state is ", state);
         console.log(" %c design by evacharlton.com, development by emiledrescher.com ", 'background:black; font-size:18px; color: white; font-weight:bold;')
       
         switch(state){
          case '/index.html':
          require(['pages/home'], function(home) {
              'use strict';
              home.init();
          });
          break;
          case '/index':
          require(['pages/home'], function(home) {
              'use strict';
              home.init();
          });            
          break;
          case '/':
          require(['pages/home'], function(home) {
              'use strict';
              home.init();
          });            
          break;
          case '/products.html':
          require(['pages/products'], function(products) {
              'use strict';
              products.init();
          });           
          break;
          case '/products':
          require(['pages/products'], function(products) {
              'use strict';
              products.init();
          }); 
          break;
         }

            $(window).on('beforeunload', function() {
                $(window).scrollTop(0); 
            });
            

            // touching Shugg Logo brings you to the top
                $(".indexMenuTitle").click(function(){ 
                $('html, body').animate({
                        scrollTop: 0
                      }, 800);
              });

              //animate & handle page hash scrolls
                $('a[href*="#"]:not([href="#"])').click(function() {
                  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                      $('html, body').animate({
                        scrollTop: target.offset().top
                      }, 1000);
                      return false;
                    }
                  }
                });
              
              
              // mobile menu || hamburger logic
              
              var mobileMenuActive = false;
                $(".mobileMenu").click(function(){
                  if (!mobileMenuActive){ 
                    openMobileMenu();
                  }
                  else{ 
                    closeMobileMenu();
                  }
                });
              
              
              
                $(".mobileContainer").on("touchstart",function(){
                    closeMobileMenu();
                });

                $(".mobileContainer").click(function(){
                    closeMobileMenu();
                });

                $(".menuLinks").on("click",function(){
                  closeMobileMenu();
                  }); 
              
                function closeMobileMenu(){
                    $(".bar:nth-of-type(1)").removeClass("hamBar1");
                    $(".bar:nth-of-type(2)").removeClass("hamBar2");
                    $(".bar:nth-of-type(3)").removeClass("hamBar3");
                    $(".mobileContainer").removeClass("showMenu");  
                    $(".mobileMenuText").removeClass("showMobileText");   
                    $("html, body").removeClass("noScroll");
                    mobileMenuActive = false;
                }
              
                function openMobileMenu(){
                    $(".bar:nth-of-type(1)").addClass("hamBar1");
                    $(".bar:nth-of-type(2)").addClass("hamBar2");
                    $(".bar:nth-of-type(3)").addClass("hamBar3");
                  mobileMenuActive = true;
                    $(".mobileContainer").addClass("showMenu");   
                    $(".mobileMenuText").addClass("showMobileText");  
                    $("html, body").addClass("noScroll"); 
                }

                //touch behaviour

                var touch = window.ontouchstart
                            || (navigator.MaxTouchPoints > 0)
                            || (navigator.msMaxTouchPoints > 0);
                
                if (touch) { // remove all :hover stylesheets
                    try { // prevent exception on browsers not supporting DOM styleSheets properly
                        for (var si in document.styleSheets) {
                            var styleSheet = document.styleSheets[si];
                            if (!styleSheet.rules) continue;
                
                            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                                if (!styleSheet.rules[ri].selectorText) continue;
                
                                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                                    styleSheet.deleteRule(ri);
                                }
                            }
                        }
                    } catch (ex) {}
                }

      }
    };

    return self;
});
