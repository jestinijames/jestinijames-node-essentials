const http = require('http');// this is a core module that comes with nodejs
const fs = require('fs');


const server  =
http.createServer((req,res) => {
  console.log(req.url,req.method,req.headers)
  //process.exit(); this causes a hard exit


  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {

    const body = [];
    //when req on data basically gets us the chunks of data that is being sent when the form is submitted
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });

//this is blocking code. we need use an async callback to use for the redirection after the doc is saved
    //fs.writeFileSync('message.txt', 'DUMMY'); 


    //req on end is basically once the chunks are all recieved. 
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  
  }

  // We can send a response as an html
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my first Node.JS Server!!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000); // you can call localhost:3000 to see results here
