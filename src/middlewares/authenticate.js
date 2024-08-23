import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};

// export async function authenticate(req, res, next) {
//   if (typeof req.headers.authorization !== 'string') {
//     return next(createHttpError(401, 'Please provide Authorization header'));
//   }

//   const [bearer, accessToken] = req.headers.authorization.split(' ', 2);

//   if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
//     return next(createHttpError(401, 'Auth header should be type of Bearer'));
//   }

//   const session = await SessionsCollection.findOne({ accessToken });

//   if (session === null) {
//     return next(createHttpError(401, 'Session not found'));
//   }

//   if (new Date() > new Date(session.accessTokenValidUntil)) {
//     return next(createHttpError(401, 'Access token is expired'));
//   }

//   const user = await UsersCollection.findOne({ _id: session.userId });

//   if (user === null) {
//     return next(createHttpError(401, 'Session not found'));
//   }

//   req.user = user;

//   next();
// }
