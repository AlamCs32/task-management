interface TemplateResponse {
    subject: string;
    html: string;
}

interface ResetPasswordTemplate {
    username: string;
    resetLink: string;
    expire: string;
}

export const resetPasswordTemplate = ({
    username,
    resetLink,
    expire,
}: ResetPasswordTemplate): TemplateResponse => {
    return {
        subject: 'Password Reset',
        html: `
    <h1>Password Reset Request</h1>
    <p>Hello, ${username || ''},</p>
    <p>It looks like you requested a password reset. Please click the link below to reset your password:</p>
    <p><a href="${resetLink}">Reset Password</a></p>
    <p><strong>Note:</strong> This link will expire in ${expire}.</p>
    <p>If you did not request a password reset, you can ignore this email.</p>
    <p>Thank you!</p>
    `,
    };
};
