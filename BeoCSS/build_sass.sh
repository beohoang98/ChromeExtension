#!/bin/bash
DIR="BeoCSS/content"
FILES=$(ls ./content/)
DEST=""
for name in $FILES
    do
        DEST+="$DIR/$name:$DIR/$name "
    done
npm run sass $DEST