if (! window.HbbTV.flags) window.HbbTV.flags = {};
if (! window.HbbTV.flags.css) window.HbbTV.flags.css = {};
if (! window.HbbTV.flags.css.supported) {
    window.HbbTV.flags.css.supported = {};

    window.HbbTV.flags.css.transformTest = {
        run: function( ) {

            var transforms = {
                transform : [
                    "translate(5px)",
                    "translate(5px, 10px)",
                    "translateY(5px)",
                    "translateX(5px)",
                    "translateY(5%)",
                    "translateX(5%)",
                    "scale(2)",
                    "scale(2, -1)",
                    "scaleX(2)",
                    "scaleY(2.5)",
                    "rotate(45deg)",
                    "skew(45deg)",
                    "skew(45deg, 15deg)",
                    "skewX(45deg)",
                    "skewY(45deg)",
                    "matrix(1,-.2,0,1,0,0)",
                    "matrix(1,-.2,0,1,10,10)",
                    "translate3d(0, 0, 5px)",
                    "translateZ(5px)",
                    "scale3d(1, 0, -1)",
                    "scaleZ(1.5)",
                    "rotate3d(1, 1, 1, 45deg)",
                    "rotateX(-45deg)",
                    "rotateY(-45deg)",
                    "rotateZ(-45deg)",
                    "matrix3d(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)",
                    "matrix3d(0,0,0,0,0,0,0,0,0,0,1,0,10,10,0,1)",
                    "perspective(600px)"
                ],
                transformOrigin : ["10px", "top", "top left", "50% 100%", "left 0%", "left 50% 0"],
                transformStyle : ["flat", "preserve-3d"],
                perspective : ["none", "600px"],
                perspectiveOrigin : ["10px", "top", "top left", "50% 100%", "left 0%"],
                backfaceVisibility : ["visible", "hidden"],
                "transition-delay" : ["5s"],
                "transition-duration" : ["5s"],
                "transition-property" : ["width"],
                "transition-timing-function" : ["ease-out"]
            };

            var testDiv = document.createElement("div");
            var supported = window.HbbTV.flags.css.supported;

            //div.style.
            for (var command in transforms) {
                var testList = transforms[command];
                testCssCommand(command, testList, testDiv);
            }

            function testCssCommand (command, testList, testDiv) {

                supported[command] = {};

                var style = testDiv.style[command];

                if (typeof style === 'undefined') {
                    supported[command] = false;
                    return;
                }

                for (var key in testList) {
                    var testKey = testList[key];
                    testDiv.style[command] = testKey;
                    if (testDiv.style[command] !== testKey) {
                        supported[command][testKey] = false;
                    } else {
                        supported[command][testKey] = true;
                    }
                    testDiv.style[command] = ""; //clean up
                }
            }

            window.HbbTV.flags.css.testSupport = function (command, unit, postCommand) {

                if (!supported[command]) return null;

                var commandTestData = supported[command];

                if (! postCommand) {

                    if (!unit) return commandTestData;
                    for (var k in commandTestData) {
                        if (k.indexOf(unit) > 0) {
                            return commandTestData[k];
                        }
                    }

                } else {
                    for (var k in commandTestData) {
                        if (k.indexOf(postCommand) !== 0) continue;
                        if (k.indexOf(unit) > 0) {
                            return commandTestData[k];
                        }
                    }

                    return null;
                }
            };
        }
    };
    
    window.HbbTV.flags.css.transformTest.run();
    window.HbbTV.flags.css.transformTest = undefined;
}