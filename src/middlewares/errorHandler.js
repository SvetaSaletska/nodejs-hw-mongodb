// import { HttpError } from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.name,
//       data: err,
//     });
//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     data: err.message,
//   });
// };

import { isHttpError } from 'http-errors';

function errorHandler(error, _req, res, _next) {
  console.error(error);

  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: error.message,
      data: error,
    });
  }

  res.status(500).send({
    status: 500,
    message: 'Internal server error',
    data: error.message,
  });
}

export { errorHandler };
