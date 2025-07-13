const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
    });

    return next();
  } catch (error) {
    next(error);
  }
};

export default validateRequest;

// NOTE: Work flow
// middleware --> validateRequest(userZodSchema) => if success call async(req, res, next)
