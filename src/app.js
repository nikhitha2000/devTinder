const express = require("express");

const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
const authRouter = require('./Routes/auth');
const ProfileRouter = require('./Routes/Profile');
const requestsRouter = require("./Routes/requests");

app.use("/",authRouter);
app.use("/",ProfileRouter);
app.use("/",requestsRouter);

connectDB()
  .then(() => {
    console.log("connection established");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("database connection error", err);
    process.exit(1);
  });
