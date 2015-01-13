/**
 * Created by Christian on 13.01.2015.
 */
console.log('HbbTV Mini-Site startup');
HbbTV.Main.init(function () {});

var transformCheck = HbbTV.flags.css.testSupport;
var exampleDiv = document.getElementById("transform_example");
var cssCommand = "perspectiveOrigin";

if (transformCheck(cssCommand, "%") === true) {
    exampleDiv.style[cssCommand] = "100%";
} else {
    // the Browser dont support this css
}

cssCommand = "transform";
if (transformCheck(cssCommand, "px", "translate") === true && 
        transformCheck("transition-duration", "s") === true) {
    exampleDiv.style["transition-duration"] = "2s";
    exampleDiv.style[cssCommand] = "translate(40px)";
} else {
    // the Browser dont support this css
    exampleDiv.style["left"] = "50px";
}