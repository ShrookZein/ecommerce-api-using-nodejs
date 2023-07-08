const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    Error: err,
    message: err.message,
    stack: err.stack,
  });
const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
const globalErroe = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // eslint-disable-next-line eqeqeq
  if (process.env.NODE_ENV == "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};
module.exports = globalErroe;
