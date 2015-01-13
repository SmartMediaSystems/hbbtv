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
        logURL : "/backend/public/api/v1/portal/logger.json",
        /*
         *  Identical TAG. Use PIN, User ID,...
         *
         */
        id : 0,
        /*
         *  Set this to true, if you want to log to Service
         *
         */
        logToService : false,
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
        api_url : "/backend/public/api/v1/",
        /*
         * extended cookie age for stored info
         */
        cookie_age : 1,
        /*
         *  ping URL
         *
         * requires POST
         * @param string $url {@type string} url to test
         * @return boolean true/false as result
         * set URL to false if you want to skip ping
         */
        pingURL : "/backend/public/api/v1/portal/ping.json"
    };
})(window.HbbTV || (window.HbbTV = {}));