import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/controllerUtils';
import { TokenUtils } from '../../utils/tokenUtils';

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.registerUser(payload);

  const { accessToken, refreshToken } = result;
  TokenUtils.setAccessTokenCookie(res, accessToken);
  TokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Registered User Successfully!',
    data: result,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.loginUser(payload);

  const { accessToken, refreshToken } = result;
  TokenUtils.setAccessTokenCookie(res, accessToken);
  TokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login Successful!',
    data: result,
  });
};

export const AuthController = { registerUser, loginUser };
