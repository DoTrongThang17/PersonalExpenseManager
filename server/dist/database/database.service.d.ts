import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
export declare class DatabaseService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getDataSource(): DataSource;
    getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity>;
}
