
var _Q = require('q');
var fs = require('nor-fs');
var PATH = require('path');

var basedir = PATH.resolve(process.cwd());
var distdir = PATH.resolve(basedir, 'dist');
var index_file = PATH.resolve(distdir, 'index.js');

_Q.fcall(function() {

	/** See https://github.com/bigeasy/timezone/issues/173#issuecomment-38490293 */
	var zones = require('timezone/zones').filter(function(zone){
		return zone.hasOwnProperty('zones');
	}).map(function(zone){
		return Object.keys(zone.zones)[0];
	});

	var data = 'module.exports = ' + JSON.stringify(zones, null, 2) + ';';

	return fs.mkdirIfMissing(distdir).then(function() {
		return fs.writeFile(index_file, data, {'encoding':'utf8'});
	});

}).fail(function(err) {
	console.error('ERROR: ', err);
}).done();
