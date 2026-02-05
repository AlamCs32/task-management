import {
    DeepPartial,
    EntityManager,
    EntityTarget,
    FindOptionsWhere,
    Repository,
    ObjectLiteral,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

// Non-transactional: repository is required
export interface ICreate<T extends ObjectLiteral> {
    data: DeepPartial<T>;
    repository: Repository<T>;
}

export interface ICreateBulk<T extends ObjectLiteral> {
    data: DeepPartial<T>[];
    repository: Repository<T>;
}

export interface IUpdate<T extends ObjectLiteral> {
    repository: Repository<T>;
    criteria: FindOptionsWhere<T>;
    data: QueryDeepPartialEntity<T>;
}

export interface IDelete<T extends ObjectLiteral> {
    repository: Repository<T>;
    criteria: FindOptionsWhere<T>;
}

// Transactional: use manager + entity
export interface ITransactionalCreate<T extends ObjectLiteral> {
    manager: EntityManager;
    entity: EntityTarget<T>;
    data: DeepPartial<T>;
}

export interface ITransactionalBulkCreate<T extends ObjectLiteral> {
    manager: EntityManager;
    data: DeepPartial<T>[];
    entity: EntityTarget<T>;
}

export interface ITransactionalUpdate<T extends ObjectLiteral> {
    manager: EntityManager;
    entity: EntityTarget<T>;
    criteria: FindOptionsWhere<T>;
    data: QueryDeepPartialEntity<T>;
}

export interface ITransactionalDelete<T extends ObjectLiteral> {
    manager: EntityManager;
    entity: EntityTarget<T>;
    criteria: FindOptionsWhere<T>;
}
export interface CommonResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export enum StatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}

export interface NodeMailerEmailParams {
    from?: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: Array<{
        filename: string;
        path?: string;
        content?: Buffer | string;
        contentType?: string;
    }>;
}

export type CommonServiceResponse = Promise<void | Record<string, any>>;
