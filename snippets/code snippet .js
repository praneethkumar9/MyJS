/*============ formatting by limit =====================*/
const formatTextContent = (content, limit) => {
    let formatedText = '';
    let count = 0;
    for (let i = 0; i < content.length; i++) {
        if (count < limit) {
            count++;
            formatedText = formatedText + content[i];
        } else {
            count = 0;
            formatedText = formatedText + content[i] + '\n';
        }
    }
    return formatedText;
};  
/*===========================================================*/
/*===========$ currency fornmat=================*/
 currencyFormat(num)  {
    num = num === null || num === undefined ? 0 : num;
    return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  },
/*========================================================*/
/*========== price deciaml validation================*/
checkNumericValidation(e) {
    const k = e.key;
    if (k.match(/^[0-9]+$/) || k === 'Backspace' || k === '.') {
      if (k === '.') {
        if (this.value.indexOf('.') === -1) {
        return true;
      }
        return false;
      }
        return true;
    }
       return false;
  }
/*===================================================================*/
/*========== generating PDF using linux command of libre office================*/
const generatePdf = (source, destination) => {
    return new Promise((resolve, reject) => {
        exec(
            //'libreoffice --convert-to pdf --headless --outdir ' + destination + ' ' + source,
            'libreoffice --convert-to pdf --headless --outdir "' +
            destination +
            '" "' +
            source +
            '"',
            function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        status     : true,
                        outputFile : destination
                    });
                }
            }
        );
    });
};
/*===================================================================*/
/*========== A method returning a new array with values which are not common in given two arrays================*/
const arrayDiff = (a, b) => {
    return [
        ...a.filter(x => b.indexOf(x) === -1),
        ...b.filter(x => a.indexOf(x) === -1)
    ];
};
/*===================================================================*/
/*========== sort array by key================*/
const sortByKey = (array, key) => {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
    });
};
/*===================================================================*/
/*========== coverting a date into UTC date format ================*/
const convertUTCDate = date => {
    return new Date(date)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
};
/*===================================================================*/
/*========== generating a random password using current date as parameter  ================*/
const randomize = require('randomatic');
const generateRandomPassword = () => {
    const currentDate = dateFormat(new Date(), 'yymmddHHMMss');
    let passwordGenerated =
        randomize('*', 8, { exclude: "%^&*()-_.,?/~+-={}[];'" }) + currentDate;
    return passwordGenerated;
};
/*===================================================================*/
/*========== file Upload By Multer================*/
const fileUploadByMulter =(destination,fileFilter,fileName)=>{
    var storage = multer.diskStorage({
        destination : destination,
        filename    : fileName
    });
    const upload= multer({ storage    : storage ,
        fileFilter : fileFilter
    });
    return upload;
};

let uploadDir,uploadFileName ;
        /* File filter function required for multer configuration to validate the file before uploading */
        const fileFilter= (req,file,cb)=>{
            /* validating file uploaded to be an xlsx file */
            if(!file.originalname.endsWith('.xlsx')){
                return cb(new Error('please upload excel'),true);
            }
            cb(undefined,true);
        };
        /* destination function required for multer configuration to specify the path to be uploaded in server */
        const destination = (req, file, cb)=> {
            uploadDir = config.param('mount_path') + 'versionUploads/'+req.get('userId')+'/';
            /* Creating directory for uploading if doesnt exist */
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            cb(null, uploadDir);
        };
        /* File name function required for multer configuration to rename the file after uploading */
        const  fileName =  (req, file, cb)=> {
            uploadFileName = file.originalname.replace('.xlsx','')+
            `_${dateFormat(new Date(), 'yyyy-mm-dd-HH.MM.ss')}.xlsx`;
            cb(null , uploadFileName);
        }; 
        const upload = require('../utils/fileUploadMulter')(destination,fileFilter,fileName);
        /* calling single method of multer upload method for uplaoding a single file*/
        upload.single('versionExcel')(req,res,err=>{
            if(err){
                return  res.status(206).json({message: err.message});
            }
            req.body.filePath = uploadDir;
            req.body.fileName = uploadFileName;
            req.body.userId = req.get('userId');
            req.body.productType = req.get('productType');
            next();
           
        });
/*===================================================================*/
/*========== date in a specified format================*/

  const generatedDateTime = dateFormat(new Date(), 'yyyy-mm-dd HH-MM-ss'); 
/*===================================================================*/
/*========== coverting an array to all number array================*/
----.map(Number)
/*===================================================================*/
/*========== coverting a string to a number ================*/
1) Number("stringNumber")
2) +a //here a is the variable assigned with string number

/*===================================================================*/
/*========== Making a unique array================*/
[...new Set(headerid)];
/*===================================================================*/
/*========== fs uitilities===============*/
fs.existsSync(rpaFilePath) // chceking whether path exist
fs.mkdirSync(currentFolderPath, { recursive: true }, err => {
    return err;
});   // creating a dir
/*===================================================================*/
/*===================================================================*/
/*========== sort by alphabets===============*/
list.sort(function(a, b) {
    return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
})
/*===================================================================*/
/*========== split & join ===============*/
quoteHeader[0].quote_number.split(' ')
                                        .join('_')   // creating a dir
/*===================================================================*/
/*========== Getting a alphabet from char code===============*/
String.fromCharCode()
/*===================================================================*/
/*========== padding of something===============*/
(`0000000${tempOrderCodeValue}`).slice(-6)
/*===================================================================*/
/*========== Mutation observer===============*/
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        self.theme = mutation.target.getAttribute('theme') === 'dark'
          ? 'ag-theme-balham-dark'
          : 'ag-theme-balham';
      }
    });
  });
  observer.observe(document.querySelector('eui-theme-v0'), {
    attributes: true, // configure it to listen to attribute changes
  });
/*===================================================================*/
/*========== custom events===============*/
self.dispatchEvent(new CustomEvent('inquiryUpdate', { detail: 'true' }));
/*===================================================================*/
/*========== download a file===============*/
link.setAttribute('href', filePath);
    link.setAttribute('download', 'versionTemplates');
    link.click();
/*===================================================================*/
/*========== repalce child===============*/

//You can use replaceChild [docs]:

// `element` is the element you want to wrap
var parent = element.parentNode;
var wrapper = document.createElement('div');

// set the wrapper as child (instead of the element)
parent.replaceChild(wrapper, element);
// set element as child of wrapper
wrapper.appendChild(element);
/*===================================================================*/
/*========== Conversion of a binary number to original number===============*/
let  binaryNumber = '1010';
let originalNumber = parseInt(binaryNumber,2);
console.log(originalNumber)
/*===================================================================*/
/*========== Conversion of a original number to binary number ===============*/
let originalNumber = 10;
let  binaryNumber =  originalNumber.toString(2);
console.log(binaryNumber)
/*===================================================================*/
/*========== Usage of array.from method ===============*/
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]
console.log(Array.from('1010'));
// expected output: Array ["1", "0", "1","0"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
/*===================================================================*/
/*========== Frequent regex ===============*/
	 /^[a-zA-Z]{7}$/  //---- 7 aplhabets
	 /^[0-9a-zA-Z]+$/ // ----- alphanumeric
	 /(^\+[0-9\-]*$|^[0-9\-]*$)/  //-- phone number that allows only + & -
     /^[A-Za-z0-9 _-]+$/  // --- aplhabets,-,_ 
/*===================================================================*/
/*========== Kill Port ===============*/
// netstat  -ano  |  findstr  <Port Number>

// taskkill  /F  /PID  <Process Id>
// 1
// taskkill  /F  /PID  <Process Id>
/*===================================================================*/
/*========== Error Codes ===============*/
// bad request - 400
// internal error - 500
// unauthorized - 401
/*===================================================================*/
/*========== Chunck array into equal size of small array & put in one big array ===============*/
const chunkArray = (array, size)=> {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
        const last = chunked_arr[chunked_arr.length - 1];
        if (!last || last.length === size) {
            chunked_arr.push([array[i]]);
        } else {
            last.push(array[i]);
        }
    }
    return chunked_arr;
};
/*===================================================================*/
/*========== servinng folder in express application===============*/
app.use('/mocha.js', express.static(path.join(__dirname, '../node_modules/mocha/mocha.js')));
/*===================================================================*/
/*========== Getting a header values from request ===============*/
req.body.userId = req.get('userId');  // userId header 
/*===================================================================*/
/*========== Sql converting to char===============*/
// CAST(block_expiry_date AS char) 
/*===================================================================*/
/*========== request method===============*/
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
},async function (error, response) {
    userEauthLogin.token = response.body.token; 
    let userUpdate = await usersAuthenticationModels.
        updateUserLoginSucAttemptsModel(userDetails[0].user_id, userTable);
    if(userUpdate.affectedRows>0){
        return res.status(200).json(userEauthLogin);
    }
}); 
/*===================================================================*/
/*========== API service method to hit url===============*/
getApiCallService: async (urlPath, params = {}) => {
    const myUrl = new URL(urlPath);
    const options = {};
    const paramKeys = Object.keys(params);


    options.method = 'GET';
    options.mode = 'cors';
    if (paramKeys.length) {
      paramKeys.forEach(key => myUrl.searchParams.append(key, params[key]));
    }
let status = false;
    return fetch(myUrl, options).then((res) => {
      if (res.status !== 200) {
       return res.json();
      }
        status = true;
        return res.json();
    }).then(response => [response, status]).catch((error) => {
      console.log(error);
      return false;
    });
  },
  postApiCallService: async (urlPath, bodyParams = {}) => {
    const options = {};

    options.method = 'POST';
    options.mode = 'cors';
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(bodyParams);

    let status = false;
    return fetch(urlPath, options).then((res) => {
      if (res.status !== 200) {
        return res.json();
       }
         status = true;
         return res.json();
    }).then(response => [response, status]).catch((error) => {
      console.log(error);
      return false;
    });
  },
/*===================================================================*/
/*========== Central error handler ===============*/
// in the route controller  put next complusory
(req,res,next){
    next(err)
}
// this have to put in app level
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
/*===================================================================*/



