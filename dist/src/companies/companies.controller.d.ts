import { CompaniesService } from './companies.service';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(company: {
        email: string;
        contact_name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, company: {
        email: string;
        contact_name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    remove(id: string): Promise<any>;
}
