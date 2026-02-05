// Utils Functions

import { DeleteResult, UpdateResult, ObjectLiteral } from 'typeorm';

import {
    ICreate,
    ICreateBulk,
    IDelete,
    ITransactionalBulkCreate,
    ITransactionalCreate,
    ITransactionalDelete,
    ITransactionalUpdate,
    IUpdate,
} from '@/types/common';

/**
 * Creates a new entity in the database.
 *
 * @param repository - The repository to use for the creation operation.
 * @param data - The data to create the entity with.
 * @returns A promise that resolves to the created entity.
 */
export async function createEntity<T extends ObjectLiteral>({
    data,
    repository,
}: ICreate<T>): Promise<T> {
    const entity = repository.create(data);
    return await repository.save(entity);
}

/**
 * Creates multiple entities in the database.
 *
 * @param repository - The repository to use for the creation operation.
 * @param data - Array of partial entity data to be inserted into the database.
 * @returns A promise that resolves to an array of created entities.
 */
export async function createBulkEntity<T extends ObjectLiteral>({
    data,
    repository,
}: ICreateBulk<T>): Promise<T[]> {
    const entity = repository.create(data);
    return await repository.save(entity);
}

/**
 * Creates a new entity in the database within a transaction.
 * If the transaction fails the created entity is rolled back.
 * @param manager - The EntityManager instance to use.
 * @param entity - The entity's target.
 * @param data - The data to create the entity with.
 * @returns The created entity.
 */
export async function transactionalCreateEntity<T extends ObjectLiteral>({
    manager,
    entity,
    data,
}: ITransactionalCreate<T>): Promise<T> {
    const repo = manager.getRepository<T>(entity);
    const instance = repo.create(data);
    return await repo.save(instance);
}

/**
 * Creates multiple entities in a single transaction.
 * @param manager - Transactional EntityManager.
 * @param entity - Entity class.
 * @param data - Array of partial entities to be created.
 * @returns Array of created entities.
 */
export async function transactionalCreateBulkEntity<T extends ObjectLiteral>({
    manager,
    entity,
    data,
}: ITransactionalBulkCreate<T>): Promise<T[]> {
    const repo = manager.getRepository<T>(entity);
    const instances = repo.create(data);
    return await repo.save(instances);
}

/**
 * Updates records in the database that match the given criteria.
 *
 * @param data - The data to update the records with
 * @param repository - The repository to use for the update operation
 * @param criteria - The criteria to filter the records to update
 * @returns The results of the update operation
 */
export async function updateEntity<T extends ObjectLiteral>({
    data,
    repository,
    criteria,
}: IUpdate<T>): Promise<UpdateResult> {
    return await repository.update(criteria, data);
}

/**
 * Performs an update operation within a transaction.
 *
 * @param manager - The EntityManager
 * @param entity - The entity to update
 * @param criteria - The criteria to filter the records to update
 * @param data - The data to update
 * @returns The result of the update operation
 */
export async function transactionalUpdateEntity<T extends ObjectLiteral>({
    manager,
    entity,
    criteria,
    data,
}: ITransactionalUpdate<T>): Promise<UpdateResult> {
    const repo = manager.getRepository<T>(entity);
    return await repo.update(criteria, data);
}

/**
 * Deletes records from the database that match the given criteria.
 *
 * @param repository - The repository to use for the delete operation
 * @param criteria - The criteria to filter the records to delete
 * @returns The results of the delete operation
 */
export async function deleteEntity<T extends ObjectLiteral>({
    repository,
    criteria,
}: IDelete<T>): Promise<DeleteResult> {
    return await repository.delete(criteria);
}

/**
 * Deletes records from the database that match the given criteria within a transaction.
 * If the transaction fails the deleted records are rolled back.
 *
 * @param manager - Transactional EntityManager.
 * @param entity - Entity class.
 * @param criteria - Criteria to filter the records to delete.
 * @returns The results of the delete operation.
 */
export async function transactionalDeleteEntity<T extends ObjectLiteral>({
    manager,
    entity,
    criteria,
}: ITransactionalDelete<T>): Promise<DeleteResult> {
    const repo = manager.getRepository<T>(entity);
    return await repo.delete(criteria);
}
