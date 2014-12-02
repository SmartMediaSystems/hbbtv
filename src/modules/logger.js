    (function() {
        var method;
        var customLogger = {
            error: function(msg) {
                sendLog(msg, "ERROR");
            },
            debug: function(msg) {
                sendLog(msg, "DEBUG");
            },
            log: function(msg) {
                sendLog(msg, "DEBUG");
            },
            info: function(msg) {
                sendLog(msg, "INFO");
            },
            warn: function(msg) {
                sendLog(msg, "WARN");
            },
            trace: function(msg) {
                sendLog(msg, "TRACE");
            }
        };
        if (HbbTV.Config.loggingMode == 0) {

        } else if (HbbTV.Config.loggingMode == 1) {
            window.console = customLogger;
        } else if (HbbTV.Config.loggingMode == 2 && window.console) {
            if (typeof window.console.log.apply == "function") {//check needed to not break browsers IE8/9 when developer console is enabled
                var exerr = console.error;
                console.error = function(msg) {
                    exerr.apply(this, arguments);
                    customLogger.error(msg);
                }
                var exdebug = console.debug;
                console.debug = function(msg) {
                    exdebug.apply(this, arguments);
                    customLogger.debug(msg);
                }
                var exlog = console.log;
                console.log = function(msg) {
                    exlog.apply(this, arguments);
                    customLogger.log(msg);
                }
                var exinf = console.info;
                console.info = function(msg) {
                    customLogger.info(msg);
                    exinf.apply(this, arguments);

                }
                var exwarn = console.warn;
                window.console.warn = function(msg) {
                    customLogger.warn(msg);
                    exwarn.apply(this, arguments);
                }
            }
        }

        var console = (window.console = window.console || customLogger);
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = customLogger.debug;
            }
        }

    var sendLog = function(msg, level) {
        var data = '{"msg":"' + msg + '","level":"' + level + '","ident":"' + HbbTV.Config.id + '"}';
        var xmlhttp;
        try {
            // Opera 8.0+, Firefox, Safari
            xmlhttp = new XMLHttpRequest();
        } catch (e) {
            // Internet Explorer Browsers
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    // Something went wrong
                    alert("Your browser broke!");
                    return false;
                }
            }
        }
        xmlhttp.open("POST", HbbTV.Config.logURL, true);
        xmlhttp.onreadystatechange = display_data;
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        xmlhttp.send(data);

        function display_data() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 404) {
                    alert("ERROR::Logger not found!");
                }
            }
        }
    };
}());
