var JSBF = {};

/* Speicher */
JSBF.band = {
	memory: {},

	/* Zeiger auf die aktuelle Speicherzelle */
	pointer: 0,

	inc: function () {
		if ( typeof(this.memory[this.pointer]) === 'undefined' ) {
			this.memory[this.pointer] = 1;
		} else {
			this.memory[this.pointer]++;
		}
		
		return true;
	},

	dec: function () {
		if ( typeof(this.memory[this.pointer]) === 'undefined' ) {
			this.memory[this.pointer] = 0;
		} else {
			if ( this.memory[this.pointer] !== 0 ) {
				this.memory[this.pointer]--;
			}
		}

		return true;
	},

	next: function () {
		this.pointer++;

		return true;
	},

	pre: function () {
		if ( this.pointer !== 0 ) {
			this.pointer--;
		}

		return true;
	},

	get: function () {
		if ( typeof(this.memory[this.pointer]) === 'undefined' ) {
			this.memory[this.pointer] = 0;
		}

		return this.memory[this.pointer];
	},

	debug: function () {
		var i = 0;

		while ( typeof(this.memory[i]) === 'number' ) {
			print("DEBUG: Zelle " + i + " has value: " + this.memory[i]);
			i++;
		}

		return true;
	}
};

/* Das zu interpretierende Programm */
JSBF.program = '';

/* Die Ausgabe */
JSBF.output = '';

/* Parser */
JSBF.Parser = {

	/* Programmzeiger */
	prg_cnt: 0,

	prg_inc: function () {
		this.prg_cnt++;

		return true;
	},

	prg_dec: function () {
		this.prg_cnt--;

		return true;
	},

	parse: function () {
		while ( this.prg_cnt != JSBF.program.length ) {
			switch ( JSBF.program[this.prg_cnt] ) {
				case '+': this.parse_inc(); break;
				case '-': this.parse_dec(); break;
				case '>': this.parse_next(); break;
				case '<': this.parse_pre(); break;
				case '.': this.parse_dot(); break;
				case '[': this.parse_open_parenthese(); break;
				case ']': this.parse_close_parenthese(); break;
				default: return false;
			}
		}

		print(JSBF.output);

		JSBF.band.debug();

		return true;
	},

	parse_inc: function () {
		debug("DEBUG: Inc");
		JSBF.band.inc();
		this.prg_inc();
	},

	parse_dec: function () {
		debug("DEBUG: Dec");
		JSBF.band.dec();
		this.prg_inc();
	},

	parse_next: function () {
		debug("DEBUG: Next");
		JSBF.band.next();
		this.prg_inc();
	},

	parse_pre: function () {
		debug("DEBUG: Pre");
		JSBF.band.pre();
		this.prg_inc();
	},

	parse_dot: function () {
		debug("DEBUG: Dot");
		JSBF.output += String.fromCharCode(JSBF.band.get());
		this.prg_inc();
	},

	parse_open_parenthese: function () {
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
	},

	parse_close_parenthese: function () {
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
	},
};

var debug = function (message) {
// 	print(message);
	
	return true;
}

// JSBF.parse('+++.>++.>+.');
// JSBF.parse('++++++++[>++++++++<-]>+.');
JSBF.program = '>++++++++[<++++++++>-]<+++++++.--..++++++.';
JSBF.Parser.parse();

