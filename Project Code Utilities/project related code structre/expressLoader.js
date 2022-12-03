/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const compression = require( 'compression' );
const { commonLogger } = require('e-log');
var logger = require('morgan');
const cors = require('cors');
//passport startegy for saml
const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
var config = require('e-config-middleware');
const {logError,logInfo} = require('../utils/logging');
const sentryLogging = require('../utils/sentryLogging');
const { generateErrorMessage } = require('../utils/utilities');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.js');


/*token validation middleware for all routes*/
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');
/*Express routes*/
const routes = require('../routes/index');
const withoutTokenValidationRouter = require('../routes/withoutTokenValidationRouter');

/*handler function for unhandled rejection*/
const {logUnhandledRejection}=require('../utils/logging');
/**
 * A expressLoader utility method to handle all app related configuration
 * @author Esari praneeth kumar
 * @modifiedBy Esari praneeth kumar
 * @param {Object} app Express app
 * @requires express express npm module
 */
const expressLoader = (app)  =>
{    
    app.use(
        cors()
    );
    //app.use (express.bodyParser()) ;
    app.use(logger('common'));
    app.use(logger('dev'));
    app.use('/assets', express.static('assets'));
    app.use('/uploads', express.static('uploads'));
    app.use(express.json());
    app.use( compression() );
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
   
    app.use(commonLogger);    
    /* Routes for swagger setup */
    app.use('/QC_apiDocs', swaggerDocument, swaggerUi.serve, swaggerUi.setup());

    app.use('',withoutTokenValidationRouter);
    //options for bearerStrategy
    var options = {
        identityMetadata  : 'https://login.microsoftonline.com/'+config.param('saml.tenentId')+'/.well-known/openid-configuration',    
        clientID          : config.param('saml.clientId'),                        
        audience          : 'https://graph.windows.net',
        // loggingLevel      : 'info',
        passReqToCallback : false,
        loggingNoPII      : false
    };
    
    //initializing bearerStrategy
    var bearerStrategy = new BearerStrategy(options, function (token, done) {        
        done(null, {}, token);
    });     
    
    //initializing passport
    app.use(passport.initialize());
    passport.use(bearerStrategy);    
   
    // added middleware to all apis for token validation
    //app.use(tokenValidationMiddleware.tokenValidations);
    
    routes(app);
    process.on('unhandledRejection',(reason)=>{
        // eslint-disable-next-line no-console
        console.log(reason.message);
        logInfo('unhandledRejection',reason.message);
        logUnhandledRejection(reason);  
    });
    process.on('uncaughtException', err => {   
        logInfo('uncaughtException',err.message);
        // eslint-disable-next-line no-console
        console.log(err.name, err.message);
        // eslint-disable-next-line no-console
        console.log('UNCAUGHT EXCEPTION!  Shutting down...');
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    });
 
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    // eslint-disable-next-line no-unused-vars
    app.use(function (err, req, res, next) {
    // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        /* Checking whether any custom status code*/
        let statusCode =err.statusCode||500;
        sentryLogging(err,false,req);
        logError(err,res);
        return res.status(statusCode).json({ Message : generateErrorMessage(err),
            status  : 'false' });
    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    });

};

module.exports =  expressLoader;
