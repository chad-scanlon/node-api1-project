const express = require("express");
const shortid = require("shortid");
const server = express();

let users = [];

//CRUD:
// Create
// Read
// Update
// Delete

// GET /

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ server: "is working" });
});
server.get("/next", (req, res) => {
  res.json({ server: "is still working" });
});

// Create

server.post("/api/users", (req, res) => {
  if (req.body !== undefined) {
    const newUserInfo = req.body;
    newUserInfo.id = shortid.generate();
    users.push(newUserInfo);
    res.status(201).json(users);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

// Read
server.get("/api/users", (req, res) => {
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  res.json(users);
});

// Update- replace
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  let index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users[index] = changes;
    res.status(200).json(users[index]);
  } else {
    res.status(404).json({ message: "user id not found" });
  }
});

// Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const deleted = users.find((user) => user.id === id);
  if (deleted) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log("listening on localhost", 5000);
});
