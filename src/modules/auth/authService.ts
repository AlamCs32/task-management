import {
    GetAuthQuery,
    CreateAuthBody,
    UpdateAuthBody,
    DeleteAuthParams,
    UpdateAuthParams,
} from './authType';

import { CommonServiceResponse } from '@/types/common';
import { UserSessionData } from '@/types/express';

export const getAuthService = async (
    userSession: UserSessionData,
    query: GetAuthQuery = {},
): CommonServiceResponse => {};

export const createAuthService = async (
    userSession: UserSessionData,
    body: CreateAuthBody,
): CommonServiceResponse => {};

export const updateAuthService = async (
    userSession: UserSessionData,
    params: UpdateAuthParams,
    body: UpdateAuthBody,
): CommonServiceResponse => {};

export const deleteAuthService = async (
    userSession: UserSessionData,
    params: DeleteAuthParams,
): CommonServiceResponse => {};
