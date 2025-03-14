import { Module } from '@nestjs/common';
import { BatchesService } from './batches.service';
import { BatchesController } from './batches.controller';
import { ProspectsService } from 'src/prospects/prospects.service';
@Module({
	controllers: [BatchesController],
	providers: [BatchesService, ProspectsService]
})
export class BatchesModule {}
