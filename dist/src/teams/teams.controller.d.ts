import { TeamsService } from './teams.service';
export declare class TeamsController {
    private readonly TeamsService;
    constructor(TeamsService: TeamsService);
    create(team: {
        teamname: string;
        email: string;
        name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, team: {
        teamname: string;
        email: string;
        name: string;
        password: string;
        phone: string;
        company: string;
        status: string;
    }): Promise<any>;
    remove(id: string): Promise<any>;
}
