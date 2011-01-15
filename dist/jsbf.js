// This will create an object named jsbf.

// @param j the jsbf module
// @return the augmented jsbf module
var jsbf = (function(m) {

  return m;

})(jsbf || {});

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

// This will create an object named parser.

// @param j the jsbf module
// @param m the parser module
// @return the augmented parser module
jsbf.parser = (function(j, m) {

  /* Programmzeiger */
  var prg_cnt = 0;

  m.reset = function () {
    prg_cnt = 0;
  }

  m.prg_inc = function () {
    prg_cnt++;

    return true;
  };

  m.prg_dec = function () {
    prg_cnt--;

    return true;
  };

  m.parse = function () {
    this.reset();
    j.band.reset();
    j.output.reset();
    while ( prg_cnt != j.program.get().length ) {
      switch ( j.program.get()[prg_cnt] ) {
        case '+': this.inc(); break;
        case '-': this.dec(); break;
        case '>': this.next(); break;
        case '<': this.pre(); break;
        case '.': this.dot(); break;
        case '[': this.open_parenthese(); break;
        case ']': this.close_parenthese(); break;
        default: return false;
      }
    }

    j.band.debug();

    return true;
  };

  m.inc = function () {
    j.debug.debug('Inc');
    j.band.inc();
    this.prg_inc();
  };

  m.dec = function () {
    j.debug.debug('Dec');
    j.band.dec();
    this.prg_inc();
  };

  m.next = function () {
    j.debug.debug('Next');
    j.band.next();
    this.prg_inc();
  };

  m.pre = function () {
    j.debug.debug('Pre');
    j.band.pre();
    this.prg_inc();
  };

  m.dot = function () {
    j.debug.debug('Dot');
    j.output.add(String.fromCharCode(j.band.get()));
    this.prg_inc();
  };

  m.open_parenthese = function () {
    j.debug.debug('Open');
    if ( j.band.get() !== 0 ) {
      this.prg_inc();
      return true;
    }

    // Die Schleife nicht (mehr) ausführen. Suche die schließende Klammer.
    // Da mehrere Schleifen geschachtelt sein können, muss die Anzahl der
    // öffnenden Klammern minus die Anzahl der schließenden Klammern 0 ergeben.
    // Erst dann ist die aktuelle Schleife auch wirklich vorbei.
    var open_parentheses = 0;

    do {
      switch ( j.program.get()[prg_cnt] ) {
        case '[': open_parentheses++; break;
        case ']': open_parentheses--; break;
      }

      this.prg_inc();

    } while ( open_parentheses !== 0 );
  };

  m.close_parenthese = function () {
    j.debug.debug('Close');
    if ( j.band.get() === 0 ) {
      this.prg_inc();
    } else {
      var close_parentheses = 0;

      do {
        switch ( j.program.get()[prg_cnt] ) {
          case '[': close_parentheses--; break;
          case ']': close_parentheses++; break;
        }

        this.prg_dec();
      } while ( close_parentheses !== 0 );
      this.prg_inc();
    }
  };

  return m;

})(jsbf, jsbf.parser || {});

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

// This will create an object named example.

// @param j the jsbf module
// @param m the examples module
// @return the augmented examples module
jsbf.examples = (function(j, m) {

  m.geek = function() {
    code = '>++++++++[<++++++++>-]<+++++++.--..++++++.';
    print('Code: ' + code);
    j.program.set(code);
    execute();
  }

  m.alphabet = function() {
    /*
     * 0: tmpcount
     * 1: 64
     * 2: Anzahl Zeichen im Alphabet
     */
    code = '++++++++[>++++++++<-]+++++[>>+++++<<-]>>+[<+.>-]';
    print('Code: ' + code);
    j.program.set(code);
    execute();
  }

  m.A = function() {
    code = '++++++++[>++++++++<-]>+.';
    print('Code: ' + code);
    j.program.set(code);
    execute();
  }

  m.hm = function() {
    j.program.set('+++.>++.>+.');
    execute();
  }

  var execute = function() {
    j.parser.parse();
    print(j.output.get());
  }

  return m;
})(jsbf, jsbf.examples || {});

print('Example "A":');
jsbf.examples.A();
print('Example "Alphabet":');
jsbf.examples.alphabet();
print('Example "Geek":');
jsbf.examples.geek();
