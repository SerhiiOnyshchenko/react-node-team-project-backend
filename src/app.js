const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const { noticesRouter } = require("./routes/api/noticesRouter");
const { errorHandler } = require("./helpers/apiHelpes");

// const servicesSidebarRouter = require('./routes/api');
const newsRouter = require("./routes/api/news");
const userRouter = require("./routes/api/user");
const petRouter = require("./routes/api/pet");
const friendsRouter = require("./routes/api/friends");
const cityRouter = require("./routes/api/cityRouter");

const swaggerRouter = require("./routes/swagger/index.js");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use('/api/services-sidebar', servicesSidebarRouter);

app.use("/api/notices", noticesRouter);
app.use("/api/news", newsRouter);
app.use("/api/user", userRouter);
app.use("/api/pet", petRouter);
app.use("/api/cities", cityRouter);
app.use("/api/", swaggerRouter);
app.use("/api/friends", friendsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/user",
    data: "Not found",
  });
});
app.use(errorHandler);

module.exports = app;
