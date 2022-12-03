const yamljs = require( 'yamljs' );
const MongoClient = require('mongodb').MongoClient;
const mysql = require('mysql');
/**
* This module is designed to return configuration parameters.  It will first check if a matching
* environment variable is defined.  If not, it will then check if a matching config parameter
* is defined.  If not, then it will return a default value.
*
* Parameter defaultValue is optional.  When not specified, if a matching parameter was not found, then
* the return value of this function will be undefied.
*
* Parameter configFile is optional.  When not specified, will look for a file named "config.yml", and
* if "config.yml" isn't found, no error will be generated.  If parameter configFile was specified but
* doesn't exist, then an error will be generated.
*
* NOTE: Some system environment variables will already exist (for example: http_proxy).  Be careful when
* naming a config parameter to ensure one with the same name does not already exist as a system
* environment variable!
**/

let dbConfig;
let devLog;
let dbType;
module.exports.fetch=(collection,dburl,cb)=>{
	
MongoClient.connect(dburl, function(err, db) {
dbType='mongo';
  if (err)  {
	  console.log(err);	  
		if(cb){
			cb(null,true);
		}
  }else {
	db.collection(collection).findOne({},{sort:{version :-1}},function(err,results){
		if(err){
			console.log(err);
			if(cb){
				cb(null,true);
			}
		}
		else if(results){
			
			console.log("DB configs created!");			
			dbConfig=results;
			devLog=dbConfig.dev_log;
			if(devLog)
				console.log('Db Configs====='+dbConfig);
		}
		if(cb){
			cb(null,true);
		}
		db.close();
	})	 
  }
  
 
});	
}


module.exports.sqlConfigFetch=(con,table,cb)=>{
	dbType='sql';

	con.query(`SELECT * FROM ${table} tc where version = (Select max(version) from ${table} where field = tc.field limit 1) order by id desc`, function (err, result, fields) {
		if (err) {
			console.log(err);
			if(cb){
				cb(err);
			}			
		}else{
			var jsonObj={};
			result.forEach((values)=>{
				value=values.value;
				if(values.data_type === 'bool')
					value=(/true/i).test(values.value);
				else if(values.data_type === 'int')
					value=Number(values.value);
					
					
				jsonObj[values.field]=value;
			});
			//console.log('result===',result);
			//console.log('json===',jsonObj);			
			dbConfig=jsonObj;			
			devLog=dbConfig['dev_log'];
			if(devLog)
				console.log('Db Configs=====',dbConfig);
			if(cb){
				cb(null,true);
			}
		}
		
  
	});
  
}



module.exports.param = function( propertyString, defaultValue, configFile ) {
	// Make sure propertyString is actually a string
	if( typeof( propertyString ) !== "string" ) {
		throw new Error( "Parameter 'propertyString' is not a string" );
	}
	// Make sure it is not an empty string
	if( propertyString === "" ) {
		throw new Error( "Parameter 'propertyString' is empty" );
	}
	// Split the string into individual properties
	var propertyArray;
	try {
		propertyArray = propertyString.split( "." );
	} catch( err ) {
		throw new Error( "Problem parsing 'propertyString'" );
	}
	// Make sure we don't have an empty array (shouldn't happen, but just be sure)
	if( !( propertyArray.length > 0 ) ) {
		throw new Error( "Result empty after parsing 'propertyString'" );
	}	
	
	
	// Check if there is a matching environment variable
	if( typeof( process.env[propertyString] ) !== "undefined" ) {
		// Found a match -- return it
		if(devLog)
			console.log('ENV config found===='+propertyString+'=>'+process.env[propertyString]);
		return process.env[propertyString];
		
	}
	
	//chekc if there is matching DB config
	if(dbConfig){
		if(dbType === 'mongo'){
			dbConfigFound=true;
			var property = dbConfig;		
			for( var i = 0; i < propertyArray.length; i++ ) {
				if( ( propertyArray[i] === "" )
					|| ( typeof( property[propertyArray[i]] ) === "undefined" )
				) {
					// Matching DB config entry wasn't found 
					dbConfigFound=false;
					break;					
				}			
				property = property[propertyArray[i]];		
			}			
			// Matching config entry found
			if(dbConfigFound){
				if(devLog)
					console.log('Mongo DB config found===='+propertyString+'=>'+property);
				return property;
			}
		}else{
			if(dbConfig[propertyString]){
				if(devLog)
					console.log('SQL DB config found===='+propertyString+'=>'+dbConfig[propertyString]);
				return dbConfig[propertyString];
			}
			
		}
	}
	
		// Environment variable wasn't found -- check for a matching config entry
		var configPath = "config.yml";
		if( typeof( configFile ) !== "undefined" ) {
			configPath = configFile;
		}
		// Parse the config file
		var config;
		try {
			config = yamljs.load( configPath );
		} catch( err ) {
			console.log(err);
			// If config file was specified, then throw error
			if( typeof( configFile ) !== "undefined" ) {
				throw err;
			}
			// Config file not specified -- ignore error and return default value
			if(devLog)
				console.log('Problem in config yml ===='+propertyString+'=>'+defaultValue);
			return defaultValue;
		}
		// Look for matching config entry (may be nested in form "obj.prop.val")
		var property = config;
		for( var i = 0; i < propertyArray.length; i++ ) {
			if( ( propertyArray[i] === "" )
				|| ( typeof( property[propertyArray[i]] ) === "undefined" )
			) {
				// Matching config entry wasn't found -- return default value
				if(devLog)
					console.log('No Config Found in ENV/DB/YML===='+propertyString+'=>'+defaultValue);
				return defaultValue;
			}			
			property = property[propertyArray[i]];
		}	
	
	// Matching config entry found -- return it
	if(devLog)
		console.log('YML config found===='+propertyString+'=>'+property);
	return property;
};


