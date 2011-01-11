(function() {
  var output = '';

  this.add = function ( output ) {
      this.output = output;
  }

  this.get = function () {
     return this.output;
  }
}).apply(jsbf.output);

