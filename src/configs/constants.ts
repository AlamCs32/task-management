// App Config
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

// JWT Config
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRET_EXPIRES_IN = process.env.JWT_SECRET_EXPIRES_IN;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;
export const REFRESH_SECRET_EXPIRES_IN = process.env.REFRESH_SECRET_EXPIRES_IN;

// CORS Config
export const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Postgres DB Config
export const DB_HOST = process.env.DB_HOST;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_DATABASE = process.env.DB_DATABASE;

// SWAGGER
export const SWAGGER_HOST = process.env.SWAGGER_HOST;

// Mail Config
export const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
export const NODEMAILER_USER = process.env.NODEMAILER_USER;
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
export const NODEMAILER_PORT = Number(process.env.NODEMAILER_PORT) || 587;
export const NODEMAILER_SECURE = process.env.NODEMAILER_SECURE === 'true';
export const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@example.com';
