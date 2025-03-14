import { OrganizationsService } from './organizations.service';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(organization: {
        org_name: string;
        status: string;
        account_holder_id: number;
        account_holder_name: string;
    }): Promise<any>;
    findAll(page?: number): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, organization: {
        org_name: string;
        status: string;
        account_holder_id: number;
        account_holder_name: string;
    }): Promise<any>;
    remove(id: string): Promise<any>;
}
