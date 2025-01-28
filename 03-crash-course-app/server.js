// This is to get http server
import http from "http";

// This is to get file path
import fs from "fs/promises";

// This is to get path
import url from 'url';

//  This is to get path
import path from 'path';



// To allow more the start to access environment variables in package json you need to update the script in start
const PORT = process.env.PORT || 5000;

// 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async(req, res) => {
  // res.write('Hello World\n');
  //res.setHeader("Content-Type", "text/html");
  //res.end("<h1>Hello World</h1>");

  // res.writeHead(500, { "Content-Type": "application/json" });
  // res.end(
  //   JSON.stringify({
  //     success: true,
  //     data: { id: 1, name: "John Doe" },
  //   })
  // );
  try {
  if (req.method === "GET") {
    let filePath;
    if (req.url === "/") {
      // res.writeHead(200, { "Content-Type": "text/html" });
      // res.end("<h1>Home</h1>");

      filePath = path.join(__dirname, "public", "index.html");
    } else if (req.url === "/about") {
      // res.writeHead(200, { "Content-Type": "text/html" });
      // res.end("<h1>About</h1>");
      filePath = path.join(__dirname, "public", "about.html");
    } else {
      // res.writeHead(404, { "Content-Type": "text/html" });
      // res.end("<h1>Page not found</h1>");
      throw new Error(" Page not found");
    }
    const data = await fs.readFile(filePath);
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  } else {
    throw new Error("Not Allowed!!");
  }

  
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
