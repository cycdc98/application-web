import express from "express";

const app = express();
const port = 3000;

app.post("/", (req, res) => {
  console.log('get');
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
