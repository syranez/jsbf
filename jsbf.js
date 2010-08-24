var JSBF = {

	program: "+++.>++.>+.",

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

	parse: function () {
		while ( this.prg_cnt != this.program.length ) {
			switch ( this.program[this.prg_cnt] ) {
				case '+': this.parse_inc(); this.prg_cnt++; break;
				case '-': this.parse_dec(); this.prg_cnt++; break;
				case '>': this.parse_next(); this.prg_cnt++; break;
				case '<': this.parse_pre(); this.prg_cnt++; break;
				case '.': this.parse_dot(); this.prg_cnt++; break;
				default: print("I can not interpret: " + this.program[this.prg_cnt]); this.prg_cnt++; break;
			}
		}

		this.band.debug();
	},

	parse_inc: function () {
		this.band.inc();
	},

	parse_dec: function () {
		this.band.dec();
	},

	parse_next: function () {
		this.band.next();
	},

	parse_pre: function () {
		this.band.pre();
	},

	parse_dot: function () {
		print(this.band.get());
	}
};

JSBF.parse();
