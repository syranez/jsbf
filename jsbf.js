var JSBF = {

	/* Der Speicher */
	band: {

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
	},

	/* Programmzeiger */
	prg_cnt: 0,

	/* Programm */
	program: {},

	prg_inc: function () {
		this.prg_cnt++;

		return true;
	},

	prg_dec: function () {
		this.prg_cnt--;

		return true;
	},

	parse: function (program) {
		this.program = program;

		while ( this.prg_cnt != program.length ) {
			switch ( program[this.prg_cnt] ) {
				case '+': this.parse_inc(); break;
				case '-': this.parse_dec(); break;
				case '>': this.parse_next(); break;
				case '<': this.parse_pre(); break;
				case '.': this.parse_dot(); break;
				case '[': this.parse_open_parenthese(); break;
				case ']': this.parse_close_parenthese(); break;
				default: print("I can not interpret: " + program[this.prg_cnt]); return false;
			}
		}

		this.band.debug();
	},

	parse_inc: function () {
		debug("DEBUG: Inc");
		this.band.inc();
		this.prg_inc();
	},

	parse_dec: function () {
		debug("DEBUG: Dec");
		this.band.dec();
		this.prg_inc();
	},

	parse_next: function () {
		debug("DEBUG: Next");
		this.band.next();
		this.prg_inc();
	},

	parse_pre: function () {
		debug("DEBUG: Pre");
		this.band.pre();
		this.prg_inc();
	},

	parse_dot: function () {
		debug("DEBUG: Dot");
		print(String.fromCharCode(this.band.get()));
		this.prg_inc();
	},

	parse_open_parenthese: function () {
		debug("DEBUG: Open");
		if ( this.band.get() !== 0 ) {
			this.prg_inc();
			return true;
		}

		// Die Schleife nicht (mehr) ausführen. Suche die schließende Klammer.
		// Da mehrere Schleifen geschachtelt sein können, muss die Anzahl der
		// öffnenden Klammern minus die Anzahl der schließenden Klammern 0 ergeben.
		// Erst dann ist die aktuelle Schleife auch wirklich vorbei.
		var open_parentheses = 0;

		do {
			switch ( this.program[this.prg_cnt] ) {
				case '[': open_parentheses++; break;
				case ']': open_parentheses--; break;
			}

			this.prg_inc();

		} while ( open_parentheses !== 0 );
	},

	parse_close_parenthese: function () {
		debug("DEBUG: Close");
		if ( this.band.get() === 0 ) {
			this.prg_inc();
		} else {
			var close_parentheses = 0;

			do {
				switch ( this.program[this.prg_cnt] ) {
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
	// print(message);
	
	return true;
}

// JSBF.parse('+++.>++.>+.');
JSBF.parse('++++++++[>++++++++<-]>+.');

