define([], function() {

    navigator.sayswho = (function() {
        var N = navigator.appName,
            ua = navigator.userAgent,
            tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        return M;
    })();

    var platform = 'unknown',
        browser = navigator.sayswho[0],
        browserVersion = navigator.sayswho[1],
        device;

    browser = browser.toLowerCase();

    if (navigator.appVersion.indexOf("Win") != -1) platform = "windows";
    if (navigator.appVersion.indexOf("Mac") != -1) platform = "mac";
    if (navigator.appVersion.indexOf("X11") != -1) platform = "unix";
    if (navigator.appVersion.indexOf("Linux") != -1) platform = "linux";
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
        platform = 'ios';
    }
    if (navigator.appVersion.indexOf("Android") != -1) platform = "android";

    function isIE() {
        return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null)));
    };

    if (isIE()) {
        // $('html').addClass('internet-explorer');

    }

    device = (platform === 'ios' || platform === 'android') ? true : false;

    return {
        isDevice: function() {
            return device;
        },
        isMobile: function() {
            var w = $(window).width();
            var h = $(window).height();
            if (device) {
                var portrait = (h > w) ? true : false;
                if (portrait && w < 480 || !portrait && w < 768) return true;
                else return false;
            } else return false;
        },
        isTablet: function() {
            var scope = this;
            if (device && !scope.isMobile()) return true;
            else return false;
        },
        isChrome: function() {
            var chrome = (browser === 'chrome') ? true : false;
            return chrome;
        },
        isSafari: function() {
            var safari = (browser === 'safari') ? true : false;
            return safari;
        },
        isFirefox: function() {
            var ff = (browser === 'firefox') ? true : false;
            return ff;
        },

        isIe: function() {
            return isIE();
        },

        isAndroid: function(){
            return platform === 'android';
        }
    };

});