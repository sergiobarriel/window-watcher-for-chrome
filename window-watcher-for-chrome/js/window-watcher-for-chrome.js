/**
 * @author: Sergio Barriel
 * @version: 1.0.0
 */

var windowwatcher;
var timeOutId;
var config;
var breackPoints;

$(document).ready(function(){

  // Create "Watcher"
  windowwatcher = createWindowWatcherDiv();

  // Shows on load
  watch(typeof config.watcher.time.onLoad == 'undefined' ? 2000 : config.watcher.time.onLoad);

  $(window).on('resize', function(){

      // Shows on resize
      watch(typeof config.watcher.time.onResize == 'undefined' ? 2000 : config.watcher.time.onResize);
  });

});

/**
 * This function create "Watcher" div based on window-watcher-config.json
 * @returns {jQuery}
 */
function createWindowWatcherDiv() {

    var styleString = '';

    // Get all CSS properties and create single string
    if(typeof config.watcher.style !== 'undefined') {
        for(var property in config.watcher.style) {
            styleString += property + ': ' + config.watcher.style[property] + '; ';
        }
    }

    // Create div
    var watcher = $('<div/>', {
        id: typeof config.watcher.id == 'undefined' ? 'window-watcher' : config.watcher.id,
        class: typeof config.watcher.class == 'undefined' ? 'window-watcher' : config.watcher.class,
        style: styleString
    }).appendTo('body');

    return watcher;
}

/**
 * This function get width and height of viewport and show its in "Watcher"
 * @param {number} time - Number os seconds to show the "Watcher"
 */
function watch(time) {

    // vars
    var w = $(window).width();
    var h = $(window).height();

    // Default values
    time = typeof time !== 'undefined' ? time : config.watcher.time.default;
    var speed = typeof config.watcher.speed !== 'undefined' ? config.watcher.speed : 100;

    // Clear existing IIF functions
    if(typeof timeOutId != 'undefined'){
        clearTimeout(timeOutId);
    }

    // Componse text
    windowwatcher.html(w + ' x ' + h + getBreakPointLiteral(w)).show(speed);

    // Create IIF function to hide "Watcher"
    timeOutId = setTimeout(function(){
        windowwatcher.hide(speed);
    }, time);
}



/**
 * This function returns literal of breakpoint where we are
 * @param {number} width - Screen width
 * @returns {string}
 */
function getBreakPointLiteral(width) {

    var literal = "--";
    var aux = 0;

    if(typeof config.watcher.breakpoints !== 'undefined') {

        for(var breakpoint in config.watcher.breakpoints) {

            if(width >= config.watcher.breakpoints[breakpoint]) {

                if(config.watcher.breakpoints[breakpoint] > aux) {
                    aux = config.watcher.breakpoints[breakpoint];
                    literal = breakpoint;
                }
            }
        }
    }

    return ' (' + literal + ')';
}
