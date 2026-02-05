import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = 'logs';

// Custom format for Console
const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) =>
            `${info.timestamp} ${info.level}: ${info.message}${info.stack ? `\n${info.stack}` : ''}`,
    ),
);

const redact = winston.format((info) => {
    const SENSITIVE_FIELDS = ['token', 'refreshToken'];

    if (info.body && typeof info.body === 'object') {
        const body = info.body as Record<string, unknown>;
        const cleanBody = { ...body };

        SENSITIVE_FIELDS.forEach((field) => {
            if (cleanBody[field]) {
                cleanBody[field] = '********';
            }
        });

        info.body = cleanBody;
    }
    return info;
});

// General format for Files (JSON)
const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    redact(),
    winston.format.json(),
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: fileFormat,
    transports: [
        // 1. Console logging
        new winston.transports.Console({
            format: consoleFormat,
        }),

        // 2. Info Logs
        new DailyRotateFile({
            level: 'info',
            dirname: logDir,
            filename: 'info-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            zippedArchive: true,
        }),

        // 3. Error Logs Only
        new DailyRotateFile({
            level: 'error',
            dirname: logDir,
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d',
            zippedArchive: true,
        }),
    ],
});

export default logger;
