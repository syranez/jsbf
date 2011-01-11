#!/bin/sh

SRCFILES="
  jsbf.js
  program.js
  output.js
  band.js
  parser.js
"

DISTDIR="../dist"

source ./functions.sh

cleanup $DISTDIR

if [ ! -d $DISTDIR ]; then
    echo 'Creating lib directory.';
    mkdir $DISTDIR
fi


echo 'Creating jsbf.js...';
for file in $SRCFILES; do
    echo ' adding file '$file;
    cat ../src/$file >> $DISTDIR/jsbf.js
done;

