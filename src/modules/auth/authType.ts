export interface LoginSignupResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface SignupBody extends LoginBody {
    username: string;
}

export interface changePasswordBody {
    oldPassword: string;
    newPassword: string;
}

export interface forgetPasswordBody {
    email: string;
}

export interface resetPasswordBody {
    token: string;
    newPassword: string;
}
