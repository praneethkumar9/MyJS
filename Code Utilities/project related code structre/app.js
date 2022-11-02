/**
 * @license
 * Copyright (c) 2019.
 ** Project  ID : < E-10237-01-01>
 * Node Version  : 10.15
 * Sr.  Version    Modified By
 * 1.   1.0        <Archana K C, Ajay Nayak, Ashwini Naik, Aditya, Esari Praneeth kumar, Bhoomika Maheshwari>  
 * 
 **/
/* eslint-disable no-console */

const express = require('express');

const config = require('e-config-middleware');
const {printAllConfigurations} = require('./loaders/printAllConfigurations');
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

//require( './loaders/Sentry' );
//require('./loaders/appFileSystem')(config);
//require('./loaders/expressLoader')(app);
module.exports = app;
