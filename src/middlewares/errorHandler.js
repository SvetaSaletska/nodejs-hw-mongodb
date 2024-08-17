import { isHttpError } from 'http-errors';

function errorHandler(error, _req, res, _next) {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: error.message,
    });
  }

  res.status(500).send({
    status: 500,
    message: 'Internal server error',
  });
}

export { errorHandler };

// export const errorHandler = (err, req, res, _next) => {
//   res.status(err.status || 500).json({
//     status: err.status || 500,
//     message: err.message || 'Something went wrong',
//   });
// };
