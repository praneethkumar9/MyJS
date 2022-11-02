/*======================== configuration for sentry ===================================================*/
sentry:
    dsn: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXX@sentry.nrws.ericsson.net/47'
    release: 1.0.0
/*===============================================================================================*/

/*======================== loader file of sentry to intiate it on start of service ===================================================*/
const Sentry = require( '@sentry/node' );
const config = require('e-config-middleware');

class SentryLoader {
    constructor ( dsn, environment, release ) {
        this.dsn = dsn;
        this.environment = environment;
        this.release = release;
    }

    init () {
        Sentry.init( {
            dsn         : this.dsn,
            environment : this.environment,
            release     : this.release 
        } );

        Sentry.configureScope( scope => {
            // eslint-disable-next-line
      scope.addEventProcessor( ( event, hint ) => {
                // Add anything to the event here
                // returning null will drop the event
                //log.info( `Sentry event logged: ${JSON.stringify( event )}` );
                return event;
            } );
        } );
    }
}
const SentryInstance = new SentryLoader(
    config.param( 'sentry.dsn' ),
    config.param('env'),
    config.param( 'sentry.release')
);
SentryInstance.init();

module.exports = Sentry;

/*===============================================================================================*/

/*======================== Utility file to log the errors & example to use it ===================================================*/
const Sentry = require( '../loaders/Sentry' );
/**
* A utitlity method to logging the error through sentry
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {Object} err -  Error object
* @param {String} [controllerName=false] -  A string representing a controller name . If not provided , default value is false
* @param {Object} req -  Express request object. If not provided , default value is false
* @param {module} Sentry -  Sentry module
*/
const sentryLogging = (err,controllerName=false,req=false)=>{
    Sentry.withScope((scope) => {
        if(controllerName){
            scope.setTag('controller', controllerName);
        }
        if(req){
            if(req.body.userId)
                scope.setUser({
                    id : req.body.userId
                });
            scope.setTag('routePath', req.originalUrl);
            scope.setTag('req body', JSON.stringify(req.body));  
        }
        scope.setLevel('error');
        
        Sentry.captureException(err);
    });
};
module.exports =  sentryLogging;


// Calling above utility function to log errors in sentry

try{
    //our code
}
catch (e) {
    /* Checking whether any custom status code*/
    let statusCode =e.statusCode||500;
    logError(e,res);
    sentryLogging(e,'checkExpiredMaterialAndActivityController',req);
    return res.status(statusCode).json({ Message : generateErrorMessage(e),
        status  : 'false' });
}

/*===============================================================================================*/