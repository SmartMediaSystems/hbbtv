(function() {
    var method;
    var customLogger = {
        error : function(msg){
            sendLog(msg,"ERROR");
        },
        debug : function(msg){
            sendLog(msg,"DEBUG");
        },
        log : function(msg){
            sendLog(msg,"DEBUG");
        },
        info : function(msg){
            sendLog(msg,"INFO");
        },
        warn : function(msg){
            sendLog(msg,"WARN");
        }
    };

    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || customLogger);
    if(HbbTV.Config.logToServiceOnly)window.console =  customLogger;

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = customLogger.debug;
        }
    }

    var sendLog = function(msg, level){
        var data = '{"msg":"' + msg + '","level":"' + level + '","ident":"' + HbbTV.Config.id + '"}';
        var xmlhttp;
        try{
            // Opera 8.0+, Firefox, Safari
            xmlhttp = new XMLHttpRequest();
        }catch (e){
            // Internet Explorer Browsers
            try{
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            }catch (e) {
                try{
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }catch (e){
                    // Something went wrong
                    alert("Your browser broke!");
                    return false;
                }
            }
        }
        xmlhttp.open("POST", HbbTV.Config.logURL , true);
        xmlhttp.onreadystatechange = display_data;
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        xmlhttp.send(data);

        function display_data() {
            if(xmlhttp.readyState == 4) {
                if (xmlhttp.status == 404) {
                    alert("ERROR::Logger not found!");
                }
            }
        }
    };
}());