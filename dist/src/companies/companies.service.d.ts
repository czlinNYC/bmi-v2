import { Knex } from 'knex';
export declare class CompaniesService {
    private readonly knex;
    constructor(knex: Knex);
    create(company: {
        email: string;
        contact_name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, company: {
        email: string;
        contact_name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    remove(id: number): Promise<any>;
}
