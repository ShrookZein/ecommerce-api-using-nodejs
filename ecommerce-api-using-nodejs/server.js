const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalErroe = require("./Middlewares/ErrorMiddleware");
const dbConnection = require("./config/database");
//Routes
const categoryRoute = require("./routes/categoryRoute");
const SubCategoryRoute = require("./routes/SubCategoryRoute");
const BrandRoute = require("./routes/BrandRoute");
// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", SubCategoryRoute);
app.use("/api/v1/brands", BrandRoute);
app.all("*", (req, res, next) => {
  // const err = new Error(`Cannot find this Route: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`Cannot find this Route: ${req.originalUrl}`, 400));
});
// Globals error handlers middlewares for express
app.use(globalErroe);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// Handle rejection outside Express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`shutting down server...`);
    process.exit(1);
  });
});
