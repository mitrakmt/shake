import APIError from '../utils/ApiError.js';
import {
  UserModel,
  RefreshTokenModel,
} from '../models/index.js';
import httpStatus from 'http-status';
import { tokenTypes } from '../config/tokens.js';
import { verify } from '../utils/jwtHelpers.js';

const isActiveUser = async (req, res, next) => {
  try {
    const accessToken = req.get('Authorization');
    console.log('accessToken', accessToken);
    if (!accessToken)
      throw new APIError(httpStatus.UNAUTHORIZED, 'Invalid Access Token');

    let tokenPayload = await verify(accessToken, process.env.JWT_SECRET);
    console.log('tokenPayload', tokenPayload);
    if (!tokenPayload || tokenPayload.type !== tokenTypes.ACCESS) {
      console.log('0')
      throw new APIError(httpStatus.UNAUTHORIZED, 'Invalid Access Token');
    }

    let userExists = await UserModel.exists({
      _id: tokenPayload.userId,
    });

    if (!userExists) {
      console.log('1')
      throw new APIError(httpStatus.FORBIDDEN, 'Invalid Access Token - logout');
    }

    let refreshTokenExists = await RefreshTokenModel.exists({
      userRef: tokenPayload.userId,
      loginTime: tokenPayload.loginTime,
    });

    if (!refreshTokenExists) {
      console.log('2')
      throw new APIError(httpStatus.FORBIDDEN, 'Invalid Access Token - logout');
    }

    req.authData = tokenPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export { isActiveUser };
