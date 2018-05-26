var newman = require('newman'),
path = require('path'),
config = require(__dirname + '/config.json');

var environmentFolder = __dirname+'/'+config.environment+'/';

var options  = {
	"globals":path.join( __dirname+'/globals.json'),
	"environment": path.join(environmentFolder+config.environment+'.json'),
    "collection": require(environmentFolder+config.collectionName),
	"iterationData": path.join(environmentFolder+config.testData),
	"iterationCount":config.testCases,
	"reporters": config.reporters,
	"reporter": { html : { export : './reports/report.html', template: './reports/template-default.hbs' } }
};
 

newman.run( options , function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});