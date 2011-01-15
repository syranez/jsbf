// This will create an object named program.

// @param j the jsbf module
// @param m the program module
// @return the augmented program module
jsbf.program = (function(j, m) {

  var program = '';

  m.set = function ( code ) {
      program = code;
  }

  m.get = function () {
     return program;
  }

  return m;

})(jsbf, jsbf.program || {});

