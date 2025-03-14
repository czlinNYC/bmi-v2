import { Knex } from 'knex';
export declare class UsersService {
    private readonly knex;
    constructor(knex: Knex);
    create(user: {
        username: string;
        email: string;
        name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, user: {
        username: string;
        email: string;
        name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    remove(id: number): Promise<any>;
}
