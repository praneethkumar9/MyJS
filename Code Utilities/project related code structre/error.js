  //throw error 
  error =  new Error('user role is required. It should be an array.');
  error.statusCode = 400;
  throw error;



  /* Checking whether any custom status code*/
  let statusCode =e.statusCode||500;
  logError(e,res);
  sentryLogging(e,'getAllCatalogDataCountController',req);
  return res.status(statusCode).json({ Message : generateErrorMessage(e),
      status  : 'false' });
}