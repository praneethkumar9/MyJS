# e_log Service #
> This service is useful  to provide logging for each request-response cycle . 
> It will log the  request details as well as response details based on the configuration provided.
> It may log the error details if any errors occurs in proccessing any request

### E-log utilization in express-based nodejs project ###
***
> In order for an application to utilize the logging module it must have a import a module 
> in a express app before all routes defined and use that as middleware 
>
> const { commonLogger } = require('e-log');
> app.use(commonLogger);
***



### Required Config file ###
***
> In order for e_log to log the info with our own configuration . A configuration file must be created and be in the root of the application.
> Current required parameters are as follows:
> * `bunyan_logger.path`
> * `bunyan_logger.period`
> * `bunyan_logger.count`
> * `bunyan_logger.name`
> * `bunyan_logger.logging_level`
***


