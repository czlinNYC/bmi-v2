import { Body, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as moment from 'moment';

@Injectable()
export class CompaniesService {
	constructor(@InjectConnection() private readonly knex: Knex) {}

	async create(
		@Body()
		company: {
			email: string;
			contact_name: string;
			password: string;
			phone: string;
			company: string;
			status: string;
		}
	) {
		try {
			const newcompany = await this.knex
				.table('companies')
				.insert({ ...company })
				.returning('*');
			return newcompany;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findAll() {
		try {
			const companies = await this.knex.table('companies');
			return companies;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findOne(id: number) {
		try {
			const company = await this.knex
				.table('companies')
				.where({ id })
				.first()
				.then((row) => row);
			return company;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async update(
		id: number,
		company: {
			email: string;
			contact_name: string;
			password: string;
			phone: string;
			company: string;
			status: string;
		}
	) {
		try {
			let now = moment.utc().format();

			const modifiedcompany = await this.knex('companies')
				.where('id', id)
				.update({
					...company,
					updated_at: now
				})
				.returning('*');
			return modifiedcompany;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async remove(id: number) {
		try {
			const removed = await this.knex
				.table('companies')
				.where('id', id)
				.delete('*');
			return { ...removed, message: 'This company has been deleted' };
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
