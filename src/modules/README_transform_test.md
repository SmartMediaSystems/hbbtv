CSS3 transform support test
==============

Introduction
--------------

**Function**

The CSS3 transform support test is a part of the HBBTV framework.
This provide a function to check the support for CSS3 transform functions in the used browser.

**Files**

- js.transformTest.js

Operation
--------------

On initialisation it runs a list of CSS3 transform operations on a div.
After every run, it check if this was successful.
The results of this check will be written to HbbTV.flags.css.supported.

To check the support the user can lock in the HbbTV.flags.css.supported or use the HbbTV.flags.css.testSupport function.

How to use test support function
--------------

HbbTV.flags.css.testSupport (String command, String unit, String advancedFeature )

**parms**

- command : the css command
- unit : the unit for the css command (not needed)
- advancedFeature : the advanced feature for the css command (not needed)

**return**

- true : this will be suppordet
- false : this will be not suppordet
- null : this was not tested
- Object (result list) : there are many results for this inquiry

Examples
--------------

    if (HbbTV.flags.css.testSupport("perspectiveOrigin", "%")) {
        // do something with css3 perspectiveOrigin
    } else {
        // use another solution
    }

### test support function

- HbbTV.flags.css.testSupport("perspectiveOrigin", "%")

    Returns true if the browser supports the perspectiveOrigin with %. perspectiveOrigin : 20% 30%;

- HbbTV.flags.css.testSupport("somethingNotTested")

    Returns null because this was not tested.

- HbbTV.flags.css.testSupport("perspectiveOrigin")

    Returns a list with all tested perspectiveOrigin units and the results.

- HbbTV.flags.css.testSupport("transform", "deg", "rotateX")

    Returns true if the browser supports the transform with rotateX( [Number]deg). transform : rotateX( 10deg)

### example app

samples/css_transform_test