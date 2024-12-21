const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res
      .status(err.status)
      .json({ message: err.message, statusCode: err.status });
  }

  return res.status(500).json({ message: err.message, statusCode: err.status });
};

export default errorHandler;
