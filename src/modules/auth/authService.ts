import {
    changePasswordBody,
    forgetPasswordBody,
    LoginBody,
    LoginSignupResponse,
    resetPasswordBody,
    SignupBody,
} from './authType';

import { UserRepository, UserRoleRepository } from '@/repository';
import { resetPasswordTemplate } from '@/templates';
import { ServiceResponse, StatusCode } from '@/types/common';
import { UserSessionData } from '@/types/express';
import { comparePassword } from '@/utils/bcrypt';
import { throwCustomError } from '@/utils/customeError';
import { createEntity, updateEntity } from '@/utils/entityHelper';
import { UserRole } from '@/utils/enums';
import { isProd } from '@/utils/helper';
import {
    generateAccessToken,
    generateRefreshToken,
    TokenPayload,
    verifyAccessToken,
    verifyRefreshToken,
} from '@/utils/jwtService';
import { sendEmail } from '@/utils/nodemailerService';

export const LoginService = async (body: LoginBody): ServiceResponse<LoginSignupResponse> => {
    const { email, password } = body;

    const user = await UserRepository.findOne({
        where: { email },
        relations: ['userRole'],
    });

    if (!user) {
        throwCustomError('User not found', StatusCode.NOT_FOUND);
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
        throwCustomError('Invalid credentials', StatusCode.UNAUTHORIZED);
    }

    const tokenPayload: TokenPayload = {
        entityId: user.userId,
        entityRole: user.userRole.roleName,
    };

    return {
        accessToken: generateAccessToken(tokenPayload),
        refreshToken: generateRefreshToken(tokenPayload),
    };
};

export const signupService = async (body: SignupBody): ServiceResponse<LoginSignupResponse> => {
    const { username, email, password } = body;

    const existingUser = await UserRepository.findOneBy({ email });
    if (existingUser) {
        throwCustomError('User already exists', StatusCode.BAD_REQUEST);
    }

    const userRole = await UserRoleRepository.findOneBy({
        roleName: UserRole.USER,
        isActive: true,
    });

    if (!userRole) {
        throwCustomError('User role not found', StatusCode.NOT_FOUND);
    }

    const user = await createEntity({
        repository: UserRepository,
        data: {
            username,
            email,
            password, // auto-hashed
            userRole,
        },
    });

    const tokenPayload: TokenPayload = {
        entityId: user.userId,
        entityRole: user.userRole.roleName,
    };

    return {
        accessToken: generateAccessToken(tokenPayload),
        refreshToken: generateRefreshToken(tokenPayload),
    };
};
export const changePasswordService = async (
    userSession: UserSessionData,
    body: changePasswordBody,
): ServiceResponse => {
    const { entityId } = userSession;
    const { oldPassword, newPassword } = body;

    const user = await UserRepository.findOneBy({ userId: entityId });
    if (!user) {
        throwCustomError('User not found', StatusCode.NOT_FOUND);
    }

    const isPasswordMatch = await comparePassword(oldPassword, user.password);
    if (!isPasswordMatch) {
        throwCustomError('Invalid credentials', StatusCode.UNAUTHORIZED);
    }

    await updateEntity({
        repository: UserRepository,
        data: { password: newPassword },
        criteria: { userId: entityId },
    });

    return;
};

export const forgetPasswordService = async (body: forgetPasswordBody): ServiceResponse => {
    const { email } = body;

    const user = await UserRepository.findOneBy({ email });
    if (!user) {
        throwCustomError('User not found', StatusCode.NOT_FOUND);
    }
    const tokenPayload: TokenPayload = {
        entityId: user.userId,
        entityRole: user.userRole.roleName,
    };
    const token = generateAccessToken(tokenPayload, { expiresIn: '5m' });

    const { subject, html } = resetPasswordTemplate({
        username: user.username,
        resetLink: `http://localhost:3000/reset-password?token=${token}`,
        expire: '5 minutes',
    });

    if (isProd) {
        await sendEmail({
            to: user.email,
            subject,
            html,
        });
    }

    await updateEntity({
        repository: UserRepository,
        data: { resetToken: token, resetTokenExpiry: new Date(Date.now() + 5 * 60 * 1000) },
        criteria: { userId: user.userId },
    });

    return;
};

export const resetPasswordService = async (body: resetPasswordBody): ServiceResponse => {
    const { token, newPassword } = body;

    let payload: UserSessionData;

    try {
        payload = verifyAccessToken(token);
    } catch (err) {
        throwCustomError('Invalid or expired token', StatusCode.BAD_REQUEST);
    }

    const user = await UserRepository.findOneBy({
        userId: payload.entityId,
    });

    if (!user) {
        throwCustomError('User not found', StatusCode.NOT_FOUND);
    }

    await updateEntity({
        repository: UserRepository,
        data: { password: newPassword, resetToken: null, resetTokenExpiry: null },
        criteria: { userId: user.userId },
    });

    return;
};

export const refreshTokenService = async (token?: string): ServiceResponse<LoginSignupResponse> => {
    if (!token) {
        throwCustomError('Refresh token missing', StatusCode.UNAUTHORIZED);
    }

    let payload: UserSessionData;

    try {
        payload = verifyRefreshToken(token);
    } catch {
        throwCustomError('Invalid refresh token', StatusCode.UNAUTHORIZED);
    }

    const tokenPayload = {
        entityId: payload.entityId,
        entityRole: payload.entityRole,
    };

    return {
        accessToken: generateAccessToken(tokenPayload),
        refreshToken: generateRefreshToken(tokenPayload),
    };
};
