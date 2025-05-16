requirejs.config({
    baseUrl: "js",
    paths: {
        //the libraries we use - like shortcuts
        'jquery': [
        'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min',
        //if the CDN fails, load the local version below..
        'lib/jquery.min'
        ],
        'velocity': 'lib/velocity.min',
        'velocity-ui': 'lib/velocity.ui.min', 
        'skrollr': 'lib/skrollr.min',
        'bootstrap': 'lib/bootstrap',
    }

});

require(['app'], function(app) {
    'use strict';
    app.init();
});
