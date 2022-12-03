/*======================== Usage of swagger in app===================================================*/
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.js');
//const swaggerDocument = require('../swagger.json'); ----- for static json file with swagger documentation

app.use('/QC_apiDocs', swaggerDocument, swaggerUi.serve, swaggerUi.setup());
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));   ----- for static json file with swagger documentation

/*===============================================================================================*/


/*======================== Dynamic swagger document in js file===================================================*/
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */

const config = require('e-config-middleware');
const env = config.param('env');
let server = 'http://localhost:' + config.param('ports').internal;
const swaggerDocument = (req, res, next) => {
    switch (env) {
    case 'uat':
        server =  'https://138.85.180.62/quotecreator-services';
        break;
    case 'production':
        server =  'https://quotecreator.ericsson.net/quotecreator-services';
        break;
    case 'dev':
        server =  'https://nrwsdev.naops.exu.ericsson.se/quotecreator-services';
        break;
    }
    req.swaggerDoc = {
        'openapi' : '3.0.1',
        'info'    : {
            'title'       : 'QuoteCreator',
            'description' : 'NodeJS HTTPS Request Service Document.',
            'version'     : '0.1'
        },
        'components' : {
            'securitySchemes' : {
                'bearerAuth' : {
                    'type'         : 'http',
                    'scheme'       : 'bearer',
                    'bearerFormat' : 'JWT'
                }
            }
        },
        'security' : [
            {'bearerAuth': []}
        ],
        'servers' : [ {
            'url'         : server,
            'description' : 'Running server'
        }],
        'paths' : {
            '/login' : {
                'post' : {
                    'tags' : [
                        'Login'
                    ],
                    'description' : 'Login',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'userId' : {
                                            'type' : 'integer'
                                        },
                                        'quoteId' : {
                                            'type' : 'integer'
                                        }
                                    }
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : '{\r\n    "userName":"znkxjxx",\r\n    "password":"1qazZAQ!"\r\n}'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'Login',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Validation Error Message'
                        }
                    }
                } 
            },
            '/addFPCODPPOverageBlocks' : {
                'post' : {
                    'tags' : [
                        'ESR Router'
                    ],
                    'description' : 'Adding FPCO, DPP, OverageBlocks to quote created by esr import',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'userId' : {
                                            'type' : 'integer'
                                        },
                                        'quoteDetails' : {
                                            'type'  : 'array',
                                            'items' : {
                                                'type'       : 'object',
                                                'properties' : {
                                                    'productPackageTypes' : {
                                                        'type'  : 'array',
                                                        'items' : {
                                                            'type' : 'string'
                                                        }
                                                    },
                                                    'blockIds' : {
                                                        'type'  : 'array',
                                                        'items' : {
                                                            'type' : 'integer'
                                                        }
                                                    },
                                                    'productTypes' : {
                                                        'type'  : 'array',
                                                        'items' : {
                                                            'type' : 'integer'
                                                        }
                                                    },
                                                    'quoteId' : {
                                                        'type' : 'integer'
                                                    },
                                                    'customDescriptionList' : {
                                                        'type'  : 'array',
                                                        'items' : {
                                                            'type' : 'string'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                             
                                    }
                                },
                                'examples' : {
                                    'sucessfull addition of blocks' : {
                                        'value' : '{\r\n    "userId": 1,\r\n    "quoteDetails": [\r\n        {\r\n                "quoteId"                    : 199,\r\n                "customDescriptionList": ["desc1", "desc2", "desc3"],\r\n                "productPackageTypes": [\r\n                null, "DPP", "FPP"\r\n            ],\r\n                "blockIds": [\r\n                5,\r\n                2676,\r\n                2679\r\n            ],\r\n                "productTypes": [\r\n                1,\r\n                4,\r\n                4\r\n            ],\r\n                "quantities": [\r\n                1,\r\n                123,\r\n                1\r\n            ],\r\n                "overageBlockIds": [\r\n                2673\r\n            ],\r\n                "overagePPTs": ["FPP"\r\n            ],\r\n                "overageQuantities": [\r\n                123\r\n            ],\r\n                "overageProductTypes": [\r\n                4\r\n            ],\r\n                "overageCustomDescriptionList": ["desc4"\r\n            ]\r\n        }\r\n    ]\r\n}'
                                    },
                                    'userId/quoteDetails are missing' : {
                                        'value' : '{\r\n        "userId" : 1\r\n}'
                                    },
                                    'Empty quoteDetails' : {
                                        'value' : '{\r\n        "userId" : 1,\r\n        "quoteDetails" : []\r\n}'
                                    },
                                    'QuoteId missing' : {
                                        'value' : '{\r\n        "userId" : 1,\r\n        "quoteDetails" : [{}]\r\n}'
                                    },
                                    'BlockInfoMissing1' : {
                                        'value' : '{\r\n        "userId" : 1,\r\n        "quoteDetails" : [{\r\n            "quoteId" : 1\r\n        }]\r\n}'
                                    },
                                    'BlockInfoMissing2' : {
                                        'value' : '{\r\n        "userId" : 1,\r\n        "quoteDetails" : [{\r\n            "quoteId" : 1,\r\n              "blockIds" : [1]\r\n        }]\r\n}'
                                    },
                                    'BlockInfoMissing3' : {
                                        'value' : '{\r\n        "userId" : 1,\r\n        "quoteDetails" : [{\r\n            "quoteId" : 1,\r\n              "blockIds" : [1], \r\n            "customDescriptionList" : ["desc"]\r\n        }]\r\n}'
                                    },
                                    'BlockInfoMissing4' : {
                                        'value' : '{\r\n        "userId" : 1,\r\n        "quoteDetails" : [{\r\n            "quoteId" : 1,\r\n              "blockIds" : [1], \r\n            "customDescriptionList" : ["desc"],\r\n            "productPackageTypes"   : ["DPP"]\r\n        }]\r\n}'
                                    },
                                    'BlockInfoMissing5' : {
                                        'value' : '{\r\n        "userId" : 1,\r\n        "quoteDetails" : [{\r\n            "quoteId" : 1,\r\n              "blockIds" : [1], \r\n            "customDescriptionList" : ["desc"],\r\n            "productPackageTypes"   : ["DPP"],\r\n            "productTypes"          : [1]\r\n        }]\r\n}'
                                    }
                                }
                            }
                        }
                    },
                    'responses' : {
                        '200' : {
                            'description' : 'Successfully added blocks to quote'
                        },
                        '400' : {
                            'description' : 'Invalid request params '
                        }
                    }
                }},
            '/getQuotePdf' : {
                'post' : {
                    'tags' : [
                        'Quote pdf'
                    ],
                    'description' : 'Services to create a pdf of a quote',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'userId' : {
                                            'type' : 'string'
                                        },
                                        'quoteId' : {
                                            'type' : 'string'
                                        }
                                    }
                                },
                                'examples' : {
                                    'success' : {
                                        'value' : '{"quoteId": "1860", "userId": "516"}'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'Services to create a pdf of a quote',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Failure of pdf  due to libre issue or internal error'
                        }
                    }
                } 
            },
            '/getUserPreferences' : {
                'post' : {
                    'tags' : [
                        'User Admin Router'
                    ],
                    'description' : 'User Preference Details',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'userId' : {
                                            'type'     : 'integer',
                                            'required' : true
                                        }
                                    }
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : '{\n    "userId" : 1\n}'
                                    },
                                    '1' : {
                                        'value' : '{\n    "userId" : ""\n}'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'User Preference Details',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Validation Error Message'
                        }
                    }
                }
            },
            '/getCart' : {
                'post' : {
                    'description' : 'Get Cart Details for the quote',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'userId' : {
                                            'type' : 'integer'
                                        },
                                        'quoteId' : {
                                            'type' : 'integer'
                                        }
                                    }
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : '{\r\n    "quoteId":1000000,\r\n    "userId":1\r\n}'
                                    },
                                    '1' : {
                                        'value' : '{\r\n    "quoteId":10,\r\n    "userId":1\r\n}'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'Get Cart Details for the quote',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Validation Error Message'
                        }
                    }
                } 
            },
            '/addBlockToCart' : {
                'post' : {
                    'description' : 'Add blocks to Cart',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'blockIds' : {
                                            'type' : 'string'
                                        },
                                        'userId' : {
                                            'type' : 'integer'
                                        },
                                        'quoteId' : {
                                            'type' : 'integer'
                                        },
                                        'productTypeId' : {
                                            'type' : 'integer'
                                        }
                                    }
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : '{\r\n        "userId"        : 1,\r\n        "blockIds"      : "1,2",\r\n        "quoteId"       : 13,\r\n        "productTypeId" : 1\r\n    }'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'Add blocks to Cart',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Validation Error Message'
                        }
                    }
                }    
            },
            '/getUserRoles' : {
                'post' : {
                    'description' : 'Get User Role Details',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'signum' : {
                                            'type' : 'string'
                                        }
                                    }
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : '{\n    "signum" : "ZKCXARC"\n}'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'Get User Role Details',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Validation Error Message'
                        }
                    }
                }    
            },
            '/getUserList' : {
                'post' : {
                    'tags' : [
                        'Users'
                    ],
                    'description' : 'Get Users List API',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    '$ref' : '#/components/schemas/body'
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : ' {\r\n"userId" : 278,\r\n"limit" : 30000,\r\n"first" : 0,\r\n"sortOrder" : "user_logon asc",\r\n"search" : [{"signum": "","name": "","email": "","userRole": "","customerGroup": "","status": "","lastLogin": "","isAccountRep": ""}]\r\n }\r\n '
                                    }
                                }
                            }
                        }
                    },
                    'responses' : {
                        '200' : {
                            'description' : 'Auto generated using Swagger Inspector'
                        }
                    }
                }
            },
            '/updatePriceQuoteBlock' : {
                'post' : {
                    'tags' : [
                        'Block Router'
                    ],
                    'description' : 'Update block price for the quote',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'blockId' : {
                                            'type' : 'integer'
                                        },
                                        'quotedCostPrice' : {
                                            'type' : 'integer'
                                        },
                                        'discount' : {
                                            'type' : 'integer'
                                        },
                                        'quotedUnitPrice' : {
                                            'type' : 'integer'
                                        },
                                        'catalogUnitPrice' : {
                                            'type' : 'integer'
                                        },
                                        'userId' : {
                                            'type' : 'integer'
                                        },
                                        'quoteId' : {
                                            'type' : 'integer'
                                        },
                                        'productTypeId' : {
                                            'type' : 'integer'
                                        }
                                    }
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : '{\n"userId":1,\n"quoteId":1,\n"blockId":2,\n"productTypeId":1,\n"quotedUnitPrice":100,\n"discount":1,\n"quotedCostPrice":1,\n"catalogUnitPrice":1\n\n}'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'Update Block Price',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Validation Error Message'
                        }
                    }
                }    
            },
            '/updateBlockQuantity' : {
                'post' : {
                    'description' : 'Update Block Quantity',
                    'requestBody' : {
                        'content' : {
                            'application/json' : {
                                'schema' : {
                                    'type'       : 'object',
                                    'properties' : {
                                        'blockId' : {
                                            'type' : 'string'
                                        },
                                        'quantity' : {
                                            'type' : 'string'
                                        },
                                        'userId' : {
                                            'type' : 'string'
                                        },
                                        'quoteId' : {
                                            'type' : 'string'
                                        },
                                        'productTypeId' : {
                                            'type' : 'string'
                                        }
                                    }
                                },
                                'examples' : {
                                    '0' : {
                                        'value' : '{\r\n        "quoteId"       : "2",\r\n        "productTypeId" : "4",\r\n        "blockId" : "1",\r\n        "userId" : "1",\r\n        "quantity" : "20"\r\n        \r\n        \r\n        \r\n    }'
                                    },
                                    '1' : {
                                        'value' : '{\r\n        "quoteId"        : "1",\r\n        "productTypeId" : "3",\r\n        "blockId" : "4",\r\n        "userId" : "1",\r\n        "quantity" : "20"\r\n        \r\n        \r\n        \r\n    }'
                                    },
                                    '2' : {
                                        'value' : '{\r\n        "quoteId"        : "2",\r\n        "productTypeId" : "3",\r\n        "blockId" : "1",\r\n        "userId" : "2",\r\n        "quantity" : "20"\r\n    }'
                                    },
                                    '3' : {
                                        'value' : '{\r\n        "quoteId"        : "2",\r\n        "productTypeId" : "3",\r\n        "blockId" : "2",\r\n        "userId" : "2",\r\n        "quantity" : "20"\r\n    }'
                                    }
                                }
                            }
                        }
                    },
                    'summary'   : 'Update Block Quantity',
                    'responses' : {
                        '200' : {
                            'description' : 'Successfull'
                        },
                        '206' : {
                            'description' : 'Validation Error Message'
                        }
                    }
                }    
            }
           
        }
    };
    next();
};
module.exports = swaggerDocument;

/*===============================================================================================*/

/*======================== Static swagger document in json file===================================================*/
{
    "host": "",
    "swagger" : "2.0",
    "tags": [{
        "name": "deliverable-service services",
        "description": "API for deliverable-service"
    }],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/deliverable-service/deliverables" : {
            "put" : {
                "tags" : [
                    "Update Deliverables"
                ],
                "parameters" : [{
                  "name" : "Update",
                  "in" : "body",
                  "description" : "Deliverables details to be updated",
                  "schema" : {
                      "$ref" : "#/definations/put"
                  }
                }],
                "Summary" : "Update delivertables",
                "responses" : {
                    "200" : {
                        "description" : "Deliverables updated successfully"
                    },
                    "403" : {                                                                                  
                        "description" : "Authorization error"
                    },
                    "400" : {
                        "description" : "Bad request"
                    }
                }
            },
            "post": {
              "tags": [
                  "Create Deliverables"
              ],
              "parameters" : [{
                "name" : "create",
                "in" : "body",
                "description" : "Deliverables details to be created",
                "schema" : {
                    "$ref" : "#/createdefinations/post"
                }
              }],
              "summary": "Create Deliverables",
              "responses": {
                  "200": {
                      "description": "Deliverables created"
                  },
                  "403": {
                      "description": "Authorization error"
                  },
                  "400": {
                      "description": "Bad request"
                  }
              }
          },
          "get": {
                "parameters": [
                  {
                    "name": "context_ids",
                    "in": "query",
                    "required": true,
                    "description": "Get Deliverables"
                  }
                ],
                "tags": [
                    "GetDeliverables"
                ],
                "summary": "Get Deliverables",
                "responses": {
                    "200": {
                        "description": "Deliverables retrieved"
                    },
                    "403": {
                        "description": "Authorization error"
                    },
                    "400": {
                        "description": "Bad request"
                    }
                }
          }
        },
        "/deliverable-service/getHistory/{context_id}" : {
          "get" : {
              "tags" : [
                  "Get History"
              ],
              "parameters" : [{
                "name" : "context_id",
                "in" : "path",
                "description" : "context_id whose History to be fetched",
                "type" : "string"
              }
            ],
              "summary" : "Fetch History",
              "responses" : {
                  "200" : {
                      "description" : "Successfull"
                  },
                  "403" : {
                      "description" : "Authorization error"
                  },
                  "400" : {
                      "description" : "Bad request"
                  }
              }
          }
    },
    "/deliverable-service/observations" : {
      "put" : {
          "tags" : [
              "Add Observations"
          ],
          "parameters" : [{
            "name" : "Update",
            "in" : "body",
            "description" : "Observations to be updated"
          }],
          "summary" : "Update observations",
          "responses" : {
              "200" : {
                  "description" : "Observations updated successfully"
              },
              "403" : {
                  "description" : "Authorization error"
              },
              "400" : {
                  "description" : "Bad request"
              }
          }
      }
    },
    "/deliverable-service/files/{context_id}" : {
     
      "delete" : {
        "tags" : [
            "Delete files"
        ],
        "parameters" : [{
          "name" : "context_id",
          "in" : "path",
          "description" : "context_id whose files to be deleted",
          "type" : "string"
        }
      ],
        "summary" : "Delete files",
        "responses" : {
            "200" : {
                "description" : "Successfull"
            },
            "403" : {
                "description" : "Authorization error"
            },
            "400" : {
                "description" : "Bad request"
            }
        }
    }
    },
    "/deliverable-service/getHistory/{deliverable_context_id}" : {
       "get" : {
         "tags" : [
             "Get files history"
         ],
         "parameters" : [{
           "name" : "deliverable_context_id",
           "in" : "path",
           "description" : "Deliverable context_id whose History to be fetched",
           "type" : "string"
         }
       ],
         "summary" : "Files History",
         "responses" : {
             "200" : {
                 "description" : "Successfull"
             },
             "403" : {
                 "description" : "Authorization error"
             },
             "400" : {
                 "description" : "Bad request"
             }
         }
     }
     },
     "/deliverable-service/deliverables/cop/{cop_context_id}" : {
      "get" : {
          "tags" : [
              "Get CopDeliverables"
          ],
          "parameters" : [{
            "name" : "cop_context_id",
            "in" : "path",
            "description" : "cop_context_id whose CopDeliverables to be fetched",
            "type" : "string"
          }
        ],
          "summary" : "Fetch CopDeliverables",
          "responses" : {
              "200" : {
                  "description" : "Successfull"
              },
              "403" : {
                  "description" : "Authorization error"
              },
              "400" : {
                  "description" : "Bad request"
              }
          }
      }
}
},
    "securityDefinitions": {
        "jwt": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization"
        }
    },
    "security": [{
        "jwt": []
    }],
    "definations" : {
        "put" : {
            "context_id": {
              "type": "String",
              "required": true
            },
            "cop_context_id": {
              "type": "String",
              "required": true
            },
            "standard": {
              "id": {
                "type": "String"
              },
              "name": {
                "type": "String"
              }
            },
            "deliverable_code": {
              "type": "String",
              "required": true
            },
            "deliverable_name": {
              "type": "String",
              "required": true
            },
            "category": {
              "type": "String",
              "required": true
            },
            "status": {
              "type": "String",
              "required": true
            },
            "last_updated": {
              "date": {
                "type": "Date"
              },
              "user": {
                "id": {
                  "type": "String"
                },
                "name": {
                  "type": "String"
                }
              }
            },
            "is_customer_visible": {
              "type": "Boolean",
              "default": false
            },
            "is_customer_deliverable": {
              "type": "Boolean",
              "default": false
            },
            "total_file_count": {
              "type": "Number",
              "default": 0
            },
            "approved_file_count": {
              "type": "Number",
              "default": 0
            },
            "rejected_file_count": {
              "type": "Number",
              "default": 0
            }
          },
          "post" : {
            "context_id": {
              "type": "String",
              "required": true
            },
            "cop_context_id": {
              "type": "String",
              "required": true
            },
            "standard": {
              "id": {
                "type": "String"
              },
              "name": {
                "type": "String"
              }
            },
            "deliverable_code": {
              "type": "String",
              "required": true
            },
            "deliverable_name": {
              "type": "String",
              "required": true
            },
            "category": {
              "type": "String",
              "required": true
            },
            "status": {
              "type": "String",
              "required": true
            },
            "last_updated": {
              "date": {
                "type": "Date"
              },
              "user": {
                "id": {
                  "type": "String"
                },
                "name": {
                  "type": "String"
                }
              }
            },
            "is_customer_visible": {
              "type": "Boolean",
              "default": false
            },
            "is_customer_deliverable": {
              "type": "Boolean",
              "default": false
            },
            "total_file_count": {
              "type": "Number",
              "default": 0
            },
            "approved_file_count": {
              "type": "Number",
              "default": 0
            },
            "rejected_file_count": {
              "type": "Number",
              "default": 0
            }
          }
    }

}
/*===============================================================================================*/
