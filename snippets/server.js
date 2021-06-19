var http = require('http');
var fs = require('fs');

const PORT=8000; 

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

   let server = http.createServer(function(request, response) {  
    // console.log("kkk")
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);

    server.on('listening',()=>{
        console.log("running in port")
    })

});