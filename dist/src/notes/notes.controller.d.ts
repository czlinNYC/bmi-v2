import { NotesService } from './notes.service';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(note: {
        prospect_id: number;
        note: string;
    }): Promise<any>;
    findAll(page: number, prospect_id: number): Promise<any>;
    findOne(id: string): string;
    update(id: string, note: {
        prospect_id: number;
        note: string;
    }): string;
    remove(id: string): Promise<any>;
}
