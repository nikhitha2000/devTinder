const express = require("express");

const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
const authRouter = require('./Routes/auth');
const ProfileRouter = require('./Routes/Profile');
const requestsRouter = require("./Routes/requests");
const userRouter = require("./Routes/user");

app.use("/",authRouter);
app.use("/",ProfileRouter);
app.use("/",requestsRouter);
app.use("/",userRouter);

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
