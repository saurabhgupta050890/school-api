import express from "express";
import schoolRouter from "./routes/school.router";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/schools", schoolRouter);
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
