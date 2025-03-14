import { Knex } from 'knex';
export declare class OrganizationsService {
    private readonly knex;
    constructor(knex: Knex);
    create(organization: {
        org_name: string;
        status: string;
        account_holder_id: number;
        account_holder_name: string;
    }): Promise<any>;
    findAll(page: any): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, organization: {
        org_name: string;
        status: string;
        account_holder_id: number;
        account_holder_name: string;
    }): Promise<any>;
    remove(id: number): Promise<any>;
}
