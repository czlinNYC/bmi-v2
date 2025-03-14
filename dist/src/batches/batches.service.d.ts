import { UpdateBatchDto } from './dto/update-batch.dto';
import { Knex } from 'knex';
export declare class BatchesService {
    private readonly knex;
    constructor(knex: Knex);
    create(batch: {
        org_id: number;
        assignee_id: number;
        entries: number;
        assignee_name: string;
    }): Promise<any>;
    findAll(page: any): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateBatchDto: UpdateBatchDto): string;
    remove(id: number): Promise<any>;
}
