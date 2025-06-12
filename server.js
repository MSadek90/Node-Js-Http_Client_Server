const http =require("http");
const querystring= require("querystring");
const crypto = require("crypto");
const fs = require("fs");

let token =0;

const server=http.createServer(async(request,response) =>{
    
    console.log(request.url);
   
    //localhost8080/me?name=mahmoud&age=25
   switch(request.url)
   {
        case "/mahmoud":
            response.end("this mahmoud");
        break;


        case "/profile":
            if(await checkAuth(request.headers["authorization"]))
              {
                  /**/
                  response.end("succes profile"); 
              } 
              else
              {
                 response.statusCode = 403;
                 response.statusMessage = "Not Authorized";
                 response.end();
              }
              //console.log(token);
        break;

        case "/login":
            if(await checkAuth(request.headers["authorization"]))
            {
               
               token = await generatetoken();
               console.log(token);
               response.end(token);
            }
            else{
                 response.statusCode = 403;
                 response.statusMessage = "Not Authorized";
                 response.end("Credentials Not Valid");
            }
        break;

        default:
            response.statusCode = 404;
            response.statusMessage = "Not Found";
            response.end();
   }   
});



server.listen(8000,() => {

console.log("Sever Start!!!!!!!!!!!!");
  });



/******************************(Private Functions)********************/
/***************************************************************** */
/***************************************************************** */


//me?name=mahmoud&age=27
  function processUrl(url){
      
      let array = url.split("?");
      return{
        path: array[0],//me
        param: querystring.parse(array[1])//{'name':"mahmoud"}
      }
  }


  async function checkAuth(auth_token){

    console.log('auth token is: ' + auth_token);
    if(auth_token == undefined) return false;

    

    if(auth_token.startsWith('Basic ')){

    //Basic dncawjklfqklfmvnekwoitt
    auth_token = auth_token.replace('Basic ','');

    //dncawjklfqklfmvnekwoitt
    let credentials = Buffer.from(auth_token,'base64').toString();
    //console.log(credentials);

    //mahmoud:password
    credentials = credentials.split(":");

    //mahmoud
    //password

    let username= credentials[0];
    //console.log(username);

    let password = credentials[1];
    //console.log(password);

    return(username == "mahmoud" && password == "password");


  }else if(auth_token.startsWith('Bearer ')){

    
    auth_token = auth_token.replace('Bearer ','');
    //console.log('bearer token is: ' + auth_token);
    //console.log('token is: ' + token);
    //de0ba0dc94f204ed9db3e5f9f85696bf
    if(auth_token != token) 
      {
        return false;
      }
  }
  else{
    console.log("auth not include any data");

  }
}



  /*
  server generate token
 
  */
  async function generatetoken()
  {
    let token = crypto.randomBytes(16).toString('hex');
    console.log('token is: ' + token);
    await fs.promises.writeFile('tokenFile',token,'utf-8');
    return token;
  }