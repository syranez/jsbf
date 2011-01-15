// This will create an object named band.

// @param j the jsbf module
// @param m the band module
// @return the augmented band module
jsbf.band = (function(j, m) {

  var memory = {};

  /* Zeiger auf die aktuelle Speicherzelle */
  var pointer = 0;

  m.reset = function () {
      memory = {};
      pointer = 0;
  }

  m.inc = function () {
    if ( typeof(memory[pointer]) === 'undefined' ) {
      memory[pointer] = 1;
    } else {
      memory[pointer]++;
    }
    
    return true;
  };

  m.dec = function () {
    if ( typeof(memory[pointer]) === 'undefined' ) {
      memory[pointer] = 0;
    } else {
      if ( memory[pointer] !== 0 ) {
        memory[pointer]--;
      }
    }

    return true;
  };

  m.next = function () {
    pointer++;

    return true;
  };

  m.pre = function () {
    if ( pointer !== 0 ) {
      pointer--;
    }

    return true;
  };

  m.get = function () {
    if ( typeof(memory[pointer]) === 'undefined' ) {
      memory[pointer] = 0;
    }

    return memory[pointer];
  };

  m.debug = function () {
    var i = 0;

    while ( typeof(memory[i]) === 'number' ) {
      j.debug.debug('Zelle ' + i + ' has value: ' + memory[i]);
      i++;
    }

    return true;
  };

  return m;

})(jsbf, jsbf.band || {});

