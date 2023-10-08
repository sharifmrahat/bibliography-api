import cors from "cors";
import express from "express";
import httpStatus from "http-status";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router

app.get("/", (req, res) => {
  return res.status(httpStatus.OK).json({
    success: true,
    message: `Server running port at ${process.env.PORT}`,
  });
});

export default app;
