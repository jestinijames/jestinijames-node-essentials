import { createServer } from "http";

const PORT = process.env.PORT || 5000;

const users = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "Bob Doe",
  },
];

const server = createServer((req, res) => {
  if(req.url === "/api/users" && req.method === "GET") {
    //res.setHeader("Content-Type", "application/json");
    //res.write(JSON.stringify(users));
    //res.end();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
