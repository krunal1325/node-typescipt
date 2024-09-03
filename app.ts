import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import modelsPromise from './models/index';
import errorMiddleware from "./middleware/error";
import fileUpload from 'express-fileupload';

dotenv.config();
// import routes
import routes from "./routes";
import path from "path";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use("/", routes);
app.use(errorMiddleware);

app.use("*", (req, res) =>
  res.status(200).json({
    code: 200,
    status: true,
    data: null,
    message: "Route not found",
  })
);

const startServer = async () => {
  try {
    const models = await modelsPromise;
    await models.sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};

startServer();