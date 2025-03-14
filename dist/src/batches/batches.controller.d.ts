import { BatchesService } from './batches.service';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { ProspectsService } from '../prospects/prospects.service';
export declare class BatchesController {
    private readonly batchesService;
    private readonly prospectService;
    constructor(batchesService: BatchesService, prospectService: ProspectsService);
    create(batch: {
        org_id: number;
        assignee_id: number;
        assignee_name: string;
        entries: number;
    }): Promise<any>;
    findAll(page?: number): Promise<any>;
    findOne(id: string): string;
    update(id: string, updateBatchDto: UpdateBatchDto): string;
    remove(id: string): Promise<any>;
}
