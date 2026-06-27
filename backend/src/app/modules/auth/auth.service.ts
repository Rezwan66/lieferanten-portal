import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { IUserPayload } from './auth.interface';
import { TokenUtils } from '../../utils/tokenUtils';

const registerUser = async (payload: IUserPayload) => {
  try {
    const hashedPass = await bcrypt.hash(payload.password, 10);
    const result = await prisma.$transaction(async tx => {
      // Create user
      const user = await tx.user.create({
        data: { email: payload.email, password: hashedPass },
      });
      // Create profile
      const userProfile = await tx.profile.create({
        data: {
          userId: user.id,
        },
      });
      // Strip the user pass
      const { password, ...userWithoutPassword } = user;
      // Generate secure tokens
      const accessToken = TokenUtils.createAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      const refreshToken = TokenUtils.createRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Return from transaction
      return { ...userWithoutPassword, accessToken, refreshToken, userProfile };
    });

    return result;
  } catch (error) {
    console.error('Registration service error:', error);
    throw new Error(error instanceof Error ? error.message : 'Registration failed!');
  }
};

const loginUser = async (payload: IUserPayload) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: payload.email },
    });

    // Compare plain-text password from payload directly with the DB hash
    // Syntax: bcrypt.compare(plainText, hash)
    const isMatched = await bcrypt.compare(payload.password, user.password);
    if (!isMatched) {
      throw new Error('Password incorrect!');
    }

    // Strip the user pass
    const { password, ...userWithoutPassword } = user;
    // Generate secure tokens
    const accessToken = TokenUtils.createAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = TokenUtils.createRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { ...userWithoutPassword, accessToken, refreshToken };
  } catch (error) {
    console.error('Login service error:', error);
    throw new Error(error instanceof Error ? error.message : 'Login failed!');
  }
};

export const AuthService = { registerUser, loginUser };
