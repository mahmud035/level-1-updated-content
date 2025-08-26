export const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res
      .status(err.status)
      .json({ statusCode: err.status, message: err.message });
  }

  return res.status(500).json({ statusCode: err.status, message: err.message });
};
