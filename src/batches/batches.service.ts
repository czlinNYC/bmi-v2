import { Body, Injectable } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as moment from 'moment';

@Injectable()
export class BatchesService {
	constructor(@InjectConnection() private readonly knex: Knex) {}

	async create(
		@Body()
		batch: {
			org_id: number;
			assignee_id: number;
			entries: number;
			assignee_name: string;
		}
	) {
		try {
			const newBatch = await this.knex
				.table('batches')
				.insert({ ...batch })
				.returning('*');
			return newBatch;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findAll(page) {
		try {
			const batches = await this.knex
				.table('batches')
				.limit(100)
				.offset(page * 100);
			return batches;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} batch`;
	}

	update(id: number, updateBatchDto: UpdateBatchDto) {
		return `This action updates a #${id} batch`;
	}

	async remove(id: number) {
		try {
			const removed = await this.knex
				.table('batches')
				.where('id', id)
				.delete('*');
			return {
				...removed,
				message: `This batch has been deleted, along with the ${removed[0].entries} entries within it.`
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
