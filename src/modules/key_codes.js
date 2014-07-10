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