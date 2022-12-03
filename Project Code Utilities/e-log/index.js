/* eslint-disable no-inner-declarations */
/* eslint-disable node/no-unsupported-features/es-syntax */
/**
/**
 * @license
 * Copyright (c) 2019.
 ** Project  ID : < E-10237-01-01>
 * Node Version  : 10.15
 * Sr.  Version    Modified By
 * 1.   1.0        <Archana K C, Ajay Nayak, Ashwini Naik, Aditya, Esari Praneeth kumar, Bhoomika Maheshwari>  
 * 
 **/
const bunyan = require('bunyan');
const config = require('e-config-middleware');

/**
* A method to generate error message  by checking whether sql error or runtime error
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {Object} e - An error object
* @returns Error message
*/
const generateErrorMessage = e => {
    let errMessage;
    if (e.sqlMessage ? (errMessage = e.sqlMessage) : (errMessage = e.message))
        return errMessage;
};


/*common logger middleware function to log the request & response based on configuration using bunyan*/
exports.commonLogger = async (req, res, next) => {
    try {
        if(config.param('bunyan_logger.logging_level')){
            /* checking if configuration has value of no logs */
            if (config.param('bunyan_logger.logging_level') != 'no_logs') {
                var logResponse = this.loggerInstance;
                function afterResponse() {
                    res.removeListener('finish', afterResponse);
                    res.removeListener('close', afterResponse);
                    if (config.param('bunyan_logger.logging_level') == 'minimum') {
                        delete logResponse.fields.hostname;
                        delete logResponse.fields.pid;
                        logResponse.info({ responseStatus: res.statusCode }, 'response');
                    }else{
                        logResponse.info({ res: res }, 'response');
                    }
                }
                var logRequest = this.loggerInstance.child(
                    {
                        id   : req.id,
                        body : req.body
                    },
                    true
                );
                if (config.param('bunyan_logger.logging_level') == 'minimum') {
                    delete logRequest.fields.hostname;
                    delete logRequest.fields.pid;
                    logRequest.info({
                        requestUrl : req.originalUrl
                    },'request');
                }else{
                    logRequest.info({
                        req : req
                    },'request');
                }

                res.on('finish', afterResponse);
                res.on('close', afterResponse);

            }
            next();

        }

    } catch (e) {
        return res.status(206).json({ Message: generateErrorMessage(e), status: 'false' });
    }
};
// creating instance for bunyan
exports.loggerInstance = bunyan.createLogger({
    name : config.param('bunyan_logger.name')?
        config.param('bunyan_logger.name'):'common logger services',
    serializers : {
        req : require('bunyan-express-serializer'),
        res : bunyan.stdSerializers.res,
        err : bunyan.stdSerializers.err
    },
    level   : 'info',
    streams : [
        {
            type : 'rotating-file',
            path : config.param('bunyan_logger.path')?
                config.param('bunyan_logger.path'):'./commonLogger.log',
            period : config.param('bunyan_logger.period')?config.param('bunyan_logger.period'):'1d', // daily rotation
            count  : config.param('bunyan_logger.count')?config.param('bunyan_logger.count'):1 // keep 1 back copies
        },
        {
            stream : process.stdout
        }
    ]
});

