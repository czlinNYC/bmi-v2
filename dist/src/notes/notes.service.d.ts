import { Knex } from 'knex';
export declare class NotesService {
    private readonly knex;
    constructor(knex: Knex);
    create(note: {
        prospect_id: number;
        note: string;
    }): Promise<any>;
    findAll(page: number, prospect_id: number): Promise<any>;
    findOne(id: number): string;
    update(id: number, note: {
        prospect_id: number;
        note: string;
    }): string;
    remove(id: number): Promise<any>;
}
