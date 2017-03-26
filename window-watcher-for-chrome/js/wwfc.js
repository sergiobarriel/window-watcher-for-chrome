/**
 * @author: Sergio Barriel
 * @version: 2.0.0
 */

(function(){

    function wwfc() {

        this.isStarted = false;
        this.guid = '';
        this.width = 0;
        this.height = 0;
        this.config = { };
        this.watcherString = '';
        this.styleString = '';

        /**
        * Entry point
        */
        this.start = function() {

            var that = this;

            if(!this.isStarted) {

                this.loadInitialConfig();

                window.onload = function() {
                    that.getWindowSize();
                    that.stringBuilder();
                    that.watcherBuilder();
                    that.showWatcher();
                };

                window.onresize = function(){
                    that.getWindowSize();
                    that.stringBuilder();
                    that.showWatcher();
                };

                this.isStarted = true;
            }
            else {
                console.info('Window Watcher it\'s already started');
            }
        };

        this.loadInitialConfig = function(){
            this.config = initialConfig;
        };

        /**
        * Get window measures
        */
        this.getWindowSize = function(){
            this.height = document.body.clientHeight;
            this.width = document.body.clientWidth;
        };

        /**
        * Show DOM object and set timeout to hide
        */
        this.showWatcher = function(){
            var that = this;

            // clear previous timeout
            clearTimeout(this.timeOutId);

            // update string
            var w = document.getElementById(this.guid);
                w.innerHTML = this.watcherString;
                w.style.display = 'block';

            // set timeout to hide
            this.timeOutId = window.setTimeout(function(){
                that.hideWatcher();
            }, this.config.watcher.time.onResize);
        };

        /**
        * Remove DOM object and clear timeout
        */
        this.hideWatcher = function(){
            var w = document.getElementById(this.guid);
                w.style.display = 'none';

            // clear timeout
            clearTimeout(this.timeOutId);
        };

        /**
        * Build DOM object and appends to body.
        * It should be invoked only once or multiple elements will created in DOM
        */
        this.watcherBuilder = function(){

            // Build CSS string
            this.cssBuilder();

            // Build Guid
            this.guidBuilder();

            // Build DOM object
            var div = document.createElement('span');
                div.className = this.config.watcher.class;
                div.id = this.guid;
                div.style = this.styleString;
                div.innerHTML = this.watcherString;

            // Append objecto to body
            document.getElementsByTagName('body')[0].appendChild(div);

        };

        /**
        * Transform styles in JSON format to single string.
        * This string will be assigned to the DOM element.
        */
        this.cssBuilder = function(){
            if(typeof this.config.watcher.style !== 'undefined') {
                for(var property in this.config.watcher.style) {
                    this.styleString += property + ': ' + this.config.watcher.style[property] + '; ';
                }
            }
        };

        /**
        * Build the string that the user will see on your screen.
        * The string will have the following format: width x height (bootstrap breakpoint)
        * Example: 1133 x 721 (md)
        */
        this.stringBuilder = function() {

            var breakPointLiteral = "--";
            var aux = 0;

            if(typeof this.config.watcher.breakpoints !== 'undefined') {
                for(var breakpoint in this.config.watcher.breakpoints) {
                    if(this.width >= this.config.watcher.breakpoints[breakpoint]) {
                        if(this.config.watcher.breakpoints[breakpoint] > aux) {
                            aux = this.config.watcher.breakpoints[breakpoint];
                            breakPointLiteral = breakpoint;
                        }
                    }
                }
            }
            this.watcherString = this.width + ' x ' + this.height + ' ' + '(' + breakPointLiteral +')';
        };


        /**
        * Build Guid
        * The string will have the following format: xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx
        */
        this.guidBuilder = function(){
            this.guid = this.gen(2) + '-' + this.gen(1) + '-' + this.gen(1) + '-' + this.gen(3);
        };

        /**
        * Build Guid fragments of n elements
        * @param {Number} count
        * https://github.com/dandean/guid
        * Thanks!
        */
        this.gen = function(count){
            var out = "";
            for (var i=0; i<count; i++) {
                out += (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return out;
        };

    };

    // Run!
    watcher = new wwfc();
    watcher.start();

})();
