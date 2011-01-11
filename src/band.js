(function() {
  var memory = {};

  /* Zeiger auf die aktuelle Speicherzelle */
  var pointer = 0;

  this.inc = function () {
    if ( typeof(this.memory[this.pointer]) === 'undefined' ) {
      this.memory[this.pointer] = 1;
    } else {
      this.memory[this.pointer]++;
    }
    
    return true;
  };

  this.dec = function () {
    if ( typeof(this.memory[this.pointer]) === 'undefined' ) {
      this.memory[this.pointer] = 0;
    } else {
      if ( this.memory[this.pointer] !== 0 ) {
        this.memory[this.pointer]--;
      }
    }

    return true;
  };

  this.next = function () {
    this.pointer++;

    return true;
  };

  this.pre = function () {
    if ( this.pointer !== 0 ) {
      this.pointer--;
    }

    return true;
  };

  this.get = function () {
    if ( typeof(this.memory[this.pointer]) === 'undefined' ) {
      this.memory[this.pointer] = 0;
    }

    return this.memory[this.pointer];
  };

  this.debug = function () {
    var i = 0;

    while ( typeof(this.memory[i]) === 'number' ) {
      print("DEBUG: Zelle " + i + " has value: " + this.memory[i]);
      i++;
    }

    return true;
  };
}).apply(jsbf.band);

if ( ! jsbf.band.next() ) {
  print('Error');
} else {
  print('Succes');
}
