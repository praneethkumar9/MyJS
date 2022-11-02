/* eslint-disable no-undef */
let chai = require('chai');
let chaiHttp = require('chai-http');
var yaml = require('js-yaml'),
    fs = require('fs'),
    config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
let serverInt = 'http://localhost:' + config.ports.internal;
let should = chai.should();
expect = chai.expect;
chai.use(chaiHttp);
var userId = 2;

/***********UNIT test begin**************/
//Test for admin controller services
/*  S-15781 test cases to get the list of customer records information based on user role */
describe('get customer records for admin', () => {
    const successGetCustomerRecordData = {
        userId    : '5',
        first     : 0,
        limit     : 10,
        search    : [{'customerRecord': '','customer': '','contract': '','geography': '','deliveryModel': '','quoteType': '','status': ''}], 
        sortOrder : 'customer_record_id',
        userRole  : 'Tool Admin',
        withLimit : 1
    };
    const noRecordsGetCustomerRecordData = {

        userId    : '5',
        first     : 1500,
        limit     : 10,
        search    : [{'customerRecord': '','customer': '','contract': '','geography': '','deliveryModel': '','quoteType': '','status': ''}], 
        sortOrder : 'customer_record_id',
        userRole  : 'Tool Admin',
        withLimit : 1
    };
    const missingInputData = {
        userId    : '',
        first     : 0,
        limit     : 10,
        search    : [{'customerRecord': '','customer': '','contract': '','geography': '','deliveryModel': '','quoteType': '','status': ''}], 
        sortOrder : 'customer_record_id',
        userRole  : 'Tool Admin',
        withLimit : 1
    };
    const successCuAdminGetCustomerRecordData = {
        userId    : '5',
        first     : 0,
        limit     : 10,
        search    : [{'customerRecord': '','customer': '','contract': '','geography': '','deliveryModel': '','quoteType': '','status': ''}], 
        sortOrder : 'customer_record_id',
        userRole  : 'CU Admin',
        withLimit : 1
    };
    const successGetCustomerRecordDataWithoutLimit = {
        userId    : '5',
       // first     : 0,
        limit     : 10,
        search    : [{'customerRecord': '','customer': '','contract': '','geography': '','deliveryModel': '','quoteType': '','status': ''}], 
        sortOrder : 'customer_record_id',
        userRole  : 'Tool Admin',
        withLimit : 1
    };

    it('should get customer record details from database with search paramenter (ToolAdmin)', (done) => {    
        chai.request(serverInt)
            .post('/getCustomerRecords') //calling  api
            .send(successGetCustomerRecordData)
            .end(function (err, res) {
                res.body[0].should.have.property('customer_record_id');
                res.body[0].should.have.property('customer_record_name');
                res.body[0].should.have.property('customer_name');
                res.body[0].should.have.property('is_active');
                done();
            });
    });
    it('should get no customer record details from database ', (done) => {    
        chai.request(serverInt)
            .post('/getCustomerRecords') //calling  api
            .send(noRecordsGetCustomerRecordData)
            .end(function (err, res) {
                res.body[0].should.have.property('total');
                done();
            });
    });
    it('should get missing data message ', (done) => {    
        chai.request(serverInt)
            .post('/getCustomerRecords') //calling  api
            .send(missingInputData)
            .end(function (err, res) {
                res.body.should.have.property('Message');
                res.body.should.have.property('status');
                res.body.Message.should.equal('userId/userRole is missing');
                res.body.status.should.equal('false');
                done();
            });
    });
    it('should get customer record details from database with search paramenter (CU ADMIN)', (done) => {    
        chai.request(serverInt)
            .post('/getCustomerRecords') //calling  api
            .send(successCuAdminGetCustomerRecordData)
            .end(function (err, res) {
                res.body[0].should.have.property('customer_record_id');
                res.body[0].should.have.property('customer_record_name');
                res.body[0].should.have.property('customer_name');
                res.body[0].should.have.property('is_active');
                done();
            });
    });
    it('should get customer record details from database with first(req) undefined (ToolAdmin)', (done) => {    
        chai.request(serverInt)
            .post('/getCustomerRecords') //calling  api
            .send(successGetCustomerRecordDataWithoutLimit)
            .end(function (err, res) {
                res.body[0].should.have.property('customer_record_id');
                res.body[0].should.have.property('customer_record_name');
                res.body[0].should.have.property('customer_name');
                res.body[0].should.have.property('is_active');
                done();
            });
    });

});

describe.only('Generate new version of existing hwsw/3pp blocks', () => {
    it('Excel valid data with 3 rows', function (done) {
        // .set('Content-Type', 'multipart/form-data')
        chai.request(serverInt)
            .post('/updateHwswBlocksVersion')
            .set('userId', '1')
            .set('productType', 'hwsw')
            .attach('versionExcel',
                fs.readFileSync('test/test_assets/hwsw3pp/BlockUpdates.xlsx'),
                'BlockUpdates.xlsx')
            .end(function (err, res) {
                console.log('errr....', res.body);
                res.body.should.have.property('excelErrors');
                // res.body.should.have.property('successMessage');
                done();
            });
    }).timeout(3500);
    it('Invalid file input', function (done) {
        // .set('Content-Type', 'multipart/form-data')
        chai.request(serverInt)
            .post('/updateHwswBlocksVersion')
            .set('userId', '1')
            .set('productType', 'hwsw')
            .attach('versionExcel',
                fs.readFileSync('test/test_assets/hwsw3pp/invalidFormat.txt'),
                'invalidFormat.txt')
            .end(function (err, res) {
                res.body.should.have.property('message');
                res.body.message.should.equal('please upload excel');
        
                done();
            });
    }).timeout(3500);
    it('missingColumns', function (done) {
        // .set('Content-Type', 'multipart/form-data')
        let path = config.mount_path + 'versionUploads/1/';
        // if( fs.existsSync(path) ) {
        //     fs.readdirSync(path).forEach(function(file,index){
        //         var curPath = path + '/' + file;
        //         if(fs.lstatSync(curPath).isDirectory()) { // recurse
        //             deleteFolderRecursive(curPath);
        //         } else { // delete file
        //             fs.unlinkSync(curPath);
        //         }
        //     });
        //     fs.rmdirSync(path);
        // }
        chai.request(serverInt)
            .post('/updateHwswBlocksVersion')
            .set('userId', '1')
            .set('productType', 'hwsw')
            .attach('versionExcel',
                fs.readFileSync('test/test_assets/hwsw3pp/missingColumns.xlsx'),
                'missingColumns.xlsx')
            .end(function (err, res) {
                res.body.should.have.property('message');
                res.body.message.should.equal('BlockName column(s) are missing in uploaded excel sheet');
        
                done();
            });
    }).timeout(3500);
    it('invalid product type request param', function (done) {
        // .set('Content-Type', 'multipart/form-data')
        chai.request(serverInt)
            .post('/updateHwswBlocksVersion')
            .set('userId', '1')
            .set('productType', 'invalid')
            .attach('versionExcel',
                fs.readFileSync('test/test_assets/hwsw3pp/missingColumns.xlsx'),
                'missingColumns.xlsx')
            .end(function (err, res) {
                res.body.should.have.property('message');
                res.body.message.should.equal('productType field should have hwsw or svc value');
        
                done();
            });
    }).timeout(3500);
    it('orderMistmatch', function (done) {
        // .set('Content-Type', 'multipart/form-data')
        chai.request(serverInt)
            .post('/updateHwswBlocksVersion')
            .set('userId', '1')
            .set('productType', 'hwsw')
            .attach('versionExcel',
                fs.readFileSync('test/test_assets/hwsw3pp/orderMistmatch.xlsx'),
                'orderMistmatch.xlsx')
            .end(function (err, res) {
                res.body.should.have.property('message');
                res.body.message.should.equal('Column order does not match with the expected order');
                done();
            });
    }).timeout(3500);
    it('execlDataErrors', function (done) {
        // .set('Content-Type', 'multipart/form-data')
        chai.request(serverInt)
            .post('/updateHwswBlocksVersion')
            .set('userId', '1')
            .set('productType', 'hwsw')
            .attach('versionExcel',
                fs.readFileSync('test/test_assets/hwsw3pp/execlDataErrors.xlsx'),
                'execlDataErrors.xlsx')
            .end(function (err, res) {
                res.body.should.have.property('excelErrors');
                // res.body.should.have.property('successMessage');
                done();
            });
    }).timeout(3500);

});