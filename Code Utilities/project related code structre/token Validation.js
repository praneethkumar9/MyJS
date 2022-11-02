/**
 * @license
 * Copyright (c) 2019.
 ** Project  ID : < E-10237-01-01>
 * Node Version  : 10.15
 * Sr.  Version    Modified By
 * 1.   1.0        <Archana K C, Ajay Nayak, Ashwini Naik, Aditya, Esari Praneeth kumar, Bhoomika Maheshwari>  
 * 
 **/

/* eslint-disable max-lines-per-function */
/* eslint-disable node/no-unsupported-features/es-syntax */
 
var config = require('e-config-middleware');
const usersAuthenticationModels = require('../models/usersAuthentication');
let databaseConfig = require('../databaseConfig.js');
const passport = require('passport');
const sentryLogging = require('../utils/sentryLogging');

const tokenMiddleware =  {      
    // method to validate token
    tokenValidations : async (req, res, next) => {
        try {            
            // get token from request header              
            const bearerHeader = req.headers['authorization'];   
            // check whether token exists or not 
            if (bearerHeader) {
                const bearer = bearerHeader.split(' ');
                const token = bearer[1];   
                //check whether saml login or application login 
                if(config.param('samlLogin') == 0){
                    //add eauth token validation for application login
                    // eauth api to check whether token is expired or not
                    new Promise(function (resolve, reject) {    
                        var request = require('request');
                        request({                       
                            url    : config.param('eauth_url')+'validate',                        
                            method : 'GET',
                            json   : true,
                            body   : {                       
                                token : token
                            },
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        }, async function (error, response) {
                            if(error){
                                return res.status(401)
                                    .json({ message: 'Session expired: Retry login', status: false });
                            }else{ 
                            // if token is expired send error msg                       
                                if(response.body.success == false){
                                    return res.status(401)
                                        .json({ message: 'Session expired: Retry login', status: false });
                                }
                                else{                                
                                //check userid is there in req parameter
                                    if(req.body.userId) {
                                        let userTable = databaseConfig.tables['usersTable'];
                                        // fetch user details                                   
                                        let user = await usersAuthenticationModels.getUserDetailsModel(req.body.userId, userTable, 'userId');
                                        if(user[0].user_status.toLowerCase() != databaseConfig.active.toLowerCase()){
                                            return res.status(401)
                                                .json({ message: 'User is not active, please contact support', status: false });
                                        }
                                   
                                    }
                                    // check when token is going to expire                                          
                                    const currentTime = (new Date());
                                    const tokenExpiryTime =new Date((response.body.decoded.exp)*1000);
                                    const diffMin = tokenExpiryTime-currentTime;
                                    var diffMins = Math.round(((diffMin % 86400000) % 3600000) / 60000); // minutes    
                                    // if it is expiring within 3 minutes then generate one more token and send in respone                        
                                    //if(diffMins <= 3){                              
                                    new Promise(function (resolve, reject) {    
                                        var request = require('request');
                                        request({                       
                                            url    : config.param('eauth_url')+'auth/apps',                        
                                            method : 'POST',
                                            json   : true,
                                            body   : {
                                                tokenLife : config.param('eauth_tokenLife'),
                                                token     : config.param('eauth_token')
                                            },
                                            headers : {
                                                'Content-Type'  : 'application/json',
                                                'Authorization' : 'Bearer ' + config.param('eauth_token') // app token should be used from config file
                                            }
                                        }, function (error, response) { 
                                        // adding token in response header
                                            res.setHeader('X-auth-token', response.body.token);
                                            next();
                                        });                   
                                    });
                                // }else{
                                //     res.setHeader('X-auth-token', token);
                                //     next();
                                // }                            
                                //next();
                                }                                            
                            }                                         
                        });                   
                    }); 
                }
                else if(config.param('samlLogin') == 1) { 
                    //check userid is there in req parameter
                    if(req.body.userId) {
                        let userTable = databaseConfig.tables['usersTable'];
                        // fetch user details                                   
                        let user = await usersAuthenticationModels.getUserDetailsModel(req.body.userId, userTable, 'userId');
                        if(user[0].user_status.toLowerCase() != databaseConfig.active.toLowerCase()){
                            return res.status(401)
                                .json({ message: 'User is not active, please contact support', status: false });
                        }
                   
                    }
                    // validate token for saml login using passport strategy
                    passport.authenticate('oauth-bearer', {session: false}, function(request, response) { 
                        //check token is expired                  
                        if(response == false){
                            //token expired generate new token
                            new Promise(function (resolve, reject) {    
                                var request = require('request');
                                request({                       
                                    url    : 'https://login.microsoftonline.com/'+config.param('saml.tenentId')+'/oauth2/token',                        
                                    method : 'POST',
                                    json   : true,
                                    form   : {
                                        grant_type    : 'client_credentials',
                                        client_id     : config.param('saml.clientId'),
                                        scope         : 'https://graph.microsoft.com/.default',                        
                                        client_secret : config.param('saml.clientSecret'),
                                        resource      : 'https://graph.windows.net'
                                    },
                                    headers : {
                                        'Content-Type' : 'application/x-www-url-form-urlencoded',
                                        'Host'         : 'login.microsoftonline.com'
                                    }
                                }, async function (error, response) { 
                                    if(response){
                                        //successfull response
                                        res.setHeader('X-auth-token', response.body.access_token);
                                        next();
                                    }
                                });                   
                            });        
                        }else{
                            // token is validated 
                            res.setHeader('X-auth-token', token);
                            next();
                        }
                    })(req, res, next);
                }            
            } else {
                // Forbidden
                return res.status(403)
                    .json({ message: 'Token is missing', status: false });
            }
        } catch (err) {
            sentryLogging(err,false,req);
            return res
                .status(401)
                .json({ message: 'Session expired: Retry login', status: false });
        }  
    }
};
module.exports = tokenMiddleware;
