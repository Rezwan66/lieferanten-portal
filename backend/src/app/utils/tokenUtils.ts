import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CookieUtils } from './cookieUtils';

const createAccessToken = (payload: JwtPayload) => {
  const { userId, email, role } = payload;

  return jwt.sign({ data: { userId, email, role } }, 'secret', { expiresIn: '1h' });
};

const createRefreshToken = (payload: JwtPayload) => {
  const { userId, email, role } = payload;

  return jwt.sign({ data: { userId, email, role } }, 'secret', { expiresIn: '48h' });
};

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, 'techSolutions-accessToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24 * 1000, // 1d
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, 'techSolutions-refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24 * 1000 * 7, // 7d
  });
};

export const TokenUtils = {
  createAccessToken,
  createRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
};
