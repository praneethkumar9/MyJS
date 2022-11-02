
/*======================== index.js  content which gives a function to connect with mySql===================================================*/

/**
 * @license
 * Copyright (c) 2019.
 ** Project  ID : < E-10237-01-01>
 * Node Version  : 10.15
 * Sr.  Version    Modified By
 * 1.   1.0        <Archana K C, Ajay Nayak, Ashwini Naik, Aditya, Esari Praneeth kumar, Bhoomika Maheshwari>  
 * 
 **/
const mysql = require('mysql'),
    retrialCount = 4;
const config = require('e-config-middleware');

function startConnection(count = 0, cb) {
    //condition to check the environment where this is running
    //to enable ssl validation
    if(config.param('production_environment')){
        global.mysqlPool = mysql.createPool({
            host            : config.param('connectiondb.host'),
            port            : config.param('connectiondb.port'),
            user            : config.param('connectiondb.username'),
            password        : config.param('connectiondb.password'),
            database        : config.param('connectiondb.database'),
            ssl             : { rejectUnauthorized: false },
            connectionLimit : 5000,
            connectTimeout  : 60 * 60 * 1000,
            aquireTimeout   : 60 * 60 * 1000,
            timeout         : 60 * 60 * 1000,
            typeCast        : function castField(field, useDefaultTypeCasting) {
            // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if (field.type === 'BIT' && field.length === 1) {
                    var bytes = field.buffer();
                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    return bytes[0] === 1;
                }
                return useDefaultTypeCasting();
            }
        });
    }else{
        global.mysqlPool = mysql.createPool({
            host            : config.param('connectiondb.host'),
            port            : config.param('connectiondb.port'),
            user            : config.param('connectiondb.username'),
            password        : config.param('connectiondb.password'),
            database        : config.param('connectiondb.database'),
            connectionLimit : 5000,
            connectTimeout  : 60 * 60 * 1000,
            aquireTimeout   : 60 * 60 * 1000,
            timeout         : 60 * 60 * 1000,
            typeCast        : function castField(field, useDefaultTypeCasting) {
            // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if (field.type === 'BIT' && field.length === 1) {
                    var bytes = field.buffer();
                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    return bytes[0] === 1;
                }
                return useDefaultTypeCasting();
            }
        });
    }
    // eslint-disable-next-line no-undef
    mysqlPool.getConnection(function(err, connection) {
        if (err) {
            //    log.error(err);
            // eslint-disable-next-line no-console
            console.error('CONNECT FAILED', err.code);
            /**
             * if error, Retrial uppto retrialCount
             */
            if (count <= retrialCount) {
                startConnection(++count, cb);
            } else {
                cb(err);
            }
        } else {
            // eslint-disable-next-line no-console
            console.log('DATABASE CONNECTED');
            cb(null, connection);
        }
    });
    // eslint-disable-next-line no-undef
    mysqlPool.on('error', function(err) {
        //  log.error(err);
        if (err.fatal) {
            if (count <= retrialCount) {
                startConnection(++count, cb);
            } else {
                cb(err);
            }
        }
    });
}
module.exports = {
    /**
     * @param cb,callback
     */
    getConnection : cb => {
        /**
         * Getting connection from pool
         */
        if (typeof mysqlPool == 'undefined') {
            return startConnection(0, cb);
        }
        // eslint-disable-next-line no-undef
        mysqlPool.getConnection(function(err, connection) {
            if (err) {
                // eslint-disable-next-line no-console
                console.error('CONNECT FAILED', err.code);
                //     log.error(err);
                /**
                 * If we got any error whle getting Connection from Pool create new Instance of MySQL
                 */
                startConnection(0, cb);
            } else {
                cb(null, connection);
                //    log.info('Got successfully pool connection');
            }
        });
    },
    createConnection : cb => {
        startConnection(0, cb);
    }
};

/*===============================================================================================*/

/*======================== Example for connecting app to mysql  using above conncetion function===================================================*/

const mysqlConnection = require('./utils/mysql_con');
const app = express();
//sql connection
mysqlConnection.createConnection(function (err, connection) {
    if (err) {
        // eslint-disable-next-line no-console
        console.log('Database connection unsuccessful.\n ' + err);
        return;
    }
    global.dbCon = connection;
    config.sqlConfigFetch(connection, 'qc_service_config', function () {
        printAllConfigurations();
        require( './loaders/Sentry' );
        require('./loaders/appFileSystem')(config);
        require('./loaders/expressLoader')(app);
        
    });
});

/*===============================================================================================*/

/**
 * /**
* A utility function which takes query as input & executes in database
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {String} query - A string representing a query to execute 
* @requires mysqlPool A connected mySql instance of application
* @returns promise which resolves when query execution sucessfull & rejects when error occurs
*--/
const executeSqlQueryWithoutParams = query => {
    return new Promise((resolve, reject) => {
        mysqlPool.query(query, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
 ***/

const generateErrorMessage = e => {
    let errMessage;
    if (e.sqlMessage ? (errMessage = e.sqlMessage) : (errMessage = e.message))
        return errMessage;
};