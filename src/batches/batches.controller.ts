import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Query,
	Delete
} from '@nestjs/common';
import { BatchesService } from './batches.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { ProspectsService } from '../prospects/prospects.service';

@Controller('api/batches')
export class BatchesController {
	constructor(
		private readonly batchesService: BatchesService,
		private readonly prospectService: ProspectsService
	) {}

	@Post()
	create(
		@Body()
		batch: {
			org_id: number;
			assignee_id: number;
			assignee_name: string;
			entries: number;
		}
	) {
		return this.batchesService.create(batch);
	}

	@Get()
	findAll(@Query('page') page = 0) {
		return this.batchesService.findAll(page);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.batchesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateBatchDto: UpdateBatchDto) {
		return this.batchesService.update(+id, updateBatchDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		const prospectsRemoved = this.prospectService.removeAll(+id);
		return this.batchesService.remove(+id);
	}
}
