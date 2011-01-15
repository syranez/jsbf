// This will create an object named output.

// @param j the jsbf module
// @param m the output module
// @return the augmented output module
jsbf.output = (function(j, m) {

  var output = '';

  m.reset = function () {
    output ='';
  }

  m.add = function ( sign ) {
    output += sign;
  }

  m.get = function () {
    return output;
  }

  return m;

})(jsbf, jsbf.output || {});

