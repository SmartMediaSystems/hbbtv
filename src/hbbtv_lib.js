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
            console.log("HbbTV::Setting KeySet");
            _ref.oipfcfg = document.getElementById('oipfcfg');
            var keys = 0x33F;
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
            _ref.userAgent = (navigator && navigator.appName) ? (navigator.appName + ", " +  navigator.appVersion + ", " + navigator.userAgent) : "";
            _ref.userAgentLog = (navigator && navigator.appName) ? (navigator.appName + ", " +  navigator.appVersion) : ""
            console.log('HbbTV::UA:' + _ref.userAgentLog);
			// key listener
            //console.log("HbbTV::Register Global KeyHandler");
            if(keyCallback)HbbTV.KeyHandler.keyCallBack = keyCallback;
            document.addEventListener("keydown", HbbTV.KeyHandler.handleKeyCodes, false);
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
            }else{
                clearTimeout(this.timer);
                _ref.isActive = true;
                app.style.display = "block";
                rb.style.display = "none";
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
        _ref.loadApp = function(app_id,params,url){
            console.log("HbbTV::Changing app to: " + app_id + " with params: " + params + "alternative URL: " + url);
            try {
                if (self.appDelay) {
                    return;
                }
                var userAgent = _ref.userAgent.toUpperCase();
                if (userAgent.indexOf("SONY") > 0) {
                    self.appDelay = setTimeout(function() {
                        self.loadApp(app_id,params,url);
                    }, 1000);
                    return;
                }
            } catch (ignore) {}
            self.loadApp(app_id,params,url);
        };
        this.loadApp = function (app_id,params,url) {
            var dvbURL = "dvb://current.ait/" + app_id + (params ? "?" + params : "");
            try {
                if (_ref.hbbtvApp.createApplication(dvbURL, false)) {
                    _ref.hbbtvApp.destroyApplication();
                    return;
                }
            } catch (e) {
                printError(e);
            }
            if (params) {
                url += (url.indexOf("?") > 0 ? "&" : "?") + params;
            }
            document.location.href = url;
        }
		return _ref;
    }());
}
