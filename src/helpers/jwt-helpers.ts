import httpStatus from "http-status";
import ApiError from "../app/error/api-error";
import config from "../config";
import jwt, { Secret } from "jsonwebtoken";

const generateToken = (data: Record<string, unknown>) => {
  var token = jwt.sign(data, config.JWT_SECRET_ACCESS as Secret, {
    expiresIn: config.JWT_SECRET_EXPIRY,
  });
  return token;
};

const verifyToken = (token: string) => {
  if (token) {
    const decoded = jwt.verify(token, config.JWT_SECRET_ACCESS as Secret);
    return decoded;
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access!");
  }
};

export const JwtHelpers = {
  generateToken,
  verifyToken,
};
