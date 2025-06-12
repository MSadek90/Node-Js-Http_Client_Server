
const http = require("http");


function login(){

const options = {
    method: "POST",
    hostname:"127.0.0.1",
    port: 8000,
    path:"/login",
    headers:{
         "authorization":'Basic 87287dd6e53d4e198d639a0bebf0bc36'
    }
};

createRequest(options,(data)=>{
    console.log( 'token is ' + data);
    profile(data);

});

}



function profile(token){
    console.log('token: ' + token);
const options = {
    method: "POST",
    hostname:"127.0.0.1",
    port: 8000,
    path:"/profile",
    headers:{
         "authorization":('Bearer '+ token)
    }
};

createRequest(options,(data)=>{
  console.log(data);
});
}













/**** Generic function for creating a rquest */
function createRequest(options,callback){
let request = http.request(options, (response) => {

    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('close', () => {
        if(callback) callback(data,response);
        else
        console.log(data);
    });
});

//Send the request
request.end();

//If there are any errors
request.on('error', (err) => {
    console.log('Error:', err.message);
});
}


login();
