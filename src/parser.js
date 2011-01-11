(function() {

  /* Programmzeiger */
  var prg_cnt = 0;

  var prg_inc = function () {
    this.prg_cnt++;

    return true;
  };

  this.prg_dec = function () {
    this.prg_cnt--;

    return true;
  };

  this.parse = function () {
    while ( this.prg_cnt != JSBF.program.length ) {
      switch ( JSBF.program[this.prg_cnt] ) {
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

    print(JSBF.output);

    JSBF.band.debug();

    return true;
  };

  this.inc = function () {
    debug("DEBUG: Inc");
    JSBF.band.inc();
    this.prg_inc();
  };

  this.dec = function () {
    debug("DEBUG: Dec");
    JSBF.band.dec();
    this.prg_inc();
  };

  this.next = function () {
    debug("DEBUG: Next");
    JSBF.band.next();
    this.prg_inc();
  };

  this.pre = function () {
    debug("DEBUG: Pre");
    JSBF.band.pre();
    this.prg_inc();
  };

  this.dot = function () {
    debug("DEBUG: Dot");
    JSBF.output += String.fromCharCode(JSBF.band.get());
    this.prg_inc();
  };

  this.open_parenthese = function () {
    debug("DEBUG: Open");
    if ( JSBF.band.get() !== 0 ) {
      this.prg_inc();
      return true;
    }

    // Die Schleife nicht (mehr) ausführen. Suche die schließende Klammer.
    // Da mehrere Schleifen geschachtelt sein können, muss die Anzahl der
    // öffnenden Klammern minus die Anzahl der schließenden Klammern 0 ergeben.
    // Erst dann ist die aktuelle Schleife auch wirklich vorbei.
    var open_parentheses = 0;

    do {
      switch ( JSBF.program[this.prg_cnt] ) {
        case '[': open_parentheses++; break;
        case ']': open_parentheses--; break;
      }

      this.prg_inc();

    } while ( open_parentheses !== 0 );
  };

  this.close_parenthese = function () {
    debug("DEBUG: Close");
    if ( JSBF.band.get() === 0 ) {
      this.prg_inc();
    } else {
      var close_parentheses = 0;

      do {
        switch ( JSBF.program[this.prg_cnt] ) {
          case '[': close_parentheses--; break;
          case ']': close_parentheses++; break;
        }

        this.prg_dec();
      } while ( close_parentheses !== 0 );
      this.prg_inc();
    }
  };
}).apply(jsbf.parser);

