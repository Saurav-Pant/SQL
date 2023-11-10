import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PantSumit123",
  database: "learning",
  insecureAuth: true,
});

app.get("/", (req, res) => {
  res.json("Hello from Backend");
});

app.get("/notes", (req, res) => {
  const q = "SELECT * FROM learning.notes;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/notes", (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    return res.status(400).json({ error: "Title and desc are required" });
  }

  const q = "INSERT INTO learning.notes (`title`, `desc`) VALUES (?, ?)";
  db.query(q, [title, desc], (err, data) => {
    if (err) return res.json(err);

    return res.json("Note has been created successfully");
  });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
