// This will create an object named debug.

// @param j the jsbf module
// @param m the debug module
// @return the augmented debug module
jsbf.debug = (function(j, m) {

  var debugPrefix = 'DEBUG: ';

  m.debug = function (msg) {
//    print(debugPrefix + msg);
  }

  return m;

})(jsbf, jsbf.debug || {});

