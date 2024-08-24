import { isHttpError } from 'http-errors';

function errorHandler(error, _req, res) {
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
