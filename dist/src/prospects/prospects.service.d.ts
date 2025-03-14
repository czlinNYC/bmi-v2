import { Knex } from 'knex';
export declare class ProspectsService {
    private readonly knex;
    constructor(knex: Knex);
    create(prospect: {
        comapany_name: string;
        contact_name: string;
        last_name: string;
        first_name: string;
        job_title: string;
        email: string;
        phone: string;
        country: string;
        website: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        industry: string;
        sub_industry: string;
        phone_verfied: boolean;
        phone_type: string;
        phone_status: string;
        phone_DNC: boolean;
        email_verfied: boolean;
        email_type: string;
        email_status: string;
        email_sub_status: string;
        batch_id?: number;
    }): Promise<any>;
    createMany(prospects: {
        comapany_name: string;
        contact_name: string;
        last_name: string;
        first_name: string;
        job_title: string;
        email: string;
        phone: string;
        country: string;
        website: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        industry: string;
        sub_industry: string;
        phone_verfied: boolean;
        phone_type: string;
        phone_status: string;
        phone_DNC: boolean;
        email_verfied: boolean;
        email_type: string;
        email_status: string;
        email_sub_status: string;
        batch_id: number;
    }[]): Promise<any>;
    validateEmail(prospects: {
        comapany_name: string;
        contact_name: string;
        last_name: string;
        first_name: string;
        job_title: string;
        email: string;
        phone: string;
        country: string;
        website: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        industry: string;
        sub_industry: string;
        phone_verfied: boolean;
        phone_type: string;
        phone_status: string;
        phone_DNC: boolean;
        email_verfied: boolean;
        email_type: string;
        email_status: string;
        email_sub_status: string;
        batch_id: number;
    }[]): Promise<any>;
    validatePhone(prospects: {
        id?: number;
        comapany_name: string;
        contact_name: string;
        last_name: string;
        first_name: string;
        job_title: string;
        email: string;
        phone: string;
        country: string;
        website: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        industry: string;
        sub_industry: string;
        phone_verfied: boolean;
        phone_type: string;
        phone_status: string;
        phone_DNC: boolean;
        email_verfied: boolean;
        email_type: string;
        email_status: string;
        email_sub_status: string;
        batch_id: number;
    }[], phone: string, DNC: string): Promise<{
        phone_verified: boolean;
        phone_status: any;
        phone_type: any;
        phone_DNC: boolean;
        id?: number;
        comapany_name: string;
        contact_name: string;
        last_name: string;
        first_name: string;
        job_title: string;
        email: string;
        phone: string;
        country: string;
        website: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        industry: string;
        sub_industry: string;
        phone_verfied: boolean;
        email_verfied: boolean;
        email_type: string;
        email_status: string;
        email_sub_status: string;
        batch_id: number;
    }[]>;
    findAll(page: any): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, prospect: {
        id?: number;
        comapany_name: string;
        contact_name: string;
        last_name: string;
        first_name: string;
        job_title: string;
        email: string;
        phone: string;
        country: string;
        website: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        industry: string;
        sub_industry: string;
        phone_verfied: boolean;
        phone_type: string;
        phone_status: string;
        phone_DNC: boolean;
        email_verfied: boolean;
        email_type: string;
        email_status: string;
        email_sub_status: string;
        batch_id: number;
    }): Promise<any>;
    remove(id: number): Promise<any>;
    removeAll(id: number): Promise<any>;
}
