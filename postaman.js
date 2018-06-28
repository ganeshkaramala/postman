const newman = require('newman'),
path = require('path'),
config = require(__dirname + '/config.json'),
fs = require('fs');

const environmentFolder = __dirname+'/'+config.environment+'/';
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories =  srcPath => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
const collections =  getDirectories(environmentFolder) ;


collections.forEach(  function( name ){
	var options  = {
	"globals":path.join( __dirname+'/globals.json'),
	"environment": path.join(environmentFolder+'/'+config.environment+'.json'),
    "collection": require(environmentFolder+name+'/collection.json'),
	"iterationData": path.join(environmentFolder+name+'/data.csv'),
	"reporters": config.reporters,
	"reporter": { html : { export : './reports/'+config.environment+'/'+name+'/'+'report.html', template: './reports/template-default.hbs' } }
	};
	newman.run( options , function (err) {
		if (err) { throw err; }
			console.log(name+' collection execution complete!');
	});
});
