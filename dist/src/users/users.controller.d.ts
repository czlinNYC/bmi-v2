import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(id: string): Promise<any>;
    update(id: string, user: {
        username: string;
        email: string;
        name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    remove(id: string): Promise<any>;
}
