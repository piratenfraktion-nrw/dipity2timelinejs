dipity to timelineJS format converter
=====================================

dipity2timeline.js takas a [dipity](http://dipity.com "dipity") JSON source file 
and converts it to a [timelineJS](http://timeline.verite.co/
"timelineJS homepage") compatible format.

The script will output the JSON data to `./timeline.json`.  Downloaded thumbnail 
images wil be placed in `./thumbnails`, preview images in `./images`.

Usage
-----

`node dipity2timeline.js source.json` where `source.json` ist your dipity JSON 
file.
