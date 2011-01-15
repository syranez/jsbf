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

