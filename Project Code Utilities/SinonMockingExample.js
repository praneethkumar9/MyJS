
/*======================== mockRequestResponse.js ===================================================*/
/* eslint-disable node/no-unsupported-features/es-syntax */
const sinon = require('sinon');
module.exports.mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};
module.exports.mockRequest = (reqBodyObject,...reqFunctions) => {
    const req = {
        body : {
            ...reqBodyObject
        }
    };
    if(reqFunctions){
        reqFunctions.forEach(item=>{
            req[item.name]=item;
        });
    }
    return req;
};
/*===============================================================================================*/

/*======================== Example of using mocking ===================================================*/
const mySqlDao = require('../DAO/mySqlDao');
const {mockResponse,mockRequest}=require('./mockRequestResponse');
const sinon = require('sinon');

//This is using Chai-mocha 
describe('catalog exporting based on price group', () => {
    const hwswSuccessRequestParams =  {priceGroup: 'ATT',groupType: 'HWSW',userId: 1};
    const svcSuccessRequestParams =  {priceGroup: 'ATT',groupType: 'SVC',userId: 1};
    const missingParams =  {priceGroup: 'ATT',groupType: 'HWSW'};
    let mockSucessfullDatabaseData=[
        {
            BlockId               : 1,
            PriceGroup            : 'ATT',
            BlockName             : '033/BFY1120401/W',
            ProdFamily            : 'ATT',
            SubFamily             : 'Backhaul',
            Descr                 : 'DUMMY UNIT/Dummy unit 115mm, in package',
            ProdType              : 'Hardware',
            LineItem              : 100,
            Material              : '033/BFY1120401/W',
            QtyMat                : 1,
            UnitCost              : null,
            Price                 : 4.89,
            MatGrp5               : 'MA',
            ItemCat               : 'ZSXI',
            P_Code                : '14',
            ContextId             : null,
            SLOC                  : '3001',
            KitPartNumber         : null,
            CartDescr             : 'DUMMY UNIT/Dummy unit 115mm, in package',
            ShowInCart            : 'Y',
            ShowInVA11            : 'Y',
            ShowMaterialInQuote   : 'N',
            ShowBlockInQuote      : 'N',
            AllowVarDescr         : 'N',
            AllowVarPrice         : 'Flexible Price',
            StandardRel           : null,
            MinPrice              : null,
            MaxPrice              : null,
            TransportationFee     : null,
            TransportationFeeType : 'Flexible',
            Notes                 : null,
            ReleaseDate           : '10/22/2018',
            ExpiryDate            : '12/31/2019',
            ModifiedBy            : null,
            ModifiedOn            : '02/26/2020',
            Version               : 1
        }
    ];
    let noRecordResponse ={message: 'No catalog information found for given price group' ,status: false};
    let missingParamsResponse ={Message: 'priceGroup/groupType/userId are missing' ,status: 'false'};
    let successResponse ={message: 'Catalog exported successfully' ,status: true};
    let stub;
    before(()=>{
        stub= sinon.stub(mySqlDao, 'select');
        stub.onFirstCall().callsFake(async function fakeFn() {
            return mockSucessfullDatabaseData;
        });
        stub.onSecondCall().callsFake(async function fakeFn() {
            return mockSucessfullDatabaseData;
        });
        stub.onThirdCall().callsFake(async function fakeFn() {
            return [];
        });
    });
    after(()=>{
        stub.restore();
    });
    it('should get updated details in database with all provided parameters (hwsw) ', async function() {  
        const req = mockRequest(hwswSuccessRequestParams);
        const res = mockResponse();
        await blockControllers.exportCatalogController(req,res);
        sinon.assert.calledWithExactly(res.status,200);
        sinon.assert.calledWithExactly(res.json,successResponse);
    });
    it('should get updated details in database with all provided parameters (svc) ', async function() {  
        const req = mockRequest(svcSuccessRequestParams);
        const res = mockResponse();
        await blockControllers.exportCatalogController(req,res);
        sinon.assert.calledWithExactly(res.status,200);
        sinon.assert.calledWithExactly(res.json,successResponse);
    });
    it('should get message with 204 for not having records in database ', async function() {  
        const req = mockRequest(hwswSuccessRequestParams);
        const res = mockResponse();
        await blockControllers.exportCatalogController(req,res);
        sinon.assert.calledWithExactly(res.status,201);
        sinon.assert.calledWithExactly(res.json,noRecordResponse);
    });
    it('should get message with 400 for misisng body params ', async function() {  
        const req = mockRequest(missingParams);
        const res = mockResponse();
        await blockControllers.exportCatalogController(req,res);
        sinon.assert.calledWithExactly(res.status,400);
        sinon.assert.calledWithExactly(res.json,missingParamsResponse);
    
    });
});
/*===============================================================================================*/
