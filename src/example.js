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
