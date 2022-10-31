const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/user.route");
const taskRouter = require("./src/routes/task.route");

const PORT = 3000;
const version = "v1";
const app = express();

const corsOptions = {
  origin: "localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api/${version}/user`, userRouter);
app.use(`/api/${version}/tasks`, taskRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "route not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
