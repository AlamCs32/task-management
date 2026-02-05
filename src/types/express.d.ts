export interface UserSessionData {
    entityId?: number;
    entityRole: string;
    iat?: number;
    exp?: number;
}

declare global {
    namespace Express {
        interface Request {
            userSession?: UserSessionData;
        }
    }
}
