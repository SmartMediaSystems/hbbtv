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
        logURL : "api/v1/portal/log",
        /*
         *  ping URL
         *
         * requires POST
         * @param string $url {@type string} url to test
         * @return boolean true/false as result
         */
        pingURL : "api/v1/portal/ping.json",
        /*
         *  Identical TAG. Use PIN, User ID,...
         *
         */
        id : 0,
        /*
         *  Mode of logging
         *  possible Values:
         *  0: log to browserconsole only (if possible)
         *  1: log to service only (logURL above is used)
         *  2: log to browserconsole AND service
         */
        loggingMode : 0,
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