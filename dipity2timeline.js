/*
 * converts a dipity timeline to timelineJS compatible format
 *
 * usage:
 * node dipity2timeline.js infile
 *
 * infile should be a dipity json source file
 */

var args = process.argv.splice(2);
if (!args[0]) {
  console.log("please specify an input file as an argument");
  return;
}
var fs = require('fs');
var infile = args[0];

// Have I already said “error handling is for pussies?”
var input = fs.readFile(infile, function(err,data) {
  var input = JSON.parse(data);
  var output = {};

  // timeline metadata
  output.timeline = {};
  output.timeline.headline = input.timelines[Object.keys(input.timelines)[0]].title;
  output.timeline.type = "default";
  output.timeline.text =
    input.timelines[Object.keys(input.timelines)[0]].descrptn.split("\n\n").join("</p><p>");
  output.timeline.asset = {};
  output.timeline.asset.media = input.timelines[Object.keys(input.timelines)[0]].image;
  output.timeline.asset.credit = "insert timeline credit here";
  output.timeline.asset.caption = "insert timeline caption here";

  // event data
  output.timeline.date = [];
  for (item in input.events) {
    item = input.events[item];
    var date = {};
    // merge dipity date format
    date.startDate = item.year + "," + item.month + "," + item.day + 
      (item.hour ? "," + item.hour + (item.minute ? "," + item.minute : ",0") +
	  (item.second ? "," + item.minute + "," + item.second : "") : "");
    date.endDate = date.startDate; // does dipity have end times?
    date.headline = item.title;
    date.text = item.descrptn.split("\n\n").join("</p><p>");
    date.asset = {};
    date.asset.media = item.link;
    date.asset.thumbnail = item.img_url;
    date.asset.credit = item.link; // just the link for now
    date.asset.caption = item.title; // just the title for now
    output.timeline.date.push(date);
  }

  console.log(JSON.stringify(output, null, "\t"));
});
