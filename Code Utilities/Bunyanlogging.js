
/*======================== configuration for custom made logger with bunyan ===================================================*/

bunyan_logger :
    name : 'QC Services Logs'
    path : './assets/commonLogger.log'
    period : '7d' # rotation period
    count  : 4  # keep 4 back copies
    logging_level : 'minimum' # [no_logs,minimum,detailed] possible ways

 /*===============================================================================================*/

 /*========================  custom made logger with bunyan ===================================================*/

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
        }
        // {
        //     stream : process.stdout
        // }
    ]
});


 /*===============================================================================================*/



/*======================== utility methods for logging using custom made logger with bunyan ===================================================*/

const {loggerInstance}=require('e-log');
/**
* A utility function which takes error as input to log error to a file
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {Object} e - An error object 
* @param {Object} res - An express response object 
* @requires loggerInstance A bunyan logger instance of application
* @throws throws an error if any internal errors occurs in function with status code 500
*/
const logError = (e,res)=>{
    try{
        let logResponseInstance  = loggerInstance;
        delete logResponseInstance.fields.hostname;
        delete logResponseInstance.fields.pid;
        let logObject;
        if(!e.sqlMessage){
            let lineNumber=(e.stack).split('at')[1].trim().split(':')[2];
            let methodName=(e.stack).split('at')[1].split('(')[0].trim().split('.');
            logObject= {
                lineNumber,
                methodName   : methodName.length==2?methodName[1]:methodName[0],
                errorMessage : e.message
            };
            logResponseInstance.error({ internalError: logObject }, 'Service error');
        }else{
            let modelName=(e.stack).split('Object.')[2].split('(')[0].trim();
            logObject= {
                modelName,
                sqlErrorMessage : e.sqlMessage
            };
            logResponseInstance.error({ sqlError: logObject }, 'Sql error');
        }
    }
    catch(error) {
        return res.status(500).json(
            { Message: 'Error in logError utility function', status: 'false' });
    }
    
};
/**
* A utility function which takes response object ,status code as input to log response to a file
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {Object} response - An response object which we sent through express response back
* @param {String} statusCode - status code of response sending back for the request
* @param {Object} res - An express response object 
* @requires loggerInstance A bunyan logger instance of application
* @throws throws an error if any internal errors occurs in function with status code 500
*/
const logResponse = (response,statusCode,res)=>{
    try{
        let logResponseInstance  = loggerInstance;
        delete logResponseInstance.fields.hostname;
        delete logResponseInstance.fields.pid;
        logResponseInstance.info({ response,statusCode }, 'response with status code');
    }
    catch(error) {
        return res.status(500).json(
            { Message: 'Error in logResponse utility function', status: 'false' });
    }
    
};
/**
* A utility function which takes methodname,log information as input to log info to a file
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {String} methodName - A string representing a method name from which we want to log
* @param {Object} info - An logger information object 
* @param {Object} res - An express response object 
* @requires loggerInstance A bunyan logger instance of application
*/
const logInfo = (methodName,info)=>{
    let logResponseInstance  = loggerInstance;
    delete logResponseInstance.fields.hostname;
    delete logResponseInstance.fields.pid;
    logResponseInstance.info({ methodName,loggerMessage: info }, 'logger information');
};
/**
* A utility function which takes unhandled rejection reason as input to log info to a file
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {Object} reason - A rejection reason object 
* @requires loggerInstance A bunyan logger instance of application
*/
const logUnhandledRejection=(reason)=>{
    let logResponseInstance  = loggerInstance;
    delete logResponseInstance.fields.hostname;
    delete logResponseInstance.fields.pid;
    logResponseInstance.warn({ 
        unhandledMethodName : reason.stack.split('at')[1].split('(')[0].trim(),
        lineNumber          : reason.stack.split('.js')[1].split(':')[1],
        rejectionMessage    : reason.message
    }, 'Details of unhandle rejection error');   
};

module.exports ={
    logError,
    logResponse,
    logInfo,
    logUnhandledRejection
};

/*====================================================================================================================================*/

