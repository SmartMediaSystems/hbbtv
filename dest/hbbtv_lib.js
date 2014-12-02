/* HbbTV Framework */
if (!window.HbbTV) {
    HbbTV = (function () {
        return {};
    }());
}
if (typeof(KeyEvent)!='undefined') {
  if (typeof(KeyEvent.VK_LEFT)!='undefined') {
    var VK_LEFT = KeyEvent.VK_LEFT;
    var VK_UP = KeyEvent.VK_UP;
    var VK_RIGHT = KeyEvent.VK_RIGHT;
    var VK_DOWN = KeyEvent.VK_DOWN;
  }
  if (typeof(KeyEvent.VK_ENTER)!='undefined') {
    var VK_ENTER = KeyEvent.VK_ENTER;
  }
  if (typeof(KeyEvent.VK_RED)!='undefined') {
    var VK_RED = KeyEvent.VK_RED;
    var VK_GREEN = KeyEvent.VK_GREEN;
    var VK_YELLOW = KeyEvent.VK_YELLOW;
    var VK_BLUE = KeyEvent.VK_BLUE;
  }
  if (typeof(KeyEvent.VK_PLAY)!='undefined') {
    var VK_PLAY = KeyEvent.VK_PLAY;
    var VK_PAUSE = KeyEvent.VK_PAUSE;
    var VK_STOP = KeyEvent.VK_STOP;
  }
  if (typeof(KeyEvent.VK_FAST_FWD)!='undefined') {
    var VK_FAST_FWD = KeyEvent.VK_FAST_FWD;
    var VK_REWIND = KeyEvent.VK_REWIND;
  }
  if (typeof(KeyEvent.VK_BACK)!='undefined') {
    var VK_BACK = KeyEvent.VK_BACK;
  }
  if (typeof(KeyEvent.VK_0)!='undefined') {
    var VK_0 = KeyEvent.VK_0;
    var VK_1 = KeyEvent.VK_1;
    var VK_2 = KeyEvent.VK_2;
    var VK_3 = KeyEvent.VK_3;
    var VK_4 = KeyEvent.VK_4;
    var VK_5 = KeyEvent.VK_5;
    var VK_6 = KeyEvent.VK_6;
    var VK_7 = KeyEvent.VK_7;
    var VK_8 = KeyEvent.VK_8;
    var VK_9 = KeyEvent.VK_9;
  }
}
if (typeof(VK_LEFT)=='undefined') {
  var VK_LEFT = 0x25;
  var VK_UP = 0x26;
  var VK_RIGHT = 0x27;
  var VK_DOWN = 0x28;
}
if (typeof(VK_ENTER)=='undefined') {
  var VK_ENTER = 0x0d;
}
if (typeof(VK_RED)=='undefined') {
  var VK_RED = 0x74;
  var VK_GREEN = 0x75;
  var VK_YELLOW = 0x76;
  var VK_BLUE = 0x77;
}
if (typeof(VK_PLAY)=='undefined') {
  var VK_PLAY = 0x50;
  var VK_PAUSE = 0x51;
  var VK_STOP = 0x53;
}
if (typeof(VK_FAST_FWD)=='undefined') {
  var VK_FAST_FWD = 0x46;
  var VK_REWIND = 0x52;
}
if (typeof(VK_BACK)=='undefined') {
  var VK_BACK = 0xa6;
}
if (typeof(VK_0)=='undefined') {
  var VK_0 = 0x30;
  var VK_1 = 0x31;
  var VK_2 = 0x32;
  var VK_3 = 0x33;
  var VK_4 = 0x34;
  var VK_5 = 0x35;
  var VK_6 = 0x36;
  var VK_7 = 0x37;
  var VK_8 = 0x38;
  var VK_9 = 0x39;
}

if (!window.HbbTV.Main) {
    HbbTV.Main = (function(){
        var _ref = {};
        var self = this;
        _ref.init = function(keyCallback){
            //init app
            try{
                console.log("HbbTV::Getting appManager");
                _ref.appManager = document.getElementById("applicationManager");
                _ref.hbbtvApp = _ref.appManager.getOwnerApplication(document);
                _ref.hbbtvApp.show();
                _ref.hbbtvApp.activate();
            }catch(e){
                //console.log(e);
            }
            //init keys
            _ref.setKeys(true);
            _ref.userAgent = (navigator && navigator.appName) ? (navigator.appName + ", " +  navigator.appVersion + ", " + navigator.userAgent) : "";
            _ref.userAgentLog = (navigator && navigator.appName) ? (navigator.appName + ", " +  navigator.appVersion) : ""
            console.log('HbbTV::UA:' + _ref.userAgentLog);
			// key listener
            //console.log("HbbTV::Register Global KeyHandler");
            if(keyCallback)HbbTV.KeyHandler.keyCallBack = keyCallback;
            document.addEventListener("keydown", HbbTV.KeyHandler.handleKeyCodes, false);
        };
        _ref.setKeys = function(active){
            console.log("HbbTV::Setting KeySet");
            _ref.oipfcfg = document.getElementById('oipfcfg');
            var keys = active ? 0x33F : 0x1f;
            // for HbbTV 1.0:
            try {
                _ref.hbbtvApp.privateData.keyset.setValue(keys);
                _ref.hbbtvApp.privateData.keyset.value = keys;
            } catch (e) {
                try {
                    _ref.oipfcfg.keyset.value = keys;
                } catch (e) {
                    try {
                        _ref.oipfcfg.keyset.setValue(keys);
                    } catch (e) {
                        // ignore
                    }
                }
            }
        };
        _ref.initVideo = function(){
            var vid = document.getElementById("video");
            try {
                vid.setFullScreen(true);
            } catch (e) {}
            try {
                vid.bindToCurrentChannel();
            } catch (e) {}
            try {
                vid.onChannelChangeSucceeded = _ref.channelChanged(vid);
            } catch (e) {}
        };
        _ref.channelChanged = function(vid){
            console.log("HbbTV::Channel changed");
            _ref.destroy();
        };
        _ref.destroy = function(){
            try {
                _ref.hbbtvApp.destroyApplication();
                return;
            } catch (e) {
                console.log("HbbTV::Destroy failed");
                location.reload();
            }
        };
        _ref.setCookie = function(name,content, days){
            if(!days)days = 1;
            if (name && content) {
                try {
                    var d = new Date();
                    d.setTime(d.getTime() + (days*24*60*60*1000));
                    var expires = "expires="+d.toGMTString();
                    document.cookie = name + "=" + content + "; " + expires;
                    return true;
                } catch (e) {
                    return false;
                }
            }
        };
        _ref.getCookie = function(name){
            if (name) {
                try {
                    name = name + "=";
                    var ca = document.cookie.split(';');
                    for(var i=0; i<ca.length; i++) {
                        var c = ca[i].trim();
                        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
                    }
                    return "";
                } catch (e) {
                    return false;
                }
            }
        };
        _ref.isActive = false;
        _ref.switchRedButton = function(app,rb){
            app = document.getElementById(app);
            rb = document.getElementById(rb);
            if(_ref.isActive){
                app.style.display = "none";
                rb.style.display = "block";
                this.timer = setTimeout(function(){
                    rb.style.display = "none";
                }, 5000);
                _ref.isActive = false;
                _ref.setKeys(false);
            }else{
                clearTimeout(this.timer);
                _ref.isActive = true;
                app.style.display = "block";
                rb.style.display = "none";
                _ref.setKeys(true);
            }
        }
        _ref.benchmark = function(){
            var cookie =  _ref.getCookie("ard_test_perf");
            if(_ref.getCookie("ard_test_perf") !== "" && _ref.getCookie("ard_test_perf") !== "-1"){
                HbbTV.Config.animated = (HbbTV.Config.performanceLimit >= parseInt(cookie,10));
            }else{
                var testitem = document.getElementById('app_container');
                window.timediff = (new Date()).getTime();
                self.iterSpeed(0,testitem);
            }
            return;
        };
        _ref.animated = true,
        _ref.getAnimated = function(){
            return HbbTV.Config.animated_overwrite ? _ref.animated : false
        },
        this.iterSpeed = function(count,testitem){
            var self = this;
            count++;
            setTimeout(function () {
                if(count > 10){
                    var performanceIndex = ((new Date()).getTime() - window.timediff);
                    HbbTV.Main.setCookie("ard_test_perf",performanceIndex,1);
                    HbbTV.Config.animated = (HbbTV.Config.performanceLimit >= performanceIndex);
                    return;
                }else{
                    testitem.style.width = count + "px";
                    testitem.style.heigt = count + "px";
                    testitem.style.width = "0px";
                    testitem.style.heigt = "0px";
                    testitem.style.width = count + "px";
                    testitem.style.heigt = count + "px";
                    testitem.style.width = "0px";
                    testitem.style.heigt = "0px";
                    self.iterSpeed(count, testitem);
                }
            }, 40);
        }
        _ref.loadApp = function(app_id,params,url,callback){
            console.log("HbbTV::Changing app to: " + app_id + " with params: " + params + "alternative URL: " + url);
            try {
                if (self.appDelay) {
                    return;
                }
                var userAgent = _ref.userAgent.toUpperCase();
                if (userAgent.indexOf("SONY") > 0) {
                    self.appDelay = setTimeout(function() {
                        self.loadApp(app_id,params,url,callback);
                    }, 1000);
                    return;
                }
            } catch (ignore) {}
            self.loadApp(app_id,params,url,callback);
        };
        _ref.loadingEvents = ["DVB_OK", "DVB_FAILED", "URL_OK", "URL_FAILED"];
        this.loadApp = function (app_id,params,url,callback) {
            callback = callback || function(e){};
            var dvbURL = "dvb://current.ait/" + app_id + (params ? "?" + params : "");
            try {
                if (_ref.hbbtvApp.createApplication(dvbURL, false)) {
                    callback(_ref.loadingEvents[0]);
                    _ref.hbbtvApp.destroyApplication();
                    return;
                }
            } catch (e) {
                //printError(e);
            }
            callback(_ref.loadingEvents[1]);
            if (params) {
                url += (url.indexOf("?") > 0 ? "&" : "?") + params;
            }
            var data = '{"url":"' + url + '"}';
            var xmlhttp;
            try{
                xmlhttp = new XMLHttpRequest();
            }catch (e){
                try{
                    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                }catch (e) {
                    try{
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }catch (e){

                    }
                }
            }
            xmlhttp.open("POST", HbbTV.Config.pingURL);
            xmlhttp.onreadystatechange = function () {
                if(xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        if(xmlhttp.responseText == "true"){
                            callback(_ref.loadingEvents[3]);
                            document.location.href = url;
                        }else{
                            callback(_ref.loadingEvents[4]);
                        }
                    }else{
                        document.location.href = url;
                    }
                }
            };
            xmlhttp.send(data)
        }
		return _ref;
    }());
}

if (!window.HbbTV) {
    var hbbtvApp;
    var oipfcfg;
}

if (!window.HbbTV.KeyHandler) {
    HbbTV.KeyHandler = (function () {
        var _handler = {};
        //global listener
        _handler.handleKeyCodes = function (e) {
            e.preventDefault();
            //key mappings
            switch (e.keyCode) {
                case e.VK_RED: case VK_RED: case 116: case 403:
                _handler.keyCallBack(VK_RED);
                break;
                case e.VK_GREEN: case VK_GREEN: case 117: case 404:
                _handler.keyCallBackWrapper(VK_GREEN);
                break;
                case e.VK_YELLOW: case VK_YELLOW: case 118: case 405:
                _handler.keyCallBackWrapper(VK_YELLOW);
                break;
                case e.VK_BLUE: case VK_BLUE: case 119: case 406:
                _handler.keyCallBackWrapper(VK_BLUE);
                break;
                case e.VK_ENTER: case VK_ENTER: case 13:
                _handler.keyCallBackWrapper(VK_ENTER);
                break;
                case e.VK_LEFT: case VK_LEFT:  case 37: case 65:
                _handler.keyCallBackWrapper(VK_LEFT);
                break;
                case e.VK_UP: case VK_UP: case 38: case 87:
                _handler.keyCallBackWrapper(VK_UP);
                break;
                case e.VK_RIGHT: case VK_RIGHT: case 39: case 68:
                _handler.keyCallBackWrapper(VK_RIGHT);
                break;
                case e.VK_DOWN: case VK_DOWN: case 40: case 83:
                _handler.keyCallBackWrapper(VK_DOWN);
                break;
                case e.VK_0: case VK_0: case 48:
                _handler.keyCallBackWrapper(VK_0);
                break;
                case e.VK_1: case VK_1: case 49:
                _handler.keyCallBackWrapper(VK_1);
                break;
                case e.VK_2: case VK_2: case 50:
                _handler.keyCallBackWrapper(VK_2);
                break;
                case e.VK_3: case VK_3: case 51:
                _handler.keyCallBackWrapper(VK_3);
                break;
                case e.VK_4: case VK_4: case 52:
                _handler.keyCallBackWrapper(VK_4);
                break;
                case e.VK_5: case VK_5: case 53:
                _handler.keyCallBackWrapper(VK_5);
                break;
                case e.VK_6: case VK_6: case 54:
                _handler.keyCallBackWrapper(VK_6);
                break;
                case e.VK_7: case VK_7: case 55:
                _handler.keyCallBackWrapper(VK_7);
                break;
                case e.VK_8: case VK_8: case 56:
                _handler.keyCallBackWrapper(VK_8);
                break;
                case e.VK_9: case VK_9: case 57:
                _handler.keyCallBackWrapper(VK_9);
                break;
            }
        };
        _handler.keyCallBack = function (key){
            console.log("HbbTV::Dummy keyCallBack:" + key);
        }
        _handler.keyCallBackWrapper = function (key){
            if(HbbTV.Main.isActive)_handler.keyCallBack(key);
        }
        return _handler;
    }());
}
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
            if (typeof window.console.log.apply == "function") {
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
