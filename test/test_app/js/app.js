/**
 * Created by Christian on 13.01.2015.
 */
HbbTV.Main.init(function () {});

function testCssTransformTest (outputDiv) {
    var message = "CSS transform test test Start";
    testWriter(message, outputDiv);
    var fail = false;
    try {
        if (! window.HbbTV.flags.css.testSupport) {
            fail = true;
        }
    } catch (e) {
        fail = true;
    }
    
    if (fail) {
        message = "Fail: transform test not initialized";
        testWriter(message, outputDiv);
    }
    
    try {
        window.HbbTV.flags.css.testSupport("perspectiveOri");
    } catch (e) {
        message = "Fail: testSupport function throws Esxeption: " + e;
        testWriter(message, outputDiv);
    }
    
    try {
        var tmp = window.HbbTV.flags.css.testSupport("perspectiveOrigin");
        if (typeof (tmp) !== "object") {
            message = "Fail: Wrong return type, object expected: " + tmp;
            testWriter(message, outputDiv);
        }
    } catch (e) {
        message = "Fail: testSupport function throws Esxeption: " + e;
        testWriter(message, outputDiv);
    }
    
    try {
        var tmp = window.HbbTV.flags.css.testSupport("thisIsNotValidCss");
        if (tmp !== null) {
            message = "Fail: Wrong return type, null expected: " + tmp;
            testWriter(message, outputDiv);
        }
    } catch (e) {
        message = "Fail: testSupport function throws Esxeption: " + e;
        testWriter(message, outputDiv);
    }
    
    try {
        var tmp = window.HbbTV.flags.css.testSupport("transform", "deg", "rotateX");
        if (tmp !== true && tmp !== false) {
            message = "Fail: Wrong return type, true or false expected: " + tmp;
            testWriter(message, outputDiv);
        }
    } catch (e) {
        message = "Fail: testSupport function throws Esxeption: " + e;
        testWriter(message, outputDiv);
    }
    
    testWriter("successfull", outputDiv);
    testWriter("", outputDiv);
}

function testWriter (text, div) {
    div.innerHTML = div.innerHTML + "<br>" + text;
}

testCssTransformTest (document.getElementById("test_output"));