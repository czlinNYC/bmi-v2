import { Injectable, Body } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as moment from 'moment';

@Injectable()
export class OrganizationsService {
	constructor(@InjectConnection() private readonly knex: Knex) {}
	async create(
		@Body()
		organization: {
			org_name: string;
			status: string;
			account_holder_id: number;
			account_holder_name: string;
		}
	) {
		try {
			const newOrganization = await this.knex
				.table('users')
				.insert({ ...organization })
				.returning('*');
			return newOrganization;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findAll(page) {
		try {
			const prospects = await this.knex
				.table('organizations')
				.limit(100)
				.offset(page * 100);
			return prospects;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findOne(id: number) {
		try {
			const organization = await this.knex
				.table('organizations')
				.where({ id })
				.first()
				.then((row) => row);
			return organization;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async update(
		id: number,
		organization: {
			org_name: string;
			status: string;
			account_holder_id: number;
			account_holder_name: string;
		}
	) {
		try {
			let now = moment.utc().format();

			const modifiedOrg = await this.knex('organization')
				.where('id', id)
				.update({
					...organization,
					updated_at: now
				})
				.returning('*');
			return modifiedOrg;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async remove(id: number) {
		try {
			const removed = await this.knex
				.table('users')
				.where('id', id)
				.delete('*');
			return {
				...removed,
				message: 'This organization has been deleted'
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
