//this config should be inserted before the lib
(function(HbbTV){
    HbbTV.Config = {
        /*
         *  Logger URL
         *
         * requires POST
         * @param string $msg {@type string} message to log
         * @param int $ident {@type string} PIN or id to identify
         * @param string $level {@type string} loglevel (DEBUG,INFO,ERROR,WARN)
         */
        logURL : "api/v1/portal/logger.json",
        /*
         *  Identical TAG. Use PIN, User ID,...
         *
         */
        id : 0,
        /*
         *  Set this to true, if you want to log to Service
         *
         */
        logToService : true,
        /*
         * override animation settings to false if needed, otherwise true will use benchmarks
         */
        animated_overwrite : true,
        /*
         * set the limit for animations. higher is slower
         */
        performanceLimit : 600,
        /*
         * Api URL
         */
        api_url : "api/v1/"
    };
})(window.HbbTV || (window.HbbTV = {}));